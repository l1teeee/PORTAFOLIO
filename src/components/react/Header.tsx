// src/components/react/Header.tsx
import { useEffect, useRef, type RefObject } from "react";
import type { Section } from "@/types";
import { gsap, SplitText } from "@/lib/gsap";

interface HeaderProps {
    roleRef: RefObject<HTMLParagraphElement | null>;
    onNavigate: (section: Section) => void;
}

// How far (px) from the cursor a letter still reacts, and how high it lifts
const LIFT_REACH = 90;
const LIFT_HEIGHT = 10;

export function Header({ roleRef, onNavigate }: HeaderProps) {
    const nameRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const name = nameRef.current;
        if (!name) return;

        const ctx = gsap.context(() => {
            let lifts: ((value: number) => void)[] = [];
            let chars: HTMLElement[] = [];

            const split = SplitText.create(name, {
                type: "chars",
                aria: "auto",
                autoSplit: true,
                charsClass: "name-char",
                onSplit(self) {
                    chars = self.chars as HTMLElement[];
                    lifts = chars.map((char) => gsap.quickTo(char, "y", { duration: 0.5, ease: "power3" }));
                    return gsap.from(chars, {
                        opacity: 0,
                        y: 24,
                        filter: "blur(8px)",
                        duration: 0.9,
                        stagger: 0.035,
                        ease: "power3.out",
                        clearProps: "filter",
                    });
                },
            });

            const onMove = (e: PointerEvent) => {
                chars.forEach((char, i) => {
                    const rect = char.getBoundingClientRect();
                    const distance = Math.abs(e.clientX - (rect.left + rect.width / 2));
                    const lift = Math.max(0, 1 - distance / LIFT_REACH);
                    lifts[i](-LIFT_HEIGHT * lift);
                });
            };
            const onLeave = () => lifts.forEach((lift) => lift(0));

            name.addEventListener("pointermove", onMove);
            name.addEventListener("pointerleave", onLeave);
            return () => {
                name.removeEventListener("pointermove", onMove);
                name.removeEventListener("pointerleave", onLeave);
                split.revert();
            };
        });

        return () => ctx.revert();
    }, []);

    return (
        <header>
            <h1
                ref={nameRef}
                onClick={() => onNavigate("home")}
                className="cursor-pointer whitespace-nowrap text-[34px] font-extralight leading-none tracking-[-0.02em] [font-kerning:none] md:text-[60px]"
            >
                Julián Méndez
            </h1>
            <p ref={roleRef} className="text-halo mt-2 text-[11px] leading-none md:mt-[10px] md:text-[12px]">
                Software Engineer / Product Engineer / Forward Deployed Engineer
            </p>
        </header>
    );
}
