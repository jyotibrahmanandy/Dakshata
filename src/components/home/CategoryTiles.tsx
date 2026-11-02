import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import {
  Cloud,
  ShieldCheck,
  Database,
  Code2,
  Zap,
  Cog,
  Wind,
  Car,
  Flame,
  GraduationCap,
  Award,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  ShieldCheck,
  Database,
  Code2,
  Zap,
  Cog,
  Wind,
  Car,
  Flame,
  GraduationCap,
  Award,
  Briefcase,
};

export const CategoryTiles: React.FC = () => {
  return (
    <section className="py-14 bg-sand-50 dark:bg-indigo-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400">
              Browse by Industry Focus
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-indigo-950 dark:text-white mt-1">
              Popular Learning Domains
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-saffron-400 hover:text-saffron-600 transition-colors"
          >
            <span>View All 12 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Soft Rounded Category Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Code2;
            const isGovt = cat.section === 'free_programs';
            const isTrade = cat.section === 'vocational_trades';

            return (
              <Link
                key={cat.id}
                href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                className="group relative bg-white dark:bg-indigo-900/60 rounded-2xl p-4 border border-sand-200 dark:border-indigo-800/70 hover:border-saffron-400 dark:hover:border-saffron-500 hover:shadow-dakshata transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isGovt
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : isTrade
                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                          : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-800 dark:text-saffron-400'
                      } transition-colors group-hover:scale-110 duration-300`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-bold text-sand-500 dark:text-sand-400 bg-sand-100 dark:bg-indigo-800 px-2 py-0.5 rounded-full">
                      {cat.item_count}+
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-indigo-950 dark:text-white group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-sand-500 dark:text-sand-400 line-clamp-2 mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-sand-100 dark:border-indigo-800/50 flex items-center justify-between text-[11px] text-saffron-600 dark:text-saffron-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

