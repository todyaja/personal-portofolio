"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { href: "/#hero", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

const HREF_TO_SECTION: Record<string, string> = {
  "/#hero": "hero",
  "/#experience": "experience",
  "/#skills": "skills",
  "/#education": "education",
  "/#contact": "contact",
};

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/#hero");
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sectionIds = ["hero", "experience", "skills", "education", "contact"];
    const hrefBySectionId: Record<string, string> = {
      hero: "/#hero",
      experience: "/#experience",
      skills: "/#skills",
      education: "/#education",
      contact: "/#contact",
    };

    const observedElements = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const href = hrefBySectionId[entry.target.id];
            if (href) {
              setActiveSection(href);
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    const observeSections = () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && !observedElements.has(element)) {
          observer.observe(element);
          observedElements.add(element);
        }
      });
    };

    // Initial observation
    observeSections();

    // Watch for dynamically loaded sections
    const mutationObserver = new MutationObserver(() => {
      observeSections();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const isOnHomePage = pathname === "/";

  const isActive = (href: string) => {
    if (!isOnHomePage) return false;
    return activeSection === href;
  };

  const handleMobileMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
      hamburgerRef.current?.focus();
      return;
    }
    if (e.key === "Tab") {
      const links = (e.currentTarget as HTMLElement).querySelectorAll("a");
      if (links.length === 0) return;
      if (!e.shiftKey && document.activeElement === links[links.length - 1]) {
        e.preventDefault();
        links[0].focus();
      }
    }
  };

  return (
    <nav className="pixel-nav pixel-panel pixel-border" aria-label="Main navigation">
      <Link href="/" className="pixel-heading text-xs" style={{ color: "var(--pixel-highlight)" }}>
        TODY
      </Link>

      <div className="pixel-nav-links">
        {NAV_LINKS.map(({ href, label }) => {
          const sectionId = HREF_TO_SECTION[href];
          return (
            <a
              key={href}
              href={href}
              className={`pixel-nav-link pixel-heading text-xs${isActive(href) ? " active" : ""}`}
              aria-current={isActive(href) ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
                setActiveSection(href);
              }}
            >
              {label}
            </a>
          );
        })}
      </div>

      <button
        ref={hamburgerRef}
        className="pixel-hamburger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-menu"
        aria-label="Toggle navigation menu"
      >
        <span className="pixel-hamburger-bar" />
        <span className="pixel-hamburger-bar" />
        <span className="pixel-hamburger-bar" />
      </button>

      <div
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`pixel-mobile-menu${menuOpen ? " open" : ""}`}
        onKeyDown={handleMobileMenuKeyDown}
      >
        {NAV_LINKS.map(({ href, label }) => {
          const sectionId = HREF_TO_SECTION[href];
          return (
            <a
              key={href}
              href={href}
              className={`pixel-nav-link pixel-heading text-xs${isActive(href) ? " active" : ""}`}
              aria-current={isActive(href) ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
                setActiveSection(href);
              }}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
