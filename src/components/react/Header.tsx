import type {RefObject} from "react";
import type { Section } from "@/types";

interface HeaderProps {
    nameRef: RefObject<HTMLHeadingElement>;
    roleRef: RefObject<HTMLParagraphElement>;
    textColor: string;
    textSecondary: string;
    onNavigate: (section: Section) => void;
}

export function Header({ nameRef, roleRef, textColor, textSecondary, onNavigate }: HeaderProps) {
    return (
        <header className="space-y-2">
            <h1
                ref={nameRef}
                className={`text-2xl md:text-5xl font-light ${textColor} tracking-tight transition-colors duration-1000 ease-in-out drop-shadow-lg cursor-pointer`}
                onClick={() => onNavigate('info')}
            >
                Julián Méndez
            </h1>
            <p
                ref={roleRef}
                className={`text-sm md:text-base ${textSecondary} font-light transition-colors duration-1000 ease-in-out drop-shadow-md`}
            >
                Fullstack Developer & IT Engineer
            </p>
        </header>
    );
}