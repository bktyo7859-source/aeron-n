import React from 'react';
import { ShieldCheck, Zap, Cpu, Award } from 'lucide-react';
import { BRAND_INFO } from '../data/products.js';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono text-red-500 uppercase tracking-widest">
            THE AERON MANIFESTO
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase">
            {BRAND_INFO.tagline}
          </h1>
          <p className="text-lg md:text-xl font-light text-neutral-300">
            {BRAND_INFO.description}
          </p>
        </div>

        {/* HERO IMAGE BANNER */}
        <div className="h-[450px] rounded-3xl overflow-hidden relative border border-neutral-800">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=80"
            alt="AERON Biomechanical Lab"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 text-2xl font-black uppercase">
            BIOMECHANICAL RESEARCH LAB 01
          </div>
        </div>

        {/* PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-4">
            <Zap className="text-red-500" size={32} />
            <h3 className="text-2xl font-bold uppercase">PROPULSION GEOMETRY</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We analyze millions of stride strike points using high-speed optical motion capture to build carbon-infused FlightStrut chassis that return maximum energy.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-4">
            <Cpu className="text-red-500" size={32} />
            <h3 className="text-2xl font-bold uppercase">NITROGEN FOAM LAB</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Supercritical nitrogen gas infusion creates micro-bubble foam pods with zero weight penalties and infinite resilience under repeated load.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-4">
            <ShieldCheck className="text-red-500" size={32} />
            <h3 className="text-2xl font-bold uppercase">SUSTAINABLE SPEED</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Every upper incorporates 100% recycled AeroKnit monofilament yarns and solvent-free water-based bonding adhesives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
