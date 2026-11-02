import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-indigo-900/60 p-8 sm:p-10 rounded-3xl border border-sand-200 dark:border-indigo-800 shadow-sm space-y-6 text-xs sm:text-sm text-sand-700 dark:text-sand-300 leading-relaxed">
        <div className="border-b border-sand-200 dark:border-indigo-800 pb-4">
          <div className="flex items-center gap-2 text-saffron-600 dark:text-saffron-400 font-bold text-xs uppercase mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Platform Agreement</span>
          </div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-indigo-950 dark:text-white">
            Dakshata Terms of Service
          </h1>
          <p className="text-sand-500 text-xs mt-1">Effective Date: October 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-indigo-950 dark:text-white">1. Service Nature & Non-Hosting</h2>
          <p>
            Dakshata is an online course discovery and recommendation catalog. Dakshata does not create, host, or award degree certifications directly. All academic content, assessments, and certifications are provided by third-party partner institutions and providers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-indigo-950 dark:text-white">2. Pricing & Affiliate Links</h2>
          <p>
            Prices displayed on Dakshata are synchronized periodically with provider API feeds. While we strive for 100% accuracy, real-time flash sales and dynamic exchange rates on third-party sites may cause minor variations. The checkout price on the provider site is always the authoritative price.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-indigo-950 dark:text-white">3. User Conduct</h2>
          <p>
            Users agree not to scrape, reverse engineer, or abuse Dakshata automated APIs without written authorization. All branding, logos, and algorithmic recommendation models are protected intellectual property of Dakshata Learning Technologies.
          </p>
        </section>

        <div className="pt-4 border-t border-sand-200 dark:border-indigo-800 flex justify-between items-center text-xs">
          <Link href="/" className="font-bold text-saffron-600 hover:underline">
            ← Return to Homepage
          </Link>
          <a href="mailto:legal@dakshata.in" className="text-sand-500 hover:text-indigo-950">
            Legal inquiries: legal@dakshata.in
          </a>
        </div>
      </div>
    </div>
  );
}

