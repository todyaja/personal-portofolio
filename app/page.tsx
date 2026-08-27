import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";

// Lazy-load below-fold components with SSR enabled for SEO
const ExperienceTimeline = dynamic(
  () => import("@/components/ExperienceTimeline"),
  {
    ssr: true,
    loading: () => <SectionSkeleton id="experience" />,
  }
);

const SkillsSection = dynamic(() => import("@/components/SkillsSection"), {
  ssr: true,
  loading: () => <SectionSkeleton id="skills" />,
});

const EducationSection = dynamic(
  () => import("@/components/EducationSection"),
  {
    ssr: true,
    loading: () => <SectionSkeleton id="education" />,
  }
);

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: true,
  loading: () => <SectionSkeleton id="contact" />,
});

// Pixel-art styled skeleton loader for lazy-loaded sections
function SectionSkeleton({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="pixel-panel"
      style={{
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--pixel-bg-panel)",
        border: "2px solid var(--pixel-border)",
      }}
      aria-busy="true"
      aria-label="Loading section"
    >
      <div className="pixel-loading-coin" />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <ScrollReveal staggerIndex={0}>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal staggerIndex={1}>
        <ExperienceTimeline />
      </ScrollReveal>
      <ScrollReveal staggerIndex={2}>
        <SkillsSection />
      </ScrollReveal>
      <ScrollReveal staggerIndex={3}>
        <EducationSection />
      </ScrollReveal>
      <ScrollReveal staggerIndex={4}>
        <ContactSection />
      </ScrollReveal>
    </>
  );
}
