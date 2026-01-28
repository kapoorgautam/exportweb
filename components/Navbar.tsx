'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-400 to-yellow-400 flex items-center justify-center animate-spin-slow group-hover:scale-110 transition-transform">
                            <span className="text-black font-bold text-xs">C</span>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400 tracking-tight">
                            CANZZY
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            // 'Shop'
                         'Our Story', 'Flavors'].map((item) => (
                            <a
                                key={item}
                                href={item === 'Flavors' ? '/flavors' : item === 'Our Story' ? '/our-story' 
                                    // : item === 'Shop' ? '/shop'
                                    : `/#${item.toLowerCase()}`}
                                className="text-gray-700 dark:text-white/80 hover:text-lime-600 dark:hover:text-lime-400 transition-colors text-sm font-medium tracking-wide uppercase"
                            >
                                {item}
                            </a>
                        ))}
                        <a
                            href="/contact"
                            className="text-gray-700 dark:text-white/80 hover:text-lime-600 dark:hover:text-lime-400 transition-colors text-sm font-medium tracking-wide uppercase"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex items-center gap-2 bg-lime-500 hover:bg-lime-400 text-black px-6 py-2 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transform hover:-translate-y-0.5">
                            <span>Buy Candy</span>
                            <ShoppingBag size={18} />
                        </button>
                        <button
                            className="md:hidden text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
                >
                    <div className="px-4 py-8 flex flex-col gap-6 items-center">
                        {[
                            // 'Shop'
                             'Our Story', 'Flavors', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-xl text-white font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                        <button className="w-full bg-lime-500 text-black py-3 rounded-full font-bold mt-4">
                            Buy Candy
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
