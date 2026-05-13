import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#080808] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center font-bold italic text-white text-[10px]">N</div>
              <h3 className="text-lg font-black tracking-tighter uppercase">NEXTGEN <span className="text-primary italic text-sm">Market</span></h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed uppercase tracking-tighter">
              The premier destination for neural electronics, custom luxury mobility, and high-fidelity optics.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-white/40 hover:text-primary transition-colors"><Twitter className="h-4 w-4" /></Link>
              <Link to="#" className="text-white/40 hover:text-primary transition-colors"><Instagram className="h-4 w-4" /></Link>
              <Link to="#" className="text-white/40 hover:text-primary transition-colors"><Github className="h-4 w-4" /></Link>
            </div>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Commerce</h4>
            <ul className="space-y-3 text-xs text-white/60">
              <li><Link to="/products" className="hover:text-white transition-colors">Catalog</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Drops</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">AI Suggestions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Protocol</h4>
            <ul className="space-y-3 text-xs text-white/60">
              <li><Link to="#" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Global Delivery</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Corporation</h4>
            <ul className="space-y-3 text-xs text-white/60">
              <li><Link to="#" className="hover:text-white transition-colors">Network</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Intelligence</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Status</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/20 font-bold">
          <p>© 2026 NextGen Market Intelligence</p>
          <p>Powered by Gemini Quantum Core</p>
        </div>
      </div>
      
      {/* Design Marquee Footer Section */}
      <div className="h-10 bg-primary mt-12 flex items-center overflow-hidden">
        <div className="marquee font-mono text-[10px] font-bold uppercase text-white">
          <span className="mx-8 italic">Live Order: SF90 Spider confirmed from Dubai, UAE</span>
          <span className="mx-8 italic">Flash Sale: 20% OFF Neural Lenses ends in 02:45:12</span>
          <span className="mx-8 italic">Global Revenue: +17.4% since last fiscal update</span>
          <span className="mx-8 italic">New Drop: IONA-X ULTRA 6 arriving in 24h</span>
          <span className="mx-8 italic">Live Order: iPhone 16 Concept confirmed from Tokyo, Japan</span>
          {/* Duplicate for seamless scroll */}
          <span className="mx-8 italic">Live Order: SF90 Spider confirmed from Dubai, UAE</span>
          <span className="mx-8 italic">Flash Sale: 20% OFF Neural Lenses ends in 02:45:12</span>
          <span className="mx-8 italic">Global Revenue: +17.4% since last fiscal update</span>
          <span className="mx-8 italic">New Drop: IONA-X ULTRA 6 arriving in 24h</span>
          <span className="mx-8 italic">Live Order: iPhone 16 Concept confirmed from Tokyo, Japan</span>
        </div>
      </div>
    </footer>
  );
}
