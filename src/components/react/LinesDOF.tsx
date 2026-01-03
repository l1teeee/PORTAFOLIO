// src/components/react/LinesDOF.tsx
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type MouseNDC = { x: number; y: number };

function fibonacciSphere(count: number) {
    const points: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;

        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        points.push(new THREE.Vector3(x, y, z));
    }
    return points;
}

function buildGreatCirclesGeometry(radius: number, circles = 18, segments = 220) {
    // Un solo BufferGeometry con muchos segmentos (más eficiente)
    const totalSegments = circles * segments;
    const positions = new Float32Array(totalSegments * 2 * 3); // 2 puntos por segmento, 3 coords

    const tmpAxis = new THREE.Vector3();
    const u = new THREE.Vector3();
    const v = new THREE.Vector3();
    const p0 = new THREE.Vector3();
    const p1 = new THREE.Vector3();

    let ptr = 0;

    for (let c = 0; c < circles; c++) {
        // eje aleatorio (normal del plano del círculo)
        tmpAxis.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();

        // base ortonormal u, v en el plano perpendicular al eje
        // elige un vector cualquiera que no sea colineal
        const helper = Math.abs(tmpAxis.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
        u.crossVectors(tmpAxis, helper).normalize();
        v.crossVectors(tmpAxis, u).normalize();

        for (let s = 0; s < segments; s++) {
            const a0 = (s / segments) * Math.PI * 2;
            const a1 = ((s + 1) / segments) * Math.PI * 2;

            p0.copy(u).multiplyScalar(Math.cos(a0)).addScaledVector(v, Math.sin(a0)).multiplyScalar(radius);
            p1.copy(u).multiplyScalar(Math.cos(a1)).addScaledVector(v, Math.sin(a1)).multiplyScalar(radius);

            // segment p0 -> p1
            positions[ptr++] = p0.x; positions[ptr++] = p0.y; positions[ptr++] = p0.z;
            positions[ptr++] = p1.x; positions[ptr++] = p1.y; positions[ptr++] = p1.z;
        }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
}

function SphereFX({ mouse }: { mouse: MouseNDC }) {
    const groupRef = useRef<THREE.Group>(null);

    const radius = 4.6;

    const pointsGeom = useMemo(() => {
        const count = 2200;
        const dirs = fibonacciSphere(count);

        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const d = dirs[i];
            const jitter = (Math.random() - 0.5) * 0.25;
            const r = radius + jitter;

            const x = d.x * r;
            const y = d.y * r;
            const z = d.z * r;

            pos[i * 3 + 0] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            const v = Math.random() > 0.25 ? 1.0 : 0.55;
            col[i * 3 + 0] = v;
            col[i * 3 + 1] = v;
            col[i * 3 + 2] = v;
        }

        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        g.setAttribute("color", new THREE.BufferAttribute(col, 3));
        return g;
    }, []);

    const linesGeom = useMemo(() => {
        return buildGreatCirclesGeometry(radius * 1.02, 20, 240); // ajusta circles/segments
    }, []);

    const sparkGeom = useMemo(() => {
        const n = 420;
        const pos = new Float32Array(n * 3);
        const col = new Float32Array(n * 3);

        for (let i = 0; i < n; i++) {
            const r = Math.pow(Math.random(), 2.2) * 1.0;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3 + 0] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            col[i * 3 + 0] = 1;
            col[i * 3 + 1] = 1;
            col[i * 3 + 2] = 1;
        }

        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        g.setAttribute("color", new THREE.BufferAttribute(col, 3));
        return g;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const grp = groupRef.current;
        if (!grp) return;

        // ✅ NO deformamos la geometría: solo rotación + parallax suave con mouse
        const targetY = t * 0.18 + mouse.x * 0.35;
        const targetX = t * 0.08 + mouse.y * 0.25;

        grp.rotation.y = THREE.MathUtils.lerp(grp.rotation.y, targetY, 0.06);
        grp.rotation.x = THREE.MathUtils.lerp(grp.rotation.x, targetX, 0.06);
    });

    return (
        <group ref={groupRef}>
            {/* Líneas/orbitas */}
            <lineSegments geometry={linesGeom}>
                <lineBasicMaterial
                    color={"white"}
                    transparent
                    opacity={0.14}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>

            {/* Puntos (puedes quitar esto si quieres SOLO líneas) */}
            <points geometry={pointsGeom}>
                <pointsMaterial
                    vertexColors
                    transparent
                    opacity={0.9}
                    size={0.055}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Spark central */}
            <points geometry={sparkGeom}>
                <pointsMaterial
                    vertexColors
                    transparent
                    opacity={0.65}
                    size={0.05}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}

interface LinesDOFProps {
    isDark: boolean;
}

export function LinesDOF({ isDark }: LinesDOFProps) {
    const [mouse, setMouse] = useState<MouseNDC>({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        setMouse({ x, y });
    };

    return (
        <div
            className="mx-auto w-[clamp(280px,35vw,640px)] h-[clamp(280px,35vw,640px)] rounded-full overflow-hidden relative pointer-events-auto cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMouse({ x: 0, y: 0 })}
            style={{ background: "transparent" }}
        >
            <Canvas
                camera={{ position: [0, 0, 9], fov: 55 }}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
            >
                <SphereFX mouse={mouse} />
            </Canvas>
        </div>
    );
}
