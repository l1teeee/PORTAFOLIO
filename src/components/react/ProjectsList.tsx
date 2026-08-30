// src/components/react/ProjectsList.tsx
import { EntryList } from "@/components/react/EntryList";

interface Project {
    title: string;
    titleSuffix?: string;
    meta: string;
    url: string;
}

// Selected work and brand concepts from delta-numen.com, plus earlier independent projects
const PROJECTS: Project[] = [
    {
        title: "VIELINKS",
        titleSuffix: "Social Media Management SaaS",
        meta: "2025 - 2026 / Fullstack & Backend Developer / 200+ active users / React, TypeScript, Fastify, MySQL, AWS",
        url: "https://vielinks.com/",
    },
    {
        title: "ScoutIA",
        titleSuffix: "Local Business Prospecting Workspace",
        meta: "2026 / Platform, Numen Agency / Next.js, TypeScript, Tailwind CSS, Framer Motion",
        url: "https://scoutia.dev/landing",
    },
    {
        title: "WhatsApp Ops",
        titleSuffix: "Live Order Queue & Operations Dashboard",
        meta: "2026 / Dashboard, Numen Agency / React, TypeScript, Vite, Tailwind CSS, TanStack Query",
        url: "https://dashboard-bot-whatsapp.vercel.app",
    },
    {
        title: "ServiLocal",
        titleSuffix: "Local Services Marketplace for El Salvador",
        meta: "2026 / Platform, Numen Agency / Next.js, TypeScript, Tailwind CSS",
        url: "https://servilocal-three.vercel.app",
    },
    {
        title: "InkyTap",
        titleSuffix: "Digital Library Platform",
        meta: "2025 / Fullstack Developer / Next.js, Node.js, MongoDB, AWS S3, Event-driven Architecture",
        url: "https://inkytap.com/",
    },
    {
        title: "Aeriform",
        titleSuffix: "Brand Concept",
        meta: "Architecture studio / Web concept, Numen Agency / Editorial direction with centered typography, spatial rhythm and a quiet, precise interface",
        url: "https://aeri-self.vercel.app/",
    },
    {
        title: "Savia Café",
        titleSuffix: "Brand Concept",
        meta: "Specialty coffee roastery / Web concept, Numen Agency / Warm editorial direction with origin storytelling and natural texture",
        url: "https://savia-cafe-nu.vercel.app/",
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
