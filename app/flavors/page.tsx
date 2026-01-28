'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { products, Product } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import ProductModal from '@/components/ProductModal';

function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={onClick}
            className="group relative bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-lime-500/50 dark:hover:border-lime-500/50 transition-all duration-500 hover:shadow-2xl flex flex-col h-full cursor-pointer hover:scale-[1.02]"
        >
            {/* Card Decoration Gradient */}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${product.gradient}`} />

            <div className="p-8 flex flex-col flex-grow">
                {/* Visual Placeholder */}
                <div className={`aspect-square mb-8 rounded-2xl bg-gradient-to-br ${product.gradient} opacity-20 group-hover:opacity-30 transition-opacity flex items-center justify-center relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-${product.themeColor.replace('#', '')} blur-3xl opacity-20`}></div>
                    <ShoppingBag className={`w-16 h-16`} style={{ color: product.themeColor }} />
                </div>

                <h3 className="text-3xl font-bold mb-2 font-display text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-lime-600 dark:text-lime-400 font-medium mb-4 text-sm uppercase tracking-wider font-sans">{product.subName}</p>

                <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 font-sans flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-lime-500 transition-colors">Tap for Details</span>
                    <div
                        className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg"
                    >
                        <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function FlavorsPage() {
    const candies = products.filter((p) => p.category === 'candy');
    const mouthFresheners = products.filter((p) => p.category === 'mouth-freshener');

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const openModal = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <main className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white min-h-screen transition-colors duration-500">
            <Navbar />

            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-yellow-500">
                        Our Flavors
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans">
                        Discover the tangy revolution. Every flavor is a journey back to the good old days, with a modern twist.
                    </p>
                </motion.div>

                {/* Candies Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-gray-200 dark:bg-white/10 flex-grow"></div>
                        <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-lime-600 dark:text-lime-500">Candies</h2>
                        <div className="h-px bg-gray-200 dark:bg-white/10 flex-grow"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {candies.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                onClick={() => openModal(product)}
                            />
                        ))}
                    </div>
                </section>

                {/* Mouth Fresheners Section */}
                {mouthFresheners.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px bg-gray-200 dark:bg-white/10 flex-grow"></div>
                            <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500">Mouth Fresheners</h2>
                            <div className="h-px bg-gray-200 dark:bg-white/10 flex-grow"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {mouthFresheners.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onClick={() => openModal(product)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <Footer />

            {/* Product Details Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={closeModal}
                />
            )}
        </main>
    );
}
