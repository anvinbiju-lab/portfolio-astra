"use client"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef, type CSSProperties } from "react"

const chapters = [
    { lead: "QUESTION", accent: "EVERYTHING.", text: "The interesting work begins where the obvious answer ends." },
    { lead: "CONNECT", accent: "THE PIECES.", text: "Security. Intelligence. Software. Different ways into the same idea." },
    { lead: "MAKE", accent: "IT MATTER.", text: "The measure of an idea is what you make of it." },
]
function Chapter({ chapter, index, progress }: { chapter: typeof chapters[0]; index: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
    const ref = useRef<HTMLDivElement>(null), { scrollYProgress: local } = useScroll({ target: ref, offset: ["start 90%", "end 45%"] })
    const opacity = useTransform(progress, [0, .25, .4, .6, .75, 1], index === 0 ? [1, 1, 0, 0, 0, 0] : index === 1 ? [0, 0, 1, 1, 0, 0] : [0, 0, 0, 0, 1, 1])
    const y = useTransform(progress, [0, .25, .4, .6, .75, 1], index === 0 ? [0, 0, -65, -65, -65, -65] : index === 1 ? [65, 65, 0, 0, -65, -65] : [65, 65, 65, 65, 0, 0])
    const ink = useTransform(local, [0, 1], ["0%", "100%"])
    return <motion.div ref={ref} className={`manifesto-chapter chapter-${index}`} style={{ opacity, y, "--chapter-ink": ink } as unknown as CSSProperties}><span className="micro">0{index + 1} / A WAY OF THINKING</span><h2 className="display">{chapter.lead}<br /><em>{chapter.accent}</em></h2><p>{chapter.text}</p></motion.div>
}
export default function ScrollManifesto() {
    const ref = useRef<HTMLElement>(null), reduced = useReducedMotion(), { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: .25 })
    const count = useTransform(progress, value => `${String(Math.min(3, Math.floor(value * 3) + 1)).padStart(2, "0")} / 03`)
    return <section ref={ref} className={`scroll-manifesto ${reduced ? "manifesto-reduced" : ""}`} aria-label="A builder’s philosophy"><div className="manifesto-sticky"><div className="manifesto-overline micro"><span>ANVIN / NOTES TO SELF</span><span>A LITTLE CURIOSITY GOES A LONG WAY.</span></div><div className="manifesto-types">{chapters.map((chapter, index) => <Chapter key={chapter.lead} chapter={chapter} index={index} progress={progress} />)}</div><div className="manifesto-footer micro"><motion.span className="manifesto-counter" aria-hidden="true">{count}</motion.span><div className="manifesto-rail" aria-hidden="true"><motion.span style={{ scaleX: progress }} /></div><span>THINK / CONNECT / CREATE</span></div></div></section>
}
