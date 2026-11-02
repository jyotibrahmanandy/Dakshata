'use client';

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

export default function CategoriesPage() {
  const itCategories = CATEGORIES.filter((c) => c.section === 'it_certifications');
  const tradeCategories = CATEGORIES.filter((c) => c.section === 'vocational_trades');
  const freeCategories = CATEGORIES.filter((c) => c.section === 'free_programs');
  const bizCategories = CATEGORIES.filter((c) => c.section === 'business_finance');

  const renderSection = (title: string, subtitle: string, cats: typeof CATEGORIES, badgeColor: string) => (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-indigo-950 dark:text-white flex items-center gap-2">
          <span>{title}</span>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${badgeColor}`}>
            {cats.reduce((acc, c) => acc + c.item_count, 0)}+ Courses
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400 mt-1">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cats.map((cat) => {
          const Icon = iconMap[cat.icon] || Code2;
          return (
            <Link
              key={cat.id}
              href={`/catalog?category=${encodeURIComponent(cat.name)}`}
              className="p-5 rounded-2xl bg-white dark:bg-indigo-900/60 border border-sand-200 dark:border-indigo-800 hover:border-saffron-400 hover:shadow-dakshata transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-sand-100 dark:bg-indigo-800 text-saffron-600 dark:text-saffron-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-sand-500 bg-sand-100 dark:bg-indigo-800 px-2 py-0.5 rounded-full">
                    {cat.item_count} courses
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-indigo-950 dark:text-white group-hover:text-saffron-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-sand-500 dark:text-sand-400 mt-1.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-sand-100 dark:border-indigo-800 flex items-center justify-between text-xs font-bold text-saffron-600 dark:text-saffron-400">
                <span>View Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400">
            Catalog Taxonomy
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-indigo-950 dark:text-white mt-1">
            Browse All 12 Skill Categories
          </h1>
          <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm mt-2">
            Explore curated certifications, industrial vocational diplomas, and government recognized programs.
          </p>
        </div>

        {/* 1. IT Certifications */}
        {renderSection(
          'IT & Software Certifications',
          'Cloud architecture, Cybersecurity, Data Engineering, and Full Stack Development credentials.',
          itCategories,
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
        )}

        {/* 2. Vocational Trades */}
        {renderSection(
          'Professional & Industrial Trades',
          'Electrical wiring, Solar PV installation, CNC machining, HVAC servicing, and certified welding.',
          tradeCategories,
          'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
        )}

        {/* 3. 100% Free Govt Programs */}
        {renderSection(
          '100% Free Government Programs',
          'Free tuition, university credit transfers, and National Skill Development Corporation qualifications.',
          freeCategories,
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
        )}

        {/* 4. Business & Leadership */}
        {renderSection(
          'Project Management & Operations',
          'PMP prep, Scrum Master, Lean Six Sigma, and ITIL v4 frameworks.',
          bizCategories,
          'bg-sand-200 text-sand-800 dark:bg-indigo-800 dark:text-sand-200'
        )}

      </div>
    </div>
  );
}

