"use client"

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

export default function ParticleBackground() {
    const [init, setInit] = useState(false)

    // Initialize tsparticles engine once
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine)
        }).then(() => {
            setInit(true)
        })
    }, [])

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            interactivity: {
                detect_on: "canvas",
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: {
                        enable: true, // Need true for proper TS interface handling
                        delay: 0.5,
                    },
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#22D3EE", // primary cyan
                },
                links: {
                    enable: false, // NO connecting lines, just floating symbols
                },
                move: {
                    direction: "top" as const, // move strictly upwards
                    enable: true,
                    outModes: {
                        default: "out" as const,
                    },
                    random: false,
                    speed: 0.5,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        width: 1920,
                        height: 1080,
                    },
                    value: 40,
                },
                opacity: {
                    value: 0.15, // VERY SUBTLE
                },
                shape: {
                    type: "char",
                    options: {
                        char: {
                            value: ["{", "}", "<", ">", "/", "#", "@", "0", "1", ";", "="],
                            font: "JetBrains Mono",
                            style: "",
                            weight: "400",
                            fill: true,
                        },
                    },
                },
                size: {
                    value: { min: 4, max: 12 },
                },
            },
            detectRetina: true,
        }),
        [],
    )

    if (!init) return null

    return (
        <div className="absolute inset-0 z-0 pointer-events-auto">
            <Particles
                id="tsparticles"
                options={options}
                className="w-full h-full"
            />
        </div>
    )
}
