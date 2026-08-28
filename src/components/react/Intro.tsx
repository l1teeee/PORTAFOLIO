// src/components/react/Intro.tsx
import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

interface IntroProps {
    onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        let cancelled = false;
        const ctx = gsap.context(() => {}, root);

        // Split only once the web font is in, otherwise the letters are measured in the fallback font
        document.fonts.ready.then(() => {
            if (cancelled) return;
            ctx.add(() => {
                const split = SplitText.create(".intro-name", { type: "chars", aria: "auto" });
                const word = root.querySelector(".intro-word");

                gsap.timeline({ onComplete, defaults: { ease: "power3.out" } })
                    .from(split.chars, { opacity: 0, y: 14, filter: "blur(8px)", duration: 0.8, stagger: 0.04 })
                    .from(word, { opacity: 0, x: -8, filter: "blur(8px)", duration: 0.9 }, "-=0.4")
                    .to(
                        [...split.chars, word],
                        { opacity: 0, y: -10, filter: "blur(10px)", duration: 0.6, stagger: 0.02, ease: "power2.in" },
                        "+=0.9"
                    );
            });
        });

        return () => {
            cancelled = true;
            ctx.revert();
        };
    }, [onComplete]);

    return (
        <div ref={rootRef} className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
            <p className="flex items-baseline gap-3 text-[20px] font-light tracking-[-0.01em] [font-kerning:none] md:text-[28px]">
                <span className="intro-name">Julián Méndez</span>
                <span className="intro-word opacity-60">Portfolio</span>
            </p>
        </div>
    );
}
