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
            title: "Leadership and Team Management",
            institution: "Platzi",
            date: "December.2024",
            url: "https://platzi.com/certificate",
        },
        {
            title: "Project Management and Agile Methodologies",
            institution: "Platzi",
            date: "November.2024",
            url: "https://platzi.com/certificate",
        },
        {
            title: "Philosophy and Strategy for Leaders",
            institution: "Platzi",
            date: "October.2024",
            url: "https://platzi.com/certificate",
        },
        {
            title: "AWS Solutions Architect",
            institution: "Amazon Web Services",
            date: "September.2024",
            url: "https://aws.amazon.com/certificate",
        },
    ];

    return (
        <div
            ref={bioRef}
            style={
                {
                    ["--base" as any]: baseColor,
                    ["--hover" as any]: hoverColor,
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
                                <h3 className="relative inline-block leading-[0.92] tracking-tight font-extralight text-[clamp(2.1rem,5.2vw,4.2rem)] text-[color:var(--base)] group-hover:text-[color:var(--hover)] transition-colors duration-500 drop-shadow-md">
                                    <span className="font-extralight">{cert.title}</span>

                                    {/* Subrayado animado */}
                                    <span className="absolute right-0 -bottom-1 h-[1px] w-0 bg-current group-hover:w-full transition-all duration-500" />
                                </h3>

                                {/* Institución y fecha */}
                                <div className="mt-2 text-[10px] md:text-xs font-light text-[color:var(--base)]/80 group-hover:text-[color:var(--hover)]/80 transition-colors duration-500">
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
