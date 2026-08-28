// src/components/react/ToggleButton.tsx
interface ToggleButtonProps {
    active: boolean;
    label: string;
    onClick: () => void;
}

export function ToggleButton({ active, label, onClick }: ToggleButtonProps) {
    return (
        <button type="button" onClick={onClick} aria-pressed={active} className="group flex cursor-pointer items-center gap-[6px]">
            <span
                className={`h-[6px] w-[6px] border border-current transition-colors duration-300 ${
                    active ? "bg-current" : "bg-transparent"
                }`}
            />
            <span
                className={`text-[10px] font-semibold uppercase leading-none tracking-[0.06em] transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-55 group-hover:opacity-100"
                }`}
            >
                {label}
            </span>
        </button>
    );
}
