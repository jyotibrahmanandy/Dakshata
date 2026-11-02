'use client';

import React from 'react';
import Link from 'next/link';
import { Course, RecommendationResult } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  Star,
  Clock,
  Award,
  Globe,
  Heart,
  Scale,
  Sparkles,
  ExternalLink,
  Check,
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  recommendation?: RecommendationResult;
  showCompare?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  recommendation,
  showCompare = true,
}) => {
  const {
    isInWishlist,
    toggleWishlist,
    isInCompare,
    addToCompare,
    removeFromCompare,
    formatPrice,
    addToast,
  } = useApp();

  const isSaved = isInWishlist(course.id);
  const isCompared = isInCompare(course.id);

  const discountPercent =
    course.original_price > course.price
      ? Math.round(((course.original_price - course.price) / course.original_price) * 100)
      : 0;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(course.id);
    } else {
      addToCompare(course.id);
    }
  };

  const handleAffiliateClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
    } catch (err) {}
    addToast(
      `Redirecting to ${course.provider}`,
      'Opening verified provider link with your affiliate discount applied...',
      'info'
    );
  };

  return (
    <div className="group relative bg-white dark:bg-indigo-950/80 rounded-2xl border border-sand-200 dark:border-indigo-900 hover:border-saffron-400 dark:hover:border-saffron-500 shadow-sm hover:shadow-dakshata-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-indigo-900">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Provider Tag (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-indigo-950/90 text-sand-100 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md border border-indigo-700/60 shadow-sm">
            {course.provider}
          </span>
          {course.is_free && (
            <span className="bg-emerald-600/90 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md backdrop-blur-md shadow-sm">
              FREE
            </span>
          )}
        </div>

        {/* Action Controls (Top Right: Compare & Wishlist) */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          {showCompare && (
            <button
              type="button"
              onClick={handleCompareClick}
              className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                isCompared
                  ? 'bg-saffron-500 text-indigo-950 shadow-md'
                  : 'bg-black/50 text-white hover:bg-black/80'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to side-by-side compare'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(course.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-black/50 text-white hover:bg-black/80'
            }`}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Badges on bottom of thumbnail (Level, Duration) */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-sand-100">
          <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] backdrop-blur-sm font-medium">
            {course.level}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-saffron-300">
            <Clock className="w-3 h-3 text-saffron-400" />
            <span>~{course.duration_hours} hrs</span>
          </div>
        </div>
      </div>

      {/* Course Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Recommendation Score & Explanation Bar */}
        {recommendation ? (
          <div className="bg-saffron-50 dark:bg-saffron-950/30 border border-saffron-300 dark:border-saffron-900/60 rounded-lg p-2 text-[11px]">
            <div className="flex items-center justify-between mb-0.5 font-bold text-saffron-700 dark:text-saffron-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
                Match Score: {recommendation.total_score}%
              </span>
              <span className="text-[10px] font-medium bg-saffron-200/70 dark:bg-saffron-900/60 text-saffron-900 dark:text-saffron-200 px-1.5 py-0.2 rounded">
                Why recommended
              </span>
            </div>
            <p className="text-sand-700 dark:text-sand-300 line-clamp-1 leading-snug text-[10px]">
              {recommendation.explanation}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sand-100 dark:bg-indigo-900 text-indigo-800 dark:text-sand-200 border border-sand-200 dark:border-indigo-800"
              >
                {tag}
              </span>
            ))}
            {course.best_value_score && course.best_value_score > 80 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                ⭐ Best Value
              </span>
            )}
          </div>
        )}

        {/* Course Title */}
        <Link href={`/course/${course.slug}`} className="group-hover:text-indigo-700 dark:group-hover:text-saffron-400">
          <h3 className="font-serif font-bold text-base text-indigo-950 dark:text-white line-clamp-2 leading-snug">
            {course.title}
          </h3>
        </Link>

        {/* Institution / Instructor */}
        <p className="text-xs text-sand-600 dark:text-sand-400 line-clamp-1">
          {course.institution || course.instructor}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-saffron-600 font-bold">
            <Star className="w-3.5 h-3.5 fill-saffron-500 text-saffron-500" />
            <span>{course.rating.toFixed(1)}</span>
          </div>
          <span className="text-sand-400 dark:text-sand-500 text-[11px]">
            ({course.rating_count.toLocaleString('en-IN')} reviews)
          </span>

          {/* Certificate Badge */}
          {course.certificate && (
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-300 font-semibold bg-indigo-50 dark:bg-indigo-900/60 px-2 py-0.5 rounded">
              <Award className="w-3 h-3 text-saffron-500" />
              Certificate
            </span>
          )}
        </div>

        {/* Language & Highlights */}
        <div className="flex items-center gap-2 text-[11px] text-sand-500 dark:text-sand-400 pt-1 border-t border-sand-100 dark:border-indigo-900">
          <Globe className="w-3 h-3 text-sand-400" />
          <span>{course.language}</span>
          <span className="text-sand-300 dark:text-sand-700">•</span>
          <span className="truncate">{course.what_you_will_learn[0] || 'Hands-on practical curriculum'}</span>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-sand-100 dark:border-indigo-900">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-indigo-950 dark:text-white font-serif">
                {formatPrice(course.price)}
              </span>
              {course.original_price > course.price && (
                <span className="text-xs line-through text-sand-400 dark:text-sand-500">
                  {formatPrice(course.original_price)}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Save {discountPercent}% off
              </span>
            )}
          </div>

          {/* External Action Button */}
          <div className="flex items-center gap-1.5">
            <Link
              href={`/course/${course.slug}`}
              className="px-2.5 py-1.5 rounded-lg border border-sand-300 dark:border-indigo-800 text-xs font-semibold text-indigo-900 dark:text-sand-100 hover:bg-sand-100 dark:hover:bg-indigo-900 transition-colors"
            >
              Details
            </Link>

            <a
              href={course.affiliate_url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={handleAffiliateClick}
              className="px-3 py-1.5 rounded-lg bg-saffron-500 hover:bg-saffron-600 text-indigo-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1 whitespace-nowrap"
            >
              <span>{course.is_free ? 'Get Free' : 'Go to Course'}</span>
              <ExternalLink className="w-3 h-3 text-indigo-950" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
