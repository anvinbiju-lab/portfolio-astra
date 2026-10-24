"use client"
import { useState } from "react"
import { KineticHeading, ProjectLink, SectionLabel } from "./Editorial"

const capabilities = [
    { title: "Cybersecurity", tools: ["Kali Linux", "Wireless Pentesting", "Network Analysis", "Ethical Hacking"], description: "Understanding what a system exposes, what it permits, and where it can be improved.", projects: [["scanmatrix", "ScanMatrix"], ["cyberscan", "CyberScan"], ["keyguard", "KeyGuard"]] },
    { title: "AI & Automation", tools: ["AI Agents", "Accessibility Service", "Speech-to-Text APIs", "Python"], description: "Turning repetitive interactions into clear, purposeful workflows.", projects: [["nova", "Nova Agent"], ["jarvis-lite", "Jarvis Lite"]] },
    { title: "Web Development", tools: ["Next.js", "JavaScript", "HTML", "Tailwind CSS", "WebSocket"], description: "Useful software that meets people where they already are: the browser.", projects: [["clipzo", "Clipzo"], ["cyberscan", "CyberScan"]] },
    { title: "Android Development", tools: ["Kotlin", "Jetpack Compose", "Android Studio", "Room DB", "WorkManager"], description: "Thoughtful mobile tools, from device visibility to a little more focus.", projects: [["scanmatrix", "ScanMatrix"], ["lockin", "Lock In"]] },
    { title: "Networking & Systems", tools: ["FTP", "Foreground Services", "VLC Streaming", "Network Analysis"], description: "Connecting the devices we have and making better use of the networks between them.", projects: [["wistream", "WiStream"], ["clipzo", "Clipzo"]] },
    { title: "Developer Tools", tools: ["Git & GitHub", "CustomTkinter", "PyInstaller", "pynput", "pystray", "Chrome MV3", "Java", "C++", "C", "Antigravity IDE"], description: "Small utilities, precise shortcuts, and the everyday craft of building software.", projects: [["clickforge", "ClickForge"], ["instagram", "IG Non-Followers"]] },
]
export default function Skills() {
    const [active, setActive] = useState<number | null>(0)
    return <section id="skills" className="editorial-section capabilities"><SectionLabel number="03" aside="THE TOOLS CHANGE. THE CURIOSITY DOESN’T.">WAYS OF WORKING</SectionLabel><KineticHeading className="capability-title" lines={[{ text: "DIFFERENT DISCIPLINES." }, { text: "ONE BUILDER.", italic: true }]} /><div className="capability-list">{capabilities.map((c, i) => <article key={c.title} className={active === i ? "capability active" : "capability"}><h3><button type="button" aria-expanded={active === i} aria-controls={`capability-${i}`} onClick={() => setActive(active === i ? null : i)}><span className="micro">0{i + 1}</span><strong>{c.title}</strong><span aria-hidden="true">{active === i ? "−" : "+"}</span></button></h3><div id={`capability-${i}`} className="capability-body" hidden={active !== i}><p>{c.description}</p><div><div className="tech-tags">{c.tools.map(tool => <span key={tool}>{tool}</span>)}</div><div className="capability-projects">{c.projects.map(([id, title]) => <ProjectLink key={id} id={id} className="inline-link">{title} ↗</ProjectLink>)}</div></div></div></article>)}</div></section>
}
