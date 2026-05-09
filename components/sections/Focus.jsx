import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const focusItems = [
  "Exploring retrieval pipelines and agentic workflows for production AI document systems.",
  "Designing modular REST APIs with clean service boundaries, reusable handlers, and database-aware flow.",
  "Improving frontend interaction quality through responsive layouts, reduced layout shift, and smoother state transitions."
];

export function Focus() {
  return (
    <section className="focus sheet" id="focus">
      <SectionLabel left="Recent Engineering Focus" right="Special Bulletin" />
      <div className="focus-layout">
        <div className="focus-intro">
          <Reveal as="p" className="kicker">Currently Building</Reveal>
          <Reveal as="h2">Active work across AI systems, backend architecture, and performance-minded frontend craft.</Reveal>
        </div>
        <div className="focus-log" role="list" aria-label="Current engineering focus areas">
          {focusItems.map((item, index) => (
            <Reveal as="article" className="focus-item" role="listitem" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
