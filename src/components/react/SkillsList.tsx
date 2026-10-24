// src/components/react/SkillsList.tsx
import { EntryList, type Entry } from "@/components/react/EntryList";

const SKILLS: Entry[] = [
    {
        title: "Engineering & Product",
        meta: "Software Engineering, Product Engineering, System Design, Solution Architecture, Product Development, API Integration, CI/CD, QA",
        url: "",
    },
    {
        title: "Development",
        meta: "TypeScript, Python, JavaScript, React, Node.js, Next.js, Angular, PostgreSQL, MySQL",
        url: "",
    },
    {
        title: "AI & Automation",
        meta: "LLMs, RAG, Agentic Workflows, OpenAI, Claude, Gemini, Ollama, Vector Databases, n8n, OpenClaw",
        url: "",
    },
    {
        title: "Cloud & Platform",
        meta: "AWS, GCP, Kubernetes, Docker, Terraform, EKS, GKE, Istio, GitHub Actions, Jenkins, Linux, Bash",
        url: "",
    },
    {
        title: "Testing",
        meta: "Jest, Playwright, SonarQube/SonarCloud",
        url: "",
    },
];

export function SkillsList() {
    return <EntryList entries={SKILLS} titleSize="md" />;
}
