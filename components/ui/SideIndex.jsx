"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/profile";

function BrandMark({ small = false }) {
  return (
    <div className={small ? "brand-mark-small" : "brand-mark"} aria-hidden={small ? "true" : undefined} aria-label={small ? undefined : "Sumit logo"}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 80L50 20L80 80" stroke="currentColor" strokeWidth="8" strokeLinejoin="bevel" />
        <path d="M20 20V80M80 20V80" stroke="currentColor" strokeWidth="8" />
      </svg>
    </div>
  );
}

export { BrandMark };

export function SideIndex() {
  const [active, setActive] = useState("cover");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".sheet"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.22 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Auto-reveal active link in mobile horizontal scroll rail
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 760) return;
    const activeLink = document.querySelector(".side-link.active");
    if (activeLink) {
      activeLink.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }, [active]);

  return (
    <aside className="side-index" aria-label="Section index">
      <BrandMark />
      <nav aria-label="Page sections">
        {navItems.map((item) => {
          const sectionId = item.href.slice(1);
          return (
            <a key={item.href} href={item.href} className={`side-link ${active === sectionId ? "active" : ""}`} aria-current={active === sectionId ? "page" : undefined}>
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
