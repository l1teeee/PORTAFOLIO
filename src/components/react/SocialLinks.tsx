interface SocialLinksProps {
    textQuaternary: string;
    textColor: string;
}

export function SocialLinks({ textQuaternary, textColor }: SocialLinksProps) {
    const links = [
        { label: "INSTAGRAM", href: "#" },
        { label: "LINKEDIN", href: "#" },
        { label: "CURRICULUM VITAE", href: "#" },
    ];

    return (
        <div className="hidden md:flex absolute bottom-8 md:bottom-16 left-8 md:left-16 gap-6">
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    className={`${textQuaternary} hover:${textColor} transition-colors duration-500 ease-in-out text-xs font-light rotate-180 drop-shadow-md`}
                    style={{ writingMode: "vertical-rl" }}
                >
                    {link.label}
                </a>
            ))}
        </div>
    );
}
