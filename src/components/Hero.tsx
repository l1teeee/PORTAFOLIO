// src/components/react/Hero.tsx
import { useRef, useState } from "react";
import { Intro } from "@/components/react/Intro";
import { ThemeToggle } from "@/components/react/ThemeToggle";
import { Header } from "@/components/react/Header";
import { Navigation } from "@/components/react/Navigation";
import { MobileMenu } from "@/components/react/MobileMenu";
import { SectionContent } from "@/components/react/SectionContent";
import { SocialLinks } from "@/components/react/SocialLinks";
import { Copyright } from "@/components/react/Copyright";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useHeroAnimations } from "@/hooks/useHeroAnimations";
import { useNavigation } from "@/hooks/useNavigation";
import particlesVideo from "@assets/particles.mp4";

export default function Hero() {
    const [isDark, setIsDark] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const [showMain, setShowMain] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const nameRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLParagraphElement>(null);
    const navRef = useRef<HTMLUListElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const colors = useThemeColors(isDark);
    const { activeSection, navigateToSection } = useNavigation(contentRef);

    useHeroAnimations({
        containerRef,
        nameRef,
        roleRef,
        navRef,
        bioRef,
    });

    const handleIntroComplete = () => {
        setShowIntro(false);
        setShowMain(true);
    };

    return (
        <>
            {showIntro && <Intro onComplete={handleIntroComplete} />}

            <div
                ref={containerRef}
                className={`relative h-screen w-full ${colors.bgColor} overflow-hidden p-4 md:p-8 transition-all duration-1000 ease-in-out`}
                style={{
                    opacity: showMain ? 1 : 0,
                    transition: 'opacity 1s ease-in-out'
                }}
            >
                {/* Video de fondo con inversión de colores */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        filter: isDark ? 'none' : 'invert(1)',
                        transition: 'filter 1s ease-in-out, opacity 1s ease-in-out'
                    }}
                    className={`absolute inset-0 w-full h-full object-cover z-0 ${
                        isDark ? 'opacity-30' : 'opacity-20'
                    }`}
                >
                    <source src={particlesVideo} type="video/mp4" />
                </video>

                <ThemeToggle
                    isDark={isDark}
                    onToggle={() => setIsDark(!isDark)}
                    textTertiary={colors.textTertiary}
                    borderColor={colors.borderColor}
                    buttonBg={colors.buttonBg}
                    buttonHover={colors.buttonHover}
                    isMenuOpen={isMenuOpen}
                    onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
                />

                <div className={`relative z-10 h-full border ${colors.borderColor} backdrop-blur-sm bg-white/[0.02] p-8 md:p-16 flex flex-col justify-between transition-all duration-1000 ease-in-out`}>
                    <Header
                        nameRef={nameRef}
                        roleRef={roleRef}
                        textColor={colors.textColor}
                        textSecondary={colors.textSecondary}
                        onNavigate={navigateToSection}
                    />

                    <Navigation
                        navRef={navRef}
                        activeSection={activeSection}
                        onNavigate={navigateToSection}
                        textColor={colors.textColor}
                        textTertiary={colors.textTertiary}
                        dotBg={colors.dotBg}
                    />

                    <SectionContent
                        contentRef={contentRef}
                        bioRef={bioRef}
                        activeSection={activeSection}
                        textColor={colors.textColor}
                        textTertiary={colors.textTertiary}
                        baseColorHex={colors.baseColorHex}
                        hoverColorHex={colors.hoverColorHex}
                    />

                    <SocialLinks
                        textQuaternary={colors.textQuaternary}
                        textColor={colors.textColor}
                    />

                    <Copyright textLight={colors.textLight} />
                </div>
            </div>

            {/* Menú móvil de pantalla completa */}
            <MobileMenu
                isOpen={isMenuOpen}
                activeSection={activeSection}
                onNavigate={navigateToSection}
                onClose={() => setIsMenuOpen(false)}
                textColor={colors.textColor}
                textTertiary={colors.textTertiary}
                bgColor={colors.bgColor}
                borderColor={colors.borderColor}
                isDark={isDark}
                onThemeToggle={() => setIsDark(!isDark)}
            />
        </>
    );
}