'use client';

import React from 'react';
import Link from 'next/link';
import { LEARNING_PATHS } from '@/data/learningPaths';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default function RoadmapsDirectoryPage() {
  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-saffron-500/15 border border-saffron-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-saffron-700 dark:text-saffron-300 mb-3">
            <Compass className="w-3.5 h-3.5 text-saffron-500" />
            <span>Structured Career Journeys</span>
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-indigo-950 dark:text-white">
            Curated Learning Paths & Career Roadmaps
          </h1>
          <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-base mt-2 leading-relaxed">
            Eliminate guesswork. Each roadmap sequences verified courses, hands-on trade skills, and industry certifications in the exact chronological order demanded by employers.
          </p>
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEARNING_PATHS.map((path) => (
            <div
              key={path.id}
              className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 flex flex-col justify-between hover:shadow-dakshata hover:border-saffron-400 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-sand-100 dark:bg-indigo-800 text-indigo-900 dark:text-sand-200 font-bold px-2.5 py-1 rounded-full text-[11px]">
                    {path.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {path.job_growth}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors leading-snug">
                  {path.title}
                </h3>

                <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed line-clamp-3">
                  {path.description}
                </p>

                {/* Salary & Time Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="bg-sand-50 dark:bg-indigo-950/60 p-2.5 rounded-xl border border-sand-200 dark:border-indigo-800/40">
                    <span className="text-[10px] text-sand-500 block font-medium">Target Annual Salary</span>
                    <span className="font-serif font-bold text-xs sm:text-sm text-indigo-950 dark:text-saffron-300 block truncate">
                      {path.target_salary_inr}
                    </span>
                  </div>

                  <div className="bg-sand-50 dark:bg-indigo-950/60 p-2.5 rounded-xl border border-sand-200 dark:border-indigo-800/40">
                    <span className="text-[10px] text-sand-500 block font-medium">Completion Schedule</span>
                    <span className="font-serif font-bold text-xs sm:text-sm text-indigo-950 dark:text-sand-100 block">
                      ~{path.estimated_months} Months
                    </span>
                  </div>
                </div>

                {/* Step Preview */}
                <div className="pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-sand-500 mb-2">
                    Milestone Progression ({path.steps.length} Steps):
                  </p>
                  <div className="space-y-1.5 text-xs">
                    {path.steps.map((st) => (
                      <div key={st.step_number} className="flex items-center gap-2 text-sand-700 dark:text-sand-300">
                        <span className="w-5 h-5 rounded-full bg-saffron-500/20 text-saffron-700 dark:text-saffron-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                          {st.step_number}
                        </span>
                        <span className="truncate font-medium">{st.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-sand-100 dark:border-indigo-800">
                <Link
                  href={`/roadmap/${path.slug}`}
                  className="w-full py-3 bg-indigo-950 hover:bg-saffron-500 text-white hover:text-indigo-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Open Full Interactive Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

