"use client"
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, type ReactNode } from "react"

export default function MotionDirector({ children }: { children: ReactNode }) {
    const path = usePathname(), { scrollYProgress } = useScroll()
    const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: .2 })
    useEffect(() => {
        // Rendering can be suspended during a native view transition; a timer
        // signals the committed route without waiting on a paint-dependent loop.
        const timer = setTimeout(() => document.dispatchEvent(new Event("portfolio:route-ready")), 100)
        return () => clearTimeout(timer)
    }, [path])
    useEffect(() => {
        // A view-transition snapshot can outlive the browser's native scroll
        // capture. Restore the known project position when Back reaches home.
        const restore = () => {
            if (location.pathname !== "/") return
            const saved = sessionStorage.getItem("portfolio-return")
            if (!saved) return
            try { const position = JSON.parse(saved); if (Date.now() - position.at < 60 * 60 * 1000) sessionStorage.setItem("portfolio-return", JSON.stringify({ ...position, restore: true })) } catch { /* Native restoration remains the fallback. */ }
        }
        addEventListener("popstate", restore, true)
        return () => removeEventListener("popstate", restore, true)
    }, [])
    useEffect(() => {
        const fine = matchMedia("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)")
        let last: HTMLElement | null = null
        const move = (event: PointerEvent) => {
            if (!fine.matches) return
            const target = (event.target as Element).closest<HTMLElement>(".pill,.case-link")
            if (last && last !== target) { last.style.removeProperty("--magnet-x"); last.style.removeProperty("--magnet-y") }
            last = target
            if (target) { const r = target.getBoundingClientRect(); target.style.setProperty("--magnet-x", `${(event.clientX - r.left - r.width / 2) * .12}px`); target.style.setProperty("--magnet-y", `${(event.clientY - r.top - r.height / 2) * .12}px`) }
        }
        const leave = () => { last?.style.removeProperty("--magnet-x"); last?.style.removeProperty("--magnet-y"); last = null }
        document.addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerleave", leave)
        return () => { document.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); leave() }
    }, [])
    return <MotionConfig reducedMotion="user" transition={{ ease: [.16, 1, .3, 1], duration: .8 }}><motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" />{children}</MotionConfig>
}
