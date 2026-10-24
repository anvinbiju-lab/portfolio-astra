"use client"
import { useEffect, useRef, useState } from "react"
import { KineticHeading, ProjectLink, Reveal, SectionLabel } from "./Editorial"

const domains = [
    { name: "Security", title: "LOOK BENEATH\nTHE SURFACE.", copy: "Permissions, boundaries, and the structures that protect our digital lives. Understand the system before you try to improve it.", projects: ["scanmatrix"], labels: ["ScanMatrix"] },
    { name: "Intelligence", title: "TURN INTENT\nINTO ACTION.", copy: "Explore how software can interpret an instruction, plan the steps, and make repetitive interactions a little more intelligent.", projects: ["nova"], labels: ["Nova Agent"] },
    { name: "Connection", title: "CLOSER, BY\nDESIGN.", copy: "Different devices. A shared network. Tools that make moving information and accessing media feel a little more natural.", projects: ["clipzo", "wistream"], labels: ["Clipzo", "WiStream"] },
    { name: "Creation", title: "FROM WHAT IF\nTO WHAT WORKS.", copy: "An idea is a starting point. Prototyping, building, testing, and refining are how it becomes something useful.", projects: ["clickforge", "lockin"], labels: ["ClickForge", "Lock In"] },
]
export default function SystemLab() {
    const [selected, setSelected] = useState<number | null>(null), scene = useRef<HTMLDivElement>(null), section = useRef<HTMLElement>(null), tabs = useRef<(HTMLButtonElement | null)[]>([])
    useEffect(() => {
        const observer = new IntersectionObserver(entries => { if (scene.current) scene.current.dataset.awake = String(entries[0].isIntersecting) }, { rootMargin: "100px" })
        if (section.current) observer.observe(section.current)
        const sleep = () => { if (scene.current) scene.current.dataset.asleep = String(document.hidden) }
        document.addEventListener("visibilitychange", sleep)
        return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sleep) }
    }, [])
    const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
        if (matchMedia("(prefers-reduced-motion:reduce)").matches) return
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width - .5) * 12}deg`)
        event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height - .5) * -9}deg`)
    }
    const resetTilt = (event: React.PointerEvent<HTMLDivElement>) => { event.currentTarget.style.setProperty("--pointer-x", "0deg"); event.currentTarget.style.setProperty("--pointer-y", "0deg") }
    const domain = selected === null ? null : domains[selected]
    return <section ref={section} id="system" className="editorial-section system-lab"><SectionLabel number="04" aside="A SMALL EXPLORATION OF HOW I THINK">INSIDE THE SYSTEM</SectionLabel><Reveal className="system-heading"><KineticHeading lines={[{ text: "EVERYTHING" }, { text: "IS CONNECTED.", italic: true }]} /><p>Four ways of seeing.<br />One builder’s mindset.<br />Choose a connection below.</p></Reveal><div className="system-content"><div className="lab-visual" ref={scene} data-selected={selected === null ? "core" : selected} onPointerDown={tilt} onPointerMove={tilt} onPointerUp={event => { if (event.pointerType === "touch") resetTilt(event) }} onPointerCancel={resetTilt} onPointerLeave={event => { event.currentTarget.style.setProperty("--pointer-x", "0deg"); event.currentTarget.style.setProperty("--pointer-y", "0deg") }}>
            <span className="lab-coordinate micro">FIG. 04 / A SYSTEM OF CURIOSITIES</span><div className="lab-perspective" aria-hidden="true"><div className="lab-assembly">{[0, 1, 2].map(layer => <div className={`lab-layer lab-layer-${layer}`} key={layer}><span className="lab-beam beam-top" /><span className="lab-beam beam-right" /><span className="lab-beam beam-bottom" /><span className="lab-beam beam-left" /><span className="lab-plate"><i /><i /><i /><b>AB / {layer + 1}</b></span></div>)}<div className="lab-heart">✳</div>{domains.map((d, i) => <span className={`lab-node lab-node-${i}`} key={d.name}><i /><b>0{i + 1}</b></span>)}</div></div><div className="lab-axis" aria-hidden="true"><i /><i /></div><span className="lab-bottom micro">PRECISION / STRUCTURE / POSSIBILITY</span>
        </div><div className="lab-reading"><div className="lab-tabs" role="tablist" aria-label="Explore a technical domain">{domains.map((d, i) => <button key={d.name} ref={el => { tabs.current[i] = el }} type="button" id={`domain-tab-${i}`} role="tab" aria-controls="lab-panel" aria-selected={selected === i} tabIndex={selected === i || selected === null && i === 0 ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={event => { let next = i; if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (i + 1) % 4; else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (i + 3) % 4; else if (event.key === "Home") next = 0; else if (event.key === "End") next = 3; else return; event.preventDefault(); setSelected(next); tabs.current[next]?.focus() }}><span>0{i + 1}</span>{d.name}</button>)}</div><div id="lab-panel" role="tabpanel" aria-labelledby={domain ? `domain-tab-${selected}` : undefined} aria-label={domain ? undefined : "System overview"} tabIndex={0} className="lab-panel"><span className="micro">{domain ? `DOMAIN / ${domain.name}` : "THE COMMON THREAD"}</span><h3 className="display">{domain ? domain.title.split("\n").map(line => <span key={line}>{line}<br /></span>) : <>A SYSTEM<br />BUILT ON<br /><em>CURIOSITY.</em></>}</h3><p>{domain?.copy || "Security, intelligence, connection, and creation. Not separate interests, but different parts of the same landscape. Select a domain to see where it leads."}</p><div className="lab-projects">{domain ? domain.projects.map((id, i) => <ProjectLink key={id} id={id} className="inline-link">Explore {domain.labels[i]} ↗</ProjectLink>) : <a href="#projects" className="inline-link">Explore the work ↗</a>}</div></div><button className="reset-core" type="button" disabled={selected === null} onClick={() => { setSelected(null); tabs.current[0]?.focus() }}>↶ Return to Core</button></div></div></section>
}
