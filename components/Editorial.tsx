"use client"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { transitionRoute } from "@/lib/route-transition"

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    const reduced = useReducedMotion()
    return <motion.div className={className} initial={false} whileInView={reduced ? {} : { opacity: [0.35, 1], y: [28, 0] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
}
export function SectionLabel({ number, children, aside }: { number: string; children: ReactNode; aside?: string }) {
    return <div className="section-label"><span><i />{number} / {children}</span>{aside && <span>{aside}</span>}</div>
}
export function KineticHeading({ lines, className = "", characters = false }: { lines: { text: string; italic?: boolean; muted?: boolean }[]; className?: string; characters?: boolean }) {
    const reduced = useReducedMotion()
    return <motion.h2 className={`display ${className}`} aria-label={lines.map(line => line.text).join(" ")} initial="rest" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ show: { transition: { staggerChildren: 0.055 } } }}>
        {lines.map(line => <span key={line.text} className={`kinetic-line ${line.italic ? "is-italic" : ""} ${line.muted ? "is-muted" : ""}`} aria-hidden="true">{line.text.split(" ").map((word, i) => <span className="kinetic-word" key={`${word}-${i}`}>{(characters && !line.italic ? word.split("") : [word]).map((part, j) => <motion.span key={j} variants={reduced ? {} : { rest: { y: "0%" }, show: { y: ["110%", "0%"], rotate: [characters ? 5 : 2, 0], transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}>{part}</motion.span>)}{" "}</span>)}</span>)}
    </motion.h2>
}
export function ProjectLink({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
    const router = useRouter()
    return <Link className={className} href={`/projects/${id}`} onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        sessionStorage.setItem("portfolio-return", JSON.stringify({ y: window.scrollY, id, at: Date.now() }))
        event.preventDefault()
        const scene = event.currentTarget.closest(".floating-preview-composition")?.querySelector(".floating-preview-card") || event.currentTarget.closest(".featured-project")?.querySelector(".product-experience") || (id === "lockin" ? document.querySelector(".lockin-center") : null)
        transitionRoute(() => router.push(`/projects/${id}`), scene)
    }}>{children}</Link>
}
