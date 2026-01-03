// src/components/react/Copyright.tsx
interface CopyrightProps {
    textLight: string;
}

export function Copyright({ textLight }: CopyrightProps) {
    return (
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2">
            <p className={`${textLight} text-xs font-light transition-colors duration-1000 ease-in-out drop-shadow-md`}>
                © Julián Méndez
            </p>
        </div>
    );
}