// src/components/react/LinesDOF.tsx
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Lines() {
    const linesRef = useRef<THREE.Group>(null);

    const lines = useMemo(() => {
        const temp = [];
        const lineCount = 100;

        for (let i = 0; i < lineCount; i++) {
            const points = [];
            const segments = 50;

            for (let j = 0; j < segments; j++) {
                const t = j / segments;
                const x = (Math.random() - 0.5) * 10;
                const y = t * 20 - 10;
                const z = (Math.random() - 0.5) * 10;
                points.push(new THREE.Vector3(x, y, z));
            }

            temp.push({
                points,
                color: Math.random() > 0.5 ? '#ffffff' : '#888888',
                speed: 0.01 + Math.random() * 0.02
            });
        }

        return temp;
    }, []);

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={linesRef}>
            {lines.map((line, i) => (
                <Line key={i} points={line.points} color={line.color} />
            ))}
        </group>
    );
}

function Line({ points, color }: { points: THREE.Vector3[], color: string }) {
    const lineRef = useRef<THREE.Line>(null);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return geo;
    }, [points]);

    useFrame(() => {
        if (lineRef.current) {
            lineRef.current.position.y -= 0.02;
            if (lineRef.current.position.y < -10) {
                lineRef.current.position.y = 10;
            }
        }
    });

    return (
        <line ref={lineRef}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial attach="material" color={color} transparent opacity={0.6} />
        </line>
    );
}

interface LinesDOFProps {
    isDark: boolean;
}

export function LinesDOF({ isDark }: LinesDOFProps) {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance"
                }}
            >
                <color attach="background" args={[isDark ? '#000000' : '#ffffff']} />
                <fog attach="fog" args={[isDark ? '#000000' : '#ffffff', 5, 25]} />
                <Lines />
            </Canvas>
        </div>
    );
}