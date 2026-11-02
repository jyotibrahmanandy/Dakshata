import React from 'react';
import Link from 'next/link';
import { LEARNING_PATHS } from '@/data/learningPaths';
import { ArrowRight, Compass, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';

export const LearningPathsPreview: React.FC = () => {
  return (
    <section className="py-14 bg-sand-100/60 dark:bg-indigo-950/70 border-t border-sand-200 dark:border-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              Step-by-Step Career Roadmaps
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-indigo-950 dark:text-white mt-1">
              Curated Learning Paths for High-Growth Roles
            </h2>
            <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm mt-1 max-w-xl">
              Don’t take disconnected courses. Follow our structured sequential paths with projected salaries, milestone credentials, and estimated completion times.
            </p>
          </div>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold transition-colors"
          >
            <span>View All Roadmaps</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_PATHS.slice(0, 3).map((path) => (
            <div
              key={path.id}
              className="bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 p-6 flex flex-col justify-between hover:shadow-dakshata hover:border-saffron-400 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="bg-sand-100 dark:bg-indigo-800 text-indigo-900 dark:text-sand-200 font-bold px-2.5 py-1 rounded-full text-[11px]">
                    {path.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {path.job_growth}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors leading-snug">
                  {path.title}
                </h3>
                <p className="text-xs text-sand-600 dark:text-sand-400 mt-2 line-clamp-2 leading-relaxed">
                  {path.description}
                </p>

                {/* Salary & Duration Badges */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-sand-100 dark:border-indigo-800/60 text-xs">
                  <div className="bg-sand-50 dark:bg-indigo-950/60 p-2.5 rounded-xl border border-sand-200 dark:border-indigo-800/40">
                    <span className="text-[10px] text-sand-500 dark:text-sand-400 block font-medium">
                      Target Salary
                    </span>
                    <span className="font-serif font-bold text-xs sm:text-sm text-indigo-950 dark:text-saffron-300 truncate block">
                      {path.target_salary_inr.split(' ')[0]}
                    </span>
                  </div>

                  <div className="bg-sand-50 dark:bg-indigo-950/60 p-2.5 rounded-xl border border-sand-200 dark:border-indigo-800/40">
                    <span className="text-[10px] text-sand-500 dark:text-sand-400 block font-medium">
                      Estimated Time
                    </span>
                    <span className="font-serif font-bold text-xs sm:text-sm text-indigo-950 dark:text-sand-100 block">
                      ~{path.estimated_months} Months
                    </span>
                  </div>
                </div>

                {/* Skills Chips */}
                <div className="mt-4 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-sand-500">
                    Key Competencies:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {path.skills_covered.slice(0, 4).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] bg-sand-100 dark:bg-indigo-800 text-indigo-900 dark:text-sand-200 px-2 py-0.5 rounded font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-6 pt-4 border-t border-sand-100 dark:border-indigo-800/60">
                <Link
                  href={`/roadmap/${path.slug}`}
                  className="w-full py-2.5 rounded-xl bg-sand-100 dark:bg-indigo-800 hover:bg-saffron-500 dark:hover:bg-saffron-500 text-indigo-950 dark:text-sand-100 hover:text-indigo-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore {path.steps.length} Steps Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
