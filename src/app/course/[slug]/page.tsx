'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { UNIQUE_COURSES } from '@/data/allCourses';
import { REVIEWS } from '@/data/reviews';
import { CourseCard } from '@/components/courses/CourseCard';
import { useApp } from '@/context/AppContext';
import {
  Star,
  Clock,
  Award,
  Globe,
  ExternalLink,
  Heart,
  Scale,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Share2,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isInWishlist, toggleWishlist, isInCompare, addToCompare, removeFromCompare, formatPrice, addToast } = useApp();

  const course = UNIQUE_COURSES.find((c) => c.slug === slug);
  if (!course) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'provider' | 'reviews'>('overview');
  const [openSyllabusWeek, setOpenSyllabusWeek] = useState<number | null>(1);

  const isSaved = isInWishlist(course.id);
  const isCompared = isInCompare(course.id);

  // Similar courses from same category
  const similarCourses = UNIQUE_COURSES.filter(
    (c) => c.category_id === course.category_id && c.id !== course.id
  ).slice(0, 3);

  // Relevant reviews
  const courseReviews = REVIEWS.filter((r) => r.course_id === course.id);

  const discountPercent =
    course.original_price > course.price
      ? Math.round(((course.original_price - course.price) / course.original_price) * 100)
      : 0;

  const handleAffiliateClick = () => {
    try {
      fetch('/api/affiliate/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: course.id,
          course_title: course.title,
          provider: course.provider,
          price_inr: course.price,
        }),
      }).catch(() => {});
    } catch (e) {}
    addToast(
      `Redirecting to ${course.provider}`,
      'Applying verified discount and redirecting to official course provider...',
      'info'
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied!', 'Course link copied to your clipboard', 'success');
    }
  };

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-sand-500 mb-6">
          <Link href="/" className="hover:text-indigo-950">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-indigo-950">Catalog</Link>
          <span>/</span>
          <Link href={`/catalog?category=${encodeURIComponent(course.category_name || '')}`} className="hover:text-indigo-950 truncate max-w-[150px]">
            {course.category_name}
          </Link>
          <span>/</span>
          <span className="font-semibold text-indigo-950 dark:text-sand-100 truncate max-w-[200px]">
            {course.title}
          </span>
        </nav>

        {/* Top Hero Card */}
        <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900 shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-lotus-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-saffron-500 text-indigo-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {course.provider}
              </span>
              <span className="bg-indigo-800 text-sand-200 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-700">
                {course.category_name}
              </span>
              {course.is_free && (
                <span className="bg-emerald-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full">
                  100% Free Tuition
                </span>
              )}
            </div>

            <h1 className="font-serif font-extrabold text-2xl sm:text-4xl text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-sand-300 text-sm sm:text-base leading-relaxed">
              {course.tagline || course.description}
            </p>

            {/* Credential line */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-sand-200">
              <div className="flex items-center gap-1.5 text-saffron-400 font-bold">
                <Star className="w-4 h-4 fill-saffron-500 text-saffron-500" />
                <span>{course.rating.toFixed(1)}</span>
                <span className="text-sand-400 font-normal">({course.rating_count.toLocaleString('en-IN')} ratings)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-saffron-400" />
                <span>~{course.duration_hours} hours total</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-saffron-400" />
                <span>Language: {course.language}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-saffron-400" />
                <span>{course.certificate ? 'Verified Certificate' : 'Audit Mode'}</span>
              </div>
            </div>

            <p className="text-xs text-sand-400 pt-1">
              Created by: <strong className="text-white">{course.instructor || course.institution}</strong> • Last updated & synced: {new Date(course.last_synced_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content Layout (Main Tabs Left + Sticky Outbound Card Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT TABS CONTENT (8 cols) ================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tabs Header Navigation */}
            <div className="flex items-center border-b border-sand-200 dark:border-indigo-800 bg-white dark:bg-indigo-900/40 rounded-2xl p-1.5 shadow-sm text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  activeTab === 'overview'
                    ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                    : 'text-sand-600 dark:text-sand-400 hover:text-indigo-950'
                }`}
              >
                Overview & Learning Outcomes
              </button>

              <button
                onClick={() => setActiveTab('syllabus')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  activeTab === 'syllabus'
                    ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                    : 'text-sand-600 dark:text-sand-400 hover:text-indigo-950'
                }`}
              >
                Curriculum Syllabus
              </button>

              <button
                onClick={() => setActiveTab('provider')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  activeTab === 'provider'
                    ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                    : 'text-sand-600 dark:text-sand-400 hover:text-indigo-950'
                }`}
              >
                Provider & Credentials
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  activeTab === 'reviews'
                    ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                    : 'text-sand-600 dark:text-sand-400 hover:text-indigo-950'
                }`}
              >
                Reviews & Ratings
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 p-6 space-y-6 shadow-sm">
                
                {/* What you'll learn */}
                <div>
                  <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    What You Will Master in This Course
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-sand-800 dark:text-sand-200">
                    {course.what_you_will_learn.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-sand-50 dark:bg-indigo-950/50 border border-sand-200/60 dark:border-indigo-800/40">
                        <CheckCircle2 className="w-4 h-4 text-saffron-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Long Description */}
                <div className="pt-4 border-t border-sand-200 dark:border-indigo-800">
                  <h4 className="font-serif font-bold text-base text-indigo-950 dark:text-white mb-2">
                    Course Description
                  </h4>
                  <p className="text-xs sm:text-sm text-sand-700 dark:text-sand-300 leading-relaxed whitespace-pre-line">
                    {course.long_description || course.description}
                  </p>
                </div>

                {/* Prerequisites / Requirements */}
                {course.requirements && course.requirements.length > 0 && (
                  <div className="pt-4 border-t border-sand-200 dark:border-indigo-800">
                    <h4 className="font-serif font-bold text-base text-indigo-950 dark:text-white mb-2">
                      Requirements & Prerequisites
                    </h4>
                    <ul className="list-disc list-inside space-y-1.5 text-xs text-sand-600 dark:text-sand-400">
                      {course.requirements.map((req, rIdx) => (
                        <li key={rIdx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SYLLABUS */}
            {activeTab === 'syllabus' && (
              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 p-6 space-y-4 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-saffron-500" />
                  Structured Course Modules
                </h3>

                {course.syllabus && course.syllabus.length > 0 ? (
                  <div className="space-y-3">
                    {course.syllabus.map((item) => {
                      const isOpen = openSyllabusWeek === item.week;
                      return (
                        <div
                          key={item.week}
                          className="border border-sand-200 dark:border-indigo-800 rounded-xl overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenSyllabusWeek(isOpen ? null : item.week)}
                            className="w-full p-4 bg-sand-50 dark:bg-indigo-950/60 text-left flex items-center justify-between hover:bg-sand-100 transition-colors"
                          >
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400 block">
                                Module {item.week}
                              </span>
                              <span className="font-serif font-bold text-sm text-indigo-950 dark:text-white">
                                {item.title}
                              </span>
                            </div>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-indigo-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-indigo-500" />
                            )}
                          </button>

                          {isOpen && (
                            <div className="p-4 bg-white dark:bg-indigo-900/40 text-xs border-t border-sand-200 dark:border-indigo-800 space-y-2">
                              <p className="font-bold text-sand-500 uppercase text-[10px]">Topics covered:</p>
                              <ul className="space-y-1.5 text-sand-700 dark:text-sand-300">
                                {item.topics.map((t, tIdx) => (
                                  <li key={tIdx} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-500" />
                                    <span>{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-sand-50 rounded-xl text-xs text-sand-600">
                    Comprehensive full-length video lectures, assignments, and practical labs provided directly on {course.provider}.
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PROVIDER & INSTITUTION */}
            {activeTab === 'provider' && (
              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 p-6 space-y-4 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-saffron-500" />
                  About the Provider & Accreditation
                </h3>
                <div className="p-4 rounded-xl bg-sand-50 dark:bg-indigo-950/60 border border-sand-200 dark:border-indigo-800 space-y-2">
                  <h4 className="font-bold text-sm text-indigo-950 dark:text-white">
                    {course.provider} ({course.institution || 'Accredited Partner'})
                  </h4>
                  <p className="text-xs text-sand-600 dark:text-sand-300 leading-relaxed">
                    This course is hosted and verified on {course.provider}. Upon completing the learning modules and proctored assessments, students earn an authentic digital certificate shareable directly to LinkedIn and employer verification portals.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 p-6 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-saffron-500 fill-saffron-500" />
                    Student Reviews & Verification
                  </h3>
                  <span className="text-xs font-bold text-indigo-900 dark:text-sand-200">
                    {course.rating.toFixed(1)} / 5.0 overall
                  </span>
                </div>

                <div className="space-y-4">
                  {courseReviews.length > 0 ? (
                    courseReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl border border-sand-200 dark:border-indigo-800 bg-sand-50/50 dark:bg-indigo-950/40 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={rev.user_avatar}
                              alt={rev.user_name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <span className="font-bold text-indigo-950 dark:text-white block">
                                {rev.user_name}
                              </span>
                              <span className="text-[10px] text-sand-500">{rev.role}</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-sand-400">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1 text-saffron-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>

                        <p className="text-sand-700 dark:text-sand-300 leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-sand-50 rounded-xl text-xs text-sand-600">
                      Overall course rating: {course.rating}★ across {course.rating_count.toLocaleString('en-IN')} verified global reviews on {course.provider}.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SIMILAR COURSES SECTION */}
            {similarCourses.length > 0 && (
              <div className="pt-6">
                <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white mb-4">
                  Similar & Alternative Courses
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarCourses.map((simCourse) => (
                    <CourseCard key={simCourse.id} course={simCourse} showCompare={true} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT STICKY OUTBOUND CARD (4 cols) ================= */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white dark:bg-indigo-900 rounded-3xl border-2 border-saffron-500/80 p-6 shadow-2xl space-y-5">
              
              {/* Media preview */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-indigo-950">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-indigo-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                  {course.provider}
                </span>
              </div>

              {/* Price & Savings */}
              <div>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-3xl text-indigo-950 dark:text-white">
                      {formatPrice(course.price)}
                    </span>
                    {course.original_price > course.price && (
                      <span className="text-sm line-through text-sand-400">
                        {formatPrice(course.original_price)}
                      </span>
                    )}
                  </div>
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-sand-500 mt-1">
                  {course.is_free ? '100% Free Tuition • Open Enrollment' : 'Discount voucher automatically applied at checkout'}
                </p>
              </div>

              {/* Best Value calculation box */}
              {course.best_value_score && (
                <div className="bg-saffron-50 dark:bg-saffron-950/40 border border-saffron-200 dark:border-saffron-900 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-saffron-500" />
                    <span className="font-bold text-saffron-900 dark:text-saffron-200">
                      Best-Value Score
                    </span>
                  </div>
                  <span className="font-mono font-bold text-sm text-saffron-600 dark:text-saffron-400">
                    {course.best_value_score} / 100
                  </span>
                </div>
              )}

              {/* PRIMARY CTA: GO TO COURSE (TRACKED OUTBOUND) */}
              <div className="space-y-2">
                <a
                  href={course.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={handleAffiliateClick}
                  className="w-full py-3.5 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-extrabold text-sm rounded-xl transition-all shadow-lg hover:shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span>{course.is_free ? 'Enroll for Free' : `Go to Course on ${course.provider}`}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Secondary Actions: Wishlist, Compare, Share */}
                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <button
                    onClick={() => toggleWishlist(course.id)}
                    className={`py-2 rounded-xl border flex items-center justify-center gap-1 font-semibold transition-colors ${
                      isSaved
                        ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:border-red-900'
                        : 'border-sand-300 dark:border-indigo-800 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-red-500' : ''}`} />
                    <span>{isSaved ? 'Saved' : 'Wishlist'}</span>
                  </button>

                  <button
                    onClick={() => (isCompared ? removeFromCompare(course.id) : addToCompare(course.id))}
                    className={`py-2 rounded-xl border flex items-center justify-center gap-1 font-semibold transition-colors ${
                      isCompared
                        ? 'bg-saffron-50 text-saffron-700 border-saffron-300 dark:bg-saffron-950/40 dark:border-saffron-900'
                        : 'border-sand-300 dark:border-indigo-800 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'In Compare' : 'Compare'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="py-2 rounded-xl border border-sand-300 dark:border-indigo-800 text-sand-700 dark:text-sand-300 hover:bg-sand-100 flex items-center justify-center gap-1 font-semibold transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="pt-3 border-t border-sand-200 dark:border-indigo-800 text-xs text-sand-600 dark:text-sand-400 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Direct link to official accredited provider</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Zero Dakshata middleman markups</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Shareable digital badge upon completion</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

