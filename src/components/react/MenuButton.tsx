// src/components/react/MenuButton.tsx
interface MenuButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function MenuButton({ isOpen, onToggle }: MenuButtonProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="absolute right-8 top-8 z-40 cursor-pointer text-[10px] font-semibold uppercase leading-none tracking-[0.06em] md:hidden"
        >
            {isOpen ? "Close" : "Menu"}
        </button>
    );
}
