'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DakshataLogo } from '@/components/layout/DakshataLogo';
import { useApp } from '@/context/AppContext';
import { Mail, Lock, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, addToast } = useApp();
  const [email, setEmail] = useState('aarav.sharma@dakshata.in');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push('/dashboard');
  };

  const handleGoogleLogin = () => {
    login('learner@gmail.com', 'Google Student');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <DakshataLogo size="lg" showTagline={true} />
        </Link>
        <h2 className="mt-4 font-serif font-extrabold text-2xl text-indigo-950 dark:text-white">
          Sign In to Your Learning Account
        </h2>
        <p className="mt-1 text-xs text-sand-500">
          Track enrolled courses, certificates, and personalized recommendation scores.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-indigo-900/60 py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-sand-200 dark:border-indigo-800 space-y-6">
          
          {/* Quick Demo Access Button */}
          <button
            onClick={() => {
              login('aarav.sharma@dakshata.in', 'Aarav Sharma');
              router.push('/dashboard');
            }}
            className="w-full py-2.5 px-4 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>1-Click Sign In as Demo Student</span>
          </button>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2.5 px-4 bg-white dark:bg-indigo-950 border border-sand-300 dark:border-indigo-700 rounded-xl text-xs font-bold text-indigo-950 dark:text-white hover:bg-sand-50 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-sand-200 dark:border-indigo-800 w-full" />
            <span className="bg-white dark:bg-indigo-900 px-3 text-[10px] text-sand-400 uppercase font-bold absolute">
              Or with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
                  className="w-full h-10 pl-9 pr-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-sand-700 dark:text-sand-300">Password</label>
                <a href="#" className="text-[11px] text-saffron-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Sign In to Dakshata</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-sand-500">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-bold text-saffron-600 hover:underline">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
