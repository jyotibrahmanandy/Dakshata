'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course } from '@/types';
import { CourseCard } from '@/components/courses/CourseCard';
import { useApp } from '@/context/AppContext';
import { calculateRecommendationScore } from '@/lib/recommendation';
import {
  TrendingUp,
  Star,
  Award,
  Zap,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface CourseRowsProps {
  allCourses: Course[];
}

export const CourseRows: React.FC<CourseRowsProps> = ({ allCourses }) => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<'trending' | 'top_rated' | 'free' | 'best_value'>('trending');

  // Filter lists
  const trendingCourses = allCourses.filter((c) => c.tags.includes('Trending') || c.deal_of_the_day).slice(0, 8);
  const topRatedCourses = [...allCourses].sort((a, b) => b.rating - a.rating || b.rating_count - a.rating_count).slice(0, 8);
  const freeCourses = allCourses.filter((c) => c.is_free || c.price === 0).slice(0, 8);
  const bestValueCourses = [...allCourses].sort((a, b) => (b.best_value_score || 0) - (a.best_value_score || 0)).slice(0, 8);

  const getCoursesForTab = () => {
    switch (activeTab) {
      case 'trending':
        return trendingCourses;
      case 'top_rated':
        return topRatedCourses;
      case 'free':
        return freeCourses;
      case 'best_value':
        return bestValueCourses;
      default:
        return trendingCourses;
    }
  };

  const currentList = getCoursesForTab();

  return (
    <section className="py-14 bg-white dark:bg-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-sand-200 dark:border-indigo-800/80 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400">
              Curated Collections
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-indigo-950 dark:text-white mt-1">
              Explore Featured Certifications & Trades
            </h2>
          </div>

          {/* Tab Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'trending'
                  ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                  : 'bg-sand-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-sand-300 hover:bg-sand-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-saffron-500 dark:text-indigo-950" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => setActiveTab('top_rated')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'top_rated'
                  ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                  : 'bg-sand-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-sand-300 hover:bg-sand-200'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current text-saffron-500 dark:text-indigo-950" />
              <span>Top Rated (4.8+)</span>
            </button>

            <button
              onClick={() => setActiveTab('free')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'free'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-sand-100 dark:bg-indigo-900/60 text-emerald-700 dark:text-emerald-400 hover:bg-sand-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>100% Free Tuition</span>
            </button>

            <button
              onClick={() => setActiveTab('best_value')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'best_value'
                  ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                  : 'bg-sand-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-sand-300 hover:bg-sand-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-saffron-500 dark:text-indigo-950" />
              <span>Best Value (Rating/₹)</span>
            </button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentList.map((course) => {
            const recommendation = user
              ? calculateRecommendationScore(course, user.preferences)
              : undefined;

            return (
              <CourseCard
                key={course.id}
                course={course}
                recommendation={recommendation}
                showCompare={true}
              />
            );
          })}
        </div>

        {/* Bottom CTA to Full Catalog */}
        <div className="mt-12 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sand-100 dark:bg-indigo-900 hover:bg-saffron-500 dark:hover:bg-saffron-500 text-indigo-950 dark:text-sand-100 hover:text-indigo-950 font-bold text-xs sm:text-sm transition-all shadow-sm border border-sand-300 dark:border-indigo-800"
          >
            <span>Explore All 60+ Courses in Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

