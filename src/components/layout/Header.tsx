'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DakshataLogo } from './DakshataLogo';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Heart,
  Scale,
  User,
  ChevronDown,
  Menu,
  X,
  Compass,
  BookmarkCheck,
  Award,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, wishlist, compareList, isAuthenticated, logout } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-sand-50/95 dark:bg-indigo-950/95 backdrop-blur-md border-b border-sand-200 dark:border-indigo-900 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <DakshataLogo size="md" showTagline={true} />
          </Link>

          {/* Wide E-Commerce Style Search Bar with Category Dropdown */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-2xl items-center relative"
          >
            <div className="flex w-full items-center bg-white dark:bg-indigo-900/50 rounded-full border border-sand-300 dark:border-indigo-800 shadow-sm focus-within:ring-2 focus-within:ring-saffron-500 focus-within:border-saffron-500 overflow-hidden transition-all">
              {/* Category selector button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="h-11 px-3.5 bg-sand-100 dark:bg-indigo-900 text-xs font-semibold text-indigo-900 dark:text-sand-100 border-r border-sand-200 dark:border-indigo-800 flex items-center gap-1.5 hover:bg-sand-200 dark:hover:bg-indigo-800 transition-colors whitespace-nowrap"
                >
                  <span className="truncate max-w-[110px]">{selectedCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
                </button>

                {categoryDropdownOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-indigo-900 border border-sand-200 dark:border-indigo-800 rounded-xl shadow-xl py-2 z-50 text-xs max-h-72 overflow-y-auto"
                    onMouseLeave={() => setCategoryDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('All');
                        setCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-sand-100 dark:hover:bg-indigo-800 font-semibold text-indigo-900 dark:text-sand-100"
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setCategoryDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-1.5 hover:bg-sand-100 dark:hover:bg-indigo-800 text-indigo-800 dark:text-sand-200"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 60+ courses: 'AWS Cloud', 'Electrician', 'Python', 'CNC', 'Free'..."
                  className="w-full h-11 pl-4 pr-10 bg-transparent text-sm text-indigo-950 dark:text-sand-100 placeholder:text-sand-500 dark:placeholder:text-indigo-400 focus:outline-none"
                />
              </div>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="h-11 px-5 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold transition-colors flex items-center justify-center gap-1.5"
                title="Search Catalog"
              >
                <Search className="w-4 h-4 text-indigo-950" />
                <span className="text-xs font-semibold">Search</span>
              </button>
            </div>
          </form>

          {/* Right Header Controls (Compare, Wishlist, Account) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Compare Badge */}
            <Link
              href="/compare"
              className="relative p-2.5 rounded-full hover:bg-sand-200/70 dark:hover:bg-indigo-900 text-indigo-800 dark:text-sand-100 transition-colors flex items-center justify-center group"
              title="Compare Courses (Side by Side)"
            >
              <Scale className="w-5 h-5 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-saffron-500 text-indigo-950 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-bounce">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist Badge */}
            <Link
              href="/dashboard?tab=wishlist"
              className="relative p-2.5 rounded-full hover:bg-sand-200/70 dark:hover:bg-indigo-900 text-indigo-800 dark:text-sand-100 transition-colors flex items-center justify-center group"
              title="Saved Courses & Wishlist"
            >
              <Heart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Profile Dropdown / Login */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-sand-300 dark:border-indigo-800 hover:border-saffron-500 bg-white dark:bg-indigo-900 transition-all"
                >
                  <img
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-saffron-500"
                  />
                  <div className="hidden lg:flex flex-col text-left leading-tight">
                    <span className="text-xs font-bold text-indigo-950 dark:text-white truncate max-w-[100px]">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-saffron-600 dark:text-saffron-400 font-medium">
                      Student
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-indigo-900 rounded-xl shadow-xl border border-sand-200 dark:border-indigo-800 py-2 z-50 text-sm"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-sand-100 dark:border-indigo-800">
                      <p className="font-bold text-indigo-950 dark:text-sand-100">{user.name}</p>
                      <p className="text-xs text-sand-500 dark:text-sand-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-sand-100 dark:hover:bg-indigo-800 text-indigo-900 dark:text-sand-100 text-xs font-medium"
                    >
                      <Compass className="w-4 h-4 text-saffron-500" />
                      Student Dashboard
                    </Link>

                    <Link
                      href="/dashboard?tab=my_courses"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-sand-100 dark:hover:bg-indigo-800 text-indigo-900 dark:text-sand-100 text-xs font-medium"
                    >
                      <BookmarkCheck className="w-4 h-4 text-saffron-500" />
                      My Enrolled Courses
                    </Link>

                    <Link
                      href="/dashboard?tab=certificates"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-sand-100 dark:hover:bg-indigo-800 text-indigo-900 dark:text-sand-100 text-xs font-medium"
                    >
                      <Award className="w-4 h-4 text-saffron-500" />
                      My Certificates
                    </Link>

                    <Link
                      href="/skill-gap"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-sand-100 dark:hover:bg-indigo-800 text-indigo-900 dark:text-sand-100 text-xs font-medium"
                    >
                      <Sparkles className="w-4 h-4 text-saffron-500" />
                      Skill Gap Analyzer
                    </Link>

                    <div className="border-t border-sand-100 dark:border-indigo-800 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-700 hover:bg-indigo-800 text-white font-medium text-xs shadow-sm transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Log In</span>
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-indigo-900 dark:text-sand-100 hover:bg-sand-200 dark:hover:bg-indigo-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Secondary Navigation Bar */}
      <nav className="hidden md:block bg-indigo-900 dark:bg-indigo-950 text-white border-t border-indigo-800/60 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 text-xs font-medium">
            <div className="flex items-center space-x-7">
              <Link
                href="/catalog"
                className="flex items-center gap-1.5 hover:text-saffron-400 transition-colors py-2 font-semibold text-saffron-300"
              >
                <Compass className="w-3.5 h-3.5" />
                Explore All Courses (60+)
              </Link>

              <Link
                href="/catalog?category=Cloud+%26+DevOps"
                className="hover:text-saffron-400 transition-colors py-2"
              >
                IT Certifications
              </Link>

              <Link
                href="/catalog?category=Electrical+%26+Solar"
                className="hover:text-saffron-400 transition-colors py-2"
              >
                Professional Trades
              </Link>

              <Link
                href="/catalog?onlyFree=true"
                className="inline-flex items-center gap-1 hover:text-saffron-400 transition-colors py-2 text-emerald-400 font-semibold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Free Programs (SWAYAM/NPTEL)
              </Link>

              <Link
                href="/roadmap"
                className="hover:text-saffron-400 transition-colors py-2"
              >
                Career Roadmaps
              </Link>

              <Link
                href="/skill-gap"
                className="hover:text-saffron-400 transition-colors py-2 text-saffron-300 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Skill Gap Analyzer
              </Link>

              <Link
                href="/compare"
                className="hover:text-saffron-400 transition-colors py-2"
              >
                Compare Courses
              </Link>

              <Link
                href="/blog"
                className="hover:text-saffron-400 transition-colors py-2"
              >
                Career Guides
              </Link>
            </div>

            <div className="flex items-center gap-2 text-indigo-300 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>Affiliate Verified Prices</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sand-50 dark:bg-indigo-950 border-b border-sand-300 dark:border-indigo-900 px-4 pt-3 pb-6 space-y-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="flex-1 h-10 px-3 bg-white dark:bg-indigo-900 text-sm border border-sand-300 dark:border-indigo-800 rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="h-10 px-4 bg-saffron-500 text-indigo-950 font-bold rounded-r-lg"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col space-y-2 text-sm font-medium text-indigo-950 dark:text-sand-100">
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sand-200 dark:hover:bg-indigo-900 flex items-center justify-between"
            >
              <span>Explore All Courses (60+)</span>
              <span className="text-xs bg-saffron-500/20 text-saffron-600 px-2 py-0.5 rounded-full font-bold">New</span>
            </Link>

            <Link
              href="/catalog?category=Cloud+%26+DevOps"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sand-200 dark:hover:bg-indigo-900"
            >
              IT Certifications
            </Link>

            <Link
              href="/catalog?category=Electrical+%26+Solar"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sand-200 dark:hover:bg-indigo-900"
            >
              Professional Trades (Electrician, Solar, CNC)
            </Link>

            <Link
              href="/catalog?onlyFree=true"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sand-200 dark:hover:bg-indigo-900 text-emerald-600 font-bold"
            >
              100% Free Govt Courses (SWAYAM & NPTEL)
            </Link>

            <Link
              href="/roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sand-200 dark:hover:bg-indigo-900"
            >
              Career Roadmaps
            </Link>

            <Link
              href="/skill-gap"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sand-200 dark:hover:bg-indigo-900 text-saffron-600 font-bold"
            >
              Skill Gap Analyzer
            </Link>

            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sand-200 dark:hover:bg-indigo-900"
            >
              Compare Courses ({compareList.length}/3)
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sand-200 dark:hover:bg-indigo-900"
            >
              Student Dashboard
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sand-200 dark:hover:bg-indigo-900 text-saffron-500 font-semibold"
            >
              Admin & Sync Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
