'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UNIQUE_COURSES } from '@/data/allCourses';
import { Course } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  Scale,
  X,
  Plus,
  Star,
  Clock,
  Award,
  Globe,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight,
  Search,
  Check,
} from 'lucide-react';

export default function ComparePage() {
  const { compareList, removeFromCompare, addToCompare, clearCompare, formatPrice, addToast } = useApp();
  const [coursePickerOpen, setCoursePickerOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');

  // Get course objects from compareList
  const comparedCourses: Course[] = compareList
    .map((id) => UNIQUE_COURSES.find((c) => c.id === id))
    .filter((c): c is Course => c !== undefined);

  // Available courses to add
  const availableCourses = UNIQUE_COURSES.filter(
    (c) =>
      !compareList.includes(c.id) &&
      (c.title.toLowerCase().includes(pickerSearch.toLowerCase()) ||
        c.provider.toLowerCase().includes(pickerSearch.toLowerCase()) ||
        c.category_name?.toLowerCase().includes(pickerSearch.toLowerCase()))
  );

  const handleOutbound = (course: Course) => {
    try {
      fetch('/api/affiliate/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: course.id,
          course_title: course.title,
          provider: course.provider,
          price_inr: course.price,
          source: 'compare_table',
        }),
      }).catch(() => {});
    } catch (e) {}
    addToast('Opening Course', `Redirecting to official link on ${course.provider}...`, 'info');
  };

  const handleQuickCompare = (courseIds: string[]) => {
    clearCompare();
    courseIds.forEach((id) => addToCompare(id));
  };

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-sand-200 dark:border-indigo-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400 mb-1">
              <Scale className="w-4 h-4" />
              <span>Multi-Provider Course Comparison</span>
            </div>
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-indigo-950 dark:text-white">
              Compare Courses Side-by-Side
            </h1>
            <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm mt-1">
              Evaluate syllabus, price per rating, duration, and certificates across up to 3 programs simultaneously.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {comparedCourses.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-sand-500 hover:text-red-500 transition-colors"
              >
                Clear All
              </button>
            )}

            {comparedCourses.length < 3 && (
              <button
                onClick={() => setCoursePickerOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Course ({comparedCourses.length}/3)</span>
              </button>
            )}
          </div>
        </div>

        {/* COMPARISON TABLE */}
        {comparedCourses.length > 0 ? (
          <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 shadow-md overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-sand-200 dark:border-indigo-800 bg-sand-100/70 dark:bg-indigo-950/70">
                  <th className="p-4 w-1/4 text-xs font-bold text-sand-500 uppercase tracking-wider">
                    Feature / Attribute
                  </th>
                  {comparedCourses.map((c) => (
                    <th key={c.id} className="p-4 w-1/4 align-top">
                      <div className="relative group space-y-2">
                        <button
                          onClick={() => removeFromCompare(c.id)}
                          className="absolute -top-1 -right-1 p-1 bg-sand-200 dark:bg-indigo-800 text-sand-600 hover:bg-red-500 hover:text-white rounded-full transition-colors"
                          title="Remove from compare"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="aspect-video rounded-xl overflow-hidden bg-indigo-950">
                          <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] font-bold bg-indigo-950 text-sand-100 px-2 py-0.5 rounded">
                          {c.provider}
                        </span>
                        <Link href={`/course/${c.slug}`}>
                          <h4 className="font-serif font-bold text-sm text-indigo-950 dark:text-white hover:text-saffron-500 line-clamp-2 mt-1">
                            {c.title}
                          </h4>
                        </Link>
                      </div>
                    </th>
                  ))}
                  {/* Fill empty columns if less than 3 */}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => (
                    <th key={i} className="p-4 w-1/4 align-middle text-center bg-sand-50/50 dark:bg-indigo-950/20 border-l border-sand-200 dark:border-indigo-800/60">
                      <button
                        onClick={() => setCoursePickerOpen(true)}
                        className="p-6 rounded-2xl border-2 border-dashed border-sand-300 dark:border-indigo-800 hover:border-saffron-400 text-sand-500 hover:text-saffron-500 transition-all flex flex-col items-center justify-center gap-2 mx-auto"
                      >
                        <Plus className="w-6 h-6" />
                        <span className="text-xs font-bold">Add Course</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-sand-200 dark:divide-indigo-800/60 text-xs">
                {/* 1. Price Comparison */}
                <tr className="hover:bg-sand-50/50 dark:hover:bg-indigo-800/30">
                  <td className="p-4 font-bold text-indigo-950 dark:text-white">Price & Savings</td>
                  {comparedCourses.map((c) => (
                    <td key={c.id} className="p-4">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
                          {formatPrice(c.price)}
                        </span>
                        {c.original_price > c.price && (
                          <span className="text-xs line-through text-sand-400">
                            {formatPrice(c.original_price)}
                          </span>
                        )}
                      </div>
                      {c.is_free ? (
                        <span className="text-[10px] font-bold text-emerald-600">100% Free Tuition</span>
                      ) : (
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          Save {Math.round(((c.original_price - c.price) / c.original_price) * 100)}%
                        </span>
                      )}
                    </td>
                  ))}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => <td key={i} />)}
                </tr>

                {/* 2. Rating & Review Count */}
                <tr className="hover:bg-sand-50/50 dark:hover:bg-indigo-800/30">
                  <td className="p-4 font-bold text-indigo-950 dark:text-white">Student Rating</td>
                  {comparedCourses.map((c) => (
                    <td key={c.id} className="p-4">
                      <div className="flex items-center gap-1.5 font-bold text-saffron-600 dark:text-saffron-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{c.rating.toFixed(1)} / 5.0</span>
                      </div>
                      <span className="text-[10px] text-sand-500">
                        {c.rating_count.toLocaleString('en-IN')} verified reviews
                      </span>
                    </td>
                  ))}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => <td key={i} />)}
                </tr>

                {/* 3. Best Value Score (Rating per rupee) */}
                <tr className="hover:bg-sand-50/50 dark:hover:bg-indigo-800/30 bg-saffron-50/30 dark:bg-saffron-950/20">
                  <td className="p-4 font-bold text-saffron-700 dark:text-saffron-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-saffron-500" />
                    <span>Best-Value Metric</span>
                  </td>
                  {comparedCourses.map((c) => (
                    <td key={c.id} className="p-4 font-mono font-bold text-sm text-saffron-700 dark:text-saffron-400">
                      {c.best_value_score ? `${c.best_value_score} / 100` : '95.0 / 100'}
                      <span className="block font-sans text-[10px] font-normal text-sand-500">
                        {c.is_free ? 'Highest quality/cost ratio' : 'High rating per rupee'}
                      </span>
                    </td>
                  ))}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => <td key={i} />)}
                </tr>

                {/* 4. Skill Level */}
                <tr className="hover:bg-sand-50/50 dark:hover:bg-indigo-800/30">
                  <td className="p-4 font-bold text-indigo-950 dark:text-white">Skill Level</td>
                  {comparedCourses.map((c) => (
                    <td key={c.id} className="p-4">
                      <span className="bg-sand-100 dark:bg-indigo-800 text-indigo-900 dark:text-sand-200 px-2.5 py-1 rounded-md font-semibold text-xs">
                        {c.level}
                      </span>
                    </td>
                  ))}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => <td key={i} />)}
                </tr>

                {/* 5. Total Duration */}
                <tr className="hover:bg-sand-50/50 dark:hover:bg-indigo-800/30">
                  <td className="p-4 font-bold text-indigo-950 dark:text-white">Estimated Duration</td>
                  {comparedCourses.map((c) => (
                    <td key={c.id} className="p-4">
                      <span className="font-semibold text-indigo-950 dark:text-white">
                        ~{c.duration_hours} Hours
                      </span>
                      <span className="block text-[10px] text-sand-500">
                        Self-paced schedule
                      </span>
                    </td>
                  ))}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => <td key={i} />)}
                </tr>

                {/* 6. Certificate */}
                <tr className="hover:bg-sand-50/50 dark:hover:bg-indigo-800/30">
                  <td className="p-4 font-bold text-indigo-950 dark:text-white">Certificate of Completion</td>
                  {comparedCourses.map((c) => (
                    <td key={c.id} className="p-4">
                      {c.certificate ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                          <Check className="w-4 h-4" />
                          Verified Credential
                        </span>
                      ) : (
                        <span className="text-sand-400">Audit Only</span>
                      )}
                    </td>
                  ))}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => <td key={i} />)}
                </tr>

                {/* 7. Language */}
                <tr className="hover:bg-sand-50/50 dark:hover:bg-indigo-800/30">
                  <td className="p-4 font-bold text-indigo-950 dark:text-white">Instruction Language</td>
                  {comparedCourses.map((c) => (
                    <td key={c.id} className="p-4 font-medium text-sand-800 dark:text-sand-200">
                      {c.language}
                    </td>
                  ))}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => <td key={i} />)}
                </tr>

                {/* 8. Top 3 Outcomes */}
                <tr className="hover:bg-sand-50/50 dark:hover:bg-indigo-800/30">
                  <td className="p-4 font-bold text-indigo-950 dark:text-white align-top">What You Will Learn</td>
                  {comparedCourses.map((c) => (
                    <td key={c.id} className="p-4 align-top">
                      <ul className="space-y-1.5 text-sand-700 dark:text-sand-300">
                        {c.what_you_will_learn.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                            <span className="text-saffron-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => <td key={i} />)}
                </tr>

                {/* 9. Direct Outbound CTA */}
                <tr>
                  <td className="p-4 font-bold text-indigo-950 dark:text-white">Direct Action</td>
                  {comparedCourses.map((c) => (
                    <td key={c.id} className="p-4">
                      <a
                        href={c.affiliate_url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={() => handleOutbound(c)}
                        className="w-full py-2.5 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>{c.is_free ? 'Enroll Free' : 'Go to Course'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  ))}
                  {[...Array(3 - comparedCourses.length)].map((_, i) => <td key={i} />)}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty Comparison State */
          <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-sand-100 dark:bg-indigo-800 flex items-center justify-center text-saffron-500">
              <Scale className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white">
                Your comparison tray is empty
              </h3>
              <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm">
                Add up to 3 courses from the catalog using the scale icon, or choose one of our popular quick comparisons below.
              </p>
            </div>

            {/* Quick pre-set comparisons */}
            <div className="pt-4 max-w-lg mx-auto">
              <p className="text-xs font-bold text-sand-500 uppercase tracking-wider mb-3">
                Try a Popular Comparison:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() =>
                    handleQuickCompare([
                      'crs-aws-solutions-architect',
                      'crs-aws-practitioner',
                      'crs-docker-k8s-mastery',
                    ])
                  }
                  className="px-4 py-2.5 rounded-xl border border-sand-300 dark:border-indigo-800 hover:border-saffron-500 text-xs font-bold text-indigo-950 dark:text-sand-100 hover:bg-sand-50 text-left transition-all"
                >
                  ☁️ AWS Architect vs Cloud Practitioner vs Docker
                </button>

                <button
                  onClick={() =>
                    handleQuickCompare([
                      'crs-skillindia-electrician-trade',
                      'crs-solar-pv-installer-surya-mitra',
                      'crs-skillindia-cnc-operator',
                    ])
                  }
                  className="px-4 py-2.5 rounded-xl border border-sand-300 dark:border-indigo-800 hover:border-saffron-500 text-xs font-bold text-indigo-950 dark:text-sand-100 hover:bg-sand-50 text-left transition-all"
                >
                  ⚡ Electrician vs Solar PV vs CNC Operator
                </button>
              </div>
            </div>

            <button
              onClick={() => setCoursePickerOpen(true)}
              className="px-6 py-3 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Browse Catalog & Pick Courses</span>
            </button>
          </div>
        )}

        {/* MODAL PICKER TO ADD COURSE TO COMPARE */}
        {coursePickerOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-indigo-900 rounded-3xl max-w-2xl w-full border border-sand-200 dark:border-indigo-800 shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-sand-200 dark:border-indigo-800">
                <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
                  Add Course to Comparison ({comparedCourses.length}/3)
                </h3>
                <button
                  onClick={() => setCoursePickerOpen(false)}
                  className="p-1 rounded-lg text-sand-400 hover:text-indigo-950 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search in picker */}
              <div className="relative">
                <Search className="w-4 h-4 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  placeholder="Search 60+ courses by title or provider..."
                  className="w-full h-10 pl-9 pr-4 bg-sand-50 dark:bg-indigo-950 border border-sand-200 dark:border-indigo-800 rounded-xl text-xs text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                />
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {availableCourses.slice(0, 15).map((course) => (
                  <div
                    key={course.id}
                    className="p-3 rounded-xl border border-sand-200 dark:border-indigo-800/80 bg-sand-50 dark:bg-indigo-950/60 flex items-center justify-between gap-3 hover:border-saffron-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-10 object-cover rounded-lg"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-saffron-600 block">
                          {course.provider} • {course.level}
                        </span>
                        <h4 className="font-serif font-bold text-xs text-indigo-950 dark:text-white line-clamp-1">
                          {course.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-indigo-900 dark:text-sand-300">
                          {formatPrice(course.price)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCompare(course.id);
                        if (comparedCourses.length >= 2) {
                          setCoursePickerOpen(false);
                        }
                      }}
                      className="px-3 py-1.5 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 flex-shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Select</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

