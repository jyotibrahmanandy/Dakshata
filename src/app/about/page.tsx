import React from 'react';
import Link from 'next/link';
import { DakshataLogo, TraditionalDivider } from '@/components/layout/DakshataLogo';
import { ShieldCheck, Award, Target, Compass, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero */}
        <div className="text-center space-y-3">
          <DakshataLogo size="lg" showTagline={true} />
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-indigo-950 dark:text-white mt-4">
            Democratizing Practical Skills & Certifications
          </h1>
          <p className="text-sand-600 dark:text-sand-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            "Dakshata" (दक्षता) represents competence, mastery, and professional craftsmanship. We empower students and tradespeople to locate accredited, verified education without inflated middleman tuition fees.
          </p>
        </div>

        <TraditionalDivider className="my-6 opacity-60" />

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-indigo-900/60 p-6 rounded-3xl border border-sand-200 dark:border-indigo-800 space-y-3 shadow-sm">
            <div className="p-3 rounded-xl bg-saffron-50 text-saffron-600 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
              Zero Course Hosting
            </h3>
            <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed">
              Dakshata never hosts courses. We aggregate and evaluate offerings across Coursera, edX, NPTEL, Udemy, and Skill India, connecting you directly to verified accredited platforms.
            </p>
          </div>

          <div className="bg-white dark:bg-indigo-900/60 p-6 rounded-3xl border border-sand-200 dark:border-indigo-800 space-y-3 shadow-sm">
            <div className="p-3 rounded-xl bg-saffron-50 text-saffron-600 w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
              Best-Value Metric
            </h3>
            <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed">
              We compute an algorithmic rating-per-rupee score so learners can immediately identify which courses provide maximum instructional value for every rupee spent.
            </p>
          </div>

          <div className="bg-white dark:bg-indigo-900/60 p-6 rounded-3xl border border-sand-200 dark:border-indigo-800 space-y-3 shadow-sm">
            <div className="p-3 rounded-xl bg-saffron-50 text-saffron-600 w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
              Vocational & Free Focus
            </h3>
            <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed">
              Unlike generic platforms, we give equal prestige to industrial trades (Electricians, Solar PV installers, CNC machinists) and government-backed free university portals (SWAYAM).
            </p>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="bg-white dark:bg-indigo-900/60 rounded-3xl p-8 border border-sand-200 dark:border-indigo-800 space-y-4 text-xs sm:text-sm text-sand-700 dark:text-sand-300 leading-relaxed shadow-sm">
          <h2 className="font-serif font-bold text-xl text-indigo-950 dark:text-white">
            The Dakshata Story
          </h2>
          <p>
            Millions of aspiring Indian engineers and vocational workers spend weeks searching through fragmented websites, often falling victim to exorbitant private coaching centers that charge ₹30,000 to ₹1,00,000 for curricula that can be studied online for under ₹3,000 or even completely free through government ministries like MNRE, MSDE, and AICTE.
          </p>
          <p>
            Dakshata was built to solve this information asymmetry. Our intelligent recommendation wizard matches your career aspirations, current skill level, budget, and weekly study bandwidth with the best available courses, providing transparent price comparisons and side-by-side curriculum evaluations.
          </p>
          <div className="pt-4 flex items-center justify-between border-t border-sand-100 dark:border-indigo-800">
            <span className="font-bold text-indigo-950 dark:text-white font-serif">
              "Skill is your power."
            </span>
            <Link
              href="/catalog"
              className="px-5 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold rounded-xl text-xs transition-colors"
            >
              Explore Catalog Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

