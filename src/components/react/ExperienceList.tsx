// src/components/react/ExperienceList.tsx
import { EntryList, type Entry } from "@/components/react/EntryList";

const EXPERIENCE: Entry[] = [
    {
        title: "Banco Cuscatlán",
        meta: "Nov 2025 - Present / Frontend Developer / Angular, TypeScript, reusable component architectures for banking platforms",
        url: "",
    },
    {
        title: "Numen Agency",
        meta: "2024 - Present / Founder & Technical Lead / 12+ client projects, 6+ production products, 10K+ users / React, Next.js, Node.js, Python, PostgreSQL, AWS, GCP, Docker",
        url: "https://delta-numen.com/",
    },
    {
        title: "Platform Engineering",
        meta: "2026 / Freelance Platform Engineer, enterprise client (NDA) / Terraform, Kubernetes, EKS, GKE, Istio, GitHub Actions, SonarQube",
        url: "",
    },
    {
        title: "AI Automation",
        meta: "2026 / Freelance AI Automation Engineer, enterprise client (NDA) / Hybrid RAG & agentic workflows / Python, OpenAI, Claude, Gemini, Ollama, n8n, Playwright",
        url: "",
    },
    {
        title: "Cloud & SRE",
        meta: "2025 / Freelance Cloud & SRE Engineer, enterprise client (NDA) / Multi-cloud Kubernetes PoC, EKS + GKE through Istio, Terraform",
        url: "",
    },
    {
        title: "Ukiyo",
        meta: "Oct 2024 - Nov 2025 / IT Administrator & Full-Stack Developer / 4 banking apps, 500+ users / AWS, GCP, Jenkins, GitHub Actions, GitLab CI, Prometheus, Grafana, ELK",
        url: "",
    },
    {
        title: "Fiscalía General de la República",
        meta: "Jan 2024 - May 2024 / Network Administrator, internship / LAN/WAN, ACLs, VLANs, perimeter security, backup automation",
        url: "",
    },
    {
        title: "Colegio Don Bosco",
        meta: "May 2023 - Nov 2023 / Frontend Developer & Server Administrator, internship / React.js, server monitoring, firewall, IDS",
        url: "",
    },
];

export function ExperienceList() {
    return <EntryList entries={EXPERIENCE} titleSize="md" />;
}
