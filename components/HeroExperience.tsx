"use client"
import { useEffect, useState } from "react"
import Hero from "./Hero"

export default function HeroExperience() {
    const [mode, setMode] = useState<"pending" | "cinematic" | "still">("pending")
    useEffect(() => {
        const media = matchMedia("(prefers-reduced-motion: reduce)")
        const update = () => setMode(media.matches ? "still" : "cinematic")
        update(); media.addEventListener("change", update)
        return () => media.removeEventListener("change", update)
    }, [])
    if (mode === "cinematic") return <Hero />
    return <section id="hero" className={`hero-alternative ${mode === "pending" ? "hero-pending" : ""}`} aria-busy={mode === "pending"}>
        <img src="/sequence/frame_001.webp" width="1920" height="1080" alt="Anvin Biju, illuminated in violet and teal" fetchPriority="high" />
        <div><span className="micro">CYBERSECURITY ENGINEER & DEVELOPER</span><h1 className="display">ANVIN<br /><em>BIJU.</em></h1><p>Exploring security, automation, and intelligent software.</p><a href="#projects" className="pill">Explore my work <span>↗</span></a><a href="#about" className="inline-link">Meet the builder ↓</a></div>
    </section>
}
