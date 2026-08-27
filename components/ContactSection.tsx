export default function ContactSection() {
  return (
    <section id="contact" className="pixel-contact" aria-label="Contact">
      <h2 className="pixel-heading pixel-heading-responsive" style={{ textAlign: "center", color: "var(--pixel-highlight)" }}>
        CONTACT
      </h2>

      <div className="pixel-contact-card pixel-panel">
        <p className="pixel-contact-intro pixel-body-text">
          Let&apos;s build something together!
        </p>

        <div className="pixel-contact-list">
          <div className="pixel-contact-item">
            <span className="pixel-contact-icon" aria-hidden="true">✉</span>
            <span className="pixel-contact-label pixel-heading">EMAIL</span>
            <a
              href="mailto:todyprasetya@gmail.com"
              className="pixel-contact-link pixel-btn"
            >
              todyprasetya@gmail.com
            </a>
          </div>

          <div className="pixel-contact-item">
            <span className="pixel-contact-icon" aria-hidden="true">☎</span>
            <span className="pixel-contact-label pixel-heading">PHONE</span>
            <a href="tel:08118422002" className="pixel-contact-link pixel-btn">
              08118422002
            </a>
          </div>

          <div className="pixel-contact-item">
            <span className="pixel-contact-icon" aria-hidden="true">◆</span>
            <span className="pixel-contact-label pixel-heading">LOCATION</span>
            <span className="pixel-contact-value pixel-body-text">
              Kelapa Gading, North Jakarta
            </span>
          </div>
        </div>

        <p className="pixel-contact-footer pixel-body-text">
          © 2026 Tody Prasetya
        </p>
      </div>
    </section>
  );
}
