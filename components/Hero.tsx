"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Download, ArrowRight, Github, Mail, Linkedin } from "lucide-react"
import Image from "next/image"

const TOTAL_FRAMES = 105

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [frameImages, setFrameImages] = useState<HTMLImageElement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    // Scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Map scroll progress to frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES])

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Preload images
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = []
            let loadedCount = 0

            const handleFrameLoad = () => {
                loadedCount++
                // Dismiss loading screen early (after 10 frames) to improve perceived performance
                if (loadedCount === Math.min(10, TOTAL_FRAMES)) {
                    setIsLoading(false)
                }
                // Fallback in case TOTAL_FRAMES is less than 10
                if (loadedCount === TOTAL_FRAMES) {
                    setIsLoading(false)
                }
            }

            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new window.Image()
                img.src = `/sequence/frame_${i.toString().padStart(3, '0')}.webp`
                img.onload = handleFrameLoad
                img.onerror = handleFrameLoad // Fail-safe: ensure loading screen clears even if an image fails
                loadedImages.push(img)
            }
            setFrameImages(loadedImages)
        }

        preloadImages()
    }, [])

    // Render logic - using requestAnimationFrame for smoothness
    useEffect(() => {
        if (frameImages.length === 0 || !canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return

        let animationFrameId: number

        const render = () => {
            const index = Math.floor(frameIndex.get())
            const image = frameImages[index - 1] || frameImages[0]

            if (image) {
                // Handle responsive canvas sizing
                const { innerWidth, innerHeight } = window
                canvas.width = innerWidth
                canvas.height = innerHeight

                // Draw image with "object-fit: cover" logic
                const imgAspect = image.width / image.height
                const canvasAspect = canvas.width / canvas.height

                let drawWidth, drawHeight, offsetX, offsetY

                if (imgAspect > canvasAspect) {
                    drawHeight = canvas.height
                    drawWidth = canvas.height * imgAspect
                    offsetX = (canvas.width - drawWidth) / 2
                    offsetY = 0
                } else {
                    drawWidth = canvas.width
                    drawHeight = canvas.width / imgAspect
                    offsetX = 0
                    offsetY = (canvas.height - drawHeight) / 2
                }

                context.clearRect(0, 0, canvas.width, canvas.height)
                context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()
        return () => cancelAnimationFrame(animationFrameId)
    }, [frameImages, frameIndex])

    // Text Overlay Phases Animations
    const nameOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0])
    const nameScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9])

    const phase2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0])
    const phase2X = useTransform(scrollYProgress, [0.3, 0.4], [40, 0])

    const phase3Opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1])
    // Clear the shared upper-left area before the finale tagline enters.
    const identityOpacity = useTransform(scrollYProgress, [0.6, 0.7], [1, 0])
    const phase3Y = useTransform(scrollYProgress, [0.7, 0.85], [30, 0])
    const [phase, setPhase] = useState(0)
    useMotionValueEvent(scrollYProgress, "change", value => setPhase(value < 0.25 ? 0 : value < 0.65 ? 1 : 2))
    const frameLabel = useTransform(frameIndex, value => String(Math.floor(value)).padStart(3, "0"))

    return (
        <section ref={containerRef} id="hero" className="relative h-[300vh] bg-black cinematic-hero">
            <AnimatePresence>{isLoading && <motion.div exit={{ opacity: 0 }} transition={{ duration: 1 }} className="cinema-loading"><span className="loading-mark">AB<span>®</span></span><span className="micro">SETTING THE SCENE</span><span className="loading-rule" /></motion.div>}</AnimatePresence>
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" aria-label="Cinematic portrait of Anvin Biju, advanced by scrolling" role="img" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[1]" />
                <div className="cinema-top micro"><motion.span style={{ opacity: identityOpacity }} aria-hidden={phase === 2}>ANVIN BIJU / PERSONAL DIGITAL SPACE</motion.span><span>KERALA, INDIA · 10.76° N</span></div>
                <motion.div style={{ opacity: nameOpacity, scale: nameScale }} className="cinema-phase cinema-intro" aria-hidden={phase !== 0}>
                    <span className="micro cinema-eyebrow">CYBERSECURITY ENGINEER & DEVELOPER</span>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="display">ANVIN<br /><em>BIJU.</em></motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}>Exploring security, automation,<br />and intelligent software.</motion.p>
                </motion.div>
                <motion.div style={{ opacity: phase2Opacity, x: phase2X }} className="cinema-phase cinema-statement" aria-hidden={phase !== 1}>
                    <span className="micro">A SIMPLE QUESTION. AN ENDLESS POSSIBILITY.</span>
                    <h2 className="display">I BUILD<br />WHAT I WISH<br /><em>EXISTED.</em></h2>
                    <p>From the first “what if”<br />to something that works.</p>
                </motion.div>
                <motion.div style={{ opacity: phase3Opacity, y: phase3Y }} className="cinema-phase cinema-finale" aria-hidden={phase !== 2}>
                    <span className="micro">SECURITY. CODE. INTELLIGENCE. CREATION.</span>
                    <h2 className="display">THINK DEEPER.<br /><em>BUILD BETTER.</em></h2>
                    <div className="cinema-actions"><a tabIndex={phase === 2 ? 0 : -1} className="pill" href="#projects">Explore my work <span>↗</span></a><a tabIndex={phase === 2 ? 0 : -1} className="pill pill-outline" href="#about">Meet the builder <span>↓</span></a></div>
                    <div className="cinema-socials"><a tabIndex={phase === 2 ? 0 : -1} href="https://github.com/anvinbiju-lab" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a tabIndex={phase === 2 ? 0 : -1} href="https://www.linkedin.com/in/anvin-biju" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a tabIndex={phase === 2 ? 0 : -1} href="mailto:anvinbiju1@gmail.com">EMAIL ↗</a></div>
                </motion.div>
                <div className="cinema-bottom"><span className="micro">SCROLL TO UNFOLD <span aria-hidden="true">↓</span></span><span className="cinema-timeline"><motion.span style={{ scaleX: scrollYProgress }} /></span><span className="micro cinema-frame" aria-hidden="true"><motion.span>{frameLabel}</motion.span> / 105</span><a className="micro" href="#about">SKIP INTRO ↘</a></div>
            </div>
            <ScrollNavbarHelper />
        </section>
    )
}

function ScrollNavbarHelper() {
    useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('nav')
            if (nav) {
                if (window.scrollY > 50) {
                    nav.classList.add('navbar-scrolled')
                    nav.classList.remove('bg-transparent')
                } else {
                    nav.classList.remove('navbar-scrolled')
                    nav.classList.add('bg-transparent')
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return null
}
