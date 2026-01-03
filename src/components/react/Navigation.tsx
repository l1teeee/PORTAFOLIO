// src/components/react/Navigation.tsx
import type {RefObject} from "react";
import type { Section } from "@/types";

interface NavigationProps {
    navRef: RefObject<HTMLUListElement>;
    activeSection: Section;
    onNavigate: (section: Section) => void;
    textColor: string;
    textTertiary: string;
    dotBg: string;
}

export function Navigation({ navRef, activeSection, onNavigate, textColor, textTertiary, dotBg }: NavigationProps) {
    const menuItems: { id: Section; label: string }[] = [
        { id: 'info', label: 'Info' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
        { id: 'faq', label: 'FAQ' },
        { id: 'copycats', label: 'Copycats' },
    ];

    return (
        <nav className="absolute left-8 md:left-24 top-1/3">
            <ul ref={navRef} className={`space-y-6 transition-colors duration-1000 ease-in-out`}>
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className="group cursor-pointer relative h-6 flex items-center"
                        onClick={() => onNavigate(item.id)}
                    >
                        {activeSection === item.id ? (
                            // Solo mostrar el círculo cuando está activo
                            <span
                                className={`w-2 h-2 ${dotBg} rounded-full transition-all duration-300 drop-shadow-md`}
                            ></span>
                        ) : (
                            // Mostrar texto cuando NO está activo
                            <span className={`text-sm md:text-base font-light ${textTertiary} hover:${textColor} transition-colors duration-300 drop-shadow-md`}>
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}