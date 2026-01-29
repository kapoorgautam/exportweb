'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                setScrolled(window.scrollY > 50);
            }
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
                        <Link
                            href="/contact"
                            className="text-gray-700 dark:text-white/80 hover:text-lime-600 dark:hover:text-lime-400 transition-colors text-sm font-medium tracking-wide uppercase"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>
                        <a
                            href="https://wa.me/919354502422"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 bg-lime-500 hover:bg-lime-400 text-black px-6 py-2 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transform hover:-translate-y-0.5"
                        >
                            <span>WhatsApp</span>
                            <MessageCircle size={18} />
                        </a>
                        <button
                            className="md:hidden text-gray-900 dark:text-white"
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
                    animate={{ opacity: 1, height: '100vh' }}
                    className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] pt-20"
                >
                    <button
                        className="absolute top-6 right-4 text-white p-2"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={32} />
                    </button>

                    <div className="px-6 py-8 flex flex-col gap-8 items-center justify-center h-full">
                        {['Our Story', 'Flavors', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={item === 'Flavors' ? '/flavors' : item === 'Our Story' ? '/our-story' : `/#${item.toLowerCase()}`}
                                className="text-3xl text-white font-bold tracking-tight hover:text-lime-400 transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}

                        <div className="flex items-center gap-4 mt-4">
                            <span className="text-white/60 text-sm font-medium">Theme</span>
                            <ThemeToggle />
                        </div>

                        <a
                            href="https://wa.me/919354502422"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full max-w-xs bg-lime-500 text-black py-4 rounded-full font-bold mt-8 flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(132,204,22,0.4)]"
                        >
                            <span>WhatsApp Us</span>
                            <MessageCircle size={24} />
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
