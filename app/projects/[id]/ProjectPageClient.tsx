"use client"
import { useState } from "react"
import { notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { getAllProjects, getProjectById } from "@/lib/projects-data"
import { Reveal } from "@/components/Editorial"
import ProjectExperience from "@/components/ProjectExperience"
import { transitionRoute } from "@/lib/route-transition"

const featured = ["nova", "clipzo", "scanmatrix", "wistream"]
const platformNames = { android: "Android", web: "Web Application", windows: "Windows Utility", chrome: "Browser Extension" }
const statusNames = { active: "In Development", live: "Live", complete: "Complete" }

function ScreenshotGallery({ screenshots }: { screenshots: { src: string; caption: string }[] }) {
    const [active, setActive] = useState(0)
    return <div className="screenshot-viewer"><div className="screenshot-display"><img src={screenshots[active].src} alt={screenshots[active].caption} width="800" height="1000" />{screenshots.length > 1 && <><button className="gallery-prev" type="button" aria-label="Previous screenshot" onClick={() => setActive((active - 1 + screenshots.length) % screenshots.length)}>‹</button><button className="gallery-next" type="button" aria-label="Next screenshot" onClick={() => setActive((active + 1) % screenshots.length)}>›</button></>}</div><p className="screenshot-caption" aria-live="polite">{screenshots[active].caption}</p><div className="screenshot-thumbs" aria-label="Choose a screenshot">{screenshots.map((s, index) => <button key={s.src} aria-label={s.caption} aria-pressed={active === index} type="button" onClick={() => setActive(index)}><img src={s.src} alt="" loading="lazy" width="58" height="75" /></button>)}</div></div>
}

export default function ProjectPageClient({ id }: { id: string }) {
    const router = useRouter(), [copyStatus, setCopyStatus] = useState("")
    const project = getProjectById(id)
    if (!project) notFound()
    const related = getAllProjects().filter(p => p.id !== id && (p.platform === project.platform || featured.includes(p.id))).slice(0, 3)
    const back = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        const stored = sessionStorage.getItem("portfolio-return")
        if (stored) {
            try {
                const position = JSON.parse(stored)
                if (Date.now() - position.at < 60 * 60 * 1000) {
                    event.preventDefault()
                    sessionStorage.setItem("portfolio-return", JSON.stringify({ ...position, restore: true }))
                    transitionRoute(() => router.push("/#projects", { scroll: false }), document.querySelector(".case-main>.product-experience,.screenshot-viewer"))
                }
            } catch { /* The normal portfolio link remains available. */ }
        }
    }
    return <div className="case-page"><a href="#case-content" className="skip-link">Skip to project details</a><header className="case-header"><Link href="/#projects" onClick={back}><span>←</span> Back to portfolio</Link><div>{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">LIVE SITE ↗</a>}{project.github && !project.sourceUnavailable && <a href={project.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>}</div></header>
        <main id="case-content" className="case-main"><div className="case-overline"><span>{platformNames[project.platform]}</span><span className="case-state">{statusNames[project.status]}</span><span>{project.date}</span></div><Reveal><h1 className="display">{project.title}</h1><p className="case-subtitle">{project.subtitle}</p></Reveal>
            {featured.includes(id) && <ProjectExperience key={id} id={id} />}
            <div className="case-layout"><div className="case-prose">
                {project.screenshots?.length && <section><h2>The interface</h2><ScreenshotGallery key={id} screenshots={project.screenshots} /></section>}
                <section><h2>01 / The idea</h2><p>{project.longDescription || project.description}</p></section>
                <section><h2>02 / What it does</h2><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>
                {project.installSteps?.length && <section><h2>03 / Getting started</h2>{project.platform === "android" && project.apkUrl && <p className="case-notice">This APK is distributed directly and is not listed on the Play Store. Android may ask you to allow installation from your browser or Files app.</p>}<ol className="install-steps">{project.installSteps.map(step => <li key={step.step}><strong>{step.step}</strong>{step.detail && <p>{step.detail}</p>}</li>)}</ol></section>}
                {project.platform === "web" && project.link && <section><h2>Try it in your browser</h2><p>No installation needed. Open the published application to explore the actual product.</p><a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-link">Open {project.title} ↗</a></section>}
            </div><aside className="case-sidebar"><div className="case-sidebar-inner">
                {project.apkUrl && <><a className="pill" href={project.apkUrl} download>Download APK <span>↓</span></a><p className="case-notice">Version {project.apkVersion} · {project.apkSize}<br />Requires {project.minSdk}</p></>}
                {project.link && !project.apkUrl && <a className="pill" href={project.link} target="_blank" rel="noopener noreferrer">Explore the live site <span>↗</span></a>}
                <div className="case-side-block"><span className="micro">{id === "nova" ? "PROJECT DISCIPLINES" : "BUILT WITH"}</span><div className="tech-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                <div className="case-side-block"><span className="micro">EXPLORE FURTHER</span>{project.github && !project.sourceUnavailable ? <a className="inline-link" href={project.github} target="_blank" rel="noopener noreferrer">Explore source on GitHub ↗</a> : <p>A public source repository is not currently available for this project.</p>}</div>
                {project.minSdk && !project.apkUrl && <div className="case-side-block"><span className="micro">REQUIREMENTS</span><p>{project.minSdk}</p></div>}
                <div className="case-side-block"><span className="micro">TAKE IT WITH YOU</span><button type="button" className="inline-link" onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); setCopyStatus("Project link copied.") } catch { setCopyStatus("Copy the project address from your browser’s address bar.") } }}>Copy project link ↗</button><p className="copy-status" role="status">{copyStatus}</p></div>
            </div></aside></div>
            <section className="case-related"><span className="micro">KEEP EXPLORING / MORE FROM THE WORKSHOP</span><div className="case-related-links">{related.map(p => <Link key={p.id} href={`/projects/${p.id}`}>{p.title}<span>↗</span></Link>)}</div></section>
        </main></div>
}
