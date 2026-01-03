// src/components/react/SectionContent.tsx
import type {RefObject} from "react";
import type { Section } from "@/types";
import { ProjectsList } from "@/components/react/ProjectsList";
import { CertificatesList } from "@/components/react/CertificatesList";

interface SectionContentProps {
    contentRef: RefObject<HTMLDivElement>;
    bioRef: RefObject<HTMLDivElement>;
    activeSection: Section;
    textColor: string;
    textTertiary: string;
    baseColorHex: string;
    hoverColorHex: string;
}

export function SectionContent({
                                   contentRef,
                                   bioRef,
                                   activeSection,
                                   textColor,
                                   textTertiary,
                                   baseColorHex,
                                   hoverColorHex
                               }: SectionContentProps) {
    const renderContent = () => {
        switch (activeSection) {
            case 'me':
                return (
                    <div ref={bioRef} className="absolute bottom-8 md:bottom-16 right-8 md:right-16 max-w-md">
                        <p className={`${textTertiary} text-xs md:text-sm font-light leading-relaxed transition-colors duration-1000 ease-in-out drop-shadow-md ml-8 md:ml-2`}>
                            <span className="">Born in 2002</span>
                            <br />
                            <span className="">in El Salvador.</span>
                            <br />
                            <span className="">
                                I believe every challenge is an opportunity to grow.
                                Leading technical teams with a mission to embrace innovation,
                                I am pursuing new ways to create meaningful solutions
                                through strategic thinking and continuous learning.
                            </span>
                        </p>
                    </div>
                );
            case 'projects':
                return <ProjectsList bioRef={bioRef} baseColor={baseColorHex} hoverColor={hoverColorHex} />;
            case 'certificates':
                return <CertificatesList bioRef={bioRef} baseColor={baseColorHex} hoverColor={hoverColorHex} />;
            case 'faq':
                return (
                    <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 max-w-md">
                        <h2 className={`${textColor} text-2xl md:text-3xl font-light mb-4`}>FAQ</h2>
                        <p className={`${textTertiary} text-xs md:text-sm font-light leading-relaxed`}>
                            Frequently asked questions about my work, process, and availability.
                        </p>
                    </div>
                );
            case 'copycats':
                return (
                    <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 max-w-md">
                        <h2 className={`${textColor} text-2xl md:text-3xl font-light mb-4`}>Copycats</h2>
                        <p className={`${textTertiary} text-xs md:text-sm font-light leading-relaxed`}>
                            A collection of design inspirations and references that influence my work.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div ref={contentRef}>{renderContent()}</div>;
}