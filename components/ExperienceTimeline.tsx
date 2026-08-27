import Image from "next/image";

type ExperienceEntry = {
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
  tech: string[];
};

// Tiny blurred placeholder for progressive loading
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

const TECH_LOGOS: Record<string, string> = {
  Java: "/assets/tech/java.png",
  Kotlin: "/assets/tech/kotlin.png",
  ".NET Core": "/assets/tech/net.png",
  ".NET Entity Framework": "/assets/tech/net.png",
  "Oracle DB": "/assets/tech/oracle.png",
  PostgreSQL: "/assets/tech/postgre.png",
  "React JS": "/assets/tech/reactjs.png",
};

const experiences: ExperienceEntry[] = [
  {
    company: "CIMB NIAGA",
    role: "IT Developer (Full Stack Engineer)",
    duration: "02/2025 - Present",
    location: "Tangerang",
    bullets: [
      "Designed and implemented new features for the OCTO Connect project",
      "Collaborated cross-functionally with multiple teams",
      "Developed comprehensive unit tests and engineering specifications",
    ],
    tech: [
      "Go",
      "Java",
      "NextJS",
      "Redis",
      "PostgreSQL",
      "BitBucket",
      "Jira",
      "Confluence",
      "Red Hat OpenShift",
    ],
  },
  {
    company: "Vokraf",
    role: "Lead Backend Engineer",
    duration: "09/2024 - 12/2024",
    location: "Jakarta",
    bullets: [
      "Collaborate effectively with cross-functional teams for strategic business decision-making",
      "Provide leadership and guidance on code architecture",
      "Conduct thorough reviews of backend code authored by peers",
    ],
    tech: [],
  },
  {
    company: "Vokraf",
    role: "Backend Engineer",
    duration: "04/2024 - 09/2024",
    location: "Jakarta",
    bullets: [
      "Revamped the existing API into a microservice architecture",
      "Documented API specifications and microservice interactions using ClickUp",
      "Added unit testing for all microservices using Jest",
    ],
    tech: [
      "NestJS",
      "Typescript",
      "Drizzle-ORM",
      "PostgreSQL",
      "Unit Testing",
      "Jest",
      "Kafka",
      "RabbitMQ",
      "Docker",
      "ClickUp",
      "GitHub",
    ],
  },
  {
    company: "BINUS GROUP",
    role: "Full Stack Engineer",
    duration: "02/2022 - 02/2024",
    location: "Jakarta",
    bullets: [
      "Develop, Enhance, and Maintain multiple learning management system projects",
      "Help external teams configure, deploy, and implement changes from dev to production",
    ],
    tech: [
      ".NET Core",
      "React JS",
      "Cosmos DB",
      "Azure Function",
      "Azure DevOps",
      "CodeIgniter",
      "SQL Server",
      "Java",
      "Kotlin",
    ],
  },
  {
    company: "Bali Cipta Innovator",
    role: "Backend Engineer",
    duration: "02/2021 - 08/2021",
    location: "Jakarta",
    bullets: [
      "Design and implemented Restful API, improving data accessibility and integration",
      "Implemented schedulers from the database to automatically insert daily production",
    ],
    tech: [".NET Entity Framework", "Oracle DB", "Gitlab"],
  },
];

function TechBadge({ name }: { name: string }) {
  const logo = TECH_LOGOS[name];
  return (
    <span className="pixel-tech-badge">
      {logo && (
        <Image
          src={logo}
          alt={name}
          width={16}
          height={16}
          style={{ imageRendering: "pixelated" }}
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          quality={75}
        />
      )}
      {name}
    </span>
  );
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="pixel-experience" aria-label="Experience">
      <h2
        className="pixel-heading"
        style={{ color: "var(--pixel-highlight)", marginBottom: "1.5rem" }}
      >
        EXPERIENCE
      </h2>

      {experiences.map((exp) => (
        <div key={`${exp.company}-${exp.duration}`} className="pixel-timeline-entry pixel-panel">
          <div className="pixel-timeline-header">
            <span className="pixel-timeline-company pixel-heading">
              {exp.company}
            </span>
            <span className="pixel-timeline-duration pixel-body-text">
              {exp.duration}
            </span>
          </div>
          <div className="pixel-timeline-role pixel-body-text">{exp.role}</div>
          <div className="pixel-timeline-location pixel-body-text">
            {exp.location}
          </div>
          <ul className="pixel-timeline-bullets">
            {exp.bullets.map((bullet, i) => (
              <li key={i} className="pixel-body-text">
                {bullet}
              </li>
            ))}
          </ul>
          {exp.tech.length > 0 && (
            <div className="pixel-tech-badges">
              {exp.tech.map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
