// src/lib/gsap.ts
// Single registration point so every component imports the same configured gsap instance.
// Plugins come from "gsap/all": the per-plugin entry "gsap/Flip" trips TS1149 (file casing) on Windows.
import { gsap } from "gsap";
import { SplitText, Flip } from "gsap/all";

gsap.registerPlugin(SplitText, Flip);

export { gsap, SplitText, Flip };
