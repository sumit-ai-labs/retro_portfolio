"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { track } from "@vercel/analytics";
import { BrandMark } from "@/components/ui/SideIndex";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile } from "@/data/profile";

const SVC = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function validate(name, email, message) {
  if (!name || name.trim().length < 2)
    return "NAME REQUIRED — MIN 2 CHARACTERS";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "VALID RETURN ADDRESS REQUIRED";
  if (!message || message.trim().length < 10)
    return "MESSAGE TOO SHORT";
  return null;
}

export function Contact() {
  const [status, setStatus]       = useState("idle");
  const [statusMsg, setStatusMsg] = useState("All fields are required.");
  const [cooldown, setCooldown]   = useState(false);
  const pending = status === "pending";

  async function handleSubmit(e) {
    e.preventDefault();
    if (pending || cooldown) return;

    const form = e.currentTarget;

    // Honeypot — silently drop bot submissions
    if (form.website?.value) return;

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    const err = validate(name, email, message);
    if (err) {
      setStatus("error");
      setStatusMsg(err);
      track("contact_interaction", { status: "validation_error", reason: err });
      return;
    }

    setStatus("pending");
    setStatusMsg("Transmitting...");

    try {
      await emailjs.send(SVC, TPL, {
        name,
        email,
        message,
        time: new Date().toLocaleString("en-IN"),
      }, KEY);

      setStatus("success");
      setStatusMsg("Your message has been filed at the editorial desk.");
      form.reset();
      track("contact_interaction", { status: "success" });

      // 15s cooldown — prevents repeat spam
      setCooldown(true);
      setTimeout(() => setCooldown(false), 15_000);
    } catch {
      setStatus("error");
      setStatusMsg("Transmission failed — please try again shortly.");
      track("contact_interaction", { status: "error", reason: "emailjs_failure" });
    }
  }

  const buttonLabel =
    pending            ? "Sending Transmission..." :
    status === "success" ? "Transmission Received ✓" :
    "Send Review Request";

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

        {/* Form — Reveal wraps for scroll animation, onSubmit drives EmailJS */}
        <Reveal as="form" className="subscription-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot field — visually hidden, traps automated bots */}
          <div className="form-honeypot" aria-hidden="true">
            <label htmlFor="hp-website">Leave this blank</label>
            <input
              type="text"
              id="hp-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <fieldset disabled={pending}>
            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input
                type="text"
                id="nameInput"
                name="name"
                placeholder="Your name"
                required
                minLength={2}
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Return Address</label>
              <input
                type="email"
                id="emailInput"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="msgInput">Message</label>
              <textarea
                id="msgInput"
                name="message"
                rows="4"
                placeholder="Role, project review, interview, or demo request"
                required
              />
            </div>

            <p className="form-status" id="contactStatus" aria-live="polite">
              {pending ? "Transmitting..." : statusMsg}
            </p>

            <button
              type="submit"
              className="mag-target"
              data-state={status}
              aria-describedby="contactStatus"
              disabled={pending || cooldown}
            >
              {buttonLabel}
            </button>
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
