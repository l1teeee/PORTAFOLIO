// src/hooks/useHeroAnimations.ts
import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

interface AnimationRefs {
    chromeRef: RefObject<HTMLDivElement | null>;
    roleRef: RefObject<HTMLParagraphElement | null>;
    navRef: RefObject<HTMLUListElement | null>;
    contentRef: RefObject<HTMLDivElement | null>;
}

// First reveal of the UI once the intro is gone. The name reveals itself letter by letter in Header.
export function useHeroAnimations({ chromeRef, roleRef, navRef, contentRef }: AnimationRefs, enabled: boolean) {
    useEffect(() => {
        if (!enabled) return;

        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: "power3.out" } })
                .from(chromeRef.current, { opacity: 0, duration: 1.2, ease: "power2.inOut" })
                .from(roleRef.current, { opacity: 0, y: 8, duration: 0.9 }, 0.5)
                .from(navRef.current?.children ?? [], { opacity: 0, x: -8, duration: 0.6, stagger: 0.08 }, 0.7)
                .from(contentRef.current, { opacity: 0, y: 12, duration: 1 }, 0.9);
        });

        return () => ctx.revert();
    }, [enabled, chromeRef, roleRef, navRef, contentRef]);
}
