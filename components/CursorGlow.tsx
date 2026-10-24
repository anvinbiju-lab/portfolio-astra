"use client"
import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CursorGlow() {
    const cursor = useRef<HTMLDivElement>(null)
    const x = useMotionValue(-100), y = useMotionValue(-100)
    const smoothX = useSpring(x, { stiffness: 230, damping: 30, mass: .3 }), smoothY = useSpring(y, { stiffness: 230, damping: 30, mass: .3 })
    useEffect(() => {
        const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)")
        const move = (event: PointerEvent) => {
            const el = cursor.current; if (!el || !media.matches) return
            x.set(event.clientX); y.set(event.clientY)
            const target = event.target as Element
            el.dataset.state = target.closest("[data-preview]") ? "PLAY" : target.closest(".archive-row,.case-link") ? "VIEW" : ""
            el.dataset.visible = "true"
        }
        const leave = () => { if (cursor.current) cursor.current.dataset.visible = "false" }
        addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerleave", leave)
        return () => { removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave) }
    }, [x, y])
    return <motion.div className="context-cursor" ref={cursor} style={{ x: smoothX, y: smoothY }} aria-hidden="true"><span /></motion.div>
}
