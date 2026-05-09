export function Ticker() {
  const items = [
    "Full stack + AI engineer building production-minded systems",
    "Filed under: React / Next.js / Node.js / Python / RAG Systems",
    "Clean interfaces, modular APIs, and deployment-ready architecture",
    "Every project receives logic, structure, and measurable engineering intent"
  ];

  return (
    <div className="ticker" aria-label="Running editorial headline">
      <div className="ticker-track" aria-hidden="true">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
