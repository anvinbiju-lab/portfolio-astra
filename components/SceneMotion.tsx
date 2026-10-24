"use client"
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react"

export default function SceneMotion({ children, className, step }: { children: ReactNode; className: string; step?: number }) {
    const ref = useRef<HTMLDivElement>(null), reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: .25 })
    const depth = useTransform(progress, [0, .35, .65, 1], reduced ? [0, 0, 0, 0] : [1, 0, 0, -1])
    const reveal = useTransform(progress, [0, .3], reduced ? [1, 1] : [.84, 1])
    const px = useMotionValue(0), py = useMotionValue(0)
    const x = useSpring(px, { stiffness: 120, damping: 25 }), y = useSpring(py, { stiffness: 120, damping: 25 })
    const move = (event: PointerEvent<HTMLDivElement>) => {
        if (reduced) return
        const r = event.currentTarget.getBoundingClientRect()
        px.set((event.clientX - r.left) / r.width - .5); py.set((event.clientY - r.top) / r.height - .5)
    }
    const reset = () => { px.set(0); py.set(0) }
    return <motion.div ref={ref} className={className} data-step={step} style={{ "--scene-depth": depth, "--scene-scale": reveal, "--scene-pointer-x": x, "--scene-pointer-y": y } as unknown as CSSProperties} onPointerDown={move} onPointerMove={move} onPointerUp={event => { if (event.pointerType === "touch") reset() }} onPointerCancel={reset} onPointerLeave={reset}>{children}</motion.div>
}
