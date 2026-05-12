import { Analytics } from "@vercel/analytics/next";
import { Playfair_Display, Space_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { FixedAtmosphere } from "@/components/ui/FixedAtmosphere";
import { Loader } from "@/components/ui/Loader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollDepthTracker } from "@/components/ui/ScrollDepthTracker";
import { ImageParallax } from "@/components/ui/ImageParallax";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { profile, siteUrl, structuredData } from "@/data/profile";
import { projectStructuredData } from "@/data/projects";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap"
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sumit Dubey | Full Stack & AI Engineer | React, Next.js, Python",
    template: "%s | Portfolio Gazette"
  },
  description:
    "Sumit Dubey is a Full Stack Developer and AI Engineer building with React, Next.js, Node.js, Python, AI Engineering workflows, RAG Systems, and FastAPI.",
  keywords: [
    "Sumit Dubey",
    "Full Stack Developer",
    "AI Engineer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "AI Engineering",
    "RAG Systems",
    "FastAPI"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Sumit Dubey | Full Stack & AI Engineer | React, Next.js, Python",
    description:
      "Editorial portfolio for a Full Stack Developer and AI Engineer working with React, Next.js, Node.js, Python, FastAPI, and RAG Systems.",
    url: siteUrl,
    siteName: "Portfolio Gazette",
    images: [{ url: "/images/policy-ai.png", width: 1200, height: 630, alt: "Portfolio Gazette project preview" }],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumit Dubey | Full Stack & AI Engineer | React, Next.js, Python",
    description:
      "React, Next.js, Node.js, Python, AI Engineering, RAG Systems, and FastAPI work presented as an editorial portfolio.",
    creator: "@Sumit250412",
    images: ["/images/policy-ai.png"]
  },
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  const jsonLd = [...structuredData, ...projectStructuredData];
  const themeScript = `
    try {
      var stored = window.localStorage.getItem("portfolio-edition");
      var theme = stored === "morning" ? "morning" : "evening";
      document.documentElement.dataset.theme = theme;
    } catch (_) {}
  `;

  return (
    <html lang="en" data-theme="evening" className={`${playfair.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#publication" className="skip-link">Skip to portfolio</a>
        <ThemeProvider>
          <SmoothScrollProvider>
            <Loader />
            <ScrollProgress />
            <FixedAtmosphere />
            <Cursor />
            <ImageParallax />
            <ScrollDepthTracker />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
