// src/components/react/ParticleField.tsx
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Section } from "@/types";
import { buildScatter, buildShapeTargets, SHAPE_SPIN, SHAPE_TILT } from "./particleShapes";

interface ParticleFieldProps {
    section: Section;
    isDark: boolean;
    isMono: boolean;
    // Dim the field while the intro text sits on top of it; it brightens when the intro ends
    subdued: boolean;
}

interface PointerNDC {
    x: number;
    y: number;
    // false until the first pointer event (touch devices, intro): no cursor glow, neutral parallax
    active: boolean;
}

// Where the field sits and how it is lit per section. shiftX is a fraction of the visible width;
// shade 1 darkens the left side like a lit planet, 0 keeps the grain even.
const SECTION_LOOK: Record<Section, { shiftX: number; opacity: number; shade: number }> = {
    home: { shiftX: 0, opacity: 0.35, shade: 0 },
    me: { shiftX: -0.19, opacity: 0.7, shade: 1 },
    experience: { shiftX: -0.16, opacity: 0.75, shade: 1 },
    projects: { shiftX: -0.15, opacity: 0.85, shade: 1 },
    certificates: { shiftX: -0.12, opacity: 0.8, shade: 1 },
};

const DARK_COLOR = new THREE.Color("#ffffff");
const LIGHT_COLOR = new THREE.Color("#151515");
const PIXEL_CELL_PX = 12;
// Dozens of particles land on each pixel cell, so each one must contribute far less than a loose grain
const PIXEL_OPACITY_FACTOR = 0.035;
const SUBDUED_OPACITY_FACTOR = 0.22;
// Brightness surge when the section or theme changes, decaying over about a second
const PULSE_STRENGTH = 0.7;
const MORPH_SECONDS = 3.5;
const DESKTOP_COUNT = 90000;
const MOBILE_COUNT = 30000;
const FAR_AWAY = new THREE.Vector2(1000, 1000);

const vertexShader = /* glsl */ `
    attribute float aSeed;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform mat3 uOrient;
    uniform float uCellPx;
    uniform float uSize;
    uniform float uPixelRatio;
    uniform float uCenterX;
    uniform float uShade;
    uniform float uGlow;
    varying float vAlpha;

    void main() {
        vec3 p = uOrient * position;
        float t = uTime * 0.35;
        p += 0.1 * vec3(
            sin(p.y * 1.3 + t + aSeed * 6.2831),
            sin(p.z * 1.1 + t * 1.3 + aSeed * 3.1),
            sin(p.x * 1.2 + t * 0.8)
        );

        vec4 world = modelMatrix * vec4(p, 1.0);

        vec2 away = world.xy - uMouse;
        float dist = length(away);
        float near = 1.0 - smoothstep(0.0, 2.0, dist);
        world.xy += (away / max(dist, 0.001)) * near * 0.5;

        vec4 mv = viewMatrix * world;
        vec4 clip = projectionMatrix * mv;

        float depth = max(-mv.z, 1.0);
        float size = min(uSize * uPixelRatio * (0.6 + 0.9 * fract(aSeed * 13.7)) * (10.0 / depth), 4.0 * uPixelRatio);

        // monospaced mode: snap to a screen-space grid so the field reads as pixel art
        if (uCellPx > 0.5) {
            vec2 px = (clip.xy / clip.w * 0.5 + 0.5) * uResolution;
            px = (floor(px / uCellPx) + 0.5) * uCellPx;
            clip.xy = (px / uResolution * 2.0 - 1.0) * clip.w;
            size = max(size, uCellPx);
        }

        gl_Position = clip;
        gl_PointSize = max(1.0, size);

        float lit = 0.25 + 0.75 * smoothstep(-4.0, 4.0, world.x - uCenterX);
        float shade = mix(1.0, lit, uShade);
        float twinkle = 0.55 + 0.45 * sin(uTime * (0.8 + aSeed * 2.5) + aSeed * 40.0);
        // the grain lights up around the cursor
        float glow = 1.0 + 1.2 * near * uGlow;
        vAlpha = shade * twinkle * glow;
    }
`;

const fragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uCellPx;
    varying float vAlpha;

    void main() {
        float shape = 1.0;
        if (uCellPx < 0.5) {
            vec2 c = gl_PointCoord - 0.5;
            float r2 = dot(c, c);
            if (r2 > 0.25) discard;
            shape = 1.0 - smoothstep(0.1, 0.25, r2);
        }
        gl_FragColor = vec4(uColor, shape * vAlpha * uOpacity);
    }
