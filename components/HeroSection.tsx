import PixelAvatar from "@/components/PixelAvatar";
import TypeWriter from "@/components/TypeWriter";

export default function HeroSection() {
  return (
    <section id="hero" className="pixel-hero" aria-label="About">
      <div className="pixel-hero-avatar">
        <PixelAvatar size="lg" animated={true} priority={true} />
      </div>
      <div className="pixel-hero-content pixel-panel">
        <h1
          className="pixel-heading"
          style={{ color: "var(--pixel-highlight)" }}
        >
          TODY PRASETYA
        </h1>
        <p className="pixel-body-text">Backend / Full Stack Engineer</p>
        <hr
          aria-hidden="true"
          style={{
            border: "none",
            borderTop: "2px dashed var(--pixel-border)",
            margin: "1.5rem 0",
          }}
        />
        <p className="pixel-body-text">
          <TypeWriter speed={50} delay={500}>
            Software Engineer passionate about backend architecture, distributed
            systems, and creating products that are maintainable, performant,
            and built for real users.
          </TypeWriter>
        </p>
        <a
          href="#experience"
          className="pixel-btn pixel-heading"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            padding: "0.5rem 1rem",
            fontSize: "0.625rem",
            color: "var(--pixel-text-primary)",
            background: "var(--pixel-accent)",
            textDecoration: "none",
          }}
        >
          VIEW MY WORK
        </a>
      </div>
    </section>
  );
}
