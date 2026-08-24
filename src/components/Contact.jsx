import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Send, Sparkles, Ticket, X, Zap } from 'lucide-react';

export default function Contact({ theme, isOpen, onOpen, onClose }) {
  const isDark = theme === 'dark';
  const [submitted, setSubmitted] = useState(false);
  const [reservationPass, setReservationPass] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    size: 'US 10',
    colorway: 'AIR MAX 3000 VOLT ($299)',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const passCode = `SNKRS-PASS-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationPass(passCode);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', size: 'US 10', colorway: 'AIR MAX 3000 VOLT ($299)' });
    }, 4000);
  };

  return (
    <>
      {/* Contact Section Footer */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-16 py-24 overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full space-y-16 z-10 my-auto">
          {/* Header */}
          <div className="space-y-6 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#ccff00] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SECTION 06 // SNKRS EXCLUSIVE DROP PASS</span>
            </div>

            <h2 className="text-5xl sm:text-7xl xl:text-8xl font-extrabold font-heading tracking-tight leading-[0.88] uppercase">
              RESERVE YOUR <br />
              <span className="text-[#ccff00] glow-volt">
                SNKRS DROP PASS.
              </span>
            </h2>

            <p className={`text-base sm:text-lg max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Be among the select athletes and collectors to reserve the limited Nike x SNEAKX 3D spatial drop.
            </p>

            <div className="pt-6">
              <button
                onClick={onOpen}
                className="group px-10 py-5 rounded-full font-mono text-xs tracking-widest font-extrabold uppercase transition-all duration-300 flex items-center gap-4 mx-auto shadow-2xl transform hover:scale-105 active:scale-95 bg-[#ccff00] text-black shadow-[0_0_40px_rgba(204,255,0,0.5)] hover:shadow-[0_0_60px_rgba(204,255,0,0.8)]"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>CLAIM SNKRS DROP PASS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Official Nike Studio Footer */}
        <div className="max-w-7xl mx-auto w-full pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono tracking-wider text-slate-400 z-10">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white font-heading tracking-widest">NIKE x SNEAKX</span>
            <span>© {new Date().getFullYear()} NIKE LABS INC. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="https://nike.com" target="_blank" rel="noreferrer" className="hover:text-[#ccff00] transition-colors">
              NIKE.COM
            </a>
            <a href="https://nike.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              SIZE GUIDE
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#ccff00] transition-colors">
              TWITTER / X
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors">
              INSTAGRAM
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Reservation Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-10 glass-panel border shadow-2xl z-10 ${
                isDark ? 'bg-[#09090b] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(204,255,0,0.6)]">
                    <Ticket className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold font-heading uppercase text-white">
                      SNKRS PASS GENERATED!
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      Your official VIP early access drop pass is active:
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#ccff00]/15 border border-[#ccff00]/40 text-[#ccff00] font-mono text-xl font-extrabold tracking-widest">
                    {reservationPass}
                  </div>

                  <p className="text-xs text-slate-400">
                    A confirmation dispatch has been routed to {formData.email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>OFFICIAL NIKE x SNEAKX DROP PASS</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-heading uppercase tracking-wide text-white">
                      CLAIM YOUR DROP PASS
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400 uppercase">ATHLETE NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#ccff00] focus:outline-none text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400 uppercase">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@nike.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#ccff00] focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400 uppercase">SNKRS COLORWAY</label>
                      <select
                        value={formData.colorway}
                        onChange={(e) => setFormData({ ...formData, colorway: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:border-[#ccff00] focus:outline-none text-sm text-white"
                      >
                        <option>AIR MAX 3000 VOLT ($299)</option>
                        <option>JORDAN SNEAKX CHICAGO ($320)</option>
                        <option>STEALTH OBSIDIAN ($350)</option>
                        <option>CYBER CHROME 2026 ($280)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400 uppercase">SNEAKER SIZE</label>
                      <select
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:border-[#ccff00] focus:outline-none text-sm text-white"
                      >
                        <option>US 7</option>
                        <option>US 8</option>
                        <option>US 9</option>
                        <option>US 10</option>
                        <option>US 11</option>
                        <option>US 12</option>
                        <option>US 13</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#ccff00] text-black font-mono text-xs tracking-widest font-extrabold uppercase flex items-center justify-center gap-2 shadow-xl hover:shadow-[#ccff00]/50 transition-shadow"
                  >
                    <span>GENERATE SNKRS DROP PASS</span>
                    <Send className="w-4 h-4 fill-black" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
