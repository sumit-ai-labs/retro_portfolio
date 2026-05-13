import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Feature() {
  return (
    <section className="feature sheet" id="about">
      <SectionLabel left="Feature Article" right="Page 02" />
      <div className="feature-layout">
        <div className="feature-title">
          <Reveal as="p" className="kicker">Profile / Recruiter Brief</Reveal>
          <Reveal as="h2">Full stack developer building reliable AI-powered web products.</Reveal>
          <Reveal as="blockquote" className="pull-quote">
            <span className="pull-mark" aria-hidden="true">&quot;</span>
            I turn complex ideas into products people can understand and use.
            <span className="pull-mark" aria-hidden="true">&quot;</span>
          </Reveal>
        </div>
        <article className="article-copy">
          <Reveal as="p">
            I build practical web applications with polished interfaces, structured backend logic, and AI features that solve clear user problems. My work combines React and Next.js on the frontend with Node.js, Python, APIs, and database design on the backend.
          </Reveal>
          <Reveal as="p">
            My strongest work sits between product clarity and system thinking: PolicyAI simplifies insurance documents with AI-assisted analysis, while SoundWave shows full-stack UI structure, navigation, and playback-focused product flow. Recruiters can expect clean code, careful debugging, and a strong eye for user experience.
          </Reveal>
          <Reveal as="p">
            As a React Developer, Next.js Developer, Python Developer, Full Stack Developer, and AI Engineer, I am especially interested in RAG Systems, FastAPI services, and production interfaces that make technical depth easy to review.
          </Reveal>
        </article>
        <Reveal as="aside" className="margin-notes" aria-label="Profile highlights">
          <p>Location: India</p>
          <p>Education: B.Tech Computer Science</p>
          <p>Focus: Full Stack Development &amp; Generative AI</p>
          <div className="editor-note">
            <i>Open to engineering roles, internships, and project opportunities.</i>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