`;

function moveTowards(position: THREE.BufferAttribute, target: Float32Array, seeds: Float32Array, dt: number) {
    const current = position.array as Float32Array;
    for (let i = 0; i < seeds.length; i++) {
        const k = Math.min(1, (1.4 + seeds[i] * 3.2) * dt);
        const j = i * 3;
        current[j] += (target[j] - current[j]) * k;
        current[j + 1] += (target[j + 1] - current[j + 1]) * k;
        current[j + 2] += (target[j + 2] - current[j + 2]) * k;
    }
    position.needsUpdate = true;
}

interface FieldProps extends ParticleFieldProps {
    pointer: RefObject<PointerNDC>;
}

function Field({ section, isDark, isMono, subdued, pointer }: FieldProps) {
    const count = useMemo(() => (window.innerWidth < 768 ? MOBILE_COUNT : DESKTOP_COUNT), []);
    const targets = useMemo(() => buildShapeTargets(count), [count]);
    const seeds = useMemo(() => Float32Array.from({ length: count }, () => Math.random()), [count]);

    const geometry = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const position = new THREE.BufferAttribute(buildScatter(count), 3);
        position.setUsage(THREE.DynamicDrawUsage);
        g.setAttribute("position", position);
        g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        return g;
    }, [count, seeds]);

    const material = useMemo(
        () =>
            new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                transparent: true,
                depthWrite: false,
                depthTest: false,
                blending: THREE.AdditiveBlending,
                uniforms: {
                    uTime: { value: 0 },
                    uMouse: { value: FAR_AWAY.clone() },
                    uResolution: { value: new THREE.Vector2(1, 1) },
                    uOrient: { value: new THREE.Matrix3() },
                    uColor: { value: DARK_COLOR.clone() },
                    uOpacity: { value: 0 },
                    uCellPx: { value: 0 },
                    uSize: { value: 1.4 },
                    uPixelRatio: { value: 1 },
                    uCenterX: { value: 0 },
                    uShade: { value: 0 },
                    uGlow: { value: 0 },
                },
            }),
        []
    );

    const groupRef = useRef<THREE.Group>(null);
    const morphRemaining = useRef(MORPH_SECONDS);
    const pointerWasActive = useRef(false);
    const pulse = useRef(0);
    const spin = useRef(0);
    const tilt = useRef({ ...SHAPE_TILT[section] });
    const mouseTarget = useMemo(() => new THREE.Vector2(), []);
    const rotation = useMemo(
        () => ({ z: new THREE.Matrix4(), x: new THREE.Matrix4(), y: new THREE.Matrix4(), orient: new THREE.Matrix4() }),
        []
    );

    useEffect(() => {
        morphRemaining.current = MORPH_SECONDS;
        pulse.current = 1;
    }, [section]);

    useEffect(() => {
        material.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
        pulse.current = 1;
    }, [isDark, material]);

    useEffect(
        () => () => {
            geometry.dispose();
            material.dispose();
        },
        [geometry, material]
    );

    useFrame((state, delta) => {
        const group = groupRef.current;
        if (!group) return;

        const dt = Math.min(delta, 0.05);
        const ease = (rate: number) => 1 - Math.exp(-rate * dt);
        const u = material.uniforms;
        const dpr = state.gl.getPixelRatio();

        u.uTime.value += dt;
        u.uPixelRatio.value = dpr;
        u.uResolution.value.set(state.size.width * dpr, state.size.height * dpr);

        if (morphRemaining.current > 0) {
            morphRemaining.current -= dt;
            moveTowards(geometry.attributes.position as THREE.BufferAttribute, targets[section], seeds, dt);
        }

        const look = SECTION_LOOK[section];
        const p = pointer.current;
        const parallaxX = p.active ? p.x : 0;
        const parallaxY = p.active ? p.y : 0;

        if (p.active) {
            mouseTarget.set((p.x * state.viewport.width) / 2, (p.y * state.viewport.height) / 2);
        } else {
            mouseTarget.copy(FAR_AWAY);
        }
        // Snap on the first pointer event so the cursor effect does not sweep in from far away
        if (p.active && !pointerWasActive.current) {
            u.uMouse.value.copy(mouseTarget);
            pointerWasActive.current = true;
        }
        u.uMouse.value.lerp(mouseTarget, ease(4));
        u.uGlow.value += ((p.active ? 1 : 0) - u.uGlow.value) * ease(3);
        u.uColor.value.lerp(isDark ? DARK_COLOR : LIGHT_COLOR, ease(4));
        u.uCellPx.value += ((isMono ? PIXEL_CELL_PX * dpr : 0) - u.uCellPx.value) * ease(5);

        pulse.current *= Math.exp(-2.2 * dt);
        const targetOpacity =
            look.opacity *
            (1 + PULSE_STRENGTH * pulse.current) *
            (isMono ? PIXEL_OPACITY_FACTOR : 1) *
            (subdued ? SUBDUED_OPACITY_FACTOR : 1);
        u.uOpacity.value += (targetOpacity - u.uOpacity.value) * ease(3);
        u.uShade.value += (look.shade - u.uShade.value) * ease(2);

        // Each shape keeps turning around its own axis; the tilt eases over when the section changes
        const targetTilt = SHAPE_TILT[section];
        tilt.current.x += (targetTilt.x - tilt.current.x) * ease(2);
        tilt.current.z += (targetTilt.z - tilt.current.z) * ease(2);
        spin.current += SHAPE_SPIN[section] * dt;
        rotation.orient
            .copy(rotation.z.makeRotationZ(tilt.current.z))
            .multiply(rotation.x.makeRotationX(tilt.current.x))
            .multiply(rotation.y.makeRotationY(spin.current));
        u.uOrient.value.setFromMatrix4(rotation.orient);

        group.position.x += (look.shiftX * state.viewport.width - group.position.x) * ease(2);
        u.uCenterX.value = group.position.x;
        group.rotation.y += (parallaxX * 0.18 - group.rotation.y) * ease(2);
        group.rotation.x += (-parallaxY * 0.12 - group.rotation.x) * ease(2);
        const breath = 1 + 0.012 * Math.sin(u.uTime.value * 0.7);
        group.scale.setScalar(THREE.MathUtils.clamp(state.viewport.width / 18, 0.6, 1) * breath);
    });

    return (
        <group ref={groupRef}>
            <points geometry={geometry} material={material} frustumCulled={false} />
        </group>
    );
}

export function ParticleField(props: ParticleFieldProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pointer = useRef<PointerNDC>({ x: 0, y: 0, active: false });

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            const wrapper = wrapperRef.current;
            if (!wrapper) return;
            const rect = wrapper.getBoundingClientRect();
            pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            pointer.current.active = true;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    return (
        <div ref={wrapperRef} className="pointer-events-none absolute inset-0">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 11], fov: 45 }}
                gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
            >
                <Field {...props} pointer={pointer} />
            </Canvas>
        </div>
    );
}
