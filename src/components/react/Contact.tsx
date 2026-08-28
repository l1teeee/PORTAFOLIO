// src/components/react/Contact.tsx
interface ExternalLink {
    label: string;
    href: string;
}

const LINKS: ExternalLink[] = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/julian-mendez-ar/" },
    { label: "GitHub", href: "https://github.com/l1teeee" },
    { label: "Numen Agency", href: "https://delta-numen.com/" },
    { label: "Instagram", href: "https://www.instagram.com/amendzzs/" },
    { label: "Curriculum Vitae", href: "/cv/CV-EN.pdf" },
];

export function Contact() {
    return (
        <div className="text-halo pointer-events-auto absolute bottom-[230px] right-0 text-right md:bottom-auto md:left-[62%] md:right-auto md:top-1/2 md:-translate-y-1/2 md:text-left">
            <p className="mb-3 text-[10px] font-semibold uppercase leading-none tracking-[0.06em] opacity-50" data-reveal>
                Contact
            </p>
            <ul className="space-y-[10px]">
                {LINKS.map((link) => (
                    <li key={link.label} data-reveal>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-1 text-[12px] font-semibold leading-none transition-opacity duration-300 hover:opacity-50"
                        >
                            {link.label}
                            <span className="text-[9px] leading-none">&#8599;</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
