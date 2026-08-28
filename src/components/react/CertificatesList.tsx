// src/components/react/CertificatesList.tsx
import { EntryList } from "@/components/react/EntryList";

interface Certificate {
    title: string;
    institution: string;
    date: string;
    url: string;
}

const CERTIFICATES: Certificate[] = [
    {
        title: "MCP Advanced",
        institution: "Anthropic",
        date: "2026",
        url: "http://verify.skilljar.com/c/dxsgca4zeyqe",
    },
    {
        title: "Agentic AI",
        institution: "Amazon Web Services",
        date: "2026",
        url: "https://www.credly.com/badges/ca95cfd0-5889-471b-a5f3-2c4e5c1bb5d6",
    },
    {
        title: "GenAI Applications",
        institution: "MongoDB",
        date: "2026",
        url: "https://www.credly.com/badges/d5d23d8d-31da-440e-a4b0-d13ddcc62bff",
    },
    {
        title: "Cloud Security Foundations",
        institution: "Amazon Web Services",
        date: "2025",
        url: "https://www.credly.com/badges/e1f84d75-92e6-4aab-bd04-6d492a270737",
    },
    {
        title: "Cloud Operations",
        institution: "Amazon Web Services",
        date: "2025",
        url: "https://www.credly.com/badges/d00e8e0e-26d9-4af3-8460-541f7fc5dcc9",
    },
    {
        title: "Machine Learning Foundations",
        institution: "Amazon Web Services",
        date: "2025",
        url: "https://www.credly.com/badges/32c22b36-39d2-4b61-a9ce-1ef0ee19a61f",
    },
    {
        title: "Google Cloud Cybersecurity Certificate",
        institution: "Google Cloud",
        date: "2026",
        url: "https://www.credly.com/badges/aaef83f6-518c-4d89-8457-04dd616995cd",
    },
    {
        title: "Product-led Certification",
        institution: "Pendo",
        date: "2026",
        url: "https://www.credly.com/badges/5143d805-cf46-4450-9c49-ccf94da609df",
    },
    {
        title: "Product Analytics Certification",
        institution: "Pendo",
        date: "2026",
        url: "https://www.credly.com/badges/4a138ca1-9539-4247-89b8-d165381eab3c",
    },
    {
        title: "Product Discovery Certification",
        institution: "Pendo",
        date: "2026",
        url: "https://www.credly.com/badges/66c714c0-78a2-48bd-9545-ee99391386a7",
    },
    {
        title: "Amplitude Foundations - Analytics",
        institution: "Amplitude",
        date: "2026",
        url: "https://www.credly.com/badges/26e42dc5-a63d-4a0b-8577-098e3cf76bec",
    },
    {
        title: "Amplitude Foundations - Data Management",
        institution: "Amplitude",
        date: "2026",
        url: "https://www.credly.com/badges/98cc57bf-0e9f-4fee-b24d-919e37eac090",
    },
    {
        title: "Scrum Master",
        institution: "ESIT",
        date: "2025",
        url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/9b25361c-e371-4e84-956a-0280e9436428",
    },
    {
        title: "Project Management and Agile Methodologies",
        institution: "Platzi",
        date: "2025",
        url: "https://platzi.com/p/alejandro23.am29/ruta/30147-gestion-proyectos-metodologias-agiles/diploma/detalle/",
    },
    {
        title: "Leadership and Team Management",
        institution: "Platzi",
        date: "2025",
        url: "https://platzi.com/p/alejandro23.am29/ruta/30142-liderazgo-gestion-equipos/diploma/detalle/",
    },
    {
        title: "Productivity and Digital Tools",
        institution: "Platzi",
        date: "2026",
        url: "https://platzi.com/p/alejandro23.am29/ruta/30146-productividad-herramientas-digitales/diploma/detalle/",
    },
    {
        title: "Philosophy and Strategy for Leaders",
        institution: "Platzi",
        date: "2025",
        url: "https://platzi.com/p/alejandro23.am29/ruta/30150-ruta/diploma/detalle/",
    },
];

export function CertificatesList() {
    const entries = CERTIFICATES.map((cert) => ({
        title: cert.title,
        meta: `${cert.date} / ${cert.institution}`,
        url: cert.url,
    }));

    return <EntryList entries={entries} titleSize="md" />;
}
