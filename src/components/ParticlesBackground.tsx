// ParticlesBackground.tsx
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

interface ParticlesBackgroundProps {
    isDark: boolean;
}

export function ParticlesBackground({ isDark }: ParticlesBackgroundProps) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particleColor = isDark ? "#ffffff" : "#000000";
    const particleBg = isDark ? "#000000" : "#ffffff";

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            className="absolute inset-0 z-0"
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
                            minimumValue: 0.1,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 0.5, max: 1.5 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
}