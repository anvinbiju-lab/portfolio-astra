import Navbar from "@/components/Navbar"
import Hero from "@/components/HeroExperience"
import Footer from "@/components/Footer"
import CursorGlow from "@/components/CursorGlow"
import dynamic from "next/dynamic"
import ReturnPosition from "@/components/ReturnPosition"

// Dynamically import below-the-fold sections
const About = dynamic(() => import("@/components/About"))
const Skills = dynamic(() => import("@/components/Skills"))
const Projects = dynamic(() => import("@/components/Projects"))
const Achievements = dynamic(() => import("@/components/Achievements"))
const Education = dynamic(() => import("@/components/Education"))
const Contact = dynamic(() => import("@/components/Contact"))
const SystemLab = dynamic(() => import("@/components/SystemLab"))
const ScrollManifesto = dynamic(() => import("@/components/ScrollManifesto"))

export default function Home() {
    return (
        <main className="portfolio-main">
            <ReturnPosition />
            {/* Client-side cursor component for desktop */}
            <CursorGlow />

            <Navbar />

            {/* Sections */}
            <div className="page-sections">
                <Hero />
                <About />
                <ScrollManifesto />
                <Projects />
                <Skills />
                <SystemLab />
                <Achievements />
                <Education />
                <Contact />
            </div>

            <Footer />

        </main>
    )
}
