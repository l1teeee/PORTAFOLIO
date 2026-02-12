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
            title: "Amplitude Foundations — Analytics",
            institution: "Amplitude",
            date: "2026",
            url: "https://www.credly.com/badges/26e42dc5-a63d-4a0b-8577-098e3cf76bec",
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
