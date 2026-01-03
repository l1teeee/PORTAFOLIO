// src/components/react/ParticlesBackground.tsx
import { useEffect, useState, useRef, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";

interface ParticlesBackgroundProps {
    isDark: boolean;
}

function ParticlesBackgroundComponent({ isDark }: ParticlesBackgroundProps) {
    const [init, setInit] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<Container | null>(null);
    const previousIsDarkRef = useRef(isDark);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
            setTimeout(() => setIsVisible(true), 300);
        });
    }, []);

    // Actualizar solo los colores sin reiniciar las partículas
    useEffect(() => {
        // Solo actualizar si el tema realmente cambió
        if (containerRef.current && previousIsDarkRef.current !== isDark) {
            previousIsDarkRef.current = isDark;

            const particleColor = isDark ? "#ffffff" : "#000000";
            const particleBg = isDark ? "#000000" : "#ffffff";

            // Actualizar color de partículas
            if (containerRef.current.options.particles?.color) {
                containerRef.current.options.particles.color = { value: particleColor };
            }

            // Actualizar color de fondo
            if (containerRef.current.options.background?.color) {
                containerRef.current.options.background.color = { value: particleBg };
            }

            // Refrescar sin reiniciar
            containerRef.current.refresh();
        }
    }, [isDark]);

    const particleColor = isDark ? "#ffffff" : "#000000";
    const particleBg = isDark ? "#000000" : "#ffffff";

    if (!init) return null;

    return (
        <div
            className={`absolute inset-0 z-0 transition-opacity duration-[1500ms] ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <Particles
                id="tsparticles"
                className="absolute inset-0"
                particlesLoaded={async (container) => {
                    // @ts-ignore
                    containerRef.current = container;
                }}
                options={{
                    background: {
                        color: {
                            value: particleBg,
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: {
                                enable: true,
                            },
                        },
                        modes: {
                            repulse: {
                                distance: 80,
                                duration: 0.8,
                                easing: "ease-out-quad",
                                speed: 0.5,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: particleColor,
                        },
                        links: {
                            enable: false,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "out",
                            },
                            random: true,
                            speed: 0.15,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 120,
                        },
                        opacity: {
                            value: {
                                min: 0.2,
                                max: 0.5,
                            },
                            animation: {
                                enable: true,
                                speed: 0.8,
                            },
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1.5, max: 3.0 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
}

export const ParticlesBackground = memo(ParticlesBackgroundComponent);