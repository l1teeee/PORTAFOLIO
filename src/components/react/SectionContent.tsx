// src/components/react/SectionContent.tsx
// src/components/react/SectionContent.tsx
import type {RefObject} from "react";
import type { Section } from "@/types";

interface SectionContentProps {
    contentRef: RefObject<HTMLDivElement>;
    bioRef: RefObject<HTMLDivElement>;
    activeSection: Section;
    textColor: string;
    textTertiary: string;
}

export function SectionContent({ contentRef, bioRef, activeSection, textColor, textTertiary }: SectionContentProps) {
    const renderContent = () => {
        switch (activeSection) {
            case 'home':
                return (
                    <div ref={bioRef} className="absolute bottom-8 md:bottom-16 right-8 md:right-16 max-w-xs">
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
                );
            case 'info':
                return (
                    <div ref={bioRef} className="absolute bottom-8 md:bottom-16 right-8 md:right-16 max-w-xs">
                        <p className={`${textTertiary} text-xs md:text-sm font-light leading-relaxed transition-colors duration-1000 ease-in-out drop-shadow-md`}>
                            <span className="block">Born in 2001</span>
                            <span className="block">in El Salvador.</span>
                            <span className="block">
                                I believe every challenge <br/>is an opportunity to grow.<br/>
                                Leading technical teams with<br/> a mission to embrace innovation,<br/>
                                I am pursuing new ways<br/> to create meaningful solutions<br/>
                                through strategic thinking and <br/>continuous learning.
                            </span>
                        </p>
                    </div>
                );
            case 'projects':
                return (
                    <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 max-w-md">
                        <h2 className={`${textColor} text-2xl md:text-3xl font-light mb-4`}>Projects</h2>
                        <p className={`${textTertiary} text-xs md:text-sm font-light leading-relaxed`}>
                            Explore my latest work and creative experiments in web design and development.
                        </p>
                    </div>
                );
            case 'contact':
                return (
                    <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 max-w-md">
                        <h2 className={`${textColor} text-2xl md:text-3xl font-light mb-4`}>Contact</h2>
                        <p className={`${textTertiary} text-xs md:text-sm font-light leading-relaxed`}>
                            Get in touch for collaborations, projects, or just to say hello.
                        </p>
                    </div>
                );
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