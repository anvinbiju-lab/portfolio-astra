"use client"
import { useEffect, useRef, useState, type PointerEvent } from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { getProjectById } from "@/lib/projects-data"
import { ProjectLink } from "./Editorial"

const ids = ["lockin", "scanmatrix", "clickforge", "nova", "clipzo", "wistream"]
const accents: Record<string, string> = { lockin: "#c4a6f0", scanmatrix: "#9ac8d7", clickforge: "#d5c19c", nova: "#b7abf2", clipzo: "#a6d6c7", wistream: "#e0b8a0" }
const concepts: Record<string, { symbol: string; title: string; line: string; code: string[] }> = {
    nova: { symbol: "✳", title: "Intent into action.", line: "A clearer path through your browser.", code: ['const intent = "Explore the next idea";', 'const plan = ["understand", "navigate"];', 'await possibility.next();'] },
    clipzo: { symbol: "↗", title: "Good things travel.", line: "One thought. Two devices.", code: ['const thought = "Something worth sharing";', 'const connection = "phone → desktop";', 'await snippet.send(thought);'] },
    wistream: { symbol: "◉", title: "A bigger picture.", line: "Your files. Your network. Your screen.", code: ['const network = "local";', 'const destination = "a bigger screen";', 'await distance.makeSmaller();'] },
}

