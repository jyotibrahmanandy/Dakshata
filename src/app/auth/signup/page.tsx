'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DakshataLogo } from '@/components/layout/DakshataLogo';
import { useApp } from '@/context/AppContext';
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, name);
    // Route to onboarding questionnaire immediately after signup!
    router.push('/auth/onboarding');
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <DakshataLogo size="lg" showTagline={true} />
        </Link>
        <h2 className="mt-4 font-serif font-extrabold text-2xl text-indigo-950 dark:text-white">
          Create Your Free Dakshata Account
        </h2>
        <p className="mt-1 text-xs text-sand-500">
          Unlock personalized course recommendations, wishlist alerts, and career roadmaps.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-indigo-900/60 py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-sand-200 dark:border-indigo-800 space-y-6">
          <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full h-10 pl-9 pr-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-10 pl-9 pr-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full h-10 pl-9 pr-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] text-sand-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero spam guarantee. 100% free account.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Includes access to Skill-Gap Diagnostic tool.</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Continue to Career Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-sand-500">
            Already registered?{' '}
            <Link href="/auth/login" className="font-bold text-saffron-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
