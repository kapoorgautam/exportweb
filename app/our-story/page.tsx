'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Rocket, Heart, Globe, Sparkles } from 'lucide-react';

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`min-h-[60vh] flex flex-col justify-center items-center text-center p-8 ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function OurStoryPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <main ref={containerRef} className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white min-h-screen overflow-hidden transition-colors duration-500">
            <Navbar />

            {/* Parallax Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20">
                <motion.div style={{ y: backgroundY }} className="absolute top-20 left-10 w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                <motion.div style={{ y: backgroundY }} className="absolute top-40 right-10 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                <motion.div style={{ y: backgroundY }} className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto pt-32 pb-20">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4"
                >
                    <span className="text-lime-600 dark:text-lime-400 font-bold tracking-[0.2em] uppercase mb-6 animate-pulse">Our Journey</span>
                    <h1 className="text-6xl md:text-8xl font-black font-display mb-8 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 via-yellow-400 to-orange-500 leading-tight">
                        The Tangy <br /> Revolution
                    </h1>
                    <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl font-light">
                        How we turned a childhood memory into a global obsession.
                    </p>
                </motion.div>

                {/* Chapter 1: The Spark */}
                <Section>
                    <div className="w-20 h-20 bg-lime-100 dark:bg-lime-900/30 rounded-full flex items-center justify-center mb-8 mx-auto">
                        <Sparkles className="w-10 h-10 text-lime-600 dark:text-lime-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">It Started with a Caving</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                        Remember waiting outside school gates for that one vendor who had the perfect raw mango candies?
                        <br /><br />
                        We did. But as we grew up, we realized that authentic tangy kick was missing from modern candy aisles.
                        Everything was too sweet, too artificial, or just plain boring. We missed the <strong>zing</strong>.
                    </p>
                </Section>

                {/* Chapter 2: The Lab */}
                <Section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
                        <div className="order-2 md:order-1 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-lime-600 to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative aspect-video bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-200 dark:border-white/10 p-8">
                                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-yellow-500">
                                    100+ <br /> Recipes
                                </h3>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Kitchen Experiments</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                We didn&apos;t want &quot;mango flavor&quot;. We wanted <strong>Kaccha Mango</strong>.
                                We spent months sourcing real fruit extracts, experimenting with natural spices, and perfecting the balance between sun-dried tang and sugary delight.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Chapter 3: The Philosophy */}
                <Section className="py-24">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-8 mx-auto">
                        <Heart className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">No Compromise on Tang</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {[
                            { title: "Real Fruit", desc: "If it says Mango, it has real Mango." },
                            { title: "Zero Nasties", desc: "No banned colors. No harmful additives." },
                            { title: "Premium Feel", desc: "Candy deserves to be a premium experience." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-lime-500/30 transition-colors">
                                <h3 className="text-xl font-bold mb-4 text-lime-600 dark:text-lime-400">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Chapter 4: The Vision */}
                <Section>
                    <div className="bg-black dark:bg-white text-white dark:text-black rounded-[3rem] p-12 md:p-24 w-full">
                        <div className="w-20 h-20 bg-white/20 dark:bg-black/10 rounded-full flex items-center justify-center mb-8 mx-auto backdrop-blur-sm">
                            <Rocket className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black font-display mb-8">Taking Local Global</h2>
                        <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto leading-relaxed mb-12">
                            What started in a small kitchen is now a revolution. We are taking the authentic tastes of India—the chatpata, the khatta, the meetha—to the world stage.
                        </p>
                        <Globe className="w-32 h-32 mx-auto opacity-20 animate-pulse" />
                    </div>
                </Section>

            </div>

            <Footer />
        </main>
    );
}
