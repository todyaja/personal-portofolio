import Image from "next/image";

type Skill = { name: string; logo?: string };

type Category = { title: string; skills: Skill[] };

// Tiny blurred placeholder for progressive loading
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

const CATEGORIES: Category[] = [
  {
    title: "LANGUAGES",
    skills: [
      { name: "Go" },
      { name: "JavaScript" },
      { name: "Java", logo: "/assets/tech/java.png" },
      { name: "TypeScript" },
    ],
  },
  {
    title: "DATABASES",
    skills: [
      { name: "PostgreSQL", logo: "/assets/tech/postgre.png" },
      { name: "SQL Server" },
      { name: "Oracle DB", logo: "/assets/tech/oracle.png" },
      { name: "Cosmos DB" },
    ],
  },
  {
    title: "FRAMEWORKS & TOOLS",
    skills: [
      { name: "NextJS / React", logo: "/assets/tech/reactjs.png" },
      { name: ".NET Core", logo: "/assets/tech/net.png" },
      { name: "NestJS" },
      { name: "CodeIgniter" },
      { name: "Kotlin", logo: "/assets/tech/kotlin.png" },
      { name: "PHP", logo: "/assets/tech/php.png" },
    ],
  },
  {
    title: "INFRASTRUCTURE & MESSAGING",
    skills: [
      { name: "Docker" },
      { name: "Kafka" },
      { name: "RabbitMQ" },
      { name: "Redis" },
      { name: "Azure Function" },
      { name: "Azure DevOps" },
      { name: "Red Hat OpenShift" },
    ],
  },
  {
    title: "TOOLS & PLATFORMS",
    skills: [
      { name: "Git / GitHub / BitBucket / Gitlab" },
      { name: "Jira / Confluence / ClickUp" },
      { name: "Jest" },
      { name: "Drizzle-ORM" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="pixel-skills" aria-label="Skills">
      <h2
        className="pixel-heading pixel-heading-responsive"
        style={{ color: "var(--pixel-highlight)", marginBottom: "1.5rem" }}
      >
        SKILLS
      </h2>
      <div className="pixel-panel">
        {CATEGORIES.map((cat) => (
          <div key={cat.title} className="pixel-skill-category">
            <h3 className="pixel-heading pixel-skill-category-title">
              {cat.title}
            </h3>
            <div className="pixel-skill-grid">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`pixel-skill-item${skill.logo ? "" : " text-only"}`}
                >
                  {skill.logo ? (
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={32}
                      height={32}
                      style={{ imageRendering: "pixelated" }}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      quality={80}
                    />
                  ) : null}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
