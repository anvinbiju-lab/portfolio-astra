"use client"
import { useState } from "react"
import { getAllProjects } from "@/lib/projects-data"
import { KineticHeading, ProjectLink, Reveal, SectionLabel } from "./Editorial"
import ProjectExperience from "./ProjectExperience"
import LockInSpotlight from "./LockInSpotlight"
import FloatingProjectIndex from "./FloatingProjectIndex"

const featured = ["nova", "clipzo", "scanmatrix", "wistream"]
const taglines: Record<string, string> = { nova: "YOUR BROWSER. NOW IT THINKS IN ACTIONS.", clipzo: "FROM HERE TO THERE. WITHOUT THE HASSLE.", scanmatrix: "KNOW WHAT’S HAPPENING BEHIND YOUR SCREEN.", wistream: "YOUR FILES. YOUR NETWORK. YOUR SCREEN." }
export default function Projects() {
    const projects = getAllProjects(), archive = projects.filter(p => !featured.includes(p.id))
    const [category, setCategory] = useState("all"), [hovered, setHovered] = useState("")
    const preview = archive.find(p => p.id === hovered)
    return <section id="projects" className="selected-work">
        <div className="editorial-section work-opening"><SectionLabel number="02" aside="FOUR PROJECTS / FOUR DIFFERENT CHALLENGES">SELECTED WORK</SectionLabel><div className="work-heading"><KineticHeading lines={[{ text: "LESS TALK." }, { text: "MORE BUILDING.", italic: true }]} /><p>Ideas are easy.<br />Making them real is<br />the interesting part.</p></div></div>
        <FloatingProjectIndex />
        {featured.map((id, index) => {
            const p = projects.find(project => project.id === id)!
            return <article key={id} id={`project-${id}`} className={`featured-project featured-${id}`}>
                <div className="project-topline"><span className="micro">0{index + 1} / 04</span><span className="micro">{p.subtitle}</span><span className="micro">INDEPENDENT PROJECT</span></div>
                <Reveal className="featured-title"><h3 className="display"><ProjectLink id={id}>{p.title}<span>↗</span></ProjectLink></h3><p>{taglines[id]}</p></Reveal>
                <ProjectExperience id={id} />
                <div className="project-bottomline"><div><p>{p.description}</p><div className="tech-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><ProjectLink id={id} className="case-link">Inside the project <span>↗</span></ProjectLink></div>
            </article>
        })}
        <LockInSpotlight />
        <div id="archive" className="editorial-section project-archive"><SectionLabel number="PLUS" aside={`${archive.length} MORE REASONS TO KEEP EXPLORING`}>THE REST OF THE WORKSHOP</SectionLabel><Reveal className="archive-heading"><KineticHeading lines={[{ text: "SMALL IDEAS." }, { text: "REAL POSSIBILITIES.", italic: true }]} /><p>Some experiments. Some everyday solutions.<br />All built for a reason.</p></Reveal><div className="archive-filters" role="group" aria-label="Filter project archive">{[["all", "All projects"], ["android", "Android"], ["web", "Web"], ["windows", "Windows"], ["chrome", "Browser"]].map(([value, label]) => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{label}</button>)}</div>
            <div className="archive-list" onPointerMove={event => { if (event.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return; const preview = event.currentTarget.parentElement?.querySelector<HTMLElement>(".archive-preview"); if (preview) { preview.style.left = `${Math.min(innerWidth - 245, event.clientX + 35)}px`; preview.style.top = `${Math.max(90, Math.min(innerHeight - 300, event.clientY - 135))}px` } }}>{archive.filter(p => category === "all" || p.platform === category).map((p, index) => <div className="archive-row" key={p.id} onPointerEnter={() => setHovered(p.id)} onFocus={() => setHovered(p.id)} onPointerLeave={() => setHovered("")}><span className="micro archive-number">{String(index + 1).padStart(2, "0")}</span><ProjectLink id={p.id} className="archive-name"><strong>{p.title}</strong><small>{p.subtitle}</small></ProjectLink><span className="micro archive-platform">{p.platform}</span>{p.apkUrl && <a className="archive-download" href={p.apkUrl} download aria-label={`Download ${p.title} APK`}>APK ↓</a>}<ProjectLink id={p.id} className="archive-open"><span className="sr-only">Explore {p.title}</span>↗</ProjectLink></div>)}</div>
            <div className="archive-preview" aria-hidden="true" data-visible={!!preview?.screenshots?.length}>{preview?.screenshots?.[0] && <img src={preview.screenshots[0].src} alt="" loading="lazy" width="280" height="390" />}<span>{preview?.title}</span></div>
            <div className="archive-tail"><span className="micro">THE EXPERIMENT NEVER REALLY ENDS.</span><a className="inline-link" href="https://github.com/anvinbiju-lab" target="_blank" rel="noopener noreferrer">More on GitHub ↗</a></div>
        </div>
    </section>
}