export default function FloatingProjectIndex() {
    const [selected, setSelected] = useState("lockin"), [view, setView] = useState(0)
    const ref = useRef<HTMLDivElement>(null), gesture = useRef<{ x: number; y: number } | null>(null), swipedAt = useRef(0)
    const [touching, setTouching] = useState(false)
    const hoverTimer = useRef<ReturnType<typeof setTimeout>>()
    const cancelHover = () => clearTimeout(hoverTimer.current)
    useEffect(() => () => clearTimeout(hoverTimer.current), [])
    const reduced = useReducedMotion(), px = useMotionValue(0), py = useMotionValue(0)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const travel = useSpring(scrollYProgress, { stiffness: 100, damping: 26 })
    const x = useSpring(px, { stiffness: 105, damping: 24 }), y = useSpring(py, { stiffness: 105, damping: 24 })
    const rotateX = useTransform([y, travel], ([pointer, scroll]) => -Number(pointer) * 5 + (Number(scroll) - .5) * 9), rotateY = useTransform(x, [-1, 1], [-7, 7])
    const driftX = useTransform(x, [-1, 1], [-22, 22]), driftY = useTransform([y, travel], ([pointer, scroll]) => Number(pointer) * 15 + (Number(scroll) - .5) * -42)
    const project = getProjectById(selected)!, originals = project.screenshots || [], screens = selected === "scanmatrix" ? [originals[1], originals[2], originals[0]] : originals, concept = concepts[selected]
    const choose = (id: string) => { cancelHover(); if (id !== selected) { setSelected(id); setView(0) } }
    const move = (event: PointerEvent<HTMLDivElement>) => {
        if (reduced) return
        const r = event.currentTarget.getBoundingClientRect()
        px.set(Math.max(-1, Math.min(1, (event.clientX - r.left) / r.width * 2 - 1))); py.set(Math.max(-1, Math.min(1, (event.clientY - r.top) / r.height * 2 - 1)))
    }
    const settle = () => { px.set(0); py.set(0); setTouching(false) }
    return <div ref={ref} className="floating-index editorial-section" data-touch-active={touching} style={{ "--index-accent": accents[selected] } as React.CSSProperties} onPointerMove={move} onPointerDown={event => { if (event.pointerType === "touch") { setTouching(true); move(event) } }} onPointerUp={settle} onPointerCancel={settle} onPointerLeave={settle}>
        <div className="visual-index-bar micro"><span><i />WORK, IN MOTION</span><span>06 / VISUAL INDEX</span></div>
        <div className="visual-index-layout">
            <div className="visual-index-list" role="group" aria-label="Choose a project preview">{ids.map((id, i) => {
                const p = getProjectById(id)!
                return <button type="button" key={id} id={`visual-project-${id}`} className="visual-index-row" aria-pressed={selected === id} aria-controls="floating-project-preview" onPointerEnter={event => { if (event.pointerType !== "touch" && matchMedia("(hover:hover)").matches) { cancelHover(); hoverTimer.current = setTimeout(() => choose(id), 140) } }} onPointerLeave={cancelHover} onFocus={() => choose(id)} onClick={() => choose(id)}><span className="micro">0{i + 1}</span><span className="rolling-project-name"><span>{p.title}</span><span aria-hidden="true">{p.title}</span></span><span className="visual-index-arrow" aria-hidden="true">↗</span></button>
            })}<p className="visual-index-hint micro"><span className="desktop-hint">MOVE THROUGH THE INDEX</span><span className="touch-hint">TAP A PROJECT · SWIPE THE IMAGES</span><span>↓ THE STORIES FOLLOW</span></p></div>
            <div id="floating-project-preview" className="floating-project-preview" data-project={selected} onPointerDown={event => { if (event.pointerType === "touch") gesture.current = { x: event.clientX, y: event.clientY } }} onPointerCancel={() => { gesture.current = null }} onPointerUp={event => {
                const start = gesture.current; gesture.current = null
                if (!start) return
                const dx = event.clientX - start.x, dy = event.clientY - start.y
                if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2 && screens.length > 1) { swipedAt.current = Date.now(); setView((view + (dx < 0 ? 1 : screens.length - 1)) % screens.length) }
            }} onClickCapture={event => { if (Date.now() - swipedAt.current < 500) { event.preventDefault(); event.stopPropagation() } }}>
                <span className="preview-coordinate micro" aria-hidden="true">AB / EXPERIMENTS IN POSSIBILITY</span><div className="preview-orbit" aria-hidden="true" />
                <motion.div className="floating-preview-rig" style={reduced ? {} : { x: driftX, y: driftY, rotateX, rotateY }}>
                    <AnimatePresence initial={false} mode="sync"><motion.div key={`${selected}-${view}`} className={`floating-preview-composition ${screens.length ? "has-screens" : "has-concept"} ${selected === "clickforge" ? "is-landscape" : ""}`} initial={reduced ? false : { opacity: 0, y: 45, rotate: -5, scale: .94 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -35, rotate: 5, scale: .96 }} transition={{ duration: reduced ? 0 : .6, ease: [.16, 1, .3, 1] }}>
                        {screens.length ? [2, 1, 0].map(layer => <div key={layer} className={`floating-image-layer floating-image-layer-${layer}`} aria-hidden={layer !== 0 || undefined}>{layer === 0 ? <ProjectLink id={selected} className="floating-preview-card"><img src={screens[view % screens.length].src} alt={`${project.title}: ${screens[view % screens.length].caption}`} width="706" height="1514" loading="lazy" /><span className="preview-image-cta">INSIDE THE PROJECT <b>↗</b></span></ProjectLink> : <img src={screens[(view + layer) % screens.length].src} alt="" width="706" height="1514" loading="lazy" />}</div>) : <div className="concept-deck"><div className="concept-backplate" /><ProjectLink id={selected} className="floating-preview-card concept-card"><span className="concept-chrome micro"><span>● ● ●</span>{selected}.concept</span><span className="concept-symbol" aria-hidden="true">{concept.symbol}</span><strong>{concept.title}</strong><p>{concept.line}</p><div className="concept-code" aria-hidden="true"><span>// a visual idea, not application source</span>{concept.code.map((line, i) => <code key={line}><b>0{i + 1}</b>{line}</code>)}</div><span className="preview-image-cta">EXPLORE THE PROJECT <b>↗</b></span></ProjectLink></div>}
                    </motion.div></AnimatePresence>
                </motion.div>
                <div className="floating-preview-footer"><div><span className="micro">{screens.length ? "PROJECT SCREENS" : "CODE-INSPIRED CONCEPT / ILLUSTRATION"}</span><p>{project.subtitle}</p></div>{screens.length > 1 && <button type="button" className="next-floating-view" aria-label={`Next ${project.title} preview image`} onClick={() => setView((view + 1) % screens.length)}><span className="micro">{String(view + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</span>↻</button>}</div>
            </div>
        </div><div className="visual-index-end micro"><span>&lt; IDEAS INTO INTERFACES /&gt;</span><span>HOVER TO DISCOVER. OPEN TO EXPLORE.</span></div>
    </div>
}
