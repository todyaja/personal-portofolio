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
