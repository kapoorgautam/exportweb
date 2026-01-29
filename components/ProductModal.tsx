'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Heart, Globe } from 'lucide-react';
import { Product } from '@/data/products';
import { useState } from 'react';

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            productName: product.name,
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'inquiry', data }),
            });

            if (response.ok) {
                setFormStatus('success');
                setTimeout(() => {
                    onClose();
                    setFormStatus('idle');
                }, 3000);
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            setFormStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                            className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl relative border border-white/10 flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh] overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/10 dark:bg-white/10 rounded-full hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                            >
                                <X size={20} className="text-gray-900 dark:text-white" />
                            </button>

                            {/* Scrollable Content Container */}
                            <div className="flex flex-col md:flex-row w-full overflow-y-auto md:overflow-hidden h-full">

                                {/* Left Side: Visuals & Export Appeal */}
                                <div className="md:w-1/2 p-6 sm:p-8 relative bg-gray-50 dark:bg-black/50 md:overflow-y-auto">
                                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${product.gradient}`} />

                                    <h2 className="text-3xl sm:text-4xl font-bold font-display mb-2 text-gray-900 dark:text-white pr-8">{product.name}</h2>
                                    <p className="text-sm font-bold uppercase tracking-widest text-lime-600 dark:text-lime-500 mb-6">{product.subName}</p>

                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <Globe size={18} />
                                            {product.exportAppeal.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                            {product.exportAppeal.description}
                                        </p>
                                    </div>

                                    <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <Heart size={18} className="text-red-500" />
                                            Health & Wellness
                                        </h3>
                                        <ul className="space-y-3">
                                            {product.exportAppeal.healthBenefits.map((benefit, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                    <CheckCircle size={16} className="text-lime-500 mt-0.5 shrink-0" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Right Side: Contact Form */}
                                <div className="md:w-1/2 p-6 sm:p-8 bg-white dark:bg-gray-900 flex flex-col md:overflow-y-auto">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold font-display mb-2 text-gray-900 dark:text-white">Interested?</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            Fill out the form below to inquire about bulk orders or distribution for <span className="font-bold text-gray-900 dark:text-white">{product.name}</span>.
                                        </p>
                                    </div>

                                    {formStatus === 'success' ? (
                                        <div className="flex flex-col items-center justify-center p-8 text-center h-64 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-200 dark:border-green-500/20">
                                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                                                <CheckCircle size={32} />
                                            </div>
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Inquiry Sent!</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">We&apos;ll get back to you shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Name</label>
                                                <input
                                                    name="name"
                                                    required
                                                    type="text"
                                                    placeholder="Your Name"
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-lime-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Email</label>
                                                <input
                                                    name="email"
                                                    required
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-lime-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Message</label>
                                                <textarea
                                                    name="message"
                                                    required
                                                    rows={4}
                                                    defaultValue={`I am interested in learning more about the ${product.name} (${product.buyNowSection.unit}). Please send me pricing and catalogue.`}
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-lime-500 transition-colors resize-none"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={formStatus === 'submitting'}
                                                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-lime-500/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                                                {!formStatus && <Send size={18} />}
                                            </button>
                                            {formStatus === 'error' && (
                                                <p className="text-red-500 text-xs text-center mt-2">Failed to send. Please try again.</p>
                                            )}
                                        </form>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
