"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type ReactNode, type TouchEvent } from "react";
import { hobbies, type Hobby, type RunningRace } from "@/data/hobbies";

function formatDuration(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const mm = String(m).padStart(h ? 2 : 1, "0");
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function formatPace(secPerKm: number) {
  return `${Math.floor(secPerKm / 60)}:${String(secPerKm % 60).padStart(2, "0")}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Formatted by hand so server and browser render the same string
function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function RaceMap({ race, sizer = false }: { race: RunningRace; sizer?: boolean }) {
  const { src, width, height, route } = race.map;
  // Height-only copy: the aspect ratio alone fixes its size, so skip the image and route
  if (sizer) return <div className="pixel-race-map" style={{ aspectRatio: `${width} / ${height}` }} />;
  const points = route.map(([x, y]) => `${x},${y}`).join(" ");
  const [startX, startY] = route[0];
  const [endX, endY] = route[route.length - 1];
  // Most courses start and finish at the same spot: draw one combined marker
  const loop = Math.hypot(endX - startX, endY - startY) < 24;

  return (
    <div className="pixel-race-map" style={{ aspectRatio: `${width} / ${height}` }}>
      <Image
        src={src}
        alt={`Map of the ${race.title} route in ${race.location}`}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        quality={80}
      />
      {/* "slice" matches the image's object-fit: cover, so route and map always scale together */}
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <polyline className="pixel-race-route-casing" points={points} />
        <polyline className="pixel-race-route" points={points} />
        <circle className="pixel-race-marker pixel-race-marker--start" cx={startX} cy={startY} r={loop ? 14 : 9} />
        <circle className="pixel-race-marker pixel-race-marker--finish" cx={endX} cy={endY} r={loop ? 6 : 9} />
      </svg>
      <span className="pixel-race-map-legend">
        <i className="pixel-race-marker--start" /> START{loop ? " / " : " "}
        {!loop && <i className="pixel-race-marker--finish" />}FINISH
      </span>
      <span className="pixel-race-map-credit">© OpenStreetMap contributors</span>
    </div>
  );
}

function SplitBars({ splits }: { splits: number[] }) {
  if (splits.length < 2) return null;
  const fastest = Math.min(...splits);
  const slowest = Math.max(...splits);
  const range = slowest - fastest || 1;

  return (
    <div className="pixel-race-splits">
      <span className="pixel-race-label">SPLITS / KM</span>
      <div className="pixel-race-splits-bars" role="img" aria-label={`Kilometre splits from ${formatPace(fastest)} to ${formatPace(slowest)} per km`}>
        {splits.map((split, i) => (
          <i
            key={i}
            title={`KM ${i + 1}: ${formatPace(split)} /km`}
            style={{ height: `${35 + ((slowest - split) / range) * 65}%` }}
            className={split === fastest ? "is-fastest" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// Chip order, shortest distance first; any other category is appended after these
const CATEGORY_ORDER = ["5K", "10K", "Half Marathon", "Full Marathon"];
const CATEGORY_SHORT: Record<string, string> = { "Half Marathon": "HALF", "Full Marathon": "FULL" };

type CategorySummary = {
  category: string;
  count: number;
  /** Fastest race at this distance: its slide gets the RACE PB badge */
  best: RunningRace;
};

function summarizeCategories(races: RunningRace[]): CategorySummary[] {
  const byCategory = new Map<string, CategorySummary>();
  for (const race of races) {
    const entry = byCategory.get(race.category);
    if (!entry) byCategory.set(race.category, { category: race.category, count: 1, best: race });
    else {
      entry.count++;
      if (race.stats.movingTimeSec < entry.best.stats.movingTimeSec) entry.best = race;
    }
  }
  const rank = (c: string) => (CATEGORY_ORDER.includes(c) ? CATEGORY_ORDER.indexOf(c) : CATEGORY_ORDER.length);
  return [...byCategory.values()].sort((a, b) => rank(a.category) - rank(b.category));
}

function RaceFilter({
  races,
  summaries,
  active,
  onChange,
}: {
  races: RunningRace[];
  summaries: CategorySummary[];
  active: string | null;
  onChange: (category: string | null) => void;
}) {
  return (
    <div className="pixel-race-filter" role="group" aria-label="Filter races by distance">
      <button
        type="button"
        className="pixel-race-chip"
        aria-pressed={active === null}
        onClick={() => onChange(null)}
      >
        <span className="pixel-race-chip-name pixel-heading">ALL</span>
        <span className="pixel-race-chip-count">{races.length} races</span>
      </button>
      {summaries.map(({ category, count }) => (
        <button
          key={category}
          type="button"
          className="pixel-race-chip"
          aria-pressed={active === category}
          onClick={() => onChange(category)}
          aria-label={`${category}: ${count} race${count > 1 ? "s" : ""}`}
        >
          <span className="pixel-race-chip-name pixel-heading">{CATEGORY_SHORT[category] ?? category}</span>
          <span className="pixel-race-chip-count">
            {count} race{count > 1 ? "s" : ""}
          </span>
        </button>
      ))}
    </div>
  );
}

function RunningBlock({ hobby }: { hobby: Hobby }) {
  const [category, setCategory] = useState<string | null>(null);
  const summaries = summarizeCategories(hobby.items);
  const pbSlugs = new Set(summaries.map((s) => s.best.slug));
  const races = category ? hobby.items.filter((r) => r.category === category) : hobby.items;

  return (
    <>
      <RaceFilter races={hobby.items} summaries={summaries} active={category} onChange={setCategory} />      {/* Keyed by filter so the carousel starts from the first slide on every change */}
      <Carousel
        key={category ?? "all"}
        label={`${hobby.title} races${category ? `, ${category}` : ""}`}
        slides={races.map((race) => ({
          key: race.slug,
          title: race.title,
          node: <RaceSlide race={race} isPb={pbSlugs.has(race.slug)} />,
        }))}
        // Every race, so the box keeps the tallest race's height whichever filter is active
        sizers={hobby.items.map((race) => (
          <RaceSlide key={race.slug} race={race} isPb={pbSlugs.has(race.slug)} sizer />
        ))}
      />
    </>
  );
}

function RaceSlide({ race, isPb, sizer = false }: { race: RunningRace; isPb: boolean; sizer?: boolean }) {
  const { stats } = race;
  const details: [string, string | null][] = [
    ["DISTANCE", `${stats.distanceKm.toFixed(2)} km`],
    ["TIME", formatDuration(stats.movingTimeSec)],
    ["AVG PACE", `${formatPace(stats.avgPaceSecPerKm)} /km`],
    ["AVG HR", stats.avgHeartRate ? `${stats.avgHeartRate} bpm` : null],
    ["MAX HR", stats.maxHeartRate ? `${stats.maxHeartRate} bpm` : null],
    ["CADENCE", stats.avgCadenceSpm ? `${stats.avgCadenceSpm} spm` : null],
  ];

  return (
    <div className="pixel-race-slide">
      <RaceMap race={race} sizer={sizer} />
      <div className="pixel-race-details">
        <div className="pixel-race-badges">
          <span className="pixel-race-category pixel-heading">{race.category}</span>
          {isPb && (
            <span className="pixel-race-pb pixel-heading" title={`Fastest official ${race.category} race`}>
              RACE PB
            </span>
          )}
        </div>
        <h3 className="pixel-heading pixel-race-title">{race.title}</h3>
        <p className="pixel-body-text pixel-race-meta">{formatDate(race.date)}</p>
        <dl className="pixel-race-stats">
          <div className="pixel-race-stat--wide">
            <dt className="pixel-race-label">LOCATION</dt>
            <dd className="pixel-heading">{race.location}</dd>
          </div>
          {details
            .filter((d): d is [string, string] => d[1] !== null)
            .map(([label, value]) => (
              <div key={label}>
                <dt className="pixel-race-label">{label}</dt>
                <dd className="pixel-heading">{value}</dd>
              </div>
            ))}
        </dl>
        <SplitBars splits={stats.splitsSecPerKm} />
      </div>
    </div>
  );
}

function Carousel({
  label,
  slides,
  sizers = [],
}: {
  label: string;
  slides: { key: string; title: string; node: ReactNode }[];
  /** Invisible copies stacked under the track: the viewport is as tall as the tallest one */
  sizers?: ReactNode[];
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;
  const go = (next: number) => setIndex((next + count) % count);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  };
  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <div
      className="pixel-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="pixel-carousel-viewport">
        {sizers.map((node, i) => (
          <div key={i} className="pixel-carousel-sizer" aria-hidden="true" inert>
            {node}
          </div>
        ))}
        <div className="pixel-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, i) => (
            <div
              key={slide.key}
              className="pixel-carousel-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${slide.title}`}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              {slide.node}
            </div>
          ))}
        </div>
      </div>

      {/* With a single slide the controls stay in the layout (hidden) so the height doesn't jump */}
      {count > 0 && (
        <div className="pixel-carousel-controls" aria-hidden={count < 2} inert={count < 2} data-single={count < 2 || undefined}>
          <button type="button" className="pixel-btn pixel-heading" onClick={() => go(index - 1)} aria-label="Previous race">
            &lt;
          </button>
          <div className="pixel-carousel-dots">
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                className={i === index ? "is-active" : undefined}
                onClick={() => go(i)}
                aria-label={`Go to ${slide.title}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" className="pixel-btn pixel-heading" onClick={() => go(index + 1)} aria-label="Next race">
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

function HobbyBlock({ hobby }: { hobby: Hobby }) {
  switch (hobby.type) {
    case "running":
      return <RunningBlock hobby={hobby} />;
  }
}

export default function HobbiesSection() {
  const visible = hobbies.filter((h) => h.items.length > 0);
  if (visible.length === 0) return null;

  return (
    <section id="hobbies" className="pixel-hobbies" aria-label="Hobbies">
      <h2 className="pixel-heading pixel-heading-responsive">HOBBIES</h2>
      {visible.map((hobby) => (
        <div key={hobby.type} className="pixel-hobby pixel-panel">
          <div className="pixel-hobby-header">
            <h3 className="pixel-heading pixel-hobby-title">{hobby.title}</h3>
            <p className="pixel-body-text pixel-hobby-tagline">{hobby.tagline}</p>
          </div>
          <HobbyBlock hobby={hobby} />
        </div>
      ))}
    </section>
  );
}
