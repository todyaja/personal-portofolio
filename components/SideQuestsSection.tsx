import type { ReactNode } from "react";

type SideQuest = {
  title: string;
  type: string;
  description: string;
  tags: string[];
  href: string;
  cta: string;
  preview: ReactNode;
};

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

type BoardStep = { who: "ai" | "you"; title: string; detail: string; active?: boolean };

const JIRA_BOARD: { column: string; steps: BoardStep[] }[] = [
  {
    column: "PRD",
    steps: [
      { who: "ai", title: "prd-maker", detail: "writes PRD → Confluence" },
      { who: "you", title: "PRD review", detail: "approve or comment" },
    ],
  },
  {
    column: "PLAN",
    steps: [
      { who: "ai", title: "tech-planner", detail: "reads repo, writes TRD" },
      { who: "you", title: "Plan review", detail: "approve or comment" },
    ],
  },
  {
    column: "BUILD",
    steps: [
      { who: "ai", title: "engineer", detail: "codes in a git worktree", active: true },
      { who: "ai", title: "code-reviewer", detail: "⇄ up to 3 rounds" },
    ],
  },
  {
    column: "SHIP",
    steps: [
      { who: "ai", title: "open PR", detail: "push feature/KEY-42" },
      { who: "you", title: "PR review", detail: "you merge" },
    ],
  },
];

function JiraAgentPreview() {
  return (
    <div className="pixel-jira-preview" aria-label="Illustration: a Jira ticket moving across board columns while Claude Code agents do each step">
      <div className="pixel-jira-preview-bar">
        <span>JIRA BOARD</span>
        <em>polling every 60s</em>
      </div>
      <div className="pixel-jira-preview-ticket">
        <b>KEY-42</b> Add export to CSV <i>IMPLEMENTING</i>
      </div>
      <div className="pixel-jira-preview-board">
        {JIRA_BOARD.map(({ column, steps }, i) => (
          <div key={column} className="pixel-jira-preview-column">
            <span className="pixel-jira-preview-column-title">
              {column}
              {i < JIRA_BOARD.length - 1 && <span aria-hidden="true"> →</span>}
            </span>
            {steps.map((step) => (
              <div
                key={step.title}
                className={`pixel-jira-preview-step is-${step.who}${step.active ? " is-active" : ""}`}
              >
                <small>{step.who === "ai" ? "AI" : "YOU"}</small>
                <strong>{step.title}</strong>
                <span>{step.detail}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pixel-jira-preview-terminal" aria-hidden="true">
        <span>$ claude -p --agent software-engineer</span>
        <span className="is-ok">✓ PR #12 opened · feature/KEY-42 → main</span>
      </div>
    </div>
  );
}

const sideQuests: SideQuest[] = [
  {
    title: "My Running Journey",
    type: "PERSONAL PRODUCT",
    description:
      "A focused running dashboard built while exploring Strava integrations, weekly analysis, and thoughtful product design.",
    tags: ["Next.js", "Strava API", "AI", "Vercel"],
    href: "https://strava-running-journey.vercel.app/",
    cta: "OPEN RUNNING JOURNEY",
    preview: <RunningJourneyPreview />,
  },
  {
    title: "My Jira AI Agent",
    type: "AI AUTOMATION",
    description:
      "A personal Go service that turns my Jira board into an AI workflow. Moving a ticket into a column hands it to a Claude Code agent for that step: it writes the PRD to Confluence, plans against the repo on my machine, codes in a git worktree, reviews its own work and opens the pull request. I only sign off on the PRD, the plan and the PR. It polls Jira from my laptop, so there's no server to host.",
    tags: ["Go", "Claude Code", "Jira API", "Confluence", "GitHub API", "Git worktrees"],
    href: "https://github.com/todyaja/my-jira-ai-agent",
    cta: "VIEW ON GITHUB",
    preview: <JiraAgentPreview />,
  },
];

export default function SideQuestsSection() {
  return (
    <section id="side-quests" className="pixel-side-quests" aria-label="Side quests">
      <div className="pixel-side-quests-heading">
        <div>
          <p className="pixel-eyebrow pixel-heading">BEYOND THE DAY JOB</p>
          <h2 className="pixel-heading pixel-heading-responsive" style={{ color: "var(--pixel-highlight)" }}>
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
            {quest.preview}
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
