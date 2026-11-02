import React from 'react';
import { PROVIDERS } from '@/data/providers';
import { CheckCircle } from 'lucide-react';

export const ProviderStrip: React.FC = () => {
  return (
    <div className="py-10 bg-white dark:bg-indigo-950 border-b border-sand-200 dark:border-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest font-bold text-saffron-600 dark:text-saffron-400">
            Official Course Providers & Accredited Portals
          </p>
          <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-sand-100 mt-1">
            Aggregated & Recommended From Global & National Leaders
          </h3>
        </div>

        {/* Brand Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.id}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-sand-200 dark:border-indigo-800/80 bg-sand-50/70 dark:bg-indigo-900/40 hover:border-saffron-400 dark:hover:border-saffron-500 transition-all group"
            >
              <span className="font-serif font-bold text-sm text-indigo-950 dark:text-sand-100 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors text-center">
                {provider.name}
              </span>
              <span className="text-[10px] text-sand-500 dark:text-sand-400 mt-1 font-medium text-center">
                {provider.badge_text}
              </span>
              <div className="flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                <CheckCircle className="w-2.5 h-2.5" />
                <span>Verified Outbound</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
