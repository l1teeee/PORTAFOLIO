// src/components/react/particleShapes.ts
import type { Section } from "@/types";

export type ShapeTargets = Record<Section, Float32Array>;

// Shapes are generated upright; the field tilts them (and spins them around their own Y axis)
// with a single orientation matrix, so every shape can keep rotating while it is displayed.
export const SHAPE_TILT: Record<Section, { x: number; z: number }> = {
    home: { x: 0, z: 0 },
    me: { x: 0.35, z: -0.2 },
    experience: { x: 0.3, z: -0.6 },
    skills: { x: 1.0, z: -0.3 },
    projects: { x: 0, z: 0 },
    certificates: { x: 1.15, z: 0.25 },
};

// Spin around the shape's own axis, radians per second. The home lens stays still: seen edge-on it would collapse to a line.
export const SHAPE_SPIN: Record<Section, number> = {
    home: 0,
    me: 0.08,
    experience: 0.22,
    skills: 0.12,
    projects: 0.05,
    certificates: 0.16,
};

const TWO_PI = Math.PI * 2;

function gaussian(): number {
    const u = 1 - Math.random();
    const v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(TWO_PI * v);
}

function setRandomDirection(out: Float32Array, at: number, radius: number) {
    const z = Math.random() * 2 - 1;
    const angle = Math.random() * TWO_PI;
    const ring = Math.sqrt(1 - z * z);
    out[at] = ring * Math.cos(angle) * radius;
    out[at + 1] = ring * Math.sin(angle) * radius;
    out[at + 2] = z * radius;
}

// Starting layout: a wide sheet beyond the viewport edges so the intro shows the field condensing.
// Kept well in front of the camera: a sprite next to the lens is huge and tanks the fill rate.
export function buildScatter(count: number): Float32Array {
    const out = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const j = i * 3;
        out[j] = (Math.random() * 2 - 1) * 16;
        out[j + 1] = (Math.random() * 2 - 1) * 10;
        out[j + 2] = -Math.random() * 10;
    }
    return out;
}

// Wide flat lens of grain: gaussian falloff so the center is denser and the edges dissolve
function nebula(count: number): Float32Array {
    const out = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const j = i * 3;
        const r = Math.min(1, Math.sqrt(-2 * Math.log(1 - Math.random())) * 0.42);
        setRandomDirection(out, j, r);
        out[j] *= 8.4;
        out[j + 1] *= 4.4;
        out[j + 2] *= 1.5;
    }
    return out;
}

// Ring standing in the XY plane, so spinning around Y tumbles it like a slowly turning halo
function torus(count: number): Float32Array {
    const out = new Float32Array(count * 3);
    const ringRadius = 3.2;
    const tubeRadius = 1.0;
    for (let i = 0; i < count; i++) {
        const j = i * 3;
        const around = Math.random() * TWO_PI;
        const across = Math.random() * TWO_PI;
        const r = tubeRadius * Math.pow(Math.random(), 0.4);
        const fromCenter = ringRadius + r * Math.cos(across);
        out[j] = Math.cos(around) * fromCenter;
        out[j + 1] = Math.sin(around) * fromCenter;
        out[j + 2] = r * Math.sin(across);
    }
    return out;
}

// Thin bright shell for a crisp limb plus an evenly filled body, so it reads as a solid planet
function sphere(count: number): Float32Array {
    const out = new Float32Array(count * 3);
    const radius = 3.8;
    for (let i = 0; i < count; i++) {
        const j = i * 3;
        const onShell = Math.random() < 0.65;
        const r = onShell ? radius + gaussian() * 0.06 : radius * Math.cbrt(Math.random());
        setRandomDirection(out, j, r);
    }
    return out;
}

function galaxy(count: number): Float32Array {
    const out = new Float32Array(count * 3);
    const arms = 3;
    const reach = 6.2;
    for (let i = 0; i < count; i++) {
        const j = i * 3;
        if (Math.random() < 0.15) {
            setRandomDirection(out, j, 1.3 * Math.pow(Math.random(), 0.6));
            continue;
        }
        const arm = i % arms;
        const t = Math.pow(Math.random(), 0.6) * reach;
        const spread = 0.12 + 0.22 * (t / reach);
        const angle = t * 0.95 + (arm / arms) * TWO_PI + gaussian() * spread;
        out[j] = Math.cos(angle) * t;
        out[j + 1] = gaussian() * 0.16 * (1.2 - t / reach);
        out[j + 2] = Math.sin(angle) * t;
    }
    return out;
}

// Two intertwined strands with rungs
function helix(count: number): Float32Array {
    const out = new Float32Array(count * 3);
    const turns = 3;
    const height = 9;
    const radius = 1.7;
    for (let i = 0; i < count; i++) {
        const j = i * 3;
        const t = Math.random();
        const angle = t * turns * TWO_PI;
        if (i % 7 === 0) {
            const level = Math.round(t * turns * 8) / (turns * 8);
            const levelAngle = level * turns * TWO_PI;
            const across = Math.random() * 2 - 1;
            out[j] = Math.cos(levelAngle) * radius * across;
            out[j + 1] = (level - 0.5) * height;
            out[j + 2] = Math.sin(levelAngle) * radius * across;
            continue;
        }
        const strand = i % 2 === 0 ? 0 : Math.PI;
        const r = radius + gaussian() * 0.1;
        out[j] = Math.cos(angle + strand) * r;
        out[j + 1] = (t - 0.5) * height;
        out[j + 2] = Math.sin(angle + strand) * r;
    }
    return out;
}

export function buildShapeTargets(count: number): ShapeTargets {
    // Me and Skills share one ring: changing between them only re-orients it, the grain does not regenerate
    const ring = torus(count);
    return {
        home: nebula(count),
        me: ring,
        experience: helix(count),
        skills: ring,
        projects: sphere(count),
        certificates: galaxy(count),
    };
}
