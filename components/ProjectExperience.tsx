"use client"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import SceneMotion from "./SceneMotion"

const novaStages = ["Describe a task", "Understand the instruction", "Plan browser actions", "Navigate & report"]

export default function ProjectExperience({ id }: { id: string }) {
    const [step, setStep] = useState(0), [text, setText] = useState("A small thought. A new connection."), [screen, setScreen] = useState("permissions")
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]), reduced = useReducedMotion()
    useEffect(() => () => timers.current.forEach(clearTimeout), [])
    const run = () => {
        timers.current.forEach(clearTimeout)
        if (reduced) { setStep(3); return }
        setStep(1)
        timers.current = [setTimeout(() => setStep(2), 750), setTimeout(() => setStep(3), 1650)]
    }
    if (id === "nova") return <SceneMotion className="product-experience nova-experience" step={step}>
        <div className="nova-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="nova-browser"><div className="browser-chrome"><span>● ● ●</span><span>nova / browser copilot</span><span>↗</span></div><div className="nova-body"><span className="nova-symbol" aria-hidden="true">✳</span><p className="micro">FROM INTENT TO INTERACTION</p><h4>Less clicking.<br /><em>More possibility.</em></h4><div className="nova-prompt"><span>Find the next thing worth exploring.</span><button type="button" onClick={run} data-preview aria-label="Play Nova workflow illustration">↑</button></div><div className="nova-workflow">{["UNDERSTAND", "PLAN", "ACT"].map((title, i) => <span key={title} className={step >= i + 1 ? "complete" : ""}><i />{title}</span>)}</div></div></div>
        <div className="nova-sidecar"><span className="micro">ACTION QUEUE</span>{novaStages.slice(1).map((s, i) => <span key={s} className={step > i ? "complete" : ""}><b>{step > i ? "✓" : `0${i + 1}`}</b>{s}</span>)}</div>
        <span className="nova-action-cursor" aria-hidden="true">↖</span><div className="experience-status" role="status">{step ? novaStages[step] : "Your instructions. A clear next action."}</div><span className="experience-disclosure">INTERACTIVE WORKFLOW ILLUSTRATION</span>
    </SceneMotion>
    if (id === "clipzo") return <SceneMotion className="product-experience clipzo-experience" step={step}>
        <div className="clip-label micro">TWO DEVICES. ONE MOMENT.</div><div className="transfer-composition"><div className="sender-device"><div className="device-camera" /><span className="micro">CLIPZO / SEND</span><label htmlFor="transfer-text">A thought worth sharing.</label><textarea id="transfer-text" value={text} maxLength={100} onChange={event => { setText(event.target.value); setStep(0); timers.current.forEach(clearTimeout) }} /><button type="button" className="mini-button" onClick={run} data-preview>Send snippet <span>↗</span></button><span className="micro">ROOM: A B 0 1</span></div><div className="transfer-path" aria-hidden="true"><span>↗</span><i /><span>↙</span></div><div className="receiver-device"><div className="browser-chrome"><span>● ● ●</span><span>CLIPZO / RECEIVE</span></div><div className="receiver-inner"><span className="connection-dot" /><span className="micro">{step >= 3 ? "SNIPPET RECEIVED" : step ? "CONNECTING…" : "AWAITING A CONNECTION"}</span><p className="received-text">{step >= 3 ? text : "Good things travel."}</p><span className="receive-arrow" aria-hidden="true">↙</span></div></div></div>
        <div role="status" className="experience-status">{step >= 3 ? "Arrived. A little closer, already." : step ? "Moving your thought across the connection…" : "Try sending a thought of your own."}</div><span className="experience-disclosure">LOCAL TRANSFER ILLUSTRATION · NO DEVICE CONNECTION</span>
    </SceneMotion>
    if (id === "scanmatrix") return <SceneMotion className="product-experience scan-experience">
        <div className="scan-side"><span className="micro">A CLEARER VIEW</span><strong>LESS<br />HIDDEN.<br /><em>MORE<br />VISIBLE.</em></strong><div className="scan-tabs" aria-label="ScanMatrix interface views">{["dashboard", "permissions", "network"].map((name, i) => <button type="button" key={name} aria-pressed={screen === name} onClick={() => setScreen(name)}><span>0{i + 1}</span>{name}<span>↗</span></button>)}</div></div><div className="scan-phone"><div className="device-camera" /><img src={`/projects/scanmatrix/${screen}.png`} alt={`ScanMatrix ${screen} design export with illustrative sample data`} width="400" height="900" loading="lazy" /></div><span className="experience-disclosure">UI DESIGN EXPORTS · SAMPLE DATA</span>
    </SceneMotion>
    if (id === "wistream") return <SceneMotion className="product-experience stream-experience" step={step}>
        <div className="stream-sky" aria-hidden="true" /><span className="stream-overline micro">A LITTLE LESS DISTANCE.</span><div className="stream-tv"><div className={`stream-landscape ${step === 3 ? "playing" : ""}`}><span className="landscape-sun" /><span className="mountain mountain-one" /><span className="mountain mountain-two" /><span className="mountain mountain-three" /><span className="tv-type">{step === 3 ? <>SAME NETWORK.<br /><em>BIGGER PICTURE.</em></> : <>YOUR NEXT<br /><em>GREAT ESCAPE.</em></>}</span></div><span className="tv-label micro">WISTREAM / LOCAL MEDIA</span></div><div className="stream-device"><span className="micro">ON YOUR PHONE</span><div className="media-thumbnail" aria-hidden="true">▶</div><span>Evening escape</span><button type="button" onClick={run} data-preview className="mini-button">{step === 3 ? "Replay connection" : "Connect to TV"} <span>↗</span></button></div><div className="stream-connection" aria-hidden="true"><i /><i /><i /></div><span className="stream-status micro" role="status">{step === 3 ? "CONNECTED / PLAYBACK PREVIEW" : step ? "CONNECTING OVER LOCAL WI-FI…" : "YOUR FILES. YOUR NETWORK."}</span><span className="experience-disclosure">CONNECTION ILLUSTRATION · ORIGINAL LANDSCAPE ART</span>
    </SceneMotion>
    return null
}
