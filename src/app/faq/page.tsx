'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Does Dakshata host courses or conduct exams directly?',
    a: 'No. Dakshata is an independent aggregator and recommendation platform. We evaluate, compare, and recommend courses from certified providers (Coursera, edX, NPTEL/SWAYAM, Udemy, Skill India). When you select a course, you are directed directly to the accredited provider to enroll.',
  },
  {
    q: 'Are the certificates from SWAYAM and NPTEL recognized in India?',
    a: 'Yes. Courses from NPTEL and SWAYAM are initiated by the Ministry of Education, Government of India, and conducted by premier IITs and IISc. Their proctored exam certificates carry official AICTE accreditation and university credit transfer eligibility.',
  },
  {
    q: 'How does Dakshata calculate the "Best Value" score?',
    a: 'Our algorithm weighs the verified student rating (e.g. 4.8★) against the normalized course price in INR. Free high-rigor government courses receive top value rankings, while paid courses are ranked based on the educational return per rupee spent.',
  },
  {
    q: 'How does the "Find My Course" recommendation wizard work?',
    a: 'Our multi-factor scoring engine scores courses from 0 to 100 based on 7 weighted parameters: budget fit (max 25 pts), goal and skill keyword alignment (max 25 pts), current experience level match (max 20 pts), weekly study hours vs total course length (max 10 pts), student rating (max 10 pts), language preference (max 5 pts), and certificate availability (max 5 pts).',
  },
  {
    q: 'How do affiliate links work on Dakshata?',
    a: 'When you click outbound to certain partner platforms like Coursera or Udemy, we may earn a small referral commission at absolutely zero additional cost to you. In fact, our partner links often include verified promotional vouchers and student discount codes that reduce the regular price.',
  },
  {
    q: 'How do I compare courses side-by-side?',
    a: 'Simply click the scale icon on any course card or detail page. You can add up to 3 courses to your comparison tray and navigate to the Compare tab to inspect syllabi, pricing, durations, and certificates in a single view.',
  },
];

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-saffron-500/15 border border-saffron-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-saffron-700 dark:text-saffron-300">
            <HelpCircle className="w-3.5 h-3.5 text-saffron-500" />
            <span>Got Questions?</span>
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-indigo-950 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm">
            Everything you need to know about Dakshata course discovery, pricing, and certifications.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-sand-50/50 dark:hover:bg-indigo-800/40 transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-indigo-950 dark:text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-saffron-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-sand-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-sand-700 dark:text-sand-300 leading-relaxed border-t border-sand-100 dark:border-indigo-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="p-6 rounded-3xl bg-indigo-950 text-white border border-indigo-900 text-center space-y-3">
          <h3 className="font-serif font-bold text-lg">Still have questions?</h3>
          <p className="text-xs text-sand-300 max-w-md mx-auto">
            Our learning advisors are available to help you choose the right certification for your career background.
          </p>
          <Link
            href="/contact"
            className="inline-block px-5 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-xl transition-colors"
          >
            Contact Advisor Team
          </Link>
        </div>

      </div>
    </div>
  );
}
