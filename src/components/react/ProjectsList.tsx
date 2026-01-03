// src/components/react/ProjectsList.tsx
import type { RefObject } from "react";

interface Project {
    title: string;
    meta: string;
    url: string;
    titleSuffix?: string;
}

interface ProjectsListProps {
    baseColor?: string; // por defecto (blanco)
    hoverColor?: string; // color al hover (gris)
    bioRef?: RefObject<HTMLDivElement>;
}

export function ProjectsList({
                                 baseColor = "#ffffff",
                                 hoverColor = "rgba(255,255,255,0.45)",
                                 bioRef,
                             }: ProjectsListProps) {
    const projects: Project[] = [
        {
            title: "GYOKURO",
            titleSuffix: "Studio",
            meta: "October.2025 / Dev / Design: Hiroaki Nakano",
            url: "https://example.com/gyokuro",
        },
        {
            title: "VISIONS",
            titleSuffix: "2026",
            meta: "September.2025 / Dev / Design: PUNCH",
            url: "https://example.com/visions",
        },
        {
            title: "MUSINSA",
            titleSuffix: "STYLE GPS",
            meta: "Jun.2025 / Dev / Design: Hiroaki Nakano",
            url: "https://example.com/musinsa",
        },
        {
            title: "Lilas Ikuta meets",
            titleSuffix: "COACH",
            meta: "April.2025 / Dev / Design: Hiroaki Nakano",
            url: "https://example.com/coach",
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
                    {projects.map((p) => (
                        <li key={`${p.title}-${p.url}`} className="group">
                            <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-right transition-all duration-500"
                            >
                                {/* Título grande */}
                                <h3 className="relative inline-block leading-[0.92] tracking-tight font-extralight text-[clamp(2.1rem,5.2vw,4.2rem)] text-[color:var(--base)] group-hover:text-[color:var(--hover)] transition-colors duration-500 drop-shadow-md">
                                    <span className="font-extralight">{p.title}</span>
                                    {p.titleSuffix ? (
                                        <>
                                            {" "}
                                            <span className="font-thin opacity-90">{p.titleSuffix}</span>
                                        </>
                                    ) : null}

                                    {/* Subrayado animado */}
                                    <span className="absolute right-0 -bottom-1 h-[1px] w-0 bg-current group-hover:w-full transition-all duration-500" />
                                </h3>

                                {/* Meta pequeño debajo */}
                                <div className="mt-2 text-[10px] md:text-xs font-light text-[color:var(--base)]/80 group-hover:text-[color:var(--hover)]/80 transition-colors duration-500">
                                    {p.meta}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
