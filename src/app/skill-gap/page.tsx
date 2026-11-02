'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LEARNING_PATHS } from '@/data/learningPaths';
import { UNIQUE_COURSES } from '@/data/allCourses';
import { CourseCard } from '@/components/courses/CourseCard';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  RotateCcw,
} from 'lucide-react';

export default function SkillGapAnalyzerPage() {
  const { user, addToast } = useApp();
  const [selectedRoleId, setSelectedRoleId] = useState<string>(LEARNING_PATHS[0].id);

  const currentPath = LEARNING_PATHS.find((p) => p.id === selectedRoleId) || LEARNING_PATHS[0];

  // User's acquired skills
  const [checkedSkills, setCheckedSkills] = useState<string[]>(
    user?.current_skills || ['Linux CLI', 'TCP/IP']
  );

  const toggleSkill = (skill: string) => {
    setCheckedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const totalRequired = currentPath.skills_covered.length;
  const acquiredCount = currentPath.skills_covered.filter((s) => checkedSkills.includes(s)).length;
  const readinessPercent = Math.round((acquiredCount / totalRequired) * 100);
  const missingSkills = currentPath.skills_covered.filter((s) => !checkedSkills.includes(s));

  // Find courses that teach the missing skills
  const recommendedCourses = UNIQUE_COURSES.filter((course) => {
    return missingSkills.some((missing) => {
      const lower = missing.toLowerCase();
      return (
        course.title.toLowerCase().includes(lower) ||
        course.description.toLowerCase().includes(lower) ||
        course.what_you_will_learn.some((w) => w.toLowerCase().includes(lower))
      );
    });
  }).slice(0, 4);

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-saffron-500/15 border border-saffron-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-saffron-700 dark:text-saffron-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
            <span>AI Skill-Gap Analyzer</span>
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-indigo-950 dark:text-white">
            Target Role Skill-Gap Diagnostic
          </h1>
          <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm mt-2">
            Select your dream job role, check off the skills you already possess, and get an immediate personalized curriculum of the missing proficiencies.
          </p>
        </div>

        {/* 1. Target Role Selector */}
        <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 shadow-sm mb-8">
          <label className="block text-xs font-bold text-sand-500 uppercase tracking-wider mb-3">
            Step 1: Select Your Target Career Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {LEARNING_PATHS.map((path) => {
              const isSelected = path.id === selectedRoleId;
              return (
                <button
                  key={path.id}
                  onClick={() => setSelectedRoleId(path.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-saffron-500 bg-saffron-50/60 dark:bg-saffron-950/40 shadow-sm ring-1 ring-saffron-500'
                      : 'border-sand-200 dark:border-indigo-800 hover:border-saffron-300 bg-sand-50/50 dark:bg-indigo-950/60'
                  }`}
                >
                  <span className="text-[10px] font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-wider block">
                    {path.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-indigo-950 dark:text-white mt-0.5">
                    {path.role}
                  </h4>
                  <span className="text-xs text-sand-500 mt-1 block">
                    Target: {path.target_salary_inr.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Skills Inventory & Readiness Score */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Skills Checklist (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-sand-200 dark:border-indigo-800 pb-3">
              <div>
                <label className="text-xs font-bold text-sand-500 uppercase tracking-wider block">
                  Step 2: Check Skills You Already Have
                </label>
                <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
                  Required Competencies for {currentPath.role}
                </h3>
              </div>
              <button
                onClick={() => setCheckedSkills([])}
                className="text-xs font-semibold text-saffron-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentPath.skills_covered.map((skill) => {
                const isAcquired = checkedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 text-xs font-medium transition-colors ${
                      isAcquired
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-200 font-bold'
                        : 'bg-sand-50 dark:bg-indigo-950/60 border-sand-200 dark:border-indigo-800 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isAcquired ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-sand-400'
                      }`}
                    >
                      {isAcquired && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className="leading-snug">{skill}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Readiness Score & Gap Summary (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 to-indigo-900 text-white rounded-3xl p-6 border border-indigo-800 shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-400 block">
                Job Readiness Score
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-serif font-extrabold text-5xl text-saffron-400">
                  {readinessPercent}%
                </span>
                <span className="text-xs text-sand-300">
                  {acquiredCount} of {totalRequired} skills mastered
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-indigo-950 rounded-full overflow-hidden mt-3 p-0.5 border border-indigo-700">
                <div
                  className="h-full bg-gradient-to-r from-saffron-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>
            </div>

            {/* Missing Skills Pills */}
            <div className="pt-2 border-t border-indigo-800">
              <span className="text-xs font-bold text-sand-300 uppercase tracking-wider block mb-2">
                Your Priority Missing Skills:
              </span>
              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((m, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-700 text-red-200 text-xs font-bold flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      <span>{m}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Outstanding! You have mastered all core prerequisites for this role.</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-sand-400 leading-relaxed">
              Completing the recommended courses below will close your exact missing competencies within approximately ~{Math.ceil(missingSkills.length * 2.5)} weeks.
            </p>
          </div>

        </div>

        {/* 3. Recommended Courses to Bridge the Gap */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-sand-200 dark:border-indigo-800 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
                Bridge the Gap
              </span>
              <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white mt-0.5">
                Targeted Courses to Complete Your Skillset
              </h3>
            </div>
            <Link
              href="/catalog"
              className="text-xs font-bold text-indigo-700 dark:text-saffron-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} showCompare={true} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

