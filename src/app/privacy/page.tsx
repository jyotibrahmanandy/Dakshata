import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-indigo-900/60 p-8 sm:p-10 rounded-3xl border border-sand-200 dark:border-indigo-800 shadow-sm space-y-6 text-xs sm:text-sm text-sand-700 dark:text-sand-300 leading-relaxed">
        <div className="border-b border-sand-200 dark:border-indigo-800 pb-4">
          <div className="flex items-center gap-2 text-saffron-600 dark:text-saffron-400 font-bold text-xs uppercase mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Compliance & Data Protection</span>
          </div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-indigo-950 dark:text-white">
            Dakshata Privacy Policy
          </h1>
          <p className="text-sand-500 text-xs mt-1">Last Updated: October 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-indigo-950 dark:text-white">1. Information We Collect</h2>
          <p>
            When you create an account or utilize the "Find My Course" recommendation wizard, Dakshata collects limited profile details including your name, email address, declared career goals, current experience level, and preferred languages. We never store credit card or payment information on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-indigo-950 dark:text-white">2. Purpose of Data Processing</h2>
          <p>
            Your information is used strictly to compute personalized course match scores, notify you of relevant price drops or government course batch openings, and maintain your private learning roadmap. We never sell student data to third-party telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-indigo-950 dark:text-white">3. Affiliate Outbound Links & Cookies</h2>
          <p>
            When you click an outbound button to enroll with providers such as Coursera or Udemy, a session cookie may be placed by that provider to track your enrollment for affiliate compensation. Please consult the individual privacy policies of external platforms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-indigo-950 dark:text-white">4. Indian Digital Personal Data Protection Act (DPDPA)</h2>
          <p>
            Dakshata strictly complies with the provisions of India’s Digital Personal Data Protection Act (2023). You have the complete right to request data export or permanently delete your account and all associated records at any time from your settings tab.
          </p>
        </section>

        <div className="pt-4 border-t border-sand-200 dark:border-indigo-800 flex justify-between items-center text-xs">
          <Link href="/" className="font-bold text-saffron-600 hover:underline">
            ← Return to Homepage
          </Link>
          <a href="mailto:privacy@dakshata.in" className="text-sand-500 hover:text-indigo-950">
            Contact Grievance Officer: privacy@dakshata.in
          </a>
        </div>
      </div>
    </div>
  );
}
