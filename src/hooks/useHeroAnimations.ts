// src/hooks/useHeroAnimations.ts
import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";

interface AnimationRefs {
    containerRef: RefObject<HTMLDivElement>;
    nameRef: RefObject<HTMLHeadingElement>;
    roleRef: RefObject<HTMLParagraphElement>;
    navRef: RefObject<HTMLUListElement>;
    bioRef: RefObject<HTMLDivElement>;
}

export function useHeroAnimations({
                                      containerRef,
                                      nameRef,
                                      roleRef,
                                      navRef,
                                      bioRef,
                                  }: AnimationRefs) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut"
            });

            gsap.from(nameRef.current, {
                opacity: 0,
                y: -50,
                duration: 1.2,
                delay: 0.4,
                ease: "power3.out"
            });

            gsap.from(roleRef.current, {
                opacity: 0,
                x: -30,
                duration: 1,
                delay: 0.6,
                ease: "power2.out"
            });

            gsap.from(navRef.current?.children || [], {
                opacity: 0,
                x: -20,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.9,
                ease: "power2.out"
            });

            gsap.from(bioRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 1.3,
                ease: "power2.out"
            });
        });

        return () => ctx.revert();
    }, [containerRef, nameRef, roleRef, navRef, bioRef]);
}