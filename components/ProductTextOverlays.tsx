'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { Product } from '@/data/products';

interface ProductTextOverlaysProps {
    product: Product;
}

export default function ProductTextOverlays({ product }: ProductTextOverlaysProps) {
    // Use the same scrolling container assumption (parent is handling the height)
    // Actually, to sync perfectly, we should probably pass the scroll progress or ref from the parent?
    // Or simpler: This component *also* creates a 500vh container that sits on top (pointer-events-none) 
    // to track the same scroll positions.

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const Section = ({
        title,
        subtitle,
        extraText,
        start,
        end,
        align = 'center'
    }: {
        title: string;
        subtitle: string;
        extraText?: string;
        start: number;
        end: number;
        align?: 'left' | 'center' | 'right';
    }) => {
        const opacity = useTransform(
            scrollYProgress,
            [start, start + 0.05, end - 0.05, end],
            [0, 1, 1, 0]
        );
        const y = useTransform(
            scrollYProgress,
            [start, start + 0.05, end - 0.05, end],
            [50, 0, 0, -50]
        );

        const alignmentClasses = {
            left: 'items-start text-left pl-10 md:pl-32',
            center: 'items-center text-center',
            right: 'items-end text-right pr-10 md:pr-32',
        };

        return (
            <motion.div
                style={{ opacity, y }}
                className={`fixed inset-0 flex flex-col justify-center pointer-events-none ${alignmentClasses[align]} z-10`}
            >
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 dark:text-white drop-shadow-2xl mb-4 transition-colors duration-500">
                    {title}
                </h2>
                <p className="text-xl md:text-3xl text-lime-600 dark:text-lime-400 font-bold max-w-lg drop-shadow-lg mb-6 transition-colors duration-500">
                    {subtitle}
                </p>
                {extraText && (
                    <h3 className="text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-pulse">
                        {extraText}
                    </h3>
                )}
            </motion.div>
        );
    };

    return (
        <div ref={containerRef} className="absolute inset-0 h-[500vh] w-full pointer-events-none">
            <Section
                title={product.name}
                subtitle={product.subName}
                extraText={product.heroHeadline} // Pass the hero headline
                start={0}
                end={0.15}
                align="center"
            />
            <Section
                title={product.section1.title}
                subtitle={product.section1.subtitle}
                start={0.15}
                end={0.35}
                align="center"
            />
            <Section
                title={product.section2.title}
                subtitle={product.section2.subtitle}
                start={0.3}
                end={0.5}
                align="left"
            />
            <Section
                title={product.section3.title}
                subtitle={product.section3.subtitle}
                start={0.55}
                end={0.75}
                align="right"
            />
            <Section
                title={product.section4.title}
                subtitle={product.section4.subtitle}
                start={0.8}
                end={0.95}
                align="center"
            />
        </div>
    );
}
