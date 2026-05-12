import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const classifieds = [
  ["01", "Frontend Systems", "React and Next.js interfaces with clean component structure, responsive layouts, accessible interactions, and careful rendering performance."],
  ["02", "Backend Architecture", "Node.js and Python API layers, REST routes, database modeling, modular services, and deployment-ready project organization."],
  ["03", "AI Workflows", "Document intelligence, retrieval pipelines, prompt design, vector-search concepts, and LLM features built around usable product flows."]
];

const capabilities = [
  {
    domain: "Frontend",
    focus: "React / Next.js",
    skills: ["Component architecture", "SSR & SSG patterns", "Responsive layouts", "Performance tuning", "Accessibility"]
  },
  {
    domain: "Backend",
    focus: "Node.js / Python / APIs",
    skills: ["REST API design", "FastAPI microservices", "Database modeling", "Route architecture", "Deployment patterns"]
  },
  {
    domain: "AI Engineering",
    focus: "RAG / LLM Systems",
    skills: ["Retrieval pipelines", "Prompt engineering", "Vector search", "Document intelligence", "LLM integration"]
  },
  {
    domain: "Foundations",
    focus: "DSA / System Design",
    skills: ["Data structures", "Algorithm design", "System thinking", "Code quality", "Problem decomposition"]
  }
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

      {/* Capability Ledger — replaces misleading % bars */}
      <Reveal as="div" className="capability-ledger" aria-label="Engineering capabilities by domain">
        {capabilities.map(({ domain, focus, skills }) => (
          <div className="capability-entry" key={domain}>
            <div className="capability-domain">{domain}</div>
            <h4 className="capability-focus">{focus}</h4>
            <ul className="capability-skills">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
