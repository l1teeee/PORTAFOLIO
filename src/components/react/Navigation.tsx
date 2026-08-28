// src/components/react/Navigation.tsx
import { useLayoutEffect, useRef, type RefObject } from "react";
import type { Section } from "@/types";
import { SECTIONS } from "@/data/sections";
import { Flip } from "@/lib/gsap";

interface NavigationProps {
    navRef: RefObject<HTMLUListElement | null>;
    activeSection: Section;
    onNavigate: (section: Section) => void;
}

const DOT_SELECTOR = "[data-flip-id='nav-dot']";

export function Navigation({ navRef, activeSection, onNavigate }: NavigationProps) {
    const dotState = useRef<ReturnType<typeof Flip.getState> | null>(null);

    // Capture the dot before React moves it, then Flip animates it from the old item to the new one
    const handleNavigate = (section: Section) => {
        const dot = navRef.current?.querySelector(DOT_SELECTOR);
        if (dot) dotState.current = Flip.getState(dot);
        onNavigate(section);
    };

    useLayoutEffect(() => {
        const state = dotState.current;
        const dot = navRef.current?.querySelector(DOT_SELECTOR);
        if (!state || !dot) return;
        dotState.current = null;
        Flip.from(state, { targets: dot, duration: 0.6, ease: "power3.inOut" });
    }, [activeSection, navRef]);

    return (
        <nav className="mt-14 hidden md:block">
            <ul ref={navRef} className="text-halo space-y-[10px]">
                {SECTIONS.map((item) => (
                    <li key={item.id} className="flex h-3 items-center text-[12px] font-semibold leading-none">
                        {activeSection === item.id ? (
                            <span data-flip-id="nav-dot" className="block h-[6px] w-[6px] rounded-full bg-current" aria-label={item.label} />
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleNavigate(item.id)}
                                className="cursor-pointer transition-[opacity,transform] duration-300 hover:translate-x-1 hover:opacity-50"
                            >
                                {item.label}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
