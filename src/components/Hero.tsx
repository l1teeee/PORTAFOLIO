// src/components/Hero.tsx
import { useCallback, useRef, useState } from "react";
import { Intro } from "@/components/react/Intro";
import { ParticleField } from "@/components/react/ParticleField";
import { Header } from "@/components/react/Header";
import { Navigation } from "@/components/react/Navigation";
import { SideToggles } from "@/components/react/SideToggles";
import { MenuButton } from "@/components/react/MenuButton";
import { MobileMenu } from "@/components/react/MobileMenu";
import { SectionContent } from "@/components/react/SectionContent";
import { Copyright } from "@/components/react/Copyright";
import { Clock } from "@/components/react/Clock";
import { useHeroAnimations } from "@/hooks/useHeroAnimations";
import { useNavigation } from "@/hooks/useNavigation";
import { useContentParallax } from "@/hooks/useContentParallax";

export default function Hero() {
    const [isDark, setIsDark] = useState(true);
    const [isMono, setIsMono] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const chromeRef = useRef<HTMLDivElement>(null);
    const roleRef = useRef<HTMLParagraphElement>(null);
    const navRef = useRef<HTMLUListElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);

    const { activeSection, navigateToSection } = useNavigation(contentRef);
    useHeroAnimations({ chromeRef, roleRef, navRef, contentRef }, !showIntro);
    useContentParallax(parallaxRef, !showIntro);

    const handleIntroComplete = useCallback(() => setShowIntro(false), []);
    const toggleMono = () => setIsMono((value) => !value);

    return (
        <div
            data-theme={isDark ? "dark" : "light"}
            className={`fixed inset-0 overflow-hidden bg-(--bg) text-(--fg) transition-colors duration-700 ease-in-out ${
                isMono ? "font-mono" : "font-sans"
            }`}
        >
            {/* Same inset as the frame border: the field only ever draws inside the frame */}
            <div className="pointer-events-none absolute inset-4 overflow-hidden md:inset-[30px]">
                <ParticleField section={activeSection} isDark={isDark} isMono={isMono} subdued={showIntro} />
            </div>

            {showIntro && <Intro onComplete={handleIntroComplete} />}

            {!showIntro && (
                <div ref={chromeRef} className="absolute inset-0 z-10">
                    <div className="pointer-events-none absolute inset-4 border border-(--line) transition-colors duration-700 md:inset-[30px]" />

                    <div ref={parallaxRef} className="absolute inset-8 will-change-transform md:inset-[60px]">
                        <div className="absolute left-0 top-0 z-20">
                            <Header roleRef={roleRef} onNavigate={navigateToSection} />
                            <Navigation navRef={navRef} activeSection={activeSection} onNavigate={navigateToSection} />
                        </div>
                        <SectionContent contentRef={contentRef} activeSection={activeSection} />
                    </div>

                    <SideToggles isDark={isDark} isMono={isMono} onThemeChange={setIsDark} onMonoToggle={toggleMono} />
                    <Copyright />
                    <Clock />

                    <MenuButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen((open) => !open)} />
                    <MobileMenu
                        isOpen={isMenuOpen}
                        activeSection={activeSection}
                        onNavigate={navigateToSection}
                        onClose={() => setIsMenuOpen(false)}
                        isDark={isDark}
                        isMono={isMono}
                        onThemeChange={setIsDark}
                        onMonoToggle={toggleMono}
                    />
                </div>
            )}
        </div>
    );
}
