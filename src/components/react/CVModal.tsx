const CV_BASE_PATH = "/src/assets/cv";

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
    textColor: string;
    textTertiary: string;
    bgColor: string;
    borderColor: string;
    isDark: boolean;
}

export function CVModal({
                            isOpen,
                            onClose,
                            textColor,
                            textTertiary,
                            bgColor,
                            borderColor,
                            isDark
                        }: CVModalProps) {
    const cvLinks = [
        {
            label: "English",
            href: `${CV_BASE_PATH}/CV-EN.pdf`
        },
        {
            label: "Spanish",
            href: `${CV_BASE_PATH}/CV-ES.pdf`
        },
    ];
    const handleDownload = (href: string) => {
        window.open(href, '_blank');
        onClose();
    };

    // Colores dinámicos según el tema
    const overlayBg = isDark ? 'bg-black' : 'bg-white';
    const closeButtonText = isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black';
    const closeButtonBorder = isDark ? 'border-white/20' : 'border-black/20';
    const indicatorColor = isDark ? 'group-hover:bg-white' : 'group-hover:bg-black';
    const textSecondary = isDark ? 'text-white/60 group-hover:text-white' : 'text-black/60 group-hover:text-black';
    const bottomText = isDark ? 'text-white/40' : 'text-black/40';

    return (
        <div
            className={`fixed inset-0 z-[9999] transition-all duration-500 ease-in-out ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            {/* Overlay sólido sin blur - casi opaco */}
            <div
                className={`absolute inset-0 ${overlayBg} transition-all duration-500 ease-in-out ${
                    isOpen ? 'translate-y-0 opacity-98' : 'translate-y-full opacity-0'
                }`}
                onClick={onClose}
            />

            {/* Contenedor del modal */}
            <div
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                }`}
            >

                {/* Contenido centrado - clickeable para cerrar */}
                <div
                    className="h-full flex items-center justify-center relative z-10"
                    onClick={onClose}
                >
                    <nav
                        className="w-full max-w-4xl px-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 md:gap-12">
                            {cvLinks.map((cv, index) => (
                                <li
                                    key={cv.label}
                                    className="cursor-pointer transform transition-all duration-300"
                                    onClick={() => handleDownload(cv.href)}
                                    style={{
                                        transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                                    }}
                                >
                                    <div className="flex items-center gap-3 py-2 group">
                                        {/* Indicador de hover */}
                                        <div className={`w-0.5 h-6 rounded-full transition-all duration-300 bg-transparent ${indicatorColor}`} />

                                        {/* Texto del menú */}
                                        <span
                                            className={`text-lg font-light tracking-wide transition-all duration-300 ${textSecondary}`}
                                        >
                                            {cv.label}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Mensaje decorativo en la parte inferior */}
                <div className={`absolute bottom-8 left-8 right-8 text-center ${bottomText} text-xs opacity-60 z-10`}>
                    <p>Tap to close</p>
                </div>
            </div>
        </div>
    );
}