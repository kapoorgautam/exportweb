'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Product } from '@/data/products';
import BackgroundParticles from './BackgroundParticles';

interface ProductCandyScrollProps {
    product: Product;
}

export default function ProductCandyScroll({ product }: ProductCandyScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const frameCount = product.frameCount;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 80px', 'end end'],
    });

    // Map scroll (0 to 1) to frame index (startFrame to frameCount)
    // Map scroll (0 to 1) to frame index (startFrame to frameCount)
    // Ensure startFrame is 1-based in definition, convert to 0-based index
    const startFrameIndex = (product.startFrame || 1) - 1;
    const endFrameIndex = frameCount - 1;
    const frameIndex = useTransform(scrollYProgress, [0, 1], [startFrameIndex, endFrameIndex]);

    useEffect(() => {
        // Preload images
        const loadImages = async () => {
            const imgs: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    // Use product specific folder or fallback
                    // Assuming all use the same folder for demo if others are empty
                    const src = `${product.folderPath}/${i}.jpg`;
                    img.src = src;
                    img.onload = () => resolve();
                    img.onerror = () => {
                        // console.warn(`Failed to load ${src}`); 
                        resolve();
                    };
                    imgs[i - 1] = img;
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(imgs);
            setLoaded(true);
        };

        loadImages();
    }, [product.folderPath, frameCount]);

    // useEffect(() => {
    //     if (!loaded || !canvasRef.current) return;

    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     if (!ctx) return;

    //     // HighDPI scaling
    //     const dpr = window.devicePixelRatio || 1;

    //     const render = () => {
    //         const currentFrame = Math.min(
    //             frameCount - 1,
    //             Math.floor(frameIndex.get() || 1) - 1
    //         );

    //         const img = images[currentFrame];
    //         if (img) {
    //             // Maintain aspect ratio and fit 'contain'
    //             const cw = canvas.width;
    //             const ch = canvas.height;

    //             ctx.clearRect(0, 0, cw, ch);

    //             const imgRatio = img.width / img.height;
    //             const canvasRatio = cw / ch;

    //             // COVER Logic: Maintain aspect ratio and fill the canvas
    //             // 'Cover' ensures the image fills the screen (width and height), cropping if necessary.
    //             let drawWidth, drawHeight, offsetX, offsetY;
    //             const scale = Math.max(cw / img.width, ch / img.height);

    //             drawWidth = img.width * scale;
    //             drawHeight = img.height * scale;
    //             offsetX = (cw - drawWidth) / 2;
    //             offsetY = (ch - drawHeight) / 2;

    //             ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    //         }

    //         requestAnimationFrame(render);
    //     };

    //     const unsubscribe = frameIndex.on('change', () => {
    //         // Values update automatically, rAF loop handles drawing
    //     });

    //     const loop = requestAnimationFrame(render);

    //     const handleResize = () => {
    //         const parent = canvas.parentElement;
    //         if (parent) {
    //             canvas.width = parent.clientWidth * dpr;
    //             canvas.height = parent.clientHeight * dpr;
    //             ctx.scale(dpr, dpr);
    //             // Logic above uses canvas.width/height directly which are physical pixels
    //             // So we actually don't need context scale if we compute render coords in physical pixels
    //             // or we set style width/height and internal width/height differently.
    //             // Simpler approach for responsive fit:
    //         }
    //     }

    //     // Better Resize Strategy
    //     const resizeObserver = new ResizeObserver((entries) => {
    //         for (const entry of entries) {
    //             const { width, height } = entry.contentRect;
    //             canvas.width = width * dpr;
    //             canvas.height = height * dpr;
    //         }
    //     });
    //     if (containerRef.current) resizeObserver.observe(containerRef.current);

    //     return () => {
    //         cancelAnimationFrame(loop);
    //         unsubscribe();
    //         resizeObserver.disconnect();
    //     };
    // }, [loaded, images, frameIndex]);



    useEffect(() => {
        if (!loaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        let rafId: number;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const width = parent.clientWidth;
            const height = parent.clientHeight;

            // CSS size
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // Internal resolution
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

            // 👉 COVER logic (Maintains aspect ratio and fills screen)
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
    }, [loaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="h-[500vh] relative">
            <div className="sticky top-[80px] h-screen w-full overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
                {/* Background Gradient & Particles */}
                <div
                    className={`absolute inset-0 opacity-100 bg-gradient-to-br ${product.gradient}`}
                />

                {/* Darken overlay to make candy pop while keeping color */}
                <div className="absolute inset-0 bg-black/20" />

                <BackgroundParticles themeColor={product.themeColor} />

                {/* Canvas with Blend Mode */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover max-w-[100vw] max-h-[100vh] relative z-10"
                />
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white z-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
