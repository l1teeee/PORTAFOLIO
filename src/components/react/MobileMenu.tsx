// src/components/react/MobileMenu.tsx
import type { Section } from "@/types";

interface MobileMenuProps {
    isOpen: boolean;
    activeSection: Section;
    onNavigate: (section: Section) => void;
    onClose: () => void;
    textColor: string;
    textTertiary: string;
    bgColor: string;
    borderColor: string;
    isDark: boolean;
    onThemeToggle: () => void;
}

export function MobileMenu({
                               isOpen,
                               activeSection,
                               onNavigate,
                               onClose,
                               textColor,
                               textTertiary,
                               bgColor,
                               borderColor,
                               isDark,
                               onThemeToggle
                           }: MobileMenuProps) {
    const menuItems: { id: Section; label: string }[] = [
        { id: 'info', label: 'Info' },
        { id: 'projects', label: 'Projects' },
        { id: 'certificates', label: 'Certificates' },
        { id: 'faq', label: 'FAQ' },
        { id: 'copycats', label: 'Copycats' },
    ];

    const handleNavigate = (section: Section) => {
        onNavigate(section);
        onClose();
    };

    return (
        <div
            className={`lg:hidden fixed inset-0 z-30 transition-all duration-500 ease-in-out ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            {/* Overlay con backdrop blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Contenedor del menú */}
            <div
                className={`relative h-full w-full ${bgColor} transition-transform duration-500 ease-in-out transform ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                {/* Borde decorativo */}
                <div className={`h-full border ${borderColor} backdrop-blur-sm bg-white/[0.02] p-8 flex flex-col justify-center`}>


                    {/* Theme Toggle en la parte superior derecha */}
                    <div className="absolute top-8 left-8">
                        <button
                            onClick={onThemeToggle}
                            className={`p-2.5 rounded-full ${borderColor} border ${textTertiary} transition-all duration-300 hover:${textColor}`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <nav className="w-full">
                        <ul className="space-y-4">
                            {menuItems.map((item, index) => (
                                <li
                                    key={item.id}
                                    className="cursor-pointer transform transition-all duration-300"
                                    onClick={() => handleNavigate(item.id)}
                                    style={{
                                        transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                                    }}
                                >
                                    <div className="flex items-center gap-3 py-2">
                                        {/* Indicador de sección activa */}
                                        <div className={`w-0.5 h-6 rounded-full transition-all duration-300 ${
                                            activeSection === item.id
                                                ? `${textColor} opacity-100`
                                                : 'bg-transparent opacity-0'
                                        }`} />

                                        {/* Texto del menú */}
                                        <span
                                            className={`text-lg font-light tracking-wide transition-all duration-300 ${
                                                activeSection === item.id
                                                    ? `${textColor} font-normal`
                                                    : textTertiary
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mensaje decorativo en la parte inferior */}
                    <div className={`absolute bottom-8 left-8 right-8 text-center ${textTertiary} text-xs opacity-60`}>
                        <p>Tap to close</p>
                    </div>
                </div>
            </div>
        </div>
    );
}