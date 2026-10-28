"""Build race map images + route data for the Hobbies section.

Input:  one JSON file per race in scripts/race-data/<activity_id>.json, holding the
        output of the Garmin MCP `get_activity_fit_messages` tool
        (message_types=["record", "session", "lap"], include_records=true).
Output: public/assets/hobbies/running/<slug>.jpg  (OpenStreetMap background)
        data/running-races.json                   (stats + route in image pixels)

Run:    python scripts/build-race-maps.py   (needs Pillow)
"""

import io
import json
import math
import time
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
INPUT_DIR = ROOT / "scripts" / "race-data"
TILE_CACHE = ROOT / "scripts" / ".tile-cache"
IMAGE_DIR = ROOT / "public" / "assets" / "hobbies" / "running"
DATA_FILE = ROOT / "data" / "running-races.json"

# Map frame in CSS pixels; the saved image is 2x for high-DPI screens.
WIDTH, HEIGHT = 960, 640
MAX_ZOOM = 17
PADDING = 56
TILE_SIZE = 256
TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
USER_AGENT = "tody-portfolio-race-maps/1.0 (todyprasetya@gmail.com)"

# Local start date/time come from Garmin Connect (FIT timestamps are UTC);
# locations from reverse-geocoding each start point with OSM Nominatim.
RACES = [
    {"activity_id": 22096240149, "slug": "sahur-run-2026", "title": "Sahur Run",
     "category": "10K", "date": "2026-03-07", "start_local": "00:46", "location": "Central Jakarta, Jakarta"},
    {"activity_id": 23564878355, "slug": "pocari-run-2026", "title": "Pocari Run",
     "category": "Full Marathon", "date": "2026-07-12", "start_local": "04:00", "location": "Mandalika, Lombok"},
    {"activity_id": 23904993074, "slug": "bekasi-marathon-2026", "title": "Bekasi Marathon",
     "category": "10K", "date": "2026-08-09", "start_local": "05:46", "location": "Bekasi, West Java"},
    {"activity_id": 24425826100, "slug": "garmin-run-2026", "title": "Garmin Run",
     "category": "Half Marathon", "date": "2026-09-20", "start_local": "04:45", "location": "BSD City, Tangerang"},
    {"activity_id": 24596004598, "slug": "commuter-line-run-2026", "title": "Commuter Line",
     "category": "10K", "date": "2026-10-04", "start_local": "05:25", "location": "Central Jakarta, Jakarta"},
    {"activity_id": 24840925398, "slug": "jrf-2026", "title": "JRF",
     "category": "10K", "date": "2026-10-25", "start_local": "05:16", "location": "Central Jakarta, Jakarta"},
]

SEMICIRCLE_TO_DEG = 180 / 2**31


def load_messages(path):
    raw = json.loads(path.read_text(encoding="utf-8"))
    # Saved MCP results may be wrapped as [{"type": "text", "text": "<json>"}]
    if isinstance(raw, list):
        raw = json.loads("".join(part.get("text", "") for part in raw))
    if "result" in raw and "messages" not in raw:
        raw = raw["result"]
    return raw["messages"]


def fields(message):
    return {f["name"]: f["value"] for f in message["fields"]}


def project(lat, lon, zoom):
    """Web Mercator lat/lon -> global pixel coordinates at `zoom`."""
    scale = TILE_SIZE * 2**zoom
    x = (lon + 180) / 360 * scale
    sin = math.sin(math.radians(lat))
    y = (0.5 - math.log((1 + sin) / (1 - sin)) / (4 * math.pi)) * scale
    return x, y


def fit_zoom(points):
    """Fractional zoom where the route exactly fills the padded frame."""
    xs, ys = zip(*(project(lat, lon, 0) for lat, lon in points))
    scale = min((WIDTH - 2 * PADDING) / (max(xs) - min(xs)), (HEIGHT - 2 * PADDING) / (max(ys) - min(ys)))
    return min(math.log2(scale), MAX_ZOOM)


def fetch_tile(z, x, y):
    cached = TILE_CACHE / f"{z}_{x}_{y}.png"
    if not cached.exists():
        request = urllib.request.Request(TILE_URL.format(z=z, x=x, y=y), headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(request, timeout=30) as response:
            cached.write_bytes(response.read())
        time.sleep(0.1)  # stay polite with the OSM tile servers
    return Image.open(io.BytesIO(cached.read_bytes())).convert("RGB")


def render_map(points, zoom, out_path):
    """Stitch tiles into a 2x image centred on the route; return the 1x origin.

    Tiles come from the integer zoom nearest the 2x zoom and are resampled to the
    exact fractional scale, so the route fills the frame regardless of its size.
    """
    xs, ys = zip(*(project(lat, lon, zoom) for lat, lon in points))
    left = (min(xs) + max(xs)) / 2 - WIDTH / 2
    top = (min(ys) + max(ys)) / 2 - HEIGHT / 2

    tile_zoom = round(zoom + 1)
    k = 2 ** (tile_zoom - zoom)  # 1x pixels -> tile-zoom pixels
    tl, tt, tw, th = left * k, top * k, math.ceil(WIDTH * k), math.ceil(HEIGHT * k)
    canvas = Image.new("RGB", (tw, th))
    for tx in range(int(tl // TILE_SIZE), int((tl + tw) // TILE_SIZE) + 1):
        for ty in range(int(tt // TILE_SIZE), int((tt + th) // TILE_SIZE) + 1):
            canvas.paste(fetch_tile(tile_zoom, tx, ty), (round(tx * TILE_SIZE - tl), round(ty * TILE_SIZE - tt)))
    canvas = canvas.resize((WIDTH * 2, HEIGHT * 2), Image.LANCZOS)
    canvas.save(out_path, "JPEG", quality=78, optimize=True, progressive=True)
    return left, top


def simplify(points, tolerance):
    """Douglas-Peucker on pixel coordinates."""
    if len(points) < 3:
        return points
    (x1, y1), (x2, y2) = points[0], points[-1]
    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy) or 1e-9
    index, max_dist = 0, 0.0
    for i in range(1, len(points) - 1):
        px, py = points[i]
        dist = abs(dy * px - dx * py + x2 * y1 - y2 * x1) / length
        if dist > max_dist:
            index, max_dist = i, dist
    if max_dist <= tolerance:
        return [points[0], points[-1]]
    return simplify(points[: index + 1], tolerance)[:-1] + simplify(points[index:], tolerance)


def build_race(race):
    messages = load_messages(INPUT_DIR / f"{race['activity_id']}.json")
    records = [fields(m) for m in messages if m["type"] == "record"]
    session = next(fields(m) for m in messages if m["type"] == "session")
    laps = [fields(m) for m in messages if m["type"] == "lap"]

    points = [
        (r["position_lat"] * SEMICIRCLE_TO_DEG, r["position_long"] * SEMICIRCLE_TO_DEG)
        for r in records
        if r.get("position_lat") is not None and r.get("position_long") is not None
    ]
    zoom = fit_zoom(points)
    image_path = IMAGE_DIR / f"{race['slug']}.jpg"
    left, top = render_map(points, zoom, image_path)

    pixels = [(x - left, y - top) for x, y in (project(lat, lon, zoom) for lat, lon in points)]
    route = [[round(x, 1), round(y, 1)] for x, y in simplify(pixels, 0.75)]

    distance = session["total_distance"]
    moving = session["total_timer_time"]
    splits = [
        round(lap["total_timer_time"] / (lap["total_distance"] / 1000))
        for lap in laps
        if lap.get("total_distance") and lap["total_distance"] >= 900
    ]
    cadence = session.get("avg_running_cadence") or session.get("avg_cadence")

    return {
        "slug": race["slug"],
        "title": race["title"],
        "category": race["category"],
        "date": race["date"],
        "startTime": race["start_local"],
        "location": race["location"],
        "garminActivityId": race["activity_id"],
        "map": {
            "src": f"/assets/hobbies/running/{race['slug']}.jpg",
            "width": WIDTH,
            "height": HEIGHT,
            "zoom": round(zoom, 2),
            "route": route,
        },
        "stats": {
            "distanceKm": round(distance / 1000, 2),
            "movingTimeSec": round(moving),
            "elapsedTimeSec": round(session["total_elapsed_time"]),
            "avgPaceSecPerKm": round(moving / (distance / 1000)),
            "avgHeartRate": session.get("avg_heart_rate"),
            "maxHeartRate": session.get("max_heart_rate"),
            "avgCadenceSpm": round(cadence * 2) if cadence else None,
            "calories": session.get("total_calories"),
            "splitsSecPerKm": splits,
        },
    }


def main():
    TILE_CACHE.mkdir(parents=True, exist_ok=True)
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)

    races = []
    for race in RACES:
        if not (INPUT_DIR / f"{race['activity_id']}.json").exists():
            print(f"skip {race['title']}: no input file")
            continue
        built = build_race(race)
        print(f"{race['title']}: zoom {built['map']['zoom']:.2f}, {len(built['map']['route'])} route points")
        races.append(built)

    DATA_FILE.write_text(json.dumps(races, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {DATA_FILE.relative_to(ROOT)} ({len(races)} races)")


if __name__ == "__main__":
    main()
