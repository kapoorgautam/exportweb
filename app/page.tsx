'use client';

import { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Leaf, Truck, RotateCcw, Box } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCandyScroll from '@/components/ProductCandyScroll';
import ProductTextOverlays from '@/components/ProductTextOverlays';




function HomeContent() {
  const searchParams = useSearchParams();
  const initialIndex = searchParams.get('product_index') ? parseInt(searchParams.get('product_index')!) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const product = products[currentIndex];

  useEffect(() => {
    if (searchParams.get('product_index')) {
      setCurrentIndex(parseInt(searchParams.get('product_index')!));
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <main className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white selection:bg-lime-500 selection:text-white transition-colors duration-500">
      <Navbar />

      {/* Navigation Controls */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 bg-white/80 dark:bg-white/10 backdrop-blur-md p-2 rounded-full border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none transition-colors duration-500">
        {products.map((p, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              style={{
                backgroundColor: isActive ? p.themeColor : 'transparent',
                color: isActive ? (p.id === 'chandan-mukhavas' ? 'white' : 'black') : '',
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                ? 'shadow-lg scale-105'
                : 'text-gray-600 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                }`}
            >
              {p.name.split(' ')[0]}
            </button>
          );
        })}
      </div>




      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
        >
          {/* Hero / Scrollytelling Section */}
          <div className="relative">
            {/* Gradient Background tied to product theme */}
            <div className={`absolute inset-0 bg-gradient-to-b ${product.gradient} pointer-events-none sticky top-0`} />

            <div className="relative">
              <ProductCandyScroll product={product} />
              <ProductTextOverlays product={product} />
            </div>
          </div>

          {/* Product Details Section */}
          <section className="relative z-20 bg-white/90 dark:bg-black/90 pt-32 pb-20 px-4 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
              >
                <div className={`aspect-square rounded-3xl bg-gradient-to-br ${product.gradient} opacity-80 flex items-center justify-center p-10`}>
                  {/* Placeholder for static product image if we had one separate from frames */}
                  <div className="text-white text-center">
                    <h3 className="text-4xl font-bold mb-4">{product.name} Pack</h3>
                    <p className="opacity-70">(Product Shot Visualization)</p>
                  </div>
                </div>
                <div>
                  <h5 className="text-lime-600 dark:text-lime-500 font-bold uppercase tracking-widest mb-4">The Experience</h5>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900 dark:text-white">{product.detailsSection.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                    {product.detailsSection.description}
                  </p>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {product.stats.map((stat) => (
                      <div key={stat.label} className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.val}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-4">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-lime-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Freshness Section */}
          <section className="relative z-20 py-24 bg-black/5 dark:bg-white/5 overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Leaf className="w-16 h-16 text-lime-600 dark:text-lime-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{product.freshnessSection.title}</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{product.freshnessSection.description}</p>
              </motion.div>
            </div>
          </section>

          {/* Buy Now Section */}
          <section id="shop" className="relative z-20 py-32 px-4">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black rounded-[3rem] p-8 md:p-16 border border-gray-200 dark:border-white/10 relative overflow-hidden shadow-2xl dark:shadow-none transition-all duration-500">
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-${product.themeColor.replace('#', '')} opacity-20 blur-[100px] rounded-full pointer-events-none`} style={{ backgroundColor: product.themeColor, opacity: 0.15 }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">Get Your Fix</h2>
                  <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">{product.name} - {product.subName}</p>

                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="text-5xl font-bold text-lime-400">{product.buyNowSection.price}</span>
                    <span className="text-lg text-gray-500">{product.buyNowSection.unit}</span>
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Box size={18} className="text-lime-600 dark:text-lime-500" />
                      <span>{product.buyNowSection.processingParams.join(' • ')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Truck size={18} className="text-lime-600 dark:text-lime-500" />
                      <span>{product.buyNowSection.deliveryPromise}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <RotateCcw size={18} className="text-lime-600 dark:text-lime-500" />
                      <span>{product.buyNowSection.returnPolicy}</span>
                    </div>
                  </div>

                  <button className="w-full bg-lime-500 hover:bg-lime-400 text-black font-bold py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-lime-500/20 flex items-center justify-center gap-3 group">
                    Add to Cart
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/5 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-lime-400 to-yellow-400 animate-pulse mb-6 opacity-80" />
                    <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Flavor Guarantee</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">If you don't love the first chew, we'll refund the whole pack.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Next Flavor CTA */}
          <section className="pb-20 px-4 text-center">
            <button
              onClick={nextProduct}
              className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 text-2xl font-black uppercase tracking-wider text-gray-900 dark:text-white border-2 border-gray-900/20 dark:border-white/20 rounded-full hover:bg-gray-900/10 dark:hover:bg-white/10 transition-all"
            >
              <span>Next: {products[(currentIndex + 1) % products.length].name}</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </section>

          <Footer />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}
