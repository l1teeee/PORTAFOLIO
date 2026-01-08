// src/components/react/SocialLinks.tsx
import { useState } from 'react';
import { CVModal } from './CVModal';

interface SocialLinksProps {
    textQuaternary: string;
    textColor: string;
    textTertiary: string;
    bgColor: string;
    borderColor: string;
    isDark: boolean;
}

export function SocialLinks({
                                textQuaternary,
                                textColor,
                                textTertiary,
                                bgColor,
                                borderColor,
                                isDark
                            }: SocialLinksProps) {
    const [isCVModalOpen, setIsCVModalOpen] = useState(false);

    const links = [
        { label: "INSTAGRAM", href: "https://www.instagram.com/jmenrev/" },
        {
            label: "LINKEDIN",
            href: "https://www.linkedin.com/in/juli%C3%A1n-m%C3%A9ndez-arev/",
        },
        { label: "CURRICULUM VITAE", href: "#", isCV: true },
    ];

    const handleClick = (e: React.MouseEvent, isCV?: boolean) => {
        if (isCV) {
            e.preventDefault();
            setIsCVModalOpen(true);
        }
    };

    return (
        <>
            <div className="absolute bottom-8 left-8 right-8 lg:bottom-16 lg:left-16 lg:right-auto flex flex-row flex-wrap gap-x-6 gap-y-3 items-center">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleClick(e, link.isCV)}
                        className={`${textQuaternary} hover:${textColor} transition-all duration-500 ease-in-out text-xs font-light drop-shadow-md relative group whitespace-nowrap cursor-pointer`}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                        {link.label}
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-500 ease-in-out" />
                    </a>
                ))}
            </div>

            <CVModal
                isOpen={isCVModalOpen}
                onClose={() => setIsCVModalOpen(false)}
                textColor={textColor}
                textTertiary={textTertiary}
                bgColor={bgColor}
                borderColor={borderColor}
                isDark={isDark}
            />
        </>
    );
}