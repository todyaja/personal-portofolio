import Image from "next/image";

// Combined entries (e.g. "Git / GitHub") carry one logo per tool.
// SVG logos: Devicon (MIT) and Simple Icons (CC0); dark marks use their white variant.
type Skill = { name: string; logos?: string[] };

type Category = { title: string; skills: Skill[] };

// Tiny blurred placeholder for progressive loading
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

const CATEGORIES: Category[] = [
  {
    title: "LANGUAGES",
    skills: [
      { name: "Go", logos: ["/assets/tech/go.svg"] },
      { name: "JavaScript", logos: ["/assets/tech/javascript.svg"] },
      { name: "Java", logos: ["/assets/tech/java.png"] },
      { name: "TypeScript", logos: ["/assets/tech/typescript.svg"] },
    ],
  },
  {
    title: "DATABASES",
    skills: [
      { name: "PostgreSQL", logos: ["/assets/tech/postgre.png"] },
      { name: "SQL Server", logos: ["/assets/tech/sqlserver.svg"] },
      { name: "Oracle DB", logos: ["/assets/tech/oracle.png"] },
      { name: "Cosmos DB", logos: ["/assets/tech/cosmosdb.svg"] },
    ],
  },
  {
    title: "FRAMEWORKS & TOOLS",
    skills: [
      { name: "NextJS / React", logos: ["/assets/tech/nextjs.svg", "/assets/tech/reactjs.png"] },
      { name: ".NET Core", logos: ["/assets/tech/net.png"] },
      { name: "NestJS", logos: ["/assets/tech/nestjs.svg"] },
      { name: "CodeIgniter", logos: ["/assets/tech/codeigniter.svg"] },
      { name: "Kotlin", logos: ["/assets/tech/kotlin.png"] },
      { name: "PHP", logos: ["/assets/tech/php.png"] },
    ],
  },
  {
    title: "INFRASTRUCTURE & MESSAGING",
    skills: [
      { name: "Docker", logos: ["/assets/tech/docker.svg"] },
      { name: "Kafka", logos: ["/assets/tech/kafka.svg"] },
      { name: "RabbitMQ", logos: ["/assets/tech/rabbitmq.svg"] },
      { name: "Redis", logos: ["/assets/tech/redis.svg"] },
      { name: "Azure Function", logos: ["/assets/tech/azure.svg"] },
      { name: "Azure DevOps", logos: ["/assets/tech/azuredevops.svg"] },
      { name: "Red Hat OpenShift", logos: ["/assets/tech/openshift.svg"] },
    ],
  },
  {
    title: "TOOLS & PLATFORMS",
    skills: [
      {
        name: "Git / GitHub / BitBucket / Gitlab",
        logos: ["/assets/tech/git.svg", "/assets/tech/github.svg", "/assets/tech/bitbucket.svg", "/assets/tech/gitlab.svg"],
      },
      {
        name: "Jira / Confluence / ClickUp",
        logos: ["/assets/tech/jira.svg", "/assets/tech/confluence.svg", "/assets/tech/clickup.svg"],
      },
      { name: "Jest", logos: ["/assets/tech/jest.svg"] },
      { name: "Drizzle-ORM", logos: ["/assets/tech/drizzle.svg"] },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="pixel-skills" aria-label="Skills">
      <h2 className="pixel-heading pixel-heading-responsive">SKILLS</h2>
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
                  className={`pixel-skill-item${skill.logos?.length ? "" : " text-only"}`}
                >
                  {skill.logos?.length ? (
                    <div className="pixel-skill-logos">
                      {skill.logos.map((logo, i) => (
                        <Image
                          key={logo}
                          src={logo}
                          // The name below labels the tile; extra logos are decorative
                          alt={i === 0 ? skill.name : ""}
                          width={32}
                          height={32}
                          // Upscale small PNGs crisply; SVGs stay smooth
                          style={logo.endsWith(".png") ? { imageRendering: "pixelated" } : undefined}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                          quality={80}
                        />
                      ))}
                    </div>
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
