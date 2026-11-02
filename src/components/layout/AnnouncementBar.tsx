'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Globe, Shield, Sparkles, UserCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { currency, toggleCurrency, user } = useApp();

  return (
    <div className="bg-indigo-950 text-sand-100 text-xs py-1.5 px-4 border-b border-indigo-900 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Highlight message */}
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-flex items-center gap-1 bg-saffron-500/20 text-saffron-300 px-2 py-0.5 rounded-full text-[10px] font-bold border border-saffron-500/30">
            <Sparkles className="w-2.5 h-2.5 animate-spin text-saffron-400" />
            NEW
          </span>
          <span className="truncate">
            PMKVY & NPTEL Free 2026 Batches Open • 100% Free Govt Certificates • Verified Affiliate Discounts
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 text-[11px] text-indigo-200">
          <Link
            href="/roadmap"
            className="hover:text-saffron-300 transition-colors flex items-center gap-1 hidden sm:flex"
          >
            <Shield className="w-3 h-3 text-saffron-400" />
            Career Roadmaps
          </Link>
          <span className="text-indigo-700 hidden sm:inline">|</span>

          <Link
            href="/admin"
            className="hover:text-saffron-300 transition-colors flex items-center gap-1 font-semibold text-saffron-400"
          >
            <UserCheck className="w-3 h-3" />
            Admin Panel
          </Link>
          <span className="text-indigo-700">|</span>

          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            className="flex items-center gap-1 hover:text-white transition-colors bg-indigo-900/60 px-2 py-0.5 rounded border border-indigo-800"
            title="Switch Currency between INR (₹) and USD ($)"
          >
            <Globe className="w-3 h-3 text-saffron-400" />
            <span className="font-bold">{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
