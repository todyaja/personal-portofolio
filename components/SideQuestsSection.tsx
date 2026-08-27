const sideQuests = [
  {
    title: "My Running Journey",
    type: "PERSONAL PRODUCT",
    description:
      "A focused running dashboard built while exploring Strava integrations, weekly analysis, and thoughtful product design.",
    tags: ["Next.js", "Strava API", "AI", "Vercel"],
    href: "https://strava-running-journey.vercel.app/",
    cta: "OPEN RUNNING JOURNEY",
  },
];

function RunningJourneyPreview() {
  return (
    <div className="pixel-running-preview" aria-label="Preview of My Running Journey dashboard">
      <div className="pixel-running-preview-bar"><span>my running journey</span><i /></div>
      <div className="pixel-running-preview-title">KEEP THE RHYTHM,<br /><b>RUNNER.</b></div>
      <div className="pixel-running-preview-stats">
        <div><small>RECENT</small><strong>12 RUNS</strong></div>
        <div><small>THIS WEEK</small><strong>24.6 KM</strong></div>
        <div><small>PACE</small><strong>5:42 /KM</strong></div>
      </div>
      <div className="pixel-running-preview-body">
        <div className="pixel-running-preview-chart"><span>YOUR RUNNING RHYTHM</span><svg viewBox="0 0 160 55" aria-hidden="true"><path d="M2 43 C24 38 27 24 47 30 S74 40 87 22 S111 24 124 27 S143 8 158 11" /></svg></div>
        <div className="pixel-running-preview-runs"><span>RECENT RUNS</span><b>LONG EASY RUN</b><em>7.8 KM · 6:02 /KM</em><b>TEMPO INTERVALS</b><em>5.2 KM · 5:01 /KM</em></div>
      </div>
    </div>
  );
}

export default function SideQuestsSection() {
  return (
    <section id="side-quests" className="pixel-side-quests" aria-label="Side quests">
      <div className="pixel-side-quests-heading">
        <div>
          <p className="pixel-eyebrow pixel-heading">BEYOND THE DAY JOB</p>
          <h2 className="pixel-heading" style={{ color: "var(--pixel-highlight)" }}>
            SIDE QUESTS
          </h2>
        </div>
        <p className="pixel-body-text pixel-side-quests-intro">
          Personal experiments and small products where I learn by shipping.
        </p>
      </div>

      <div className="pixel-side-quests-grid">
        {sideQuests.map((quest) => (
          <article key={quest.title} className="pixel-side-quest-card pixel-panel">
            <div className="pixel-side-quest-top">
              <span className="pixel-side-quest-icon" aria-hidden="true">&gt;_</span>
              <span className="pixel-side-quest-type pixel-heading">{quest.type}</span>
            </div>
            <RunningJourneyPreview />
            <h3 className="pixel-heading pixel-side-quest-title">{quest.title}</h3>
            <p className="pixel-body-text pixel-side-quest-description">{quest.description}</p>
            <div className="pixel-tech-badges">
              {quest.tags.map((tag) => <span key={tag} className="pixel-tech-badge">{tag}</span>)}
            </div>
            <a href={quest.href} className="pixel-btn pixel-heading pixel-side-quest-link" target="_blank" rel="noreferrer">
              {quest.cta} <span aria-hidden="true">-&gt;</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
