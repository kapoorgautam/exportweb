'use client';

import { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Leaf, Truck, RotateCcw, Box, Users, Factory, Globe, ShieldCheck, FileText, Phone, MessageCircle, Package, Award, TrendingUp, Ship } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const ProductCandyScroll = dynamic(() => import('@/components/ProductCandyScroll'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-gray-100 dark:bg-gray-900 animate-pulse" />
});
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
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
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




      {/* Brand Hero Section */}
      <section className="min-h-screen py-24 sm:py-0 flex flex-col items-center justify-center p-4 relative z-10 bg-white dark:bg-black overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-lime-400/20 rounded-full blur-[80px] sm:blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-400/20 rounded-full blur-[80px] sm:blur-[100px] animate-pulse delay-1000" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-400 font-bold uppercase tracking-wider text-xs sm:text-sm mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lime-500 animate-ping" />
              Premium Indian Confectionery
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-8 leading-tight tracking-tight text-gray-900 dark:text-white"
          >
            Taste the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-yellow-500">Tangy Revolution</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
          >
            Authentic Indian flavors crafted for the modern palate. Experience the nostalgia, modernized.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-3 mx-auto"
          >
            Explore Flavors
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </section>

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

          {/* SECTION 3: WHO WE SERVE */}
          {/* Mobile padding: py-12, Desktop: py-20 */}
          <section className="py-12 md:py-20 px-4 bg-white dark:bg-black relative z-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Card 1: B2B */}
              <div className="bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-white/10 p-6 sm:p-10 rounded-3xl hover:shadow-xl transition-shadow flex flex-col">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                  <Factory size={28} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">B2B & Bulk Buyers</h3>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-300"><div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" /> Bulk Supply at Scale</li>
                  <li className="flex items-center gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-300"><div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" /> Private Label Solutions</li>
                  <li className="flex items-center gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-300"><div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" /> OEM Manufacturing</li>
                  <li className="flex items-center gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-300"><div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" /> Export-Ready Packaging</li>
                </ul>
                <a href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline text-lg py-2">
                  Request Bulk Quote <ArrowRight size={20} />
                </a>
              </div>

              {/* Card 2: Retail */}
              <div className="bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-white/10 p-6 sm:p-10 rounded-3xl hover:shadow-xl transition-shadow flex flex-col">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400 rounded-2xl flex items-center justify-center mb-6">
                  <Users size={28} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Retail & End Consumers</h3>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-300"><div className="w-2 h-2 bg-lime-500 rounded-full shrink-0" /> Premium Quality Ingredients</li>
                  <li className="flex items-center gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-300"><div className="w-2 h-2 bg-lime-500 rounded-full shrink-0" /> Consistent Taste & Hygiene</li>
                  <li className="flex items-center gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-300"><div className="w-2 h-2 bg-lime-500 rounded-full shrink-0" /> Trusted Indian FMCG Brand</li>
                  <li className="flex items-center gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-300"><div className="w-2 h-2 bg-lime-500 rounded-full shrink-0" /> Fresh & Safe Products</li>
                </ul>
                {/* Since we removed individual product switching here, this could link to a catalog page or anchor to the canvas */}
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-lime-600 dark:text-lime-400 font-bold hover:underline text-lg py-2">
                  Explore Products <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 4: WHY CANZZY */}
          <section className="py-12 md:py-24 bg-gray-50 dark:bg-white/5 relative z-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">Why Global Buyers Choose CANZZY</h2>
                <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">Trusted by importers across 5 continents.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Globe, title: "Global Export Experience", desc: "Successfully exporting to USA, UK, UAE & Africa." },
                  { icon: ShieldCheck, title: "Strict Quality Control", desc: "FSSAI, ISO & HACCP compliant manufacturing." },
                  { icon: Package, title: "Custom Packaging", desc: "Private labeling & localized packaging options." },
                  { icon: TrendingUp, title: "Competitive Pricing", desc: "Direct manufacturer pricing for bulk orders." },
                  { icon: Factory, title: "Indian Manufacturer", desc: "Authentic taste from a verified Indian factory." },
                  { icon: Truck, title: "Reliable Supply Chain", desc: "On-time delivery and logistics support." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-6 bg-white dark:bg-black/50 md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-black rounded-full shadow-sm flex items-center justify-center text-lime-600 dark:text-lime-500 mb-4 sm:mb-6">
                      <item.icon size={28} className="sm:w-8 sm:h-8" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: PRODUCT CATEGORIES */}
          <section className="py-12 md:py-24 bg-white dark:bg-black relative z-20">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">Our Product Range</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { name: "Candies & Confectionery", color: "bg-pink-100 dark:bg-pink-900/20", text: "text-pink-700 dark:text-pink-400", link: "/exports/candies" },
                  { name: "Mouth Fresheners", color: "bg-emerald-100 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-400", link: "/exports/mouth-fresheners" },
                  { name: "Snacks & Namkeen", color: "bg-orange-100 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-400", link: "/exports/snacks" },
                  { name: "Ready-to-Eat", color: "bg-yellow-100 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-400", link: "/contact" }
                ].map((cat, i) => (
                  <a href={cat.link} key={i} className={`p-6 sm:p-8 rounded-3xl ${cat.color} hover:scale-105 transition-transform cursor-pointer group flex flex-col items-center text-center`}>
                    <div className="h-32 sm:h-40 flex items-center justify-center mb-4 sm:mb-6">
                      {/* Placeholder for Product Image */}
                      <Package size={56} className={`${cat.text} opacity-50 group-hover:opacity-100 transition-opacity sm:w-16 sm:h-16`} />
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold ${cat.text} mb-2`}>{cat.name}</h3>
                    <span className={`inline-flex items-center gap-2 text-sm font-bold ${cat.text} opacity-80 mt-auto`}>View Products <ArrowRight size={16} /></span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: EXPORT & QUALITY TRUST */}
          <section className="py-12 md:py-24 bg-gray-50 dark:bg-zinc-900 relative z-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-400 rounded-full font-bold text-xs sm:text-sm mb-6">
                <Award size={16} /> World-Class Standards
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Export-Grade Quality You Can Trust</h2>
              <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10 md:mb-12">
                Every CANZZY product is manufactured under strict quality standards and export compliance to ensure safety, shelf life, and global acceptance.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {['FSSAI', 'ISO 22000', 'HACCP', 'HALAL', 'FDA Registered'].map((badge) => (
                  <div key={badge} className="px-4 py-2 sm:px-6 sm:py-3 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-white/10 font-bold text-sm sm:text-base text-gray-600 dark:text-gray-300 shadow-sm">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7: PRIVATE LABEL (B2B MONEY SECTION) */}
          <section className="py-12 md:py-24 bg-lime-600 text-white relative z-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Bulk Supply & Private Label Manufacturing</h2>
                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  {[
                    "Custom branding & packaging design",
                    "OEM manufacturing support",
                    "Flexible MOQs for export markets",
                    "End-to-end documentation assistance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg sm:text-xl font-medium">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Award size={18} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="w-full sm:w-auto inline-block text-center px-10 py-5 bg-white text-lime-900 font-bold text-lg sm:text-xl rounded-full hover:bg-lime-50 transition-colors shadow-xl">
                  Start Private Label Inquiry
                </a>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
                      <Package size={40} className="text-lime-600" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">CANZZY</h4>
                      <p className="text-white/80">Premium Indian Confectionery</p>
                    </div>
                  </div>
                  <div className="h-4 bg-white/20 rounded-full w-3/4 mb-4" />
                  <div className="h-4 bg-white/20 rounded-full w-1/2" />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8: SIMPLE EXPORT PROCESS */}
          <section className="py-12 md:py-24 bg-white dark:bg-black relative z-20">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">Seamless Export Process</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
                <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-gray-100 dark:bg-white/10 -z-10" />
                {[
                  { title: "Select Product", icon: Box },
                  { title: "Get Quote", icon: FileText },
                  { title: "Compliance", icon: ShieldCheck },
                  { title: "Shipping", icon: Ship },
                  { title: "Support", icon: MessageCircle }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white dark:bg-zinc-900 border-4 border-gray-100 dark:border-white/10 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4 sm:mb-6 hover:border-lime-500 hover:text-lime-500 transition-colors bg-white dark:bg-black z-10">
                      <step.icon size={28} className="sm:w-8 sm:h-8" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{step.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: FINAL CTA */}
          <section className="py-12 md:py-24 bg-gray-900 text-white text-center px-4 relative z-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Looking for a Reliable FMCG Partner?</h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10">Fast response • Export-ready • Trusted supplier</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <a href="/contact" className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-lime-500 text-black font-bold text-lg rounded-full hover:bg-lime-400 transition-colors flex items-center justify-center gap-3">
                  <FileText size={20} /> Request Quote
                </a>
                <a href="https://wa.me/919354502422" target="_blank" className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white/10 border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-3">
                  <MessageCircle size={20} /> WhatsApp Us
                </a>
              </div>
            </div>
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
