"use client";

import { useActionState, useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { sendContactMessage } from "@/app/actions";
import { BrandMark } from "@/components/ui/SideIndex";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile } from "@/data/profile";

const initialState = { status: "idle", message: "Send Review Request" };

function SubmitButton({ state }) {
  const label = state.status === "pending" || state.status === "success" || state.status === "error" ? state.message : "Send Review Request";
  return (
    <button type="submit" className="mag-target" data-state={state.status} aria-describedby="contactStatus">
      {label}
    </button>
  );
}

export function Contact() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      track("contact_interaction", { status: "success" });
    }
    if (state.status === "error") {
      track("contact_interaction", { status: "error", reason: state.message });
    }
  }, [state]);

  return (
    <section className="subscription sheet" id="contact">
      <SectionLabel left="Subscription Desk" right="Final Page" />
      <div className="contact-spread">
        <div className="contact-copy">
          <Reveal as="p" className="kicker">Let&apos;s Talk</Reveal>
          <Reveal as="h2">Review the work.<br />Start the engineering conversation.</Reveal>
          <Reveal as="p">For full stack roles, AI product work, technical interviews, and project reviews. The portfolio is built to show system thinking, clean execution, and readiness to contribute.</Reveal>
          <Reveal className="contact-channels">
            <a href={`mailto:${profile.email}`} className="channel-link mag-target" onClick={() => track("contact_interaction", { target: "email" })}>Email Desk</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="channel-link mag-target" onClick={() => track("contact_interaction", { target: "linkedin" })}>LinkedIn Archive</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="channel-link mag-target" onClick={() => track("contact_interaction", { target: "github" })}>GitHub Repository</a>
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="channel-link mag-target" onClick={() => track("contact_interaction", { target: "twitter" })}>Twitter</a>
          </Reveal>
        </div>
        <Reveal as="form" className="subscription-form" action={formAction} ref={formRef}>
          <fieldset disabled={pending}>
            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input type="text" id="nameInput" name="name" placeholder="Your name" required autoComplete="name" />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Return Address</label>
              <input type="email" id="emailInput" name="email" placeholder="you@example.com" required autoComplete="email" />
            </div>
            <div className="form-group">
              <label htmlFor="msgInput">Message</label>
              <textarea id="msgInput" name="message" rows="4" placeholder="Role, project review, interview, or demo request" required />
            </div>
            <p className="form-status" id="contactStatus" aria-live="polite">
              {pending ? "Transmitting..." : state.status === "idle" ? "All fields are required." : state.message}
            </p>
            <SubmitButton state={pending ? { status: "pending", message: "Transmitting..." } : state} />
          </fieldset>
        </Reveal>
      </div>
      <footer className="colophon">
        <BrandMark small />
        <span>(c) 2026 Designed &amp; Engineered by Sumit Dubey</span>
        <span>Edition 01 / Printed on the open web</span>
      </footer>
    </section>
  );
}
