'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DakshataLogo } from '@/components/layout/DakshataLogo';
import { useApp } from '@/context/AppContext';
import { CourseLevel } from '@/types';
import { Sparkles, ArrowRight, Check, Compass, SlidersHorizontal } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding, formatPrice } = useApp();

  const [step, setStep] = useState<number>(1);
  const [goal, setGoal] = useState('Pass AWS or Cloud Certification and get a job');
  const [targetRole, setTargetRole] = useState('Cloud Architect & DevOps Engineer');
  const [currentLevel, setCurrentLevel] = useState<CourseLevel>('Beginner');
  const [budgetMax, setBudgetMax] = useState<number>(4000);
  const [weeklyHours, setWeeklyHours] = useState<number>(10);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English', 'Hindi']);

  const toggleLang = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleFinish = () => {
    completeOnboarding({
      goal,
      target_role: targetRole,
      current_level: currentLevel,
      budget_max: budgetMax,
      weekly_hours: weeklyHours,
      preferred_languages: selectedLanguages.length > 0 ? selectedLanguages : ['English'],
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-indigo-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl w-full mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <DakshataLogo size="md" showTagline={true} />
          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-indigo-950 dark:text-white mt-4">
            Personalize Your Learning Journey
          </h2>
          <p className="text-xs text-sand-500">
            Step {step} of 3: Help Dakshata calibrate recommendations for your specific goals and schedule.
          </p>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-sand-200 dark:bg-indigo-800 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-saffron-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-indigo-900/60 p-6 sm:p-8 rounded-3xl border border-sand-200 dark:border-indigo-800 shadow-xl space-y-6">
          
          {/* STEP 1: GOAL & ROLE */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
                What is your primary career goal?
              </h3>

              <div>
                <label className="block text-xs font-bold text-sand-700 dark:text-sand-300 mb-1">
                  Describe what you want to achieve
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. Become a certified solar technician or pass AWS Solutions Architect"
                  className="w-full h-11 px-3.5 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-xs text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sand-700 dark:text-sand-300 mb-2">
                  Pick your closest target role
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Cloud Architect & DevOps Engineer',
                    'Full Stack Web Developer',
                    'Certified Electrician & Solar PV',
                    'Data Analyst & BI Specialist',
                    'CNC Machinist & Smart Manufacturing',
                    'Cybersecurity SOC Analyst',
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setTargetRole(role)}
                      className={`p-3 rounded-xl border text-left font-medium transition-colors ${
                        targetRole === role
                          ? 'border-saffron-500 bg-saffron-50 text-indigo-950 font-bold dark:bg-saffron-950/60 dark:text-sand-100'
                          : 'border-sand-200 dark:border-indigo-800 text-sand-700 dark:text-sand-300 hover:bg-sand-50'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-4"
              >
                <span>Next: Skill Level & Languages</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: SKILL LEVEL & LANGUAGES */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
                What is your current experience level?
              </h3>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['Beginner', 'Intermediate', 'Advanced'] as CourseLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setCurrentLevel(lvl)}
                    className={`py-3 px-2 rounded-xl border text-center font-bold transition-colors ${
                      currentLevel === lvl
                        ? 'bg-saffron-500 text-indigo-950 border-saffron-500'
                        : 'border-sand-200 dark:border-indigo-800 text-sand-700 dark:text-sand-300 hover:bg-sand-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-sand-700 dark:text-sand-300 mb-2">
                  Select your comfortable languages:
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['English', 'Hindi', 'Tamil', 'Telugu', 'Bilingual'].map((lang) => {
                    const isSelected = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLang(lang)}
                        className={`px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 font-bold border-indigo-950'
                            : 'border-sand-300 dark:border-indigo-800 text-sand-700 dark:text-sand-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{lang}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl border text-xs font-semibold text-sand-600"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Next: Budget & Hours</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET & STUDY HOURS */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
                Budget & Time Commitment
              </h3>

              <div>
                <div className="flex justify-between text-xs font-bold text-sand-700 dark:text-sand-300 mb-1">
                  <span>Maximum Course Budget</span>
                  <span className="text-saffron-600 font-bold">
                    {budgetMax === 0 ? 'Free Courses Only' : formatPrice(budgetMax)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={8000}
                  step={500}
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full accent-saffron-500 h-1.5 bg-sand-200 dark:bg-indigo-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-sand-500 mt-0.5 block">
                  We'll surface best value & 100% free SWAYAM/Skill India courses within your range.
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-sand-700 dark:text-sand-300 mb-1">
                  <span>Weekly Study Commitment</span>
                  <span className="text-saffron-600 font-bold">{weeklyHours} hrs / week</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={30}
                  step={2}
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full accent-saffron-500 h-1.5 bg-sand-200 dark:bg-indigo-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-sand-100 dark:border-indigo-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-3 rounded-xl border text-xs font-semibold text-sand-600"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex-1 py-3 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch My Personalized Dashboard</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

