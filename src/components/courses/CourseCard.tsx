'use client';

import React from 'react';
import Link from 'next/link';
import { Course, RecommendationResult } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  Star,
  Award,
  Heart,
  Scale,
  Sparkles,
  ExternalLink,
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
      'Opening provider course page...',
      'info'
    );
  };

  return (
    <div className="group relative bg-white dark:bg-indigo-950/80 rounded-2xl border border-sand-200 dark:border-indigo-900 hover:border-saffron-400 dark:hover:border-saffron-500 shadow-sm hover:shadow-dakshata-hover transition-all duration-300 flex flex-col overflow-hidden w-full max-w-full box-border">
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-indigo-950">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Provider Tag (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-indigo-950/90 text-sand-100 text-[10px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-md border border-indigo-700/60 shadow-sm">
            {course.provider}
          </span>
          {course.is_free && (
            <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-sm">
              Free
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
              title={isCompared ? 'Remove from compare' : 'Add to compare'}
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
      </div>

      {/* Course Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Recommendation Note or Category Tags */}
          {recommendation ? (
            <div className="flex items-center gap-1.5 text-[11px] text-saffron-700 dark:text-saffron-300 font-medium mb-2 bg-saffron-500/10 px-2 py-1 rounded-md border border-saffron-500/20">
              <Sparkles className="w-3.5 h-3.5 text-saffron-500 flex-shrink-0" />
              <span className="font-semibold">{recommendation.total_score}% Match:</span>
              <span className="truncate">{recommendation.explanation}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mb-2">
              {course.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-sand-100 dark:bg-indigo-900 text-indigo-900 dark:text-sand-200"
                >
                  {tag}
                </span>
              ))}
              {course.best_value_score && course.best_value_score > 80 && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Best Value
                </span>
              )}
            </div>
          )}

          {/* Course Title */}
          <Link href={`/course/${course.slug}`}>
            <h3 className="font-serif font-bold text-base text-indigo-950 dark:text-white line-clamp-2 leading-snug group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
              {course.title}
            </h3>
          </Link>

          {/* Instructor / Institution */}
          <p className="text-xs text-sand-500 dark:text-sand-400 truncate mt-1">
            {course.institution || course.instructor}
          </p>

          {/* Metadata Row: Rating, Level, Duration */}
          <div className="flex items-center gap-2 text-xs text-sand-500 dark:text-sand-400 mt-2.5">
            <div className="flex items-center gap-1 text-saffron-600 dark:text-saffron-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-saffron-500 text-saffron-500" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{course.level}</span>
            <span>•</span>
            <span>~{course.duration_hours}h</span>
            {course.certificate && (
              <>
                <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
                  <Award className="w-3.5 h-3.5 text-saffron-500" />
                  Certificate
                </span>
              </>
            )}
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 border-t border-sand-100 dark:border-indigo-900 space-y-2.5">
          {/* Price & Discount Row */}
          <div className="flex items-baseline justify-between">
            {course.is_free ? (
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-serif">
                Free
              </span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-indigo-950 dark:text-white font-serif">
                  {formatPrice(course.price)}
                </span>
                {course.original_price > course.price && (
                  <span className="text-xs line-through text-sand-400">
                    {formatPrice(course.original_price)}
                  </span>
                )}
              </div>
            )}

            {!course.is_free && course.original_price > course.price && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Save {Math.round(((course.original_price - course.price) / course.original_price) * 100)}%
              </span>
            )}
          </div>

          {/* Action Buttons: 2-column grid ensuring full containment within card */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/course/${course.slug}`}
              className="w-full py-2 px-2 rounded-lg border border-sand-300 dark:border-indigo-800 text-xs font-semibold text-indigo-900 dark:text-sand-100 hover:bg-sand-100 dark:hover:bg-indigo-900 transition-colors flex items-center justify-center text-center"
            >
              Details
            </Link>

            <a
              href={course.affiliate_url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={handleAffiliateClick}
              className="w-full py-2 px-2 rounded-lg bg-saffron-500 hover:bg-saffron-600 text-indigo-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
            >
              <span className="truncate">{course.is_free ? 'Get Free' : 'Go to Course'}</span>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
