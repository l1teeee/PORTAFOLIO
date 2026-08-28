// src/components/react/SideToggles.tsx
import { ToggleButton } from "@/components/react/ToggleButton";

interface SideTogglesProps {
    isDark: boolean;
    isMono: boolean;
    onThemeChange: (dark: boolean) => void;
    onMonoToggle: () => void;
}

// Rotated -90deg around its bottom-left corner, so it reads bottom-to-top inside the 30px gutter
export function SideToggles({ isDark, isMono, onThemeChange, onMonoToggle }: SideTogglesProps) {
    return (
        <div className="absolute bottom-[30px] left-[30px] hidden md:block">
            <div className="flex h-5 origin-bottom-left -rotate-90 items-center gap-6 whitespace-nowrap">
                <ToggleButton active={!isDark} label="Light" onClick={() => onThemeChange(false)} />
                <ToggleButton active={isDark} label="Dark" onClick={() => onThemeChange(true)} />
                <ToggleButton active={isMono} label="Monospaced" onClick={onMonoToggle} />
            </div>
        </div>
    );
}
