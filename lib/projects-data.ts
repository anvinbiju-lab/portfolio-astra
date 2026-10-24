import { ReactNode } from "react"

export type Platform = "android" | "web" | "windows" | "chrome"
export type Status = "active" | "live" | "complete"

export interface InstallStep {
    step: string
    detail?: string
}

export interface Project {
    id: string
    title: string
    subtitle: string
    iconEmoji: string          // used server-side (no JSX)
    iconBg: string
    date: string
    description: string
    longDescription?: string
    features: string[]
    tags: string[]
    github?: string
    sourceUnavailable?: boolean
    link?: string
    theme: "cyan" | "slate"
    platform: Platform
    status: Status
    gradient: string
    screenshots?: { src: string; caption: string }[]
    apkUrl?: string
    apkSize?: string
    apkVersion?: string
    installSteps?: InstallStep[]
    minSdk?: string
}

const PROJECTS: Project[] = [
    {
        id: "nova", title: "Nova Agent", subtitle: "AI / Browser Automation", iconEmoji: "✳", iconBg: "bg-violet-400/10 border-violet-400/30", date: "Selected project",
        description: "An AI-native browser automation extension designed to interpret natural-language instructions and perform multi-step browser interactions.",
        longDescription: "Nova Agent explores a different relationship with the browser: describe what needs to be done, then turn that instruction into a sequence of browser actions. Its focus is making repetitive navigation and interaction more understandable through task execution and feedback.",
        features: ["Natural-language task instructions", "AI-guided browser automation", "Multi-step browser interaction and navigation", "Execution feedback and task visibility"],
        tags: ["AI Agents", "Browser Extension", "Natural-language Tasks"], theme: "slate", platform: "chrome", status: "complete", gradient: "from-violet-500/20 to-transparent",
    },
    {
        id: "clipzo", title: "Clipzo", subtitle: "Cross-device Text Sharing", iconEmoji: "↗", iconBg: "bg-cyan/10 border-cyan/30", date: "Selected project",
        description: "An ephemeral phone-to-PC text sharing app. Pair devices with a four-character room code, send snippets, and copy them on the receiving computer.",
        longDescription: "The public Clipzo repository documents this application as QuickDrop. A phone joins a PC’s temporary room through a four-character code. Text, links, code, and commands are relayed over WebSockets. Rooms expire and messages are handled in memory, keeping the interaction focused on a temporary connection.",
        features: ["Four-character room pairing and optional QR connection", "One phone sender and one PC receiver per room", "Session tokens authorize message relays", "In-memory text relay with expiring rooms"],
        tags: ["Next.js 15", "TypeScript", "WebSocket", "Tailwind CSS"], github: "https://github.com/anvinbiju-lab/Clipzo", link: "https://koply.vercel.app", theme: "cyan", platform: "web", status: "live", gradient: "from-cyan/20 to-transparent",
    },
    {
        id: "scanmatrix",
        title: "ScanMatrix",
        subtitle: "Android Security Scanner",
        iconEmoji: "🛡️",
        iconBg: "bg-cyan/10 border-cyan/30",
        date: "2025 – Present",
        description:
            "Comprehensive Android security app that scans installed apps, permissions, and network activity. Features real-time threat detection and VirusTotal API integration for on-demand APK/file reputation checks.",
        longDescription:
            "ScanMatrix is a full-featured Android security suite built for users who take their device security seriously. At its core is an on-device heuristic scan engine that continuously evaluates installed applications against a set of behavioural rules and known threat signatures. The VirusTotal API integration brings enterprise-grade reputation checking directly to your device — simply tap any APK or file and get a verdict from 70+ antivirus engines instantly. DNS monitoring keeps an eye on network traffic at the resolver level, flagging suspicious domains before they can do harm. The permission manager gives granular control over what each app can access, with the ability to flag and revoke dangerous permissions.",
        features: [
            "On-device heuristic scan engine for real-time threat detection",
            "VirusTotal API integration for APK & file reputation checks against 70+ AV engines",
            "DNS monitoring and per-app permission management with revoke controls",
            "WorkManager-powered scheduled threat-definition updates",
            "Room DB persistence for scan history and threat logs",
        ],
        tags: ["Kotlin", "Jetpack Compose", "Room DB", "VirusTotal API", "Android 14", "WorkManager"],
        github: "https://github.com/anvinbiju-lab/ScanMatrix",
        theme: "cyan",
        platform: "android",
        status: "active",
        gradient: "from-cyan/20 via-cyan/5 to-transparent",
        minSdk: "Android 8.0+",
        screenshots: [
            { src: "/projects/scanmatrix/dashboard.png", caption: "Dashboard — UI design export, sample data" },
            { src: "/projects/scanmatrix/permissions.png", caption: "Permission insights — UI design export, sample data" },
            { src: "/projects/scanmatrix/network.png", caption: "Network view — UI design export, sample data" },
        ],
    },
    {
        id: "lockin",
        title: "Lock In",
        subtitle: "Smart App Blocker, Habit & Sleep Tracker",
        iconEmoji: "🔒",
        iconBg: "bg-rose-400/10 border-rose-400/30",
        date: "2026 – Present",
        description:
            "A privacy-focused Android digital wellbeing app that combines strict app blocking with daily usage limits, flexible habit tracking with streaks and calendar, sleep schedule monitoring, and comprehensive focus statistics.",
        longDescription:
            "Lock In was born out of a personal need to fight distraction and build discipline without relying on willpower alone. The strict app blocker enforces daily time limits and scheduled lockout windows — when you hit your Instagram limit, a full-screen overlay takes over and a 5-minute emergency bypass forces an intentional pause before granting access. The habit tracker features a beautiful monthly calendar grid with streak tracking and WorkManager-powered reminders that let you complete or skip directly from the notification tray. Sleep tracking logs your bedtime with a single tap, calculates a sleep quality score based on your target deviation, and can automatically enable the focus shield while you sleep. Everything ties together in the Focus Stats dashboard with screen time analytics, per-app usage bars, and an emergency unlock audit log for digital mindfulness.",
        features: [
            "Strict App Blocker: Daily usage limits, scheduled lockout windows, full-screen lockout overlay with a 5-minute emergency bypass countdown",
            "Battery-Aware Monitor: Foreground service that intelligently sleeps when the screen is off to preserve battery life",
            "Habit Tracker: Custom habits with color accents, monthly calendar grid, completion streaks, and interactive WorkManager notifications (Complete / Skip from tray)",
            "Sleep Tracker: One-tap sleep/wake logging, automatic sleep quality scoring with target deviation tracking, and Bedtime Focus integration",
            "Focus Stats Dashboard: Screen time analytics, per-app usage progress bars, habit performance insights, and an emergency unlock audit log",
        ],
        tags: ["Kotlin", "Jetpack Compose", "Material 3", "MVVM", "Room DB", "WorkManager", "UsageStatsManager", "ForegroundService"],
        github: "https://github.com/anvinbiju-lab/Lock-In",
        theme: "cyan",
        platform: "android",
        status: "active",
        gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
        screenshots: [
            { src: "/projects/lockin/screen-blocker.jpeg", caption: "App Blocker — Focus Session Active" },
            { src: "/projects/lockin/screen-enforcement.jpeg", caption: "Enforcement Rules — Daily Screen Time Limit" },
            { src: "/projects/lockin/screen-habits.jpeg", caption: "Habit Tracker — Habit Pulse Calendar" },
            { src: "/projects/lockin/screen-sleep.jpeg", caption: "Sleep Tracker — Circadian Harmony" },
            { src: "/projects/lockin/screen-profile.jpeg", caption: "User Profile & Focus Motto" },
        ],
        apkUrl: "/projects/lockin/lockin.apk",
        apkSize: "22.4 MB",
        apkVersion: "1.0.0",
        installSteps: [
            { step: "Download the APK", detail: "Tap the Download APK button above to save the file to your device." },
            { step: "Allow Unknown Sources", detail: "Go to Settings → Security (or Privacy) → Enable 'Install Unknown Apps' for your browser or Files app." },
            { step: "Install the APK", detail: "Open your Downloads folder, tap on lockin.apk, and follow the on-screen prompt to install." },
            { step: "Grant Permissions", detail: "On first launch, navigate to the Blocker tab and grant Usage Access, Draw Over Other Apps, and Notification permissions for full functionality." },
            { step: "You're in", detail: "Set your first app limit or habit and start your focus session!" },
        ],
        minSdk: "Android 7.0 (API 24)+",
    },
    {
        id: "jarvis-lite",
        title: "Jarvis Lite",
        subtitle: "Android Voice Assistant",
        iconEmoji: "🤖",
        iconBg: "bg-violet-400/10 border-violet-400/30",
        date: "May 2026 – Present",
        description:
            "A voice-first Android assistant that controls on-screen phone actions using Accessibility Service, speech recognition, and safe Android system APIs — no root required.",
        features: [
            "Accessibility-based action engine: node search by text and content description",
            "Indexed clickable item selection & safe text entry into editable fields",
            "Voice command parsing with execution result logging and fallback error handling",
            "Reusable app adapters for YouTube, Instagram — automating in-app actions via voice",
            "Operates entirely within Android platform limits, no root required",
        ],
        tags: ["Kotlin", "Jetpack Compose", "Accessibility Service", "Speech-to-Text APIs"],
        github: "https://github.com/anvinbiju-lab/Jarvis-Lite",
        theme: "slate",
        platform: "android",
        status: "active",
        gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
        minSdk: "Android 8.0+",
    },
    {
        id: "wistream",
        title: "WiStream",
        subtitle: "Wi-Fi FTP Media Server",
        iconEmoji: "📡",
        iconBg: "bg-cyan/10 border-cyan/30",
        date: "Mar 2026",
        description:
            "Turns your Android phone into an always-on Wi-Fi FTP media server for local streaming to Android TV via VLC. Optimized for smooth playback of large 3–4 GB movie files over Wi-Fi.",
        features: [
            "Native Android FTP server that runs as a foreground service",
            "Screen-off operation — keeps serving even when the display is off",
            "Folder picker for selectively sharing specific directories",
            "Optimized buffer settings for smooth 3–4 GB file streaming via VLC",
            "Persistent notification with server IP:port for easy client connection",
        ],
        tags: ["Kotlin", "Android", "FTP Server", "Foreground Service", "VLC Streaming"],
        github: "https://github.com/anvinbiju-lab/WiStream",
        sourceUnavailable: true,
        theme: "cyan",
        platform: "android",
        status: "complete",
        gradient: "from-cyan/20 via-sky-500/5 to-transparent",
        minSdk: "Android 7.0+",
    },
    {
        id: "cyberscan",
        title: "CyberScan",
        subtitle: "Web Security & HTTP Header Auditor",
        iconEmoji: "🔍",
        iconBg: "bg-cyan/10 border-cyan/30",
        date: "Jul 2026",
        description:
            "A web security auditing utility that analyzes HTTP response headers and security configurations of target websites in real-time, scoring them and providing actionable remediation tips.",
        features: [
            "Automated inspection of CSP, HSTS, X-Frame-Options, X-Content-Type-Options headers",
            "Rule-based scoring module that grades web server configurations",
            "Flags version/server banner disclosures as security risks",
            "Animated score counters and dynamic state transitions in the UI",
            "Scan history tracking for repeated audits",
        ],
        tags: ["Python", "FastAPI", "Tailwind CSS", "Web Security"],
        github: "https://github.com/anvinbiju-lab/cyber-scan",
        link: "https://anvin-cyber-scan.vercel.app",
        theme: "cyan",
        platform: "web",
        status: "live",
        gradient: "from-cyan/20 via-blue-500/5 to-transparent",
    },
    {
        id: "keyguard",
        title: "KeyGuard",
        subtitle: "Password & Breach Auditor",
        iconEmoji: "🔑",
        iconBg: "bg-slate/10 border-slate/30",
        date: "Jul 2026",
        description:
            "A privacy-first web app that evaluates password mathematical strength and checks against known data breach repositories using zero-knowledge k-Anonymity principles.",
        features: [
            "HaveIBeenPwned API via k-Anonymity — plain-text passwords never leave the device",
            "Information entropy calculation using character set distribution and bit-entropy scoring",
            "Real-time strength meter with character pool badges",
            "Enterprise-grade minimalist interface with actionable remediation feedback",
            "Zero telemetry — privacy-first by design",
        ],
        tags: ["Python", "HaveIBeenPwned API", "Bit-Entropy", "Information Security"],
        github: "https://github.com/anvinbiju-lab/KeyGuard",
        link: "https://anvin-key-guard.vercel.app",
        theme: "slate",
        platform: "web",
        status: "live",
        gradient: "from-slate/20 via-slate/5 to-transparent",
    },
    {
        id: "clickforge",
        title: "ClickForge",
        subtitle: "Windows Mouse Shortcut Utility",
        iconEmoji: "🖱️",
        iconBg: "bg-violet-400/10 border-violet-400/30",
        date: "2026",
        description:
            "Lightweight Windows desktop utility for custom mouse shortcuts using global low-level hooks. Features hold-click actions for screenshots, app launches, and volume control. Runs at <0.5% CPU idle.",
        features: [
            "Global low-level mouse hooks that work across all applications",
            "Hold-click actions: screenshots, app launches, volume control",
            "Animated system tray UI with live shortcut status",
            "Single-file .exe packaging via PyInstaller — no installation required",
            "Under 0.5% CPU usage at idle — genuinely lightweight",
        ],
        tags: ["Python", "CustomTkinter", "pynput", "pystray", "PyInstaller"],
        github: "https://github.com/anvinbiju-lab/ClickForge",
        theme: "slate",
        platform: "windows",
        status: "complete",
        gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
        screenshots: [
            { src: "/clickforge.png", caption: "Main Window" },
            { src: "/clickforge-settings.png", caption: "Settings" },
            { src: "/clickforge-log.png", caption: "Action Log" },
            { src: "/clickforge-edit.png", caption: "Edit Shortcut" },
        ],
    },
    {
        id: "instagram",
        title: "IG Non-Followers",
        subtitle: "Instagram Follower Analyzer",
        iconEmoji: "📊",
        iconBg: "bg-amber-400/10 border-amber-400/30",
        date: "2026",
        description:
            "Chrome Extension (MV3) that scans your Instagram followers/following lists to identify accounts that don't follow you back. Features throttled profile checks and CSV export.",
        features: [
            "DOM parsing engine to extract followers and following lists in-browser",
            "Throttled profile checks to stay under Instagram's rate limits",
            "CSV export of non-followers for easy review",
            "Persistent settings and results via chrome.storage API",
            "Manifest V3 compliant — future-proof Chrome extension architecture",
        ],
        tags: ["JavaScript", "Chrome MV3", "DOM Parsing", "CSV Export"],
        github: "https://github.com/anvinbiju-lab/Non-Followers",
        theme: "cyan",
        platform: "chrome",
        status: "complete",
        gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    },
    {
        id: "replate",
        title: "Replate",
        subtitle: "Food-Surplus Rescue Platform",
        iconEmoji: "♻",
        iconBg: "bg-emerald-400/10 border-emerald-400/30",
        date: "2026",
        description: "A full-stack food-surplus rescue platform connecting restaurants, bakeries, and conscious diners so quality food can be rescued instead of wasted.",
        longDescription: "Replate is a production-minded sustainability project built around a simple idea: premium surplus food should reach people before it reaches a landfill. Its README describes a native PHP and MySQL application with an MVC structure, RESTful JSON API, secure password handling, PDO prepared statements, and a SQLite fallback for simpler local development.",
        features: ["Surplus food discovery for conscious diners", "Restaurant-side recovery and listing workflow", "Native PHP MVC architecture with RESTful JSON API", "BCrypt password hashing and PDO prepared statements", "MySQL production database with SQLite development fallback"],
        tags: ["PHP", "MySQL", "SQLite", "MVC", "REST API", "Sustainability"],
        github: "https://github.com/anvinbiju-lab/replate",
        theme: "cyan", platform: "web", status: "complete", gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    },
    {
        id: "hearth-kitchen",
        title: "The Hearth Kitchen",
        subtitle: "Animated Restaurant Experience",
        iconEmoji: "♨",
        iconBg: "bg-orange-400/10 border-orange-400/30",
        date: "2026",
        description: "A premium restaurant website combining cinematic motion, a searchable menu, live business hours, and a responsive guest experience.",
        longDescription: "The Hearth Kitchen is a restaurant concept site built as an exercise in expressive product presentation. Its README highlights an ember-particle atmosphere, GSAP scroll effects, Framer Motion transitions, searchable and filterable menu details, live open/closed status in the Asia/Kolkata timezone, structured SEO metadata, accessibility, and a mobile-first interaction model.",
        features: ["Ember particle background and scroll choreography", "Searchable and filterable menu with detail modal", "Live open/closed business-hours indicator", "SEO metadata and JSON-LD structured data", "Keyboard navigation, reduced motion, and mobile-first touch targets"],
        tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
        github: "https://github.com/anvinbiju-lab/The-Hearth-Kitchen",
        theme: "slate", platform: "web", status: "complete", gradient: "from-orange-500/20 via-rose-500/5 to-transparent",
    },
    {
        id: "wedding-invitation",
        title: "Hindu Wedding Invitation",
        subtitle: "Mobile-first Digital Invitation",
        iconEmoji: "✦",
        iconBg: "bg-amber-400/10 border-amber-400/30",
        date: "2026",
        description: "An elegant single-page wedding invitation demo with a traditional gold visual system, countdown, venue actions, and calendar support.",
        longDescription: "The h-demo-s repository is a silver-tier Hindu wedding invitation concept. Its README describes a mobile-first HTML, Tailwind CSS, and Vanilla JavaScript experience with a sacred emblem, gold frame, live countdown, event and venue card, copy-address feedback, directions, calendar generation, RSVP actions, family blessings, and a canvas falling-petals effect.",
        features: ["Traditional gold-gradient visual system with responsive frame", "Live countdown timer and auspicious event details", "Google Maps directions, copy address, and RSVP actions", "Apple, Outlook, and Google Calendar support", "Canvas falling petals and reduced-friction mobile actions"],
        tags: ["HTML", "Tailwind CSS", "Vanilla JavaScript", "Canvas", "Responsive UI"],
        github: "https://github.com/anvinbiju-lab/h-demo-s",
        theme: "slate", platform: "web", status: "complete", gradient: "from-amber-500/20 via-orange-500/5 to-transparent",
    },
    {
        id: "cyber-syphon",
        title: "Cyber Syphon",
        subtitle: "Cybersecurity Web Concept",
        iconEmoji: "⌁",
        iconBg: "bg-cyan/10 border-cyan/30",
        date: "2026",
        description: "A React/Vite cybersecurity project pair: a web experience and its companion application exploring a security-first product direction.",
        longDescription: "The public profile contains two related Cyber Syphon repositories: 13_cyber_syphon and 13_cybersyphon_website. Both currently expose the default React and Vite starter README, so this portfolio entry intentionally keeps the description at the verified repository level rather than inventing undocumented capabilities.",
        features: ["React and Vite application foundation", "Separate application and website repositories", "Fast local development with Vite HMR", "Public source available for inspection"],
        tags: ["JavaScript", "React", "Vite"],
        github: "https://github.com/anvinbiju-lab/13_cyber_syphon",
        theme: "cyan", platform: "web", status: "complete", gradient: "from-cyan-500/20 via-blue-500/5 to-transparent",
    },
    {
        id: "cyber-syphon-website",
        title: "Cyber Syphon Website",
        subtitle: "React / Vite Web Interface",
        iconEmoji: "↗",
        iconBg: "bg-cyan/10 border-cyan/30",
        date: "2026",
        description: "The companion website repository for the Cyber Syphon project, built on React and Vite for a fast, component-driven interface.",
        features: ["React component foundation", "Vite development workflow with HMR", "Independent public repository for the project website", "Inspectable source and iteration history"],
        tags: ["JavaScript", "React", "Vite"],
        github: "https://github.com/anvinbiju-lab/13_cybersyphon_website",
        theme: "slate", platform: "web", status: "complete", gradient: "from-sky-500/20 via-cyan-500/5 to-transparent",
    },
    {
        id: "idec",
        title: "IDEC",
        subtitle: "TypeScript Experiment",
        iconEmoji: "⌘",
        iconBg: "bg-violet-400/10 border-violet-400/30",
        date: "2026",
        description: "A public TypeScript experiment from the workshop archive, preserved as a source-led project for further exploration.",
        longDescription: "The IDEC repository is public and TypeScript-based, but it does not currently include a README describing its product behavior. This entry keeps that uncertainty visible while still making the source available from the portfolio archive.",
        features: ["TypeScript source repository", "Public GitHub project for inspection", "Open-ended workshop experiment"],
        tags: ["TypeScript"],
        github: "https://github.com/anvinbiju-lab/idec",
        theme: "slate", platform: "web", status: "complete", gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    },
    {
        id: "face",
        title: "Face",
        subtitle: "TypeScript Experiment",
        iconEmoji: "◌",
        iconBg: "bg-rose-400/10 border-rose-400/30",
        date: "2026",
        description: "A public TypeScript project in the workshop archive, included as a source-led experiment with its repository link available for context.",
        longDescription: "The Face repository is public and TypeScript-based, but no README is currently available to verify a fuller product description. The archive presents it as an experiment and links directly to the source rather than adding unverified claims.",
        features: ["TypeScript source repository", "Public GitHub project for inspection", "Open-ended workshop experiment"],
        tags: ["TypeScript"],
        github: "https://github.com/anvinbiju-lab/face",
        theme: "slate", platform: "web", status: "complete", gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    },
    {
        id: "h-demo-g",
        title: "H-Demo G",
        subtitle: "HTML Design Experiment",
        iconEmoji: "✧",
        iconBg: "bg-amber-400/10 border-amber-400/30",
        date: "2026",
        description: "A public HTML design experiment from the workshop archive, kept intentionally source-led because its repository has no README yet.",
        features: ["HTML source repository", "Public GitHub project for inspection", "Open-ended interface experiment"],
        tags: ["HTML"],
        github: "https://github.com/anvinbiju-lab/h-demo-g",
        theme: "slate", platform: "web", status: "complete", gradient: "from-amber-500/20 via-orange-500/5 to-transparent",
    },
    {
        id: "open-domains",
        title: "Open Domains",
        subtitle: "Open-source Domain Registration",
        iconEmoji: "◎",
        iconBg: "bg-emerald-400/10 border-emerald-400/30",
        date: "2026",
        description: "A contribution to the open-domains register project, a community-maintained system for free subdomains for personal sites and open-source projects.",
        longDescription: "The register repository is a fork of open-domains/register. Its README describes a community project offering free subdomains for personal websites and open-source projects. It is marked as a fork in the GitHub profile, so this portfolio treats it as a contribution and learning trail rather than an original product claim.",
        features: ["Free subdomains for personal sites and open-source projects", "Community-driven domain registration workflow", "Forked public repository with upstream context"],
        tags: ["JavaScript", "Open Source", "Domains"],
        github: "https://github.com/anvinbiju-lab/register",
        theme: "cyan", platform: "web", status: "complete", gradient: "from-emerald-500/20 via-cyan-500/5 to-transparent",
    },
    {
        id: "portfolio-astra",
        title: "Portfolio Astra",
        subtitle: "Cinematic Developer Portfolio",
        iconEmoji: "✳",
        iconBg: "bg-violet-400/10 border-violet-400/30",
        date: "2026",
        description: "This portfolio itself: a Next.js experience with a 105-frame scroll-driven hero, interactive project showcases, floating screenshots, and touch-adapted motion.",
        longDescription: "Portfolio Astra is the current portfolio system. Its README documents the original cinematic hero, interactive case studies, floating screenshot stacks, responsive scroll and touch animations, reduced-motion alternatives, project metadata, and an honest contact handoff that opens an email draft instead of pretending to send from a backend.",
        features: ["105-frame scroll-driven cinematic hero", "Floating project index with hover and touch interactions", "Responsive motion chapters and project showcases", "Ten individual project pages with metadata", "Reduced-motion alternatives and mobile interaction support"],
        tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Responsive Motion"],
        github: "https://github.com/anvinbiju-lab/portfolio-astra",
        theme: "slate", platform: "web", status: "active", gradient: "from-violet-500/20 via-cyan-500/5 to-transparent",
    },
    {
        id: "portfolio-legacy",
        title: "Portfolio",
        subtitle: "Earlier Portfolio Build",
        iconEmoji: "⌁",
        iconBg: "bg-slate/10 border-slate/30",
        date: "2026",
        description: "An earlier public portfolio repository, preserved in the archive as part of the evolution of Anvin’s design and development practice.",
        longDescription: "The Portfolio repository is public and TypeScript-based, but does not currently include a README with a verified product description. It is represented here as an earlier portfolio build and linked directly to GitHub for the full source context.",
        features: ["TypeScript source repository", "Public GitHub project for inspection", "Earlier portfolio iteration"],
        tags: ["TypeScript"],
        github: "https://github.com/anvinbiju-lab/Portfolio",
        theme: "slate", platform: "web", status: "complete", gradient: "from-slate-500/20 via-violet-500/5 to-transparent",
    },
]

export function getAllProjects(): Project[] {
    return PROJECTS
}

export function getProjectById(id: string): Project | undefined {
    return PROJECTS.find((p) => p.id === id)
}
