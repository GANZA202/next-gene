import { motion } from "motion/react";
import { ArrowRight, Star, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const categories = [
    { name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop", count: "12+ Items" },
    { name: "Luxury Cars", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop", count: "8+ Items" },
    { name: "Photography", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop", count: "15+ Items" },
    { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop", count: "10+ Items" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -z-0" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Featured Release</span>
              <h1 className="text-7xl font-black tracking-tighter leading-none mb-8 gradient-text md:text-9xl uppercase">
                IONA-X <br /> ULTRA 5
              </h1>
              <p className="text-xl text-white/50 max-w-md mb-10 leading-relaxed font-medium">
                The future of mobility with Neural-Link integration and 12-core silicon architecture.
              </p>
              <div className="flex items-center gap-6">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 px-10 h-16 rounded-full font-bold uppercase text-sm tracking-widest shadow-2xl shadow-white/5" asChild>
                  <Link to="/products/iona-x">Buy Now — $1,299</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 px-10 h-16 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-white/5 transition-all" asChild>
                  <Link to="/products">Explore Tech</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 hidden lg:block"
            >
               <div className="relative aspect-[3/4] w-full bg-neutral-900 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="text-white/5 text-[15rem] font-bold select-none leading-none rotate-90">IONA</div>
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
                    <img
                      src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"
                      alt="Product"
                      className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(242,125,38,0.2)]"
                    />
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tighter md:text-5xl uppercase md:mb-2">Market <span className="text-primary italic">Intelligence</span></h2>
              <p className="mt-4 text-white/40 text-sm uppercase tracking-widest font-bold">Curated selection of premium items tailored for the modern generation.</p>
            </div>
            <Link to="/products" className="group flex items-center text-xs font-bold uppercase tracking-widest mt-4 md:mt-0 hover:text-primary transition-colors">
              Explore All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer overflow-hidden rounded-[40px] glass p-1"
              >
                <div className="aspect-[4/5] w-full overflow-hidden rounded-[38px] relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 block">{cat.count}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">{cat.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-[#080808]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-8 glass rounded-[40px] hover:shadow-primary/10 hover:shadow-2xl transition-all group">
              <div className="mb-6 rounded-3xl bg-white/5 p-6 text-primary group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">AI Recommendations</h3>
              <p className="text-white/40 text-sm leading-relaxed">Smart algorithms that learn your style and curate products just for you.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 glass rounded-[40px] hover:shadow-primary/10 hover:shadow-2xl transition-all group">
              <div className="mb-6 rounded-3xl bg-white/5 p-6 text-primary group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">Voice Navigation</h3>
              <p className="text-white/40 text-sm leading-relaxed">Search, navigate, and add to cart using only your voice commands.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 glass rounded-[40px] hover:shadow-primary/10 hover:shadow-2xl transition-all group">
              <div className="mb-6 rounded-3xl bg-white/5 p-6 text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">Secure Checkout</h3>
              <p className="text-white/40 text-sm leading-relaxed">Premium encryption and multiple payment methods for worry-free shopping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary opacity-5" />
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-[60px] glass p-12 md:p-24 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-10">
              <Zap className="h-4 w-4 text-primary fill-primary" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Protocol Activated</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 uppercase leading-[0.9]">Join the <br/>Quantum Flow</h2>
            <p className="text-lg text-white/50 mb-14 max-w-xl mx-auto font-medium">
              Get exclusive access to pre-launches, AI-only deals, and first-class shipping on all luxury items.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your neural ID (email)"
                className="w-full sm:w-80 h-16 rounded-full border border-white/10 bg-white/5 px-8 text-sm focus:outline-none focus:border-primary transition-all"
              />
              <Button size="lg" className="w-full sm:w-auto h-16 rounded-full px-12 font-black uppercase tracking-[0.2em] text-[10px]">
                Initialize
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
