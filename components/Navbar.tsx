"use client"
import { useEffect, useRef, useState } from "react"

const links = [["Selected work", "projects"], ["About", "about"], ["Capabilities", "skills"], ["Inside the system", "system"], ["Recognition", "achievements"], ["Education", "education"], ["Contact", "contact"]]
export default function Navbar() {
    const dialog = useRef<HTMLDialogElement>(null), trigger = useRef<HTMLButtonElement>(null)
    const [active, setActive] = useState("")
    useEffect(() => {
        const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) }), { rootMargin: "-15% 0px -55% 0px" })
        links.forEach(([, id]) => { const section = document.getElementById(id); if (section) observer.observe(section) })
        return () => observer.disconnect()
    }, [])
    const close = () => dialog.current?.close()
    useEffect(() => {
        const el = dialog.current
        const onClose = () => { document.body.style.overflow = ""; trigger.current?.setAttribute("aria-expanded", "false"); trigger.current?.focus({ preventScroll: true }) }
        el?.addEventListener("close", onClose)
        return () => { el?.removeEventListener("close", onClose); document.body.style.overflow = "" }
    }, [])
    return <>
        <a className="skip-link" href="#about">Skip cinematic introduction</a>
        <header className="site-header"><a href="#hero" className="wordmark" aria-label="Anvin Biju — back to beginning">AB<span>®</span></a><span className="header-note">ANVIN BIJU<br />INDEPENDENT DEVELOPER</span><nav aria-label="Main navigation">{links.filter(([, id]) => ["projects", "about", "system"].includes(id)).map(([name, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{name}{id === "projects" && <sup>04</sup>}</a>)}</nav><a href="#contact" className="header-connect">Let’s talk <span>↗</span></a><button ref={trigger} className="index-trigger" aria-label="Open navigation index" aria-controls="site-index" aria-expanded="false" onClick={() => { dialog.current?.showModal(); document.body.style.overflow = "hidden"; trigger.current?.setAttribute("aria-expanded", "true") }}>INDEX <span aria-hidden="true">☰</span></button></header>
        <dialog ref={dialog} id="site-index" className="site-index" onClick={event => { if (event.target === dialog.current) close() }}><div className="menu-bar"><span className="micro">ANVIN / AN INDEX OF CURIOSITIES</span><button onClick={close} className="menu-close" aria-label="Close navigation">CLOSE <span>×</span></button></div><nav aria-label="Full navigation">{links.map(([name, id], i) => <a href={`#${id}`} key={id} onClick={close}><span className="micro">0{i + 1}</span><strong>{name}</strong><span>↗</span></a>)}</nav><div className="menu-foot"><span>BASED IN KERALA. BUILDING FOR EVERYWHERE.</span><a href="mailto:anvinbiju1@gmail.com">anvinbiju1@gmail.com ↗</a></div></dialog>
    </>
}
