"use client"
import { useEffect } from "react"
export default function ReturnPosition() {
    useEffect(() => {
        let cancelled = false
        const stored = sessionStorage.getItem("portfolio-return")
        if (!stored) return
        try {
            const position = JSON.parse(stored)
            if (!position.restore || Date.now() - position.at > 60 * 60 * 1000) return
            document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => {
                if (cancelled) return
                window.scrollTo({ top: position.y, behavior: "instant" as ScrollBehavior })
                sessionStorage.setItem("portfolio-return", JSON.stringify({ ...position, restore: false }))
                document.querySelector<HTMLAnchorElement>(`#project-${position.id} h3 a`)?.focus({ preventScroll: true })
            })))
        } catch { sessionStorage.removeItem("portfolio-return") }
        return () => { cancelled = true }
    }, [])
    return null
}
