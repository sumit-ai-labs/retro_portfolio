"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Reveal } from "@/components/ui/Reveal";

export function Cover() {
  const name = "Sumit Dubey";
  const words = name.split(" ");

  return (
    <section className="cover sheet" id="cover">
      <header className="masthead">
        <div className="edition-line">
          <span>Issue 01</span>
          <span>Portfolio Edition / India</span>
          <span>May 2026</span>
          <ThemeToggle />
        </div>
        <h1 aria-label={name}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Sumit Dubey
          </motion.div>
        </h1>
        <div className="tagline">
          <span>Full Stack + AI Engineering</span>
          <span>Available for Engineering Roles</span>
        </div>
      </header>

      <nav className="cover-nav" aria-label="Quick navigation">
        <a href="#about" className="mag-target">Read the Feature</a>
        <a href="#projects" className="mag-target">Featured Stories</a>
        <a href="#contact" className="mag-target">Send a Brief</a>
      </nav>

      <div className="cover-grid">
        <article className="lead-note">
          <Reveal as="p" className="kicker">Front Page</Reveal>
          <Reveal as="h2">Building production-minded web systems with AI capability.</Reveal>
          <Reveal as="p">
            Full Stack Developer and AI Engineer focused on scalable APIs, polished frontend architecture, AI workflows, and product experiences that recruiters can understand quickly.
          </Reveal>
        </article>
        <figure className="cover-plate" aria-label="Editorial plate">
          <div className="plate-img plate-one halftone" aria-label="Abstract editorial collage" data-parallax-media>
            <Image src="/images/baki.jpeg" alt="" fill priority sizes="(max-width: 1040px) 90vw, 46vw" />
          </div>
          <figcaption>SUMIT DUBEY</figcaption>
        </figure>
        <div className="stamp" aria-hidden="true">Reviewed<br />For Print</div>
        <div className="folio-mark" aria-hidden="true">1927-70</div>
      </div>
    </section>
  );
}
