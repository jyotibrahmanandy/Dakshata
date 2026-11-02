'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink,
  Star,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface CourseOfTheWeekProps {
  course?: Course;
}

export const CourseOfTheWeekBanner: React.FC<CourseOfTheWeekProps> = ({ course }) => {
  const { formatPrice, addToast } = useApp();

  if (!course) return null;

  const handleOutbound = () => {
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
    addToast('Opening Official Provider', 'Applying partner discount code automatically...', 'info');
  };

  return (
    <section className="py-12 bg-white dark:bg-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 border-2 border-saffron-500/70 p-6 sm:p-10 text-white overflow-hidden shadow-2xl">
          {/* Subtle Background motif */}
          <div className="absolute inset-0 bg-lotus-pattern opacity-10 pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-saffron-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-saffron-500 text-indigo-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Course of the Week
                </span>
                <span className="bg-indigo-800 text-sand-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-700">
                  {course.provider} Verified Partner
                </span>
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-4xl text-white leading-tight">
                {course.title}
              </h3>

              <p className="text-sand-300 text-sm leading-relaxed">
                {course.description}
              </p>

              {/* Learning Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                {course.what_you_will_learn.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sand-200">
                    <CheckCircle2 className="w-4 h-4 text-saffron-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Price & Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-indigo-800">
                <div>
                  <span className="text-2xl font-bold font-serif text-saffron-400">
                    {formatPrice(course.price)}
                  </span>
                  {course.original_price > course.price && (
                    <span className="text-sm line-through text-sand-400 ml-2">
                      {formatPrice(course.original_price)}
                    </span>
                  )}
                  <span className="ml-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Save {Math.round(((course.original_price - course.price) / course.original_price) * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={course.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onClick={handleOutbound}
                    className="px-5 py-3 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-sm transition-all shadow-lg hover:shadow-gold-glow flex items-center gap-2"
                  >
                    <span>Claim Offer on {course.provider}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <Link
                    href={`/course/${course.slug}`}
                    className="px-4 py-3 rounded-xl bg-indigo-800/80 hover:bg-indigo-700 text-white font-semibold text-xs border border-indigo-700 transition-colors"
                  >
                    View Syllabus & Reviews
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Media Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-700 shadow-2xl bg-indigo-950">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-indigo-950/90 border-t border-indigo-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-saffron-400 font-bold">
                    <Star className="w-4 h-4 fill-saffron-500 text-saffron-500" />
                    <span>{course.rating.toFixed(1)} / 5.0 Rating</span>
                  </div>
                  <div className="flex items-center gap-1 text-sand-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{course.duration_hours} Hours Self-Paced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
