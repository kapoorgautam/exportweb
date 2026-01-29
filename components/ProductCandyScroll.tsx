'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Product } from '@/data/products';
import BackgroundParticles from './BackgroundParticles';
import NextImage from 'next/image';

interface ProductCandyScrollProps {
    product: Product;
}

export default function ProductCandyScroll({ product }: ProductCandyScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const frameCount = product.frameCount;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            if (typeof window !== 'undefined') {
                setIsMobile(window.innerWidth < 768);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 80px', 'end end'],
    });

    const startFrameIndex = (product.startFrame || 1) - 1;
    const endFrameIndex = frameCount - 1;
    const frameIndex = useTransform(scrollYProgress, [0, 1], [startFrameIndex, endFrameIndex]);

    // Load images only if NOT mobile
    useEffect(() => {
        if (isMobile) {
            setLoaded(true);
            return;
        }

        const loadImages = async () => {
            const imgs: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const src = `${product.folderPath}/${i}.jpg`;
                    img.src = src;
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                    imgs[i - 1] = img;
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(imgs);
            setLoaded(true);
        };

        loadImages();
    }, [product.folderPath, frameCount, isMobile]);

    useEffect(() => {
        // Run canvas logic only if NOT mobile and loaded
        if (isMobile || !loaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
        let rafId: number;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const width = parent.clientWidth;
            const height = parent.clientHeight;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const drawFrame = () => {
            const index = Math.min(
                frameCount - 1,
                Math.floor(frameIndex.get() || 0)
            );
            const img = images[index];
            if (!img) return;

            const cw = canvas.width / dpr;
            const ch = canvas.height / dpr;
            ctx.clearRect(0, 0, cw, ch);
            const scale = Math.max(cw / img.width, ch / img.height);
            const drawWidth = img.width * scale;
            const drawHeight = img.height * scale;
            const offsetX = (cw - drawWidth) / 2;
            const offsetY = (ch - drawHeight) / 2;
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const render = () => {
            drawFrame();
            rafId = requestAnimationFrame(render);
        };

        resizeCanvas();
        render();

        const resizeObserver = new ResizeObserver(resizeCanvas);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
        };
    }, [loaded, images, frameIndex, isMobile, frameCount]);

    // Static Image Fallback for Mobile (using last frame or product image)
    // We use a regular img tag for simplicity or the last frame
    const staticImageSrc = `${product.folderPath}/${product.frameCount}.jpg`;

    return (
        <div ref={containerRef} className="h-[500vh] relative">
            <div className="sticky top-[80px] h-screen w-full overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
                <div className={`absolute inset-0 opacity-100 bg-gradient-to-br ${product.gradient}`} />
                <div className="absolute inset-0 bg-black/20" />

                {isMobile ? (
                    // Mobile: Static Image
                    <div className="relative z-10 w-full h-full">
                        <NextImage
                            src={staticImageSrc}
                            alt={product.name}
                            className="object-cover"
                            fill
                            sizes="100vw"
                            priority
                        />
                    </div>
                ) : (
                    // Desktop: Canvas
                    <>
                        <BackgroundParticles themeColor={product.themeColor} />
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full object-cover max-w-[100vw] max-h-[100vh] relative z-10"
                        />
                        {!loaded && (
                            <div className="absolute inset-0 flex items-center justify-center text-white z-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
