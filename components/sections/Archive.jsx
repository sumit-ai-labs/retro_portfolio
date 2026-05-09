import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const timeline = [
  ["2026", "Merged AI/ML systems with full stack engineering.", "Focused on building real-world intelligent products by combining scalable web architecture, machine learning workflows, retrieval systems, and modern AI infrastructure.", "AI Systems"],
  ["2025", "The machine learning transition.", "Began exploring machine learning systems, data-driven workflows, and model development using Python-based ecosystems and modern AI tooling.", "Machine Learning"],
  ["2024", "Deepened full stack development and algorithmic foundations.", "Committed to data structures, algorithms, backend systems, databases, APIs, and modern frontend engineering to strengthen core software development capabilities.", "Engineering"],
  ["2023", "First exposure to computer science and programming.", "Started learning the fundamentals of computing through the C programming language, building the initial foundation for systems thinking and software engineering.", "Origins"]
];

export function Archive() {
  return (
    <section className="archive sheet" id="archive">
      <SectionLabel left="Archive Ledger" right="Page 06" />
      <Reveal as="h2" className="archive-heading">Selected chronology of engineering development, systems thinking, and technical progression.</Reveal>
      <div className="timeline" role="list">
        {timeline.map(([year, title, copy, tag]) => (
          <Reveal as="article" className="timeline-item" role="listitem" key={year}>
            <time dateTime={year}>{year}</time>
            <div className="timeline-body">
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
            <div className="timeline-tags"><span className="tag">{tag}</span></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
