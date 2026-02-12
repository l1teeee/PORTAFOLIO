// src/components/react/ProjectsList.tsx
import type { RefObject } from "react";

interface Project {
    title: string;
    meta: string;
    url: string;
    titleSuffix?: string;
}

interface ProjectsListProps {
    baseColor?: string;
    hoverColor?: string;
    bioRef?: RefObject<HTMLDivElement>;
}

export function ProjectsList({
                                 baseColor = "#ffffff",
                                 hoverColor = "rgba(255,255,255,0.45)",
                                 bioRef,
                             }: ProjectsListProps) {
    const projects: Project[] = [
        {
            title: "AMETIA",
            titleSuffix: "PLUS",
            meta: "2025 / Frontend Developer / React.js, Node.js",
            url: "https://ametiaplus.com/",
        },
        {
            title: "OPENTABLE",
            titleSuffix: "Restaurant System",
            meta: "2025 / Fullstack Developer / Next.js, Laravel",
            url: "",
        },
        {
            title: "UT",
            titleSuffix: "AI Chat",
            meta: "2025 / Fullstack Developer / Next.js, Python, Claude Haiku 4.5",
            url: "https://front-ut.vercel.app/",
        },
        {
            title: "InkyTap",
            titleSuffix: "Digital Library",
            meta: "2025 / Fullstack Developer / Next.js, Node.js, MongoDB, AWS S3",
            url: "https://inkytap.com/",
        },
        {
            title: "KALEO",
            titleSuffix: "Experimental landing",
            meta: "2025 / Fullstack Developer / Next.js, React, GSAP, LENIS",
            url: "https://kaleo-usx2.onrender.com/",
        }
    ];

    const Title = ({ p }: { p: Project }) => (
        <h3 className="relative inline-block leading-[0.92] tracking-tight font-thin text-[clamp(2.1rem,5.2vw,4.2rem)] text-[color:var(--base)] group-hover:text-[color:var(--hover)] transition-colors duration-500">
            <span className="font-thin">{p.title}</span>
            {p.titleSuffix ? (
                <>
                    {" "}
                    <span className="font-thin opacity-90">{p.titleSuffix}</span>
                </>
            ) : null}

            <span className="absolute right-0 -bottom-1 h-[1px] w-0 bg-current group-hover:w-full transition-all duration-500" />
        </h3>
    );

    const Meta = ({ p }: { p: Project }) => (
        <div className="mt-2 text-[10px] md:text-xs font-light text-[color:var(--base)]/80">
            {p.meta}
        </div>
    );

    return (
        <div
            ref={bioRef}
            style={
                {
                    ["--base" as any]: baseColor,
                    ["--hover" as any]: hoverColor,
                    color: baseColor,
                } as React.CSSProperties
            }
            className="absolute bottom-8 md:bottom-16 right-0 md:right-4 w-full max-w-3xl"
        >
            <div className="overflow-y-auto max-h-[60vh] md:max-h-[55vh] pr-2 scrollbar-hide">
                <ul className="space-y-10 md:space-y-12">
                    {projects.map((p, index) => (
                        <li key={`${p.title}-${index}`} className="group text-right">
                            {p.url ? (
                                <a
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition-all duration-500"
                                >
                                    <Title p={p} />
                                    <Meta p={p} />
                                </a>
                            ) : (
                                <div className="block transition-all duration-500">
                                    <Title p={p} />
                                    <Meta p={p} />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
