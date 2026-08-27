import Image from "next/image";

// Tiny blurred placeholder for progressive loading
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

export default function EducationSection() {
  return (
    <section id="education" className="pixel-education">
      <h2 className="pixel-heading pixel-heading-responsive">EDUCATION</h2>
      <div className="pixel-education-card pixel-panel">
        <div className="pixel-education-logo pixel-border">
          <Image
            src="/assets/logos/binus_univ.png"
            alt="Bina Nusantara University logo"
            width={96}
            height={96}
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            quality={80}
          />
        </div>
        <div className="pixel-education-content">
          <p className="pixel-education-degree pixel-heading">
            Computer Science
          </p>
          <p className="pixel-education-university pixel-body-text">
            Bina Nusantara University
          </p>
          <p className="pixel-education-honor pixel-body-text">Cumlaude</p>
          <p className="pixel-education-gpa pixel-body-text">
            GPA: 3.87 / 4.00
          </p>
        </div>
      </div>
    </section>
  );
}
