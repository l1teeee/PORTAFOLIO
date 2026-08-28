// src/components/react/ProjectsList.tsx
import { EntryList } from "@/components/react/EntryList";

interface Project {
    title: string;
    titleSuffix?: string;
    meta: string;
    url: string;
}

const PROJECTS: Project[] = [
    {
        title: "VIELINKS",
        titleSuffix: "Social Media Management SaaS",
        meta: "2025 - 2026 / Fullstack & Backend Developer / 200+ active users / React, TypeScript, Fastify, MySQL, AWS",
        url: "https://vielinks.com/",
    },
    {
        title: "AMETIA PLUS",
        meta: "2025 / Frontend & Backend Integration Developer / React.js, Java 8+, RxJava, GCP, Kubernetes, GitHub Actions",
        url: "https://ametiaplus.com/",
    },
    {
        title: "OPENTABLE",
        titleSuffix: "Restaurant Order & Table System",
        meta: "2025 / Fullstack Developer / Next.js, Java 8+, REST APIs, Hexagonal Architecture, Kafka, GCP",
        url: "",
    },
    {
        title: "UT",
        titleSuffix: "AI Chat Platform",
        meta: "2025 / Fullstack Developer / Next.js, C#, Claude AI, Firebase, Go, GCP, Kubernetes",
        url: "https://front-ut.vercel.app/",
    },
    {
        title: "InkyTap",
        titleSuffix: "Digital Library Platform",
        meta: "2025 / Fullstack Developer / Next.js, Node.js, MongoDB, AWS S3, Event-driven Architecture",
        url: "https://inkytap.com/",
    },
    {
        title: "KALEO",
        titleSuffix: "Experimental Landing Experience",
        meta: "2025 / Frontend Developer / Next.js, React, GSAP, Lenis, TailwindCSS",
        url: "https://kaleo-usx2.onrender.com/",
    },
];

export function ProjectsList() {
    const entries = PROJECTS.map((project) => ({
        title: project.title,
        meta: [project.titleSuffix, project.meta].filter(Boolean).join(" / "),
        url: project.url,
    }));

    return <EntryList entries={entries} titleSize="lg" />;
}
