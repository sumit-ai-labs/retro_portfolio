import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Minimal engineering index — no descriptions, just dense dot-separated capability lists
const ledger = [
  {
    number: "01",
    category: "Frontend",
    stack: "React · Next.js · TypeScript · Responsive UI · Accessibility · Performance"
  },
  {
    number: "02",
    category: "Backend",
    stack: "Node.js · Express · FastAPI · PostgreSQL · REST APIs · System Design"
  },
  {
    number: "03",
    category: "AI Systems",
    stack: "RAG · LLMs · LangChain · Vector Search · Prompt Engineering · Doc Intelligence"
  },
  {
    number: "04",
    category: "Foundations",
    stack: "DSA · Problem Solving · Architecture Thinking · Clean Code · Git"
  }
];

export function Skills() {
  return (
    <section className="classifieds sheet" id="skills">
      <SectionLabel left="Engineering Index" right="Page 05" />

      <div className="eng-ledger-layout">
        {/* Left: editorial headline */}
        <Reveal as="div" className="eng-ledger-intro">
          <h2>Available for full stack engineering roles where frontend quality meets backend discipline and applied AI.</h2>
        </Reveal>

        {/* Right: compact numbered capability rows */}
        <Reveal as="div" className="eng-ledger-rows" aria-label="Engineering capabilities">
          {ledger.map(({ number, category, stack }) => (
            <div className="eng-ledger-row" key={number}>
              <div className="eng-row-meta">
                <span className="eng-row-number" aria-hidden="true">{number}</span>
                <strong className="eng-row-category">{category}</strong>
              </div>
              <p className="eng-row-stack">{stack}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
