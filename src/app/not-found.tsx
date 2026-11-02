import React from 'react';
import Link from 'next/link';
import { DakshataLogo } from '@/components/layout/DakshataLogo';
import { Compass, Search, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-50 dark:bg-indigo-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <DakshataLogo size="lg" showTagline={true} />

        <div className="space-y-2">
          <span className="font-serif font-extrabold text-7xl text-saffron-500 block">
            404
          </span>
          <h1 className="font-serif font-bold text-2xl text-indigo-950 dark:text-white">
            Course or Page Not Found
          </h1>
          <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm leading-relaxed">
            The page you are looking for may have been relocated or updated in our catalog. Let’s get you back on track to mastering in-demand skills.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-saffron-500 hover:text-indigo-950 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/catalog"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-saffron-500 text-indigo-950 font-bold text-xs hover:bg-saffron-600 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>Browse 60+ Courses</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
