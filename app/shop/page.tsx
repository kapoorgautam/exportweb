'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { products, Product } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

function ShopCard({ product, index }: { product: Product; index: number }) {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-200 dark:border-white/10 hover:border-lime-500/50 transition-all hover:shadow-xl flex flex-col"
        >
            {/* Image Placeholder */}
            <div className={`aspect-square rounded-2xl bg-gradient-to-br ${product.gradient} opacity-90 mb-6 flex items-center justify-center relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <h3 className="text-white text-3xl font-bold font-display opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-500">{product.name}</h3>
            </div>

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.subName}</p>
                </div>
                <div className="text-right">
                    <span className="block text-2xl font-bold text-lime-600 dark:text-lime-500">{product.buyNowSection.price}</span>
                    <span className="text-xs text-gray-400">{product.buyNowSection.unit}</span>
                </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/10 rounded-xl px-3 py-2">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-6 h-6 flex items-center justify-center hover:text-lime-500"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="font-bold w-4 text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-lime-500"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {/* Add Button */}
                <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 ${isAdded
                            ? 'bg-green-500 text-white'
                            : 'bg-black dark:bg-white text-white dark:text-black hover:bg-lime-500 hover:text-black dark:hover:bg-lime-400'
                        }`}
                >
                    {isAdded ? (
                        <>
                            <Check size={18} />
                            <span>Added</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={18} />
                            <span>Add</span>
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}

export default function ShopPage() {
    return (
        <main className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white min-h-screen transition-colors duration-500">
            <Navbar />

            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                >
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold font-display mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-green-500">
                            Shop
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl">
                            Stock up on your favorites. Direct from our kitchen to your doorstep.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <ShopCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
