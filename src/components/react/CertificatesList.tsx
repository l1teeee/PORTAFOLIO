// src/components/react/CertificatesList.tsx
import type { RefObject } from "react";

interface Certificate {
    title: string;
    institution: string;
    date: string;
    url: string;
}

interface CertificatesListProps {
    baseColor?: string;
    hoverColor?: string;
    bioRef?: RefObject<HTMLDivElement>;
}

export function CertificatesList({
                                     baseColor = "#ffffff",
                                     hoverColor = "rgba(255,255,255,0.45)",
                                     bioRef,
                                 }: CertificatesListProps) {
    const certificates: Certificate[] = [
        {
            title: "Productivity and Digital Tools",
            institution: "Platzi",
            date: "2026",
            url: "https://platzi.com/p/alejandro23.am29/ruta/30146-productividad-herramientas-digitales/diploma/detalle/",
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
            title: "Philosophy and Strategy for Leaders",
            institution: "Platzi",
            date: "2025",
            url: "https://platzi.com/p/alejandro23.am29/ruta/30150-ruta/diploma/detalle/",
        },
        {
            title: "Amazon Web Services (AWS) Cloud Operations",
            institution: "AWS",
            date: "2025",
            url: "https://www.credly.com/badges/d00e8e0e-26d9-4af3-8460-541f7fc5dcc9/public_url",
        },
        {
            title: "Amazon Web Services (AWS) Cloud Security Foundations",
            institution: "AWS",
            date: "2025",
            url: "https://www.credly.com/badges/e1f84d75-92e6-4aab-bd04-6d492a270737/public_url",
        },
        {
            title: "Amazon Web Services (AWS) Machine Learning Foundations",
            institution: "AWS",
            date: "2025",
            url: "https://www.credly.com/badges/32c22b36-39d2-4b61-a9ce-1ef0ee19a61f/public_url",
        },
        {
            title:
                "Introduction to the Agile Project Management Methodology: SCRUM (Scrum I)",
            institution: "ESIT",
            date: "2025",
            url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/8bbe4bf6-8b5e-4745-8b8c-8028d06df260",
        },
        {
            title:
                "Agile Project Management Methodologies: Scrum Product Owner (Scrum II)",
            institution: "ESIT",
            date: "2025",
            url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/811bfc84-3ca0-4251-b490-f5fe33b066ed",
        },
        {
            title: "Advanced Scrum Product Owner (Scrum III)",
            institution: "ESIT",
            date: "2025",
            url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/3db48483-5fef-4aed-a6ff-36dceb84590d",
        },
        {
            title: "Scrum Master (Scrum IV)",
            institution: "ESIT",
            date: "2025",
            url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/9b25361c-e371-4e84-956a-0280e9436428",
        },
        {
            title: "Digital Governance Fundamentals",
            institution: "ESIT",
            date: "2025",
            url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/b1675a5d-c4ec-4523-97b9-f122aa4dec19",
        },
        {
            title: "Data Governance Management, Protection, and Compliance",
            institution: "ESIT",
            date: "2025",
            url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/5d469797-fdd0-4b05-93da-35ee680d92cc",
        },
        {
            title: "Data Governance and Management",
            institution: "ESIT",
            date: "2025",
            url: "https://formacioncontinua.esit.gob.sv/curso/share-certificate/c0ff765a-b6b8-4cc0-bc5e-1e0dea516ff5",
        },
    ];

    return (
        <div
            ref={bioRef}
            style={
                {
                    ["--base" as any]: baseColor,
                    ["--hover" as any]: hoverColor,
                    color: baseColor, // fuerza el texto base
                } as React.CSSProperties
            }
            className="absolute bottom-8 md:bottom-16 right-0 md:right-4 w-full max-w-3xl"
        >
            <div className="overflow-y-auto max-h-[60vh] md:max-h-[55vh] pr-2 scrollbar-hide">
                <ul className="space-y-10 md:space-y-12">
                    {certificates.map((cert, index) => (
                        <li key={`${cert.title}-${index}`} className="group">
                            <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-right transition-all duration-500"
                            >
                                {/* Título grande */}
                                <h3 className="relative inline-block leading-[0.92] tracking-tight font-extralight text-[clamp(2.1rem,5.2vw,4.2rem)] text-[color:var(--base)] group-hover:text-[color:var(--hover)] transition-colors duration-500 ">
                                    <span className="font-extralight">{cert.title}</span>

                                    {/* Subrayado animado */}
                                    <span className="absolute right-0 -bottom-1 h-[1px] w-0 bg-current group-hover:w-full transition-all duration-500" />
                                </h3>

                                {/* Institución y fecha - SIN cambio de color en hover */}
                                <div className="mt-2 text-[10px] md:text-xs font-bold text-[color:var(--base)]/80">
                                    {cert.date} / {cert.institution}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
