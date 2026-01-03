// src/hooks/useNavigation.ts
import { useState, type RefObject } from "react";
import { gsap } from "gsap";
import type { Section } from "@/types";

export function useNavigation(contentRef: RefObject<HTMLDivElement>) {
    const [activeSection, setActiveSection] = useState<Section>('home');

    const navigateToSection = (section: Section) => {
        if (section === activeSection) return;

        gsap.to(contentRef.current, {
            opacity: 0,
            x: -50,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                setActiveSection(section);
                gsap.fromTo(
                    contentRef.current,
                    { opacity: 0, x: 50 },
                    { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    };

    return { activeSection, navigateToSection };
}