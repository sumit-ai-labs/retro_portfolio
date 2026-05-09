import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const classifieds = [
  ["01", "Frontend Systems", "React and Next.js interfaces with clean component structure, responsive layouts, accessible interactions, and careful rendering performance."],
  ["02", "Backend Architecture", "Node.js and Python API layers, REST routes, database modeling, modular services, and deployment-ready project organization."],
  ["03", "AI Workflows", "Document intelligence, retrieval pipelines, prompt design, vector-search concepts, and LLM features built around usable product flows."]
];

const skills = [
  ["React / Next.js", 95],
  ["Python / AI Systems", 90],
  ["Node.js / APIs", 85],
  ["DSA / System Logic", 92]
];

export function Skills() {
  return (
    <section className="classifieds sheet" id="skills">
      <SectionLabel left="Classified Advertisements" right="Page 05" />
      <div className="classifieds-layout">
        <div className="classifieds-intro">
          <Reveal as="h2">Available for full stack roles where frontend quality meets backend discipline.</Reveal>
        </div>
        <div className="classified-grid">
          {classifieds.map(([number, title, copy]) => (
            <Reveal as="article" className="classified" key={number}>
              <div className="classified-number" aria-hidden="true">{number}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal className="skill-bars" aria-label="Skill proficiency bars">
        {skills.map(([name, value]) => (
          <div className="skill-bar-item" key={name}>
            <span className="skill-name">{name}</span>
            <div className="skill-track" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100" aria-label={`${name} ${value}%`}>
              <div className="skill-fill" style={{ width: `${value}%` }} />
            </div>
            <span className="skill-pct" aria-hidden="true">{value}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
