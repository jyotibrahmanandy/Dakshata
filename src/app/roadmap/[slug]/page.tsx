'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { LEARNING_PATHS } from '@/data/learningPaths';
import { UNIQUE_COURSES } from '@/data/allCourses';
import { CourseCard } from '@/components/courses/CourseCard';
import { useApp } from '@/context/AppContext';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function RoadmapDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { saveCourseForLater, addToast } = useApp();

  const path = LEARNING_PATHS.find((p) => p.slug === slug);
  if (!path) {
    notFound();
  }

  const handleEnrollRoadmap = () => {
    let count = 0;
    path.steps.forEach((step) => {
      step.course_ids.forEach((id) => {
        saveCourseForLater(id);
        count++;
      });
    });
    addToast('Roadmap Saved!', `Added ${count} roadmap courses to your learning dashboard.`, 'success');
  };

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-sand-500 mb-6">
          <Link href="/" className="hover:text-indigo-950">Home</Link>
          <span>/</span>
          <Link href="/roadmap" className="hover:text-indigo-950">Roadmaps</Link>
          <span>/</span>
          <span className="font-semibold text-indigo-950 dark:text-sand-100">{path.title}</span>
        </nav>

        {/* Roadmap Hero Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900 shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-lotus-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-saffron-500 text-indigo-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {path.category}
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/80 border border-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                {path.job_growth}
              </span>
            </div>

            <h1 className="font-serif font-extrabold text-2xl sm:text-4xl text-white leading-tight">
              {path.title}
            </h1>

            <p className="text-sand-300 text-sm sm:text-base leading-relaxed">
              {path.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-indigo-800 text-xs">
              <div className="bg-indigo-900/60 p-3 rounded-xl border border-indigo-800">
                <span className="text-[10px] text-sand-400 block font-medium">Target Annual Salary</span>
                <span className="font-serif font-bold text-sm sm:text-base text-saffron-400">
                  {path.target_salary_inr}
                </span>
              </div>

              <div className="bg-indigo-900/60 p-3 rounded-xl border border-indigo-800">
                <span className="text-[10px] text-sand-400 block font-medium">Estimated Timeline</span>
                <span className="font-serif font-bold text-sm sm:text-base text-white">
                  ~{path.estimated_months} Months Total
                </span>
              </div>

              <div className="bg-indigo-900/60 p-3 rounded-xl border border-indigo-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-sand-400 block font-medium">Milestones</span>
                <span className="font-serif font-bold text-sm sm:text-base text-white">
                  {path.steps.length} Sequenced Steps
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleEnrollRoadmap}
                className="px-6 py-3 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-gold-glow transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save Roadmap & Add Courses to My Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* STEP-BY-STEP FLOWCHART TIMELINE */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif font-bold text-2xl text-indigo-950 dark:text-white">
              Step-by-Step Curriculum Flow
            </h2>
            <p className="text-sand-600 dark:text-sand-400 text-xs mt-1">
              Complete each stage before moving to the next for optimum retention and job-readiness.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-saffron-500 before:via-indigo-500 before:to-indigo-800">
            {path.steps.map((step) => {
              // Find matching courses for this step
              const stepCourses = step.course_ids
                .map((id) => UNIQUE_COURSES.find((c) => c.id === id))
                .filter((c): c is (typeof UNIQUE_COURSES)[0] => c !== undefined);

              return (
                <div key={step.step_number} className="relative group">
                  {/* Step Number Circle */}
                  <div className="absolute -left-6 sm:-left-10 top-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-saffron-500 text-indigo-950 font-bold flex items-center justify-center text-xs sm:text-sm shadow-md ring-4 ring-white dark:ring-indigo-950">
                    {step.step_number}
                  </div>

                  <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand-100 dark:border-indigo-800/80 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
                          Stage {step.step_number}
                        </span>
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-indigo-950 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-100 dark:bg-indigo-800 text-indigo-900 dark:text-sand-200 text-xs font-bold whitespace-nowrap self-start">
                        <Clock className="w-3.5 h-3.5 text-saffron-500" />
                        ~{step.duration_weeks} Weeks
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-sand-700 dark:text-sand-300 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Key skills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-bold text-sand-500 mr-1">Skills mastered:</span>
                      {step.key_skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded-md bg-sand-100 dark:bg-indigo-800 text-indigo-950 dark:text-sand-100 font-semibold text-[11px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Step Recommended Courses */}
                    {stepCourses.length > 0 && (
                      <div className="pt-4 border-t border-sand-100 dark:border-indigo-800/60">
                        <p className="text-xs font-bold text-indigo-950 dark:text-white uppercase tracking-wider mb-3">
                          Recommended Courses for this Stage:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {stepCourses.map((c) => (
                            <CourseCard key={c.id} course={c} showCompare={true} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

