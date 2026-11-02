'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DakshataLogo, TraditionalDivider } from './DakshataLogo';
import { useApp } from '@/context/AppContext';
import { Mail, CheckCircle, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address to subscribe', 'warning');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed Successfully!', 'You will receive weekly discount alerts and newly added free courses.', 'success');
  };

  return (
    <footer className="bg-indigo-950 text-sand-200 border-t border-indigo-900 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle traditional pattern watermark */}
      <div className="absolute inset-0 bg-lotus-pattern opacity-10 pointer-events-none" />

      {/* Traditional Indian Border Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <TraditionalDivider className="my-0 opacity-80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Col 1: Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <DakshataLogo variant="dark" size="lg" showTagline={true} />
            <p className="text-sand-300 text-sm leading-relaxed max-w-sm">
              <strong className="text-white">Dakshata</strong> (दक्षता) means skill, competence, and expertise.
              We are an independent course catalog and recommendation platform connecting Indian students and professionals to practical trades, IT certifications, and verified credentials.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-saffron-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-saffron-400" />
              <span>Independent & Unbiased • 0% Course Hosting Markup</span>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-4">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Get Weekly Course Deals & Free Govt Alerts
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>You are subscribed to Dakshata alerts!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="flex-1 h-10 px-3 bg-indigo-900/80 text-white text-xs rounded-l-lg border border-indigo-800 focus:outline-none focus:border-saffron-400 placeholder:text-indigo-400"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 text-xs font-bold rounded-r-lg transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: IT Certifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-indigo-800 pb-2">
              IT Certifications
            </h4>
            <ul className="space-y-2 text-xs text-sand-300">
              <li>
                <Link href="/catalog?category=Cloud+%26+DevOps" className="hover:text-saffron-400 transition-colors">
                  AWS Solutions Architect
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Cybersecurity" className="hover:text-saffron-400 transition-colors">
                  CompTIA Security+ Prep
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Data+%26+AI" className="hover:text-saffron-400 transition-colors">
                  Google Data Analytics
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Web+%26+Software+Dev" className="hover:text-saffron-400 transition-colors">
                  React 19 & Next.js Guide
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Cloud+%26+DevOps" className="hover:text-saffron-400 transition-colors">
                  Docker & Kubernetes CKA
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Data+%26+AI" className="hover:text-saffron-400 transition-colors">
                  Microsoft Power BI (PL-300)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Trades */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-indigo-800 pb-2">
              Vocational Trades
            </h4>
            <ul className="space-y-2 text-xs text-sand-300">
              <li>
                <Link href="/catalog?category=Electrical+%26+Solar" className="hover:text-saffron-400 transition-colors">
                  PMKVY Certified Electrician
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Electrical+%26+Solar" className="hover:text-saffron-400 transition-colors">
                  Surya Mitra Solar PV Rooftop
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=CNC+%26+Manufacturing" className="hover:text-saffron-400 transition-colors">
                  CNC VMC Machine Operator
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=HVAC+%26+Refrigeration" className="hover:text-saffron-400 transition-colors">
                  RAC Split AC Field Technician
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Automotive+%26+EV+Tech" className="hover:text-saffron-400 transition-colors">
                  Electric Vehicle (EV) Battery Tech
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Welding+%26+Fabrication" className="hover:text-saffron-400 transition-colors">
                  TIG / 6G Pipe Welder (ASME)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-indigo-800 pb-2">
              Dakshata Platform
            </h4>
            <ul className="space-y-2 text-xs text-sand-300">
              <li>
                <Link href="/roadmap" className="hover:text-saffron-400 transition-colors">
                  Career Learning Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/skill-gap" className="hover:text-saffron-400 transition-colors text-saffron-300 font-semibold">
                  Skill-Gap Role Analyzer
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-saffron-400 transition-colors">
                  Side-by-Side Course Compare
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-saffron-400 transition-colors">
                  Career Guides & Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-saffron-400 transition-colors">
                  About Dakshata Mission
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-saffron-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-saffron-400 transition-colors text-saffron-400 font-bold">
                  Admin & Sync Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Box */}
        <div className="bg-indigo-900/50 rounded-xl p-4 border border-indigo-800 text-xs text-sand-300 mb-8 leading-relaxed">
          <p>
            <strong className="text-white font-semibold">Affiliate & Partner Disclosure:</strong> Dakshata does not host or conduct online or offline courses directly. We aggregate, analyze, compare, and recommend courses from providers including Coursera, edX, NPTEL/SWAYAM, Udemy, AWS Skill Builder, and Skill India. When you click through our partner links, we may receive an affiliate commission at no extra cost to you. This enables us to keep Dakshata completely free for all learners across India. All ratings, curriculum breakdowns, and recommendation match scores are mathematically calculated based on objective learning criteria.
          </p>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-indigo-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-400">
          <p>© 2026 Dakshata Learning Technologies. All rights reserved. Skill is your power.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
