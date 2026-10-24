"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type TerminalLine = {
    command?: string
    output?: string | React.ReactNode
    isPrompt?: boolean
}

interface TerminalWindowProps {
    lines: TerminalLine[]
    title?: string
    delay?: number
}

export default function TerminalWindow({
    lines,
    title = "~/anvin/about",
    delay = 500,
}: TerminalWindowProps) {
    const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    // Start animation when component mounts/is in view
    useEffect(() => {
        const timer = setTimeout(() => setHasStarted(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    // Typewriter effect logic
    useEffect(() => {
        if (!hasStarted || currentIndex >= lines.length) {
            if (currentIndex >= lines.length) setIsTyping(false)
            return
        }

        setIsTyping(true)
        const currentLine = lines[currentIndex]

        // Fast delay for output, slower for commands (simulating typing)
        const typeDelay = currentLine.isPrompt ? 600 : 150

        const timer = setTimeout(() => {
            setDisplayedLines((prev) => [...prev, currentLine])
            setCurrentIndex((prev) => prev + 1)
        }, typeDelay)

        return () => clearTimeout(timer)
    }, [currentIndex, hasStarted, lines])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-xl overflow-hidden border border-card-border bg-[#0F172A] shadow-2xl"
        >
            {/* OS Top Bar */}
            <div className="flex items-center px-4 py-3 bg-[#1E293B] border-b border-card-border">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="mx-auto flex items-center justify-center font-mono text-xs text-text-secondary">
                    {title}
                </div>
            </div>

            {/* Terminal Content */}
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                {displayedLines.map((line, i) => (
                    <div key={i} className="mb-2">
                        {line.command && (
                            <div className="flex items-start text-white">
                                <span className="text-success mr-2">visitor@anvin:~$</span>
                                <span className="text-cyan">{line.command}</span>
                            </div>
                        )}
                        {line.output && (
                            <div className="text-text-secondary mt-1 ml-4 whitespace-pre-wrap">
                                {line.output}
                            </div>
                        )}
                    </div>
                ))}

                {/* Blinking Cursor at the end */}
                {hasStarted && (
                    <div className="flex items-center mt-2">
                        {currentIndex >= lines.length ? (
                            <>
                                <span className="text-success mr-2">visitor@anvin:~$</span>
                                <span className="terminal-cursor ml-1" />
                            </>
                        ) : isTyping ? (
                            <span className="terminal-cursor" />
                        ) : null}
                    </div>
                )}
            </div>
        </motion.div>
    )
}
