// src/hooks/useNavigation.ts
import { useState, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import type { Section } from "@/types";

export function useNavigation(contentRef: RefObject<HTMLDivElement | null>) {
    const [activeSection, setActiveSection] = useState<Section>("home");

    const navigateToSection = (section: Section) => {
        if (section === activeSection) return;

        const content = contentRef.current;
        if (!content) {
            setActiveSection(section);
            return;
        }

        gsap.killTweensOf(content);
        gsap.to(content, {
            opacity: 0,
            y: -10,
            filter: "blur(8px)",
            duration: 0.35,
            ease: "power2.in",
            onComplete: () => {
                setActiveSection(section);
                gsap.fromTo(
                    content,
                    { opacity: 0, y: 10, filter: "blur(8px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out", clearProps: "filter" }
                );
            },
        });
    };

    return { activeSection, navigateToSection };
}
