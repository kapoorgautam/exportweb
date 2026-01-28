'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white dark:text-yellow-400 hover:bg-white/20 transition-colors"
            title="Toggle Theme"
        >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} className="text-gray-800" />}
        </motion.button>
    );
}
