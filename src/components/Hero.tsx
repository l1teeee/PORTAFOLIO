// Hero.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ParticlesBackground } from "./ParticlesBackground";

export default function Hero() {
    const [isDark, setIsDark] = useState(true);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLParagraphElement>(null);
    const navRef = useRef<HTMLUListElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación del contenedor completo
            gsap.from(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut"
            });

            // Animación del nombre
            gsap.from(nameRef.current, {
                opacity: 0,
                y: -50,
                duration: 1.2,
                delay: 0.4,
                ease: "power3.out"
            });

            // Animación del rol
            gsap.from(roleRef.current, {
                opacity: 0,
                x: -30,
                duration: 1,
                delay: 0.6,
                ease: "power2.out"
            });

            // Animación del menú
            gsap.from(navRef.current?.children || [], {
                opacity: 0,
                x: -20,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.9,
                ease: "power2.out"
            });

            // Animación de la bio
            gsap.from(bioRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 1.3,
                ease: "power2.out"
            });
        });

        return () => ctx.revert();
    }, []);

    const toggleTheme = () => {
        if (overlayRef.current) {
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    setIsDark(!isDark);
                    gsap.to(overlayRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.inOut"
                    });
                }
            });
        }
    };

    const bgColor = isDark ? "bg-black" : "bg-white";
    const textColor = isDark ? "text-white" : "text-black";
    const textSecondary = isDark ? "text-white/70" : "text-black/70";
    const textTertiary = isDark ? "text-white/90" : "text-black/90";
    const textQuaternary = isDark ? "text-white/60" : "text-black/60";
    const textLight = isDark ? "text-white/40" : "text-black/40";
    const borderColor = isDark ? "border-white/20" : "border-black/20";
    const dotBg = isDark ? "bg-white" : "bg-black";
    const buttonBg = isDark ? "bg-white/5" : "bg-black/5";
    const buttonHover = isDark ? "hover:bg-white/10" : "hover:bg-black/10";

    return (
        <div ref={containerRef} className={`relative h-screen w-full ${bgColor} overflow-hidden p-4 md:p-8 transition-colors duration-1000 ease-in-out`}>
            {/* Overlay para transición suave */}
            <div
                ref={overlayRef}
                className={`absolute inset-0 z-30 pointer-events-none ${isDark ? 'bg-white' : 'bg-black'} opacity-0`}
            />

            {/* Particles Background - Componente separado */}
            <ParticlesBackground isDark={isDark} />

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className={`absolute top-8 right-8 md:top-16 md:right-16 z-20 p-3 rounded-full ${borderColor} border ${textTertiary} ${buttonBg} ${buttonHover} transition-all duration-500 ease-in-out backdrop-blur-sm`}
                aria-label="Toggle theme"
            >
                {isDark ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-500 ease-in-out" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-500 ease-in-out" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                )}
            </button>

            {/* Content with border - TRANSPARENTE con efecto glass */}
            <div className={`relative z-10 h-full border ${borderColor} backdrop-blur-xs p-8 md:p-16 flex flex-col justify-between transition-all duration-1000 ease-in-out`}>
                {/* Header */}
                <header className="space-y-2">
                    <h1
                        ref={nameRef}
                        className={`text-5xl md:text-7xl font-light ${textColor} tracking-tight transition-colors duration-1000 ease-in-out drop-shadow-lg`}
                    >
                        Tu Nombre
                    </h1>
                    <p
                        ref={roleRef}
                        className={`text-sm md:text-base ${textSecondary} font-light transition-colors duration-1000 ease-in-out drop-shadow-md`}
                    >
                        Designer & Developer
                    </p>
                </header>

                {/* Navigation */}
                <nav className="absolute left-8 md:left-24 top-1/3">
                    <ul ref={navRef} className={`space-y-6 ${textTertiary} transition-colors duration-1000 ease-in-out`}>
                        <li className="flex items-center gap-3 group cursor-pointer">
                            <span className={`w-2 h-2 ${dotBg} rounded-full group-hover:scale-150 transition-all duration-300 drop-shadow-md`}></span>
                            <span className={`text-sm md:text-base font-light hover:${textColor} transition-colors duration-300 drop-shadow-md`}>Projects</span>
                        </li>
                        <li className={`text-sm md:text-base font-light hover:${textColor} transition-colors duration-300 cursor-pointer drop-shadow-md`}>Info</li>
                        <li className={`text-sm md:text-base font-light hover:${textColor} transition-colors duration-300 cursor-pointer drop-shadow-md`}>Contact</li>
                        <li className={`text-sm md:text-base font-light hover:${textColor} transition-colors duration-300 cursor-pointer drop-shadow-md`}>FAQ</li>
                        <li className={`text-sm md:text-base font-light hover:${textColor} transition-colors duration-300 cursor-pointer drop-shadow-md`}>Copycats</li>
                    </ul>
                </nav>

                {/* Bio Text - Bottom Right */}
                <div
                    ref={bioRef}
                    className="absolute bottom-8 md:bottom-16 right-8 md:right-16 max-w-xs"
                >
                    <p className={`${textTertiary} text-xs md:text-sm font-light leading-relaxed transition-colors duration-1000 ease-in-out drop-shadow-md`}>
                        <span className="block mb-2">Born in 1994</span>
                        <span className="block mb-2">in Osaka, Japan.</span>
                        <span className="block">
                            I believe web design can be more diverse and inspiring.
                            With a mission to present the possibilities of web design,
                            I am pursuing new expressions through experiments and thoughts.
                        </span>
                    </p>
                </div>

                {/* Social Links - Bottom Left */}
                <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 flex gap-6">
                    <a href="#" className={`${textQuaternary} hover:${textColor} transition-colors duration-500 ease-in-out text-xs font-light rotate-180 drop-shadow-md`} style={{writingMode: 'vertical-rl'}}>
                        INSTAGRAM
                    </a>
                    <a href="#" className={`${textQuaternary} hover:${textColor} transition-colors duration-500 ease-in-out text-xs font-light rotate-180 drop-shadow-md`} style={{writingMode: 'vertical-rl'}}>
                        WORK
                    </a>
                    <a href="#" className={`${textQuaternary} hover:${textColor} transition-colors duration-500 ease-in-out text-xs font-light rotate-180 drop-shadow-md`} style={{writingMode: 'vertical-rl'}}>
                        TWITTER
                    </a>
                </div>

                {/* Copyright */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <p className={`${textLight} text-xs font-light transition-colors duration-1000 ease-in-out drop-shadow-md`}>© Tu Nombre</p>
                </div>
            </div>
        </div>
    );
}