import React from 'react';
import { X, Ruler } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const sizeChart = [
    { eu: 39, us: 6.5, uk: 5.5, cm: 24.5 },
    { eu: 40, us: 7.5, uk: 6.5, cm: 25.0 },
    { eu: 41, us: 8.0, uk: 7.0, cm: 26.0 },
    { eu: 42, us: 9.0, uk: 8.0, cm: 26.5 },
    { eu: 43, us: 10.0, uk: 9.0, cm: 27.5 },
    { eu: 44, us: 11.0, uk: 10.0, cm: 28.5 },
    { eu: 45, us: 12.0, uk: 11.0, cm: 29.5 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2 font-extrabold text-xl uppercase tracking-tight">
            <Ruler className="text-red-500" size={20} />
            <span>AERON SIZING MATRIX</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed">
          AERON sneakers fit true to size with an athletic performance snug lock. If you prefer a relaxed fit or wear thick sports socks, select one size up.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-xs font-mono text-neutral-400 uppercase">
                <th className="py-2 px-3">EU</th>
                <th className="py-2 px-3">US Men</th>
                <th className="py-2 px-3">UK</th>
                <th className="py-2 px-3">CM</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row, idx) => (
                <tr key={idx} className="border-b border-neutral-800/50 hover:bg-white/5 font-mono">
                  <td className="py-2.5 px-3 font-bold text-red-500">{row.eu}</td>
                  <td className="py-2.5 px-3 text-neutral-300">{row.us}</td>
                  <td className="py-2.5 px-3 text-neutral-300">{row.uk}</td>
                  <td className="py-2.5 px-3 text-neutral-300">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-widest uppercase rounded-xl transition-colors cursor-pointer"
        >
          CLOSE SIZE GUIDE
        </button>
      </div>
    </div>
  );
}
