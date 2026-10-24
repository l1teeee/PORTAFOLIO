// src/components/react/MobileMenu.tsx
import type { Section } from "@/types";
import { SECTIONS } from "@/data/sections";

interface MobileMenuProps {
    isOpen: boolean;
    activeSection: Section;
    onNavigate: (section: Section) => void;
    onClose: () => void;
}

export function MobileMenu({ isOpen, activeSection, onNavigate, onClose }: MobileMenuProps) {
    const handleNavigate = (section: Section) => {
        onNavigate(section);
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-30 bg-(--bg) transition-[opacity,transform,background-color] duration-500 ease-in-out md:hidden ${
                isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
            }`}
        >
            <div className="pointer-events-none absolute inset-4 border border-(--line)" />

            <nav className="absolute left-8 top-1/2 -translate-y-1/2">
                <ul className="space-y-5">
                    {SECTIONS.map((item) => (
                        <li key={item.id}>
                            <button
                                type="button"
                                onClick={() => handleNavigate(item.id)}
                                className={`text-[36px] font-extralight leading-none tracking-[-0.02em] transition-opacity duration-300 ${
                                    activeSection === item.id ? "opacity-100" : "opacity-40"
                                }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
