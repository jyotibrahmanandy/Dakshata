'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';
import { Course } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  Award,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  Flame,
  CheckCircle,
} from 'lucide-react';

interface HeroSectionProps {
  dealOfTheDayCourse?: Course;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ dealOfTheDayCourse }) => {
  const router = useRouter();
  const { updatePreferences, formatPrice } = useApp();

  // Find My Course Form States
  const [goal, setGoal] = useState('Cloud Architect & DevOps');
  const [currentLevel, setCurrentLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [budgetMax, setBudgetMax] = useState<number>(3500);
  const [weeklyHours, setWeeklyHours] = useState<number>(10);
  const [language, setLanguage] = useState<string>('All');

  // Deal of the Day Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFindCoursesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      goal,
      current_level: currentLevel,
      budget_max: budgetMax,
      weekly_hours: weeklyHours,
      preferred_languages: language === 'All' ? ['English', 'Hindi'] : [language],
    });

    const params = new URLSearchParams();
    if (goal) params.set('goal', goal);
    params.set('level', currentLevel);
    params.set('budget', budgetMax.toString());
    params.set('hours', weeklyHours.toString());
    if (language !== 'All') params.set('language', language);
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 text-white overflow-hidden border-b border-indigo-900">
      {/* Background traditional geometric accent */}
      <div className="absolute inset-0 bg-lotus-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-saffron-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT: CATEGORY SIDEBAR (E-COMMERCE DESKTOP SKELETON) ================= */}
          <div className="hidden lg:block lg:col-span-3 bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800/80 shadow-dakshata overflow-hidden">
            <div className="bg-indigo-950 text-white px-4 py-3.5 border-b border-indigo-800 flex items-center justify-between">
              <span className="font-serif font-bold text-sm tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-saffron-500" />
                Browse Catalog
              </span>
              <span className="text-[10px] bg-indigo-800/80 px-2 py-0.5 rounded text-sand-300">
                12 Fields
              </span>
            </div>

            <div className="p-2 divide-y divide-sand-100 dark:divide-indigo-800/50 text-xs">
              <div className="pb-2">
                <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
                  IT Certifications
                </p>
                {CATEGORIES.filter((c) => c.section === 'it_certifications').map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-indigo-950 dark:text-sand-200 hover:bg-sand-100 dark:hover:bg-indigo-800 transition-colors group"
                  >
                    <span className="truncate group-hover:text-saffron-600 dark:group-hover:text-saffron-400 font-medium">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-sand-400 group-hover:text-saffron-500">
                      {cat.item_count}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="py-2">
                <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
                  Vocational Trades
                </p>
                {CATEGORIES.filter((c) => c.section === 'vocational_trades').slice(0, 4).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-indigo-950 dark:text-sand-200 hover:bg-sand-100 dark:hover:bg-indigo-800 transition-colors group"
                  >
                    <span className="truncate group-hover:text-saffron-600 dark:group-hover:text-saffron-400 font-medium">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-sand-400 group-hover:text-saffron-500">
                      {cat.item_count}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/catalog?onlyFree=true"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold hover:bg-emerald-100 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    100% Free Govt Courses
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ================= CENTER: MAIN HEADLINE + 'FIND MY COURSE' RECOMMENDATION WIDGET ================= */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 bg-saffron-500/15 border border-saffron-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-saffron-300 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-saffron-400 animate-pulse" />
              <span>Dakshata: Skill is your power • No Course Hosting Markup</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Find the Right Course for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-300 via-saffron-400 to-amber-200">
                Your Career, Goal & Budget
              </span>
            </h1>

            <p className="text-sand-200 text-sm sm:text-base leading-relaxed max-w-xl">
              Don’t waste days scouring multiple websites. We aggregate, verify, and score practical courses and certifications across <strong>Coursera, edX, NPTEL/SWAYAM, Udemy, and Skill India</strong>.
            </p>

            {/* THE SIGNATURE 'FIND MY COURSE' RECOMMENDATION WIDGET */}
            <div className="bg-white/10 dark:bg-indigo-900/70 backdrop-blur-md border border-sand-200/20 dark:border-indigo-700/60 rounded-2xl p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-saffron-400" />
                  <h3 className="font-serif font-bold text-base text-white">
                    Find My Course: Recommendation Wizard
                  </h3>
                </div>
                <span className="text-[10px] font-semibold bg-saffron-500 text-indigo-950 px-2 py-0.5 rounded-full">
                  Smart Match Engine
                </span>
              </div>

              <form onSubmit={handleFindCoursesSubmit} className="space-y-4 text-xs">
                {/* 1. Goal / Target Role Input */}
                <div>
                  <label className="block text-sand-200 font-semibold mb-1">
                    What is your target role or learning goal?
                  </label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g. AWS Cloud Architect, Certified Electrician, Data Analyst, CNC..."
                    className="w-full h-10 px-3.5 bg-indigo-950/80 border border-indigo-700 rounded-lg text-white placeholder:text-indigo-400 focus:outline-none focus:border-saffron-400 transition-colors"
                  />
                </div>

                {/* 2-Column Grid: Current Level & Preferred Language */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sand-200 font-semibold mb-1">
                      Current Skill Level
                    </label>
                    <select
                      value={currentLevel}
                      onChange={(e) => setCurrentLevel(e.target.value as any)}
                      className="w-full h-10 px-3 bg-indigo-950/80 border border-indigo-700 rounded-lg text-white focus:outline-none focus:border-saffron-400"
                    >
                      <option value="Beginner">Beginner (Starting from scratch)</option>
                      <option value="Intermediate">Intermediate (Some IT/Trade hands-on)</option>
                      <option value="Advanced">Advanced (Seeking specialization)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sand-200 font-semibold mb-1">
                      Language Preference
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full h-10 px-3 bg-indigo-950/80 border border-indigo-700 rounded-lg text-white focus:outline-none focus:border-saffron-400"
                    >
                      <option value="All">All Languages (English & Indian)</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi (हिंदी)</option>
                      <option value="Tamil">Tamil (தமிழ்)</option>
                      <option value="Telugu">Telugu (తెలుగు)</option>
                      <option value="Bilingual">Bilingual</option>
                    </select>
                  </div>
                </div>

                {/* 2-Column Grid: Budget Slider & Weekly Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sand-200 font-semibold">Maximum Budget</label>
                      <span className="text-saffron-300 font-bold">
                        {budgetMax === 0 ? 'Free Courses Only' : `Up to ₹${budgetMax.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={8000}
                      step={500}
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(Number(e.target.value))}
                      className="w-full accent-saffron-500 h-1.5 bg-indigo-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sand-200 font-semibold">Weekly Study Commitment</label>
                      <span className="text-saffron-300 font-bold">{weeklyHours} hrs / week</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={30}
                      step={2}
                      value={weeklyHours}
                      onChange={(e) => setWeeklyHours(Number(e.target.value))}
                      className="w-full accent-saffron-500 h-1.5 bg-indigo-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full h-12 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-sm rounded-xl shadow-lg hover:shadow-gold-glow transition-all flex items-center justify-center gap-2 group mt-2"
                >
                  <span>Generate My Personalized Recommendations</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>

          {/* ================= RIGHT: 'DEAL OF THE DAY' COUNTDOWN CARD (SHOPNOVA INSPIRATION) ================= */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-2xl border-2 border-saffron-500/80 p-4 shadow-xl relative overflow-hidden">
              {/* Hot badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  <Flame className="w-3 h-3 fill-white" />
                  Deal of the Day
                </span>
                <span className="text-[11px] text-saffron-300 font-bold">50% OFF</span>
              </div>

              {/* Countdown Clocks */}
              <div className="bg-black/40 rounded-xl p-2.5 border border-indigo-700 mb-4">
                <p className="text-[10px] text-center text-sand-300 uppercase tracking-widest font-semibold mb-1">
                  Offer Ends In
                </p>
                <div className="flex items-center justify-center gap-2 text-center">
                  <div className="bg-indigo-950 px-2 py-1 rounded border border-indigo-800 min-w-[36px]">
                    <span className="font-mono text-base font-bold text-saffron-400">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="block text-[8px] text-sand-400 uppercase">Hrs</span>
                  </div>
                  <span className="font-bold text-saffron-400">:</span>
                  <div className="bg-indigo-950 px-2 py-1 rounded border border-indigo-800 min-w-[36px]">
                    <span className="font-mono text-base font-bold text-saffron-400">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="block text-[8px] text-sand-400 uppercase">Min</span>
                  </div>
                  <span className="font-bold text-saffron-400">:</span>
                  <div className="bg-indigo-950 px-2 py-1 rounded border border-indigo-800 min-w-[36px]">
                    <span className="font-mono text-base font-bold text-saffron-400">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="block text-[8px] text-sand-400 uppercase">Sec</span>
                  </div>
                </div>
              </div>

              {/* Featured Course Info */}
              {dealOfTheDayCourse ? (
                <div className="space-y-3">
                  <div className="relative rounded-lg overflow-hidden aspect-video bg-indigo-950">
                    <img
                      src={dealOfTheDayCourse.image}
                      alt={dealOfTheDayCourse.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {dealOfTheDayCourse.provider}
                    </span>
                  </div>

                  <Link href={`/course/${dealOfTheDayCourse.slug}`}>
                    <h4 className="font-serif font-bold text-sm text-white hover:text-saffron-300 transition-colors line-clamp-2 leading-snug">
                      {dealOfTheDayCourse.title}
                    </h4>
                  </Link>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xl font-bold font-serif text-saffron-400">
                        {formatPrice(dealOfTheDayCourse.price)}
                      </span>
                      <span className="text-xs line-through text-sand-400 ml-2">
                        {formatPrice(dealOfTheDayCourse.original_price)}
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-800">
                      Top Rated 4.8★
                    </span>
                  </div>

                  {/* Progress Claimed */}
                  <div>
                    <div className="flex justify-between text-[10px] text-sand-300 mb-1">
                      <span>Claimed: 84%</span>
                      <span>16 seats left</span>
                    </div>
                    <div className="w-full h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                      <div className="w-[84%] h-full bg-gradient-to-r from-saffron-500 to-red-500 rounded-full" />
                    </div>
                  </div>

                  <a
                    href={dealOfTheDayCourse.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full py-2 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1 shadow-md"
                  >
                    <span>Claim Deal with Coupon</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : null}
            </div>

            {/* Quick trust bullet points */}
            <div className="bg-indigo-950/70 rounded-xl p-3 border border-indigo-800/80 text-[11px] text-sand-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Verified discount coupon codes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Zero hidden affiliate surcharges</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
