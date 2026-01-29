'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({
    theme: 'light',
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    // Initialize theme (default to light)
    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme;
        if (saved) {
            setTheme(saved);
            if (typeof window !== 'undefined') {
                document.documentElement.classList.toggle('dark', saved === 'dark');
            }
        } else {
            // Default is now light, so ensure dark class is removed if no preference
            if (typeof window !== 'undefined') {
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
