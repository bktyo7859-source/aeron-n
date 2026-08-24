import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sliders, RotateCcw, Box, Eye, Layers } from 'lucide-react';

export default function ShowcaseInspector({
  theme,
  inspectorConfig,
  onChangeConfig,
  isInspectorActive,
  onToggleInspector,
}) {
  const isDark = theme === 'dark';

  const materialOptions = [
    { id: 'metallic', label: 'PREMIUM LEATHER', icon: <Box className="w-3.5 h-3.5" /> },
    { id: 'glass', label: 'TRANSLUCENT AIR', icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'wireframe', label: 'HOLOGRAPHIC GRID', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'iridescent', label: 'IRIDESCENT PEARL', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  const colorOptions = [
    { name: 'NIKE VOLT', color: '#ccff00' },
    { name: 'CYBER CYAN', color: '#00f0ff' },
    { name: 'CHICAGO RED', color: '#ff2a2a' },
    { name: 'GOLD CHROME', color: '#f59e0b' },
    { name: 'HOT PINK', color: '#ec4899' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-16 py-24 pointer-events-none">
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full z-10 pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#ccff00] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SECTION 05 // SNKRS 3D STUDIO LAB</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-[0.95] uppercase">
              CUSTOMIZE THE <br />
              <span className="text-[#ccff00] glow-volt">
                3D NIKE MODEL.
              </span>
            </h2>
          </div>

          {/* Toggle Interactive Studio Inspector Mode */}
          <button
            onClick={onToggleInspector}
            className={`px-6 py-3.5 rounded-full font-mono text-xs tracking-widest font-extrabold uppercase transition-all duration-300 flex items-center gap-3 shadow-xl ${
              isInspectorActive
                ? 'bg-[#ccff00] text-black shadow-[0_0_25px_rgba(204,255,0,0.7)]'
                : isDark
                ? 'bg-gradient-to-r from-[#ccff00] to-cyan-400 text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                : 'bg-slate-900 text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{isInspectorActive ? 'EXIT 3D LAB' : 'LAUNCH 3D LAB'}</span>
          </button>
        </div>
      </div>

      {/* Floating Control Panel when Inspector Active */}
      <div className="max-w-7xl mx-auto w-full z-10 pointer-events-auto my-auto py-8">
        {isInspectorActive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`w-full max-w-md ml-auto glass-panel p-6 rounded-3xl border shadow-2xl space-y-6 ${
              isDark ? 'border-white/15 bg-black/85 text-white' : 'border-slate-300 bg-white/90 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#ccff00]" />
                <span className="text-xs font-mono tracking-widest font-extrabold uppercase">
                  SNKRS 3D CUSTOMIZER
                </span>
              </div>
              <button
                onClick={() =>
                  onChangeConfig({
                    materialPreset: 'metallic',
                    accentColor: '#ccff00',
                    wireframe: false,
                    rotationSpeed: 1,
                  })
                }
                className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> RESET
              </button>
            </div>

            {/* Material Presets */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                UPPER SNEAKER MATERIAL
              </label>
              <div className="grid grid-cols-2 gap-2">
                {materialOptions.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => onChangeConfig({ ...inspectorConfig, materialPreset: mat.id })}
                    className={`px-3 py-2 rounded-xl text-[10px] font-mono font-semibold flex items-center gap-2 border transition-all ${
                      inspectorConfig.materialPreset === mat.id
                        ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-[0_0_15px_rgba(204,255,0,0.5)]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {mat.icon}
                    <span>{mat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Accent Picker */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                AIR SOLE & SWOOSH GLOW COLOR
              </label>
              <div className="flex items-center gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.color}
                    onClick={() => onChangeConfig({ ...inspectorConfig, accentColor: c.color })}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      inspectorConfig.accentColor === c.color ? 'scale-125 border-white shadow-lg' : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.color }}
                  />
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400 uppercase">
                <span>3D ROTATION SPEED</span>
                <span className="text-[#ccff00] font-bold">{inspectorConfig.rotationSpeed}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={inspectorConfig.rotationSpeed}
                onChange={(e) =>
                  onChangeConfig({ ...inspectorConfig, rotationSpeed: parseFloat(e.target.value) })
                }
                className="w-full accent-[#ccff00] bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <p className="text-[10px] font-mono text-slate-400 text-center tracking-wider uppercase border-t border-white/10 pt-3">
              ✦ CLICK & DRAG IN VIEWPORT TO ORBIT 360° AROUND SNEAKER ✦
            </p>
          </motion.div>
        ) : (
          <div className="text-center sm:text-left space-y-2 pointer-events-none">
            <span className="px-4 py-2 rounded-full glass-panel border border-white/15 text-xs font-mono tracking-widest text-slate-300 inline-block">
              CLICK "LAUNCH 3D LAB" TO ROTATE & CUSTOMIZE SNEAKER
            </span>
          </div>
        )}
      </div>

      <div className="h-10" />
    </section>
  );
}
