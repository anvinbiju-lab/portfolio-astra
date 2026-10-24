"use client"
import { KineticHeading, Reveal, SectionLabel } from "./Editorial"

export default function About() {
    return <section id="about" className="editorial-section introduction">
        <SectionLabel number="01" aside="ERNAKULAM, KERALA · INDIA">THE PERSON BEHIND THE CODE</SectionLabel>
        <div><p className="intro-kicker">A question is a good place to start.</p><KineticHeading characters className="intro-title" lines={[{ text: "CURIOSITY" }, { text: "STARTED IT." }, { text: "CREATION KEEPS", muted: true }, { text: "IT GOING.", italic: true }]} /></div>
        <div className="intro-reading"><span className="editorial-asterisk" aria-hidden="true">✳</span><Reveal><p className="lead">I’m Anvin Biju — a cybersecurity-focused developer exploring intelligent automation, secure systems, and practical software.</p><p>I enjoy understanding how systems work, exploring their limitations, and building tools that solve everyday problems. Every project begins with a question.</p><blockquote>“What if this could work better?”</blockquote></Reveal></div>
        <div className="thinking-steps">{[
            ["01", "QUESTION", "Look closer. Understand the system, not just the surface."],
            ["02", "EXPERIMENT", "Follow an idea. Build a prototype. Learn from what breaks."],
            ["03", "ENGINEER", "Turn the useful experiments into something people can use."],
        ].map(([n, title, text]) => <Reveal key={n}><article><span className="micro">{n} / THE PROCESS</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
        <div className="about-foot"><span>CYBERSECURITY STUDENT. DEVELOPER. ALWAYS CURIOUS.</span><a href="#education" className="inline-link">The story so far <span>↘</span></a></div>
    </section>
}
