interface SocialLinksProps {
    textQuaternary: string;
    textColor: string;
}

export function SocialLinks({ textQuaternary, textColor }: SocialLinksProps) {
    const links = [
        { label: "INSTAGRAM", href: "https://www.instagram.com/jmenrev/" },
        { label: "LINKEDIN", href: "https://www.linkedin.com/in/juli%C3%A1n-m%C3%A9ndez-arev/" },
        { label: "CURRICULUM VITAE", href: "#" },
    ];

    return (
        <div className="hidden md:flex absolute bottom-8 md:bottom-16 left-8 md:left-16 gap-6">
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    className={`${textQuaternary} hover:${textColor} transition-all duration-500 ease-in-out text-xs font-light drop-shadow-md relative group`}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                    {link.label}
                    <span
                        className="absolute left-0 bottom-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-500 ease-in-out"
                    />
                </a>
            ))}
        </div>
    );
}
