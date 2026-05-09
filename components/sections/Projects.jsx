"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/data/projects";

function GitHubIcon() {
  return (
    <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 8.36 22c.58.1.79-.25.79-.56v-2c-3.22.7-3.9-1.38-3.9-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.57-.29-5.28-1.29-5.28-5.74 0-1.27.45-2.3 1.2-3.12-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.2 1.19a11.04 11.04 0 0 1 5.84 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.78.11 3.07.75.82 1.2 1.85 1.2 3.12 0 4.46-2.72 5.44-5.3 5.73.42.36.79 1.07.79 2.16v3.03c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function ProjectDialog({ project, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="project-dialog-shell"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.section
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialogTitle"
        aria-describedby="dialogHook"
        ref={dialogRef}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="dialog-paper">
          <button ref={closeRef} className="dialog-close mag-target" type="button" onClick={onClose} aria-label="Close project story">X Close</button>
          <p className="kicker">Case File</p>
          <h2 className="dialog-title" id="dialogTitle">{project.title}</h2>
          <p className="dialog-hook" id="dialogHook">{project.hook}</p>
          <div className="dialog-details" role="list">
            <div className="dialog-detail-item" role="listitem"><span>Role</span><strong>{project.role}</strong></div>
            <div className="dialog-detail-item" role="listitem"><span>Tools</span><strong>{project.tools}</strong></div>
            <div className="dialog-detail-item" role="listitem"><span>Year</span><strong>{project.year}</strong></div>
            <div className="dialog-detail-item" role="listitem"><span>Outcome</span><strong>{project.outcome}</strong></div>
          </div>
          <div className="dialog-columns">
            {project.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ul className="dialog-proof">
              <li><strong>Performance</strong><span>Designed to keep waiting, parsing, browsing, and response states explicit.</span></li>
              <li><strong>Deployment</strong><span>Source is reviewable on GitHub and structured for public deployment once hosting is attached.</span></li>
              <li><strong>Scale signal</strong><span>Reusable boundaries make the project easier to extend without collapsing the product surface.</span></li>
            </ul>
            <div className="dialog-actions">
              <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={() => track("project_click", { project: project.slug, target: "github-dialog" })}>View GitHub</a>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState(null);
  const openProject = (project, target) => {
    setSelected(project);
    track("project_click", { project: project.slug, target });
  };
  const openCard = (event, project) => {
    if (event.target.closest("a, button")) return;
    openProject(project, "card");
  };

  return (
    <section className="projects sheet" id="projects">
      <SectionLabel left="Featured Stories" right="Page 03-04" />
      <Reveal className="projects-intro">
        <div className="projects-intro-left">
          <p className="kicker">Lead Reports</p>
          <h2>Production-minded projects with visible engineering depth.</h2>
        </div>
        <div className="projects-intro-right">
          <p className="projects-sub">Each case file highlights the problem, system architecture, engineering decisions, and production-readiness signals.</p>
          <p className="projects-sub">Built to demonstrate practical engineering depth, product thinking, and scalable implementation patterns.</p>
        </div>
      </Reveal>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal
            as="article"
            className="story-card mag-target"
            key={project.slug}
            aria-label={`${project.title} case study`}
            onClick={(event) => openCard(event, project)}
          >
            <button
              className="story-img-button mag-target"
              type="button"
              onClick={() => openProject(project, "image")}
              aria-label={`Open ${project.title} case file`}
            >
              <span className="story-img" data-parallax-media>
                <Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
              </span>
            </button>
            
            <div className="story-content">
              <span className="story-meta">
                <span>CASE FILE {String(index + 1).padStart(2, '0')}</span> &middot; <span>{project.label}</span> &middot; <span>{project.year}</span>
              </span>
              <h3>
                <button
                  className="story-title-button mag-target"
                  type="button"
                  onClick={() => openProject(project, "title")}
                >
                  {project.title}
                </button>
              </h3>
              <p className="story-hook">{project.hook}</p>
              <div className="story-scan">{project.scanStrip}</div>
              
              <ul className="project-proof" aria-label={`${project.title} engineering breakdown`}>
                {project.proof.map(([label, copy]) => (
                  <li key={label}><strong>{label}</strong><span>{copy}</span></li>
                ))}
              </ul>
              
              {project.engineeringWins && (
                <div className="engineering-wins">
                  <strong>ENGINEERING WINS</strong>
                  <span>{project.engineeringWins}</span>
                </div>
              )}
              
              <div className="story-footer">
                <span className="story-tags">{project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</span>
                
                <div className="project-actions" aria-label={`${project.title} project links`}>
                  <button
                    className="story-cta story-cta-button mag-target"
                    type="button"
                    onClick={() => openProject(project, "case-study-button")}
                  >
                    VIEW LIVE <span className="action-arrow">-&gt;</span>
                  </button>
                  <a
                    className="project-action project-action--github mag-target"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      event.stopPropagation();
                      track("project_click", { project: project.slug, target: "github-card" });
                    }}
                  >
                    SOURCE
                  </a>
                </div>
              </div>
              
              {project.editorialNote && (
                <div className="editorial-note">
                  {project.editorialNote}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {selected ? <ProjectDialog project={selected} onClose={() => setSelected(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
