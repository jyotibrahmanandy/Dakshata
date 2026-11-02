import React from 'react';
import { ShieldCheck, Award, Zap, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: '100% Unbiased Catalog',
      desc: 'We do not host courses. Direct links to accredited providers.',
    },
    {
      icon: Award,
      title: 'Govt & Global Recognized',
      desc: 'SWAYAM, NPTEL, Skill India, AWS, Google & Meta certificates.',
    },
    {
      icon: Zap,
      title: 'Rating-Per-Rupee Scoring',
      desc: 'Transparent Best-Value metric highlights true quality per rupee.',
    },
    {
      icon: HeartHandshake,
      title: 'Zero Student Markup',
      desc: 'Always free to browse, compare & plan with no hidden fees.',
    },
  ];

  return (
    <div className="bg-sand-100 dark:bg-indigo-900/40 border-b border-sand-200 dark:border-indigo-800/60 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white dark:bg-indigo-800 text-saffron-600 dark:text-saffron-400 shadow-sm flex-shrink-0 border border-sand-200 dark:border-indigo-700">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-indigo-950 dark:text-sand-100">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-sand-600 dark:text-sand-400 leading-snug mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

