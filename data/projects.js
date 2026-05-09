export const projects = [
  {
    slug: "policy-ai",
    title: "PolicyAI",
    label: "AI SYSTEM",
    scanStrip: "FULL STACK · NLP/RAG · SOLO BUILD",
    year: "2026",
    image: "/images/policy-ai.png",
    imageAlt: "PolicyAI product screenshot",
    github: "https://github.com/sumit-ai-labs/policy-lens",
    stack: ["Next.js", "FastAPI", "Python", "RAG", "MongoDB"],
    role: "Lead Engineer",
    tools: "Next.js, Python, FastAPI, spaCy, RAG-ready retrieval",
    outcome: "Document intelligence workflow",
    hook: "AI-powered insurance intelligence for instant policy understanding.",
    summary:
      "An AI policy intelligence tool that converts dense insurance documents into summaries, exclusions, risk signals, and clear next-step guidance.",
    proof: [
      ["PROBLEM", "Dense insurance language blocks user understanding."],
      ["ARCHITECTURE", "FastAPI retrieval-ready NLP pipeline."],
      ["OUTCOME", "Actionable policy summaries in seconds."]
    ],
    engineeringWins: "semantic chunking · modular APIs · retrieval-ready",
    editorialNote: "Filed in red pencil: clarity over jargon.",
    body: [
      "Problem solved: insurance documents are difficult to scan, compare, and trust. PolicyAI structures the reading flow around summaries, exclusions, risk signals, and clear next-step guidance.",
      "Architecture: the project is organized around a modular document pipeline, API-first processing, NLP extraction, and a retrieval-ready flow that can support vector search and RAG-style document intelligence.",
      "Engineering quality: the interface keeps outputs concise, the backend logic is separated from presentation concerns, and the system is structured so new document analyzers or model providers can be added without rewriting the product surface."
    ],
    architecture: [
      "Document ingestion and parsing boundary",
      "FastAPI analysis service",
      "RAG-ready retrieval layer",
      "Next.js review interface"
    ]
  },
  {
    slug: "spotify-clone",
    title: "Spotify Clone",
    label: "FULL STACK APP",
    scanStrip: "FULL STACK · REACT ECOSYSTEM · SOLO BUILD",
    year: "2025",
    image: "/images/clone.png",
    imageAlt: "Spotify Clone product screenshot",
    github: "https://github.com/sumit-ai-labs/Spotify_Clone",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    role: "Full Stack Engineer",
    tools: "React, Node.js, Express, MongoDB, REST patterns",
    outcome: "Production-style music app UX",
    hook: "Production-grade streaming interface engineered for predictable media workflows.",
    summary:
      "A music streaming interface with production-style navigation, playback UI, reusable layout patterns, and backend-ready application structure.",
    proof: [
      ["PROBLEM", "Disjointed navigation breaks media playback."],
      ["ARCHITECTURE", "React interface connected to Node.js and MongoDB."],
      ["OUTCOME", "Robust architecture ready for streaming integration."]
    ],
    engineeringWins: "clean state management · scalable routes · reusable UI",
    editorialNote: "Filed in blue ink: strict state separation.",
    body: [
      "Problem solved: music interfaces become frustrating when browsing, playback, and navigation feel disconnected. This project keeps the product model familiar while showing clean frontend composition and backend-ready structure.",
      "Architecture: the app uses React for reusable UI surfaces, Node.js and Express patterns for route organization, and MongoDB-oriented data modeling for future persistence and user state.",
      "Engineering quality: the layout is responsive, the interaction model is predictable, and the codebase is structured for future authentication, playlist persistence, and streaming API integration."
    ],
    architecture: [
      "React browsing surface",
      "Reusable playback layout",
      "Node.js route organization",
      "MongoDB-ready content model"
    ]
  }
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export const projectStructuredData = projects.map((project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: project.title,
  description: project.summary,
  image: project.image,
  codeRepository: project.github,
  keywords: project.stack.join(", "),
  creator: {
    "@type": "Person",
    name: "Sumit Dubey"
  }
}));
