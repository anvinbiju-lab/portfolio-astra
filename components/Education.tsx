"use client"
import { Reveal, SectionLabel } from "./Editorial"
const records = [
    { year: "2025 — PRESENT", title: "B.Tech CSE", detail: "Cybersecurity · 2nd Year", place: "Holy Grace Academy of Engineering, Mala", board: "APJ Abdul Kalam Technological University (KTU)", score: "IN PROGRESS" },
    { year: "2023 — 2025", title: "Higher Secondary", detail: "Computer Science · 12th Grade", place: "GSHSS Meladoor, Thrissur", board: "Kerala State Board", score: "83%" },
    { year: "2023", title: "Secondary Education", detail: "10th Grade", place: "Elenthikkara High School, Ernakulam", board: "Kerala State Board", score: "91%" },
]
export default function Education() {
    return <section id="education" className="editorial-section education"><SectionLabel number="06" aside="THE STORY SO FAR">FOUNDATIONS</SectionLabel><Reveal><h2 className="display">STILL LEARNING.<br /><em>ALWAYS WILL BE.</em></h2></Reveal><div className="education-list">{records.map(record => <Reveal key={record.year}><article><span className="micro education-year">{record.year}</span><div><h3>{record.title}</h3><span className="education-detail">{record.detail}</span><p>{record.place}</p><span className="micro">{record.board}</span></div><span className="education-score micro">{record.score}</span></article></Reveal>)}</div></section>
}
