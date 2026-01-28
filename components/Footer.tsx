'use client';

import { Facebook, Instagram, Twitter, Check } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'newsletter', data: { email: newsletterEmail } }),
            });

            if (response.ok) {
                setStatus('success');
                setNewsletterEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10 pt-20 pb-10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400 mb-6">
                            CANZZY
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-8">
                            Revolutionizing the candy industry with authentic flavors, premium ingredients, and a tangy twist that keeps you coming back for more.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-lime-500 hover:text-black transition-all duration-300"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Shop</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'All Flavors', href: '/flavors' },
                                { name: 'Bulk Orders', href: '/contact' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <a href={item.href} className="text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Newsletter</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Subscribe for new flavor drops and exclusive offers.</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                            <input
                                type="email"
                                required
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-lime-500 transition-colors"
                            />
                            <button
                                disabled={status === 'submitting' || status === 'success'}
                                className={`font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${status === 'success'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-lime-500 text-black hover:bg-lime-400'
                                    }`}
                            >
                                {status === 'submitting' ? 'Subscribing...' : status === 'success' ? (
                                    <>
                                        <Check size={18} /> Subscribed
                                    </>
                                ) : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} kapoor food products. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
