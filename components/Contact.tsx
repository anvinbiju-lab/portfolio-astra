"use client"
import { useState, type FormEvent } from "react"
import { KineticHeading, Reveal, SectionLabel } from "./Editorial"
export default function Contact() {
    const [status, setStatus] = useState("")
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const subject = `A new connection from ${data.get("name")}`
        const body = `${data.get("message")}\n\nFrom: ${data.get("name")}\nReply to: ${data.get("email")}`
        window.location.href = `mailto:anvinbiju1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        setStatus("Your email app can open this draft. Send it there to complete your message. You can also email anvinbiju1@gmail.com directly.")
    }
    return <section id="contact" className="editorial-section contact-finale"><SectionLabel number="07" aside="OPEN TO A CONVERSATION">THE NEXT CONNECTION</SectionLabel><Reveal><p className="contact-prelude">Good things often start with a conversation.</p><KineticHeading characters lines={[{ text: "GOT AN" }, { text: "INTERESTING" }, { text: "IDEA?", italic: true }]} /></Reveal><div className="contact-grid"><div><span className="contact-star" aria-hidden="true">✳</span><h3>I’d love to hear it.</h3><p>Whether it’s an interesting project, a technical conversation, or a shared curiosity about technology, feel free to reach out.</p><a className="contact-email" href="mailto:anvinbiju1@gmail.com">anvinbiju1@gmail.com <span>↗</span></a><div className="contact-methods"><a href="https://github.com/anvinbiju-lab" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/anvin-biju" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href="tel:+919605057773">+91 9605057773 ↗</a></div><span className="micro">ERNAKULAM, KERALA, INDIA / OPEN TO OPPORTUNITIES</span></div><form onSubmit={handleSubmit}><span className="micro">OR START A NOTE HERE</span><label htmlFor="contact-name">Your name<input name="name" id="contact-name" autoComplete="name" required placeholder="What should I call you?" /></label><label htmlFor="contact-email">Email address<input name="email" id="contact-email" type="email" autoComplete="email" required placeholder="Where can I reply?" /></label><label htmlFor="contact-message">What’s on your mind?<textarea name="message" id="contact-message" required rows={3} placeholder="An idea, a question, a possibility…" /></label><button type="submit" className="pill">Create an email <span>↗</span></button><p className="form-note">Opens a draft in your email app.</p><p role="status" className="contact-status">{status}</p></form></div></section>
}
