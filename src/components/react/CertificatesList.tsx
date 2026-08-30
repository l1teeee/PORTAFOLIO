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
        title: "Claude 101",
        institution: "Anthropic",
        date: "2026",
        url: "https://verify.skilljar.com/c/t327fwoet4ma",
    },
    {
        title: "MCP Advanced",
        institution: "Anthropic",
        date: "2026",
        url: "https://verify.skilljar.com/c/dxsgca4zeyqe",
    },
    {
        title: "AI Fluency Framework & Foundations",
        institution: "Anthropic",
        date: "2026",
        url: "https://verify.skilljar.com/c/rypm8mfka8ke",
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
        url: "https://www.credly.com/badges/d5d23d8d-31da-440e-a4b0-d13ddcc62bff/linked_in_profile",
    },
    {
        title: "MongoDB Overview: Core Concepts and Architecture",
        institution: "MongoDB",
        date: "2026",
        url: "https://www.credly.com/badges/c70f64cd-83c4-4715-b3b5-3f856041864b/linked_in_profile",
    },
    {
        title: "Machine Learning Foundations",
        institution: "Amazon Web Services",
        date: "2025",
        url: "https://www.credly.com/badges/32c22b36-39d2-4b61-a9ce-1ef0ee19a61f/public_url",
    },
    {
        title: "Product Management Basics Certification",
        institution: "Pendo",
        date: "2026",
        url: "https://www.credly.com/badges/b9bbc4d7-f755-4406-87f7-603ad16505b9/linked_in_profile",
    },
    {
        title: "Product Analytics Certification",
        institution: "Pendo",
        date: "2026",
        url: "https://www.credly.com/badges/4a138ca1-9539-4247-89b8-d165381eab3c/linked_in_profile",
    },
    {
        title: "Product Discovery Certification",
        institution: "Pendo",
        date: "2026",
        url: "https://www.credly.com/badges/66c714c0-78a2-48bd-9545-ee99391386a7/linked_in_profile",
    },
    {
        title: "Product-led Certification",
        institution: "Pendo",
        date: "2026",
        url: "https://www.credly.com/badges/5143d805-cf46-4450-9c49-ccf94da609df/linked_in_profile",
    },
    {
        title: "Amplitude Foundations - Data Management",
        institution: "Amplitude",
        date: "2026",
        url: "https://www.credly.com/badges/98cc57bf-0e9f-4fee-b24d-919e37eac090/linked_in_profile",
    },
    {
        title: "Amplitude Foundations - Analytics",
        institution: "Amplitude",
        date: "2026",
        url: "https://www.credly.com/badges/26e42dc5-a63d-4a0b-8577-098e3cf76bec/linked_in_profile",
    },
    {
        title: "Google Cloud Cybersecurity Certificate",
        institution: "Google Cloud",
        date: "2026",
        url: "https://www.credly.com/badges/aaef83f6-518c-4d89-8457-04dd616995cd/linked_in_profile",
    },
    {
        title: "Cloud Operations",
        institution: "Amazon Web Services",
        date: "2025",
        url: "https://www.credly.com/badges/d00e8e0e-26d9-4af3-8460-541f7fc5dcc9/public_url",
    },
    {
        title: "Cloud Security Foundations",
        institution: "Amazon Web Services",
        date: "2025",
        url: "https://www.credly.com/badges/e1f84d75-92e6-4aab-bd04-6d492a270737/public_url",
    },
    {
        title: "Project Management and Agile Methodologies",
        institution: "Platzi",
        date: "2025",
        url: "https://platzi.com/p/alejandro23.am29/ruta/30147-gestion-proyectos-metodologias-agiles/diploma/detalle/",
    },
    {
        title: "Scrum Product Owner (Scrum II)",
        institution: "ESIT",
        date: "2025",
        url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/811bfc84-3ca0-4251-b490-f5fe33b066ed",
    },
    {
        title: "Scrum Product Owner Avanzado (Scrum III)",
        institution: "ESIT",
        date: "2025",
        url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/3db48483-5fef-4aed-a6ff-36dceb84590d",
    },
    {
        title: "Introducción a SCRUM (Scrum I)",
        institution: "ESIT",
        date: "2025",
        url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/8bbe4bf6-8b5e-4745-8b8c-8028d06df260",
    },
    {
        title: "Scrum Master (Scrum IV)",
        institution: "ESIT",
        date: "2025",
        url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/9b25361c-e371-4e84-956a-0280e9436428",
    },
    {
        title: "Fundamentos de la Gobernanza en el Entorno Digital",
        institution: "ESIT",
        date: "2025",
        url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/b1675a5d-c4ec-4523-97b9-f122aa4dec19",
    },
    {
        title: "Gestión de Gobernabilidad y Datos",
        institution: "ESIT",
        date: "2025",
        url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/c0ff765a-b6b8-4cc0-bc5e-1e0dea516ff5",
    },
    {
        title: "Gestión de gobierno de datos, protección y cumplimiento",
        institution: "ESIT",
        date: "2025",
        url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/5d469797-fdd0-4b05-93da-35ee680d92cc",
    },
    {
        title: "Leadership and Team Management",
        institution: "Platzi",
        date: "2025",
        url: "https://platzi.com/p/alejandro23.am29/ruta/30142-liderazgo-gestion-equipos/diploma/detalle/",
    },
    {
        title: "Philosophy and Strategy for Leaders",
        institution: "Platzi",
        date: "2025",
        url: "https://platzi.com/p/alejandro23.am29/ruta/30150-filosofia-estrategia-lideres/diploma/detalle/",
    },
    {
        title: "Productivity and Digital Tools",
        institution: "Platzi",
        date: "2026",
        url: "https://platzi.com/p/alejandro23.am29/ruta/30146-productividad-herramientas-digitales/diploma/detalle/",
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
