// src/hooks/useThemeColors.ts
import { useMemo } from "react";
import type { ThemeColors } from "@/types";

export function useThemeColors(isDark: boolean): ThemeColors {
    return useMemo(() => ({
        bgColor: isDark ? "bg-black" : "bg-white",
        textColor: isDark ? "text-white" : "text-black",
        textSecondary: isDark ? "text-white/70" : "text-black/70",
        textTertiary: isDark ? "text-white/90" : "text-black/90",
        textQuaternary: isDark ? "text-white/60" : "text-black/60",
        textLight: isDark ? "text-white/40" : "text-black/40",
        borderColor: isDark ? "border-white/20" : "border-black/20",
        dotBg: isDark ? "bg-white" : "bg-black",
        buttonBg: isDark ? "bg-white/5" : "bg-black/5",
        buttonHover: isDark ? "hover:bg-white/10" : "hover:bg-black/10",
        baseColorHex: isDark ? "#ffffff" : "#000000",
        hoverColorHex: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
    }), [isDark]);
}