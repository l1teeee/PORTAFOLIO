// src/hooks/useContentParallax.ts
import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

const SHIFT_X = 8;
const SHIFT_Y = 6;

// The text layer drifts slightly against the cursor, so it floats in front of the particle field
export function useContentParallax(layerRef: RefObject<HTMLDivElement | null>, enabled: boolean) {
    useEffect(() => {
        const layer = layerRef.current;
        if (!enabled || !layer) return;

        const ctx = gsap.context(() => {
            const xTo = gsap.quickTo(layer, "x", { duration: 0.9, ease: "power3" });
            const yTo = gsap.quickTo(layer, "y", { duration: 0.9, ease: "power3" });

            const onMove = (e: PointerEvent) => {
                if (e.pointerType !== "mouse") return;
                const nx = (e.clientX / window.innerWidth) * 2 - 1;
                const ny = (e.clientY / window.innerHeight) * 2 - 1;
                xTo(-nx * SHIFT_X);
                yTo(-ny * SHIFT_Y);
            };

            window.addEventListener("pointermove", onMove, { passive: true });
            return () => window.removeEventListener("pointermove", onMove);
        });

        return () => ctx.revert();
    }, [layerRef, enabled]);
}
