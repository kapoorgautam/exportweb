'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BackgroundParticlesProps {
    themeColor: string;
}

export default function BackgroundParticles({ themeColor }: BackgroundParticlesProps) {
    // Generate random particles
    const particleCount = 20;
    const [particles, setParticles] = useState<{
        id: number;
        x: number;
        y: number;
        size: number;
        duration: number;
        delay: number;
    }[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            size: Math.random() * 10 + 5, // px
            duration: Math.random() * 10 + 10, // seconds
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full opacity-20 blur-sm"
                    style={{
                        backgroundColor: themeColor,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100, 0], // Float up and down slightly
                        x: [0, Math.random() * 50 - 25, 0], // Drift sideways
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: p.delay,
                    }}
                />
            ))}
            {/* Ambient Glows */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] opacity-20 animate-pulse"
                style={{ backgroundColor: themeColor }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[80px] opacity-15 animate-pulse"
                style={{ backgroundColor: themeColor, animationDelay: '2s' }}
            />
        </div>
    );
}
