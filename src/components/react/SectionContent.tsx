// src/components/react/SectionContent.tsx
import { useEffect, type RefObject } from "react";
import type { Section } from "@/types";
import { gsap } from "@/lib/gsap";
import { Bio } from "@/components/react/Bio";
import { Contact } from "@/components/react/Contact";
import { Education } from "@/components/react/Education";
import { ExperienceList } from "@/components/react/ExperienceList";
import { SkillsList } from "@/components/react/SkillsList";
import { ProjectsList } from "@/components/react/ProjectsList";
import { CertificatesList } from "@/components/react/CertificatesList";

interface SectionContentProps {
    contentRef: RefObject<HTMLDivElement | null>;
    activeSection: Section;
}

export function SectionContent({ contentRef, activeSection }: SectionContentProps) {
    // Every block marked data-reveal cascades in when a section appears
    useEffect(() => {
        const root = contentRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-reveal]", {
                opacity: 0,
                y: 16,
                filter: "blur(6px)",
                duration: 0.7,
                stagger: 0.05,
                ease: "power3.out",
                clearProps: "filter",
            });
        }, root);

        return () => ctx.revert();
    }, [activeSection, contentRef]);

    return (
        <div ref={contentRef} className="pointer-events-none absolute inset-0">
            {activeSection === "home" && <Bio />}
            {activeSection === "me" && (
                <>
                    <Education />
                    <Contact />
                    <Bio />
                </>
            )}
            {activeSection === "experience" && <ExperienceList />}
            {activeSection === "skills" && <SkillsList />}
            {activeSection === "projects" && <ProjectsList />}
            {activeSection === "certificates" && <CertificatesList />}
        </div>
    );
}
