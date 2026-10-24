// src/components/react/ExperienceList.tsx
import { EntryList, type Entry } from "@/components/react/EntryList";

const EXPERIENCE: Entry[] = [
    {
        title: "Banco Cuscatlán",
        meta: "Nov 2025 - Present / Front-End Developer & QA Analyst / Angular, TypeScript, Jest, digital banking workflows, QA and pre-production validation",
        url: "",
    },
    {
        title: "Numen Agency",
        meta: "Jun 2024 - Present / Founder & Product Engineer / 12+ client projects, 5 production products and an ERP in development, 10K+ users / React, Next.js, Node.js, Python, PostgreSQL, AWS, GCP, Docker",
        url: "https://delta-numen.com/",
    },
    {
        title: "Cresium",
        meta: "Jan 2026 - Sep 2026 / Product Engineer & Software Engineer, contract / Enterprise financial monitoring platform, Anthropic Claude API, LLM workflows, Forward Deployed Engineering",
        url: "",
    },
    {
        title: "Litebox",
        meta: "Aug 2025 - Jan 2026 / AI Automation Engineer, contract / Hybrid RAG & agentic workflows, contributed to 70% less manual processing and 40% lower operational costs / Python, OpenAI, Claude, Gemini, Ollama, n8n, Playwright",
        url: "",
    },
    {
        title: "Ukiyo",
        meta: "Oct 2024 - Nov 2025 / Full Stack Developer & IT Administrator / 4 banking apps from the ground up, 5 production environments on AWS and GCP, CI/CD automation, PHP/WordPress platforms",
        url: "",
    },
    {
        title: "Platform, Cloud & SRE",
        meta: "Jan 2025 - Jun 2025 / Platform, Cloud & SRE Engineer, contract, enterprise client (NDA) / Multi-cloud EKS + GKE Kubernetes PoC through Istio / Terraform, GitHub Actions, SonarQube",
        url: "",
    },
    {
        title: "Fiscalía General de la República",
        meta: "Jan 2024 - May 2024 / Network & IT Support Intern / Connectivity, troubleshooting and infrastructure maintenance",
        url: "",
    },
    {
        title: "Colegio Don Bosco",
        meta: "May 2023 - Nov 2023 / Frontend Developer & Server Administrator, internship / React, server monitoring, database optimization, firewall, IDS",
        url: "",
    },
];

export function ExperienceList() {
    return <EntryList entries={EXPERIENCE} titleSize="md" />;
}
