// src/components/react/Intro.tsx
import { useEffect } from "react";
import { gsap } from "gsap";

interface IntroProps {
    onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
    useEffect(() => {
        const timeline = gsap.timeline({
            onComplete: () => {
                setTimeout(onComplete, 100);
            }
        });

        // Animación del título
        timeline
            .from(".intro-name", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out"
            })
            .from(".intro-separator", {
                opacity: 0,
                duration: 0.3
            }, "-=0.3")
            .from(".intro-subtitle", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5")
            .to(".intro-name", {
                opacity: 0,
                y: -30,
                duration: 0.5,
                delay: 0.5,
                ease: "power3.in"
            })
            .to(".intro-separator", {
                opacity: 0,
                duration: 0.3
            }, "-=0.3")
            .to(".intro-subtitle", {
                opacity: 0,
                y: -30,
                duration: 0.5,
                ease: "power3.in"
            }, "-=0.4")
            .to(".intro-container", {
                opacity: 0,
                duration: 0.5
            });
    }, [onComplete]);

    return (
        <div className="intro-container fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="flex items-center gap-3 md:gap-4">
                <h1 className="intro-name text-md md:text-xl font-semibold text-white tracking-wide">
                    Julián Méndez
                </h1>
                <span className="intro-separator text-md md:text-xl font-thin text-white/60">
                    |
                </span>
                <h2 className="intro-subtitle text-md md:text-xl font-thin text-white/90 tracking-wide">
                    Portfolio
                </h2>
            </div>
        </div>
    );
}