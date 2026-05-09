export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sumitdubey.dev";

export const profile = {
  name: "Sumit Dubey",
  title: "Full Stack & AI Engineer",
  location: "India",
  email: "sumitdvivedi2504@gmail.com",
  github: "https://github.com/sumit-ai-labs",
  linkedin: "https://www.linkedin.com/in/sumit-dubey-68780a2a7/",
  twitter: "https://x.com/Sumit250412",
  skills: [
    "Full Stack Developer",
    "AI Engineer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "RAG Systems",
    "Node.js",
    "FastAPI",
    "React",
    "Next.js",
    "Python",
    "AI Engineering"
  ]
};

export const navItems = [
  { href: "#cover", label: "Cover" },
  { href: "#about", label: "Article" },
  { href: "#projects", label: "Stories" },
  { href: "#skills", label: "Classifieds" },
  { href: "#focus", label: "Focus" },
  { href: "#archive", label: "Archive" },
  { href: "#contact", label: "Subscribe" }
];

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: ["Full Stack Developer", "AI Engineer", "React Developer", "Next.js Developer", "Python Developer"],
    url: siteUrl,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, profile.linkedin, profile.twitter],
    knowsAbout: profile.skills
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portfolio Gazette",
    url: siteUrl,
    author: {
      "@type": "Person",
      name: profile.name
    },
    description:
      "Editorial portfolio for Sumit Dubey, a Full Stack Developer and AI Engineer working with React, Next.js, Node.js, Python, FastAPI, and RAG Systems."
  }
];
