'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { UNIQUE_COURSES } from '@/data/allCourses';
import { CATEGORIES } from '@/data/categories';
import { PROVIDERS } from '@/data/providers';
import { Course, CourseLevel, FilterState } from '@/types';
import { CourseCard } from '@/components/courses/CourseCard';
import { useApp } from '@/context/AppContext';
import { calculateRecommendationScore } from '@/lib/recommendation';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  ChevronDown,
  Star,
  Award,
  Check,
} from 'lucide-react';

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, formatPrice } = useApp();

  // Initial params
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialOnlyFree = searchParams.get('onlyFree') === 'true';
  const initialLevel = searchParams.get('level') as CourseLevel | null;
  const initialBudget = Number(searchParams.get('budget')) || 10000;
  const initialLanguage = searchParams.get('language') || '';

  // Filter state
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory && initialCategory !== 'All' ? [initialCategory] : []
  );
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<CourseLevel[]>(
    initialLevel ? [initialLevel] : []
  );
  const [onlyFree, setOnlyFree] = useState<boolean>(initialOnlyFree);
  const [withCertificate, setWithCertificate] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(initialBudget);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    initialLanguage && initialLanguage !== 'All' ? [initialLanguage] : []
  );
  const [durationCategory, setDurationCategory] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [sortBy, setSortBy] = useState<
    'recommended' | 'rating' | 'price_low' | 'price_high' | 'value' | 'duration'
  >('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Filter courses logic
  const filteredCourses = useMemo(() => {
    return UNIQUE_COURSES.filter((course) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchDesc = course.description.toLowerCase().includes(q);
        const matchTag = course.tags.some((t) => t.toLowerCase().includes(q));
        const matchCat = course.category_name?.toLowerCase().includes(q);
        const matchProvider = course.provider.toLowerCase().includes(q);
        const matchInstructor = course.instructor?.toLowerCase().includes(q) || course.institution?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchTag && !matchCat && !matchProvider && !matchInstructor) {
          return false;
        }
      }

      // 2. Categories
      if (selectedCategories.length > 0) {
        if (!course.category_name || !selectedCategories.includes(course.category_name)) {
          return false;
        }
      }

      // 3. Providers
      if (selectedProviders.length > 0) {
        if (!selectedProviders.includes(course.provider)) {
          return false;
        }
      }

      // 4. Levels
      if (selectedLevels.length > 0) {
        if (!selectedLevels.includes(course.level) && course.level !== 'All Levels') {
          return false;
        }
      }

      // 5. Free only
      if (onlyFree && !course.is_free && course.price > 0) {
        return false;
      }

      // 6. Max Price
      if (!onlyFree && course.price > maxPrice) {
        return false;
      }

      // 7. Certificate
      if (withCertificate && !course.certificate) {
        return false;
      }

      // 8. Min Rating
      if (minRating > 0 && course.rating < minRating) {
        return false;
      }

      // 9. Languages
      if (selectedLanguages.length > 0) {
        if (!selectedLanguages.includes(course.language) && course.language !== 'Bilingual') {
          return false;
        }
      }

      // 10. Duration
      if (durationCategory === 'short' && course.duration_hours > 20) return false;
      if (durationCategory === 'medium' && (course.duration_hours < 20 || course.duration_hours > 50)) return false;
      if (durationCategory === 'long' && course.duration_hours < 50) return false;

      return true;
    });
  }, [
    searchQuery,
    selectedCategories,
    selectedProviders,
    selectedLevels,
    onlyFree,
    maxPrice,
    withCertificate,
    minRating,
    selectedLanguages,
    durationCategory,
  ]);

  // Sort courses
  const sortedCourses = useMemo(() => {
    const list = [...filteredCourses];
    switch (sortBy) {
      case 'recommended':
        if (!user) return list;
        return list.sort((a, b) => {
          const scoreA = calculateRecommendationScore(a, user.preferences).total_score;
          const scoreB = calculateRecommendationScore(b, user.preferences).total_score;
          return scoreB - scoreA;
        });
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating || b.rating_count - a.rating_count);
      case 'value':
        return list.sort((a, b) => (b.best_value_score || 0) - (a.best_value_score || 0));
      case 'price_low':
        return list.sort((a, b) => a.price - b.price);
      case 'price_high':
        return list.sort((a, b) => b.price - a.price);
      case 'duration':
        return list.sort((a, b) => a.duration_hours - b.duration_hours);
      default:
        return list;
    }
  }, [filteredCourses, sortBy, user]);

  // Paginated slice
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedCourses.slice(startIndex, startIndex + pageSize);
  }, [sortedCourses, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedCourses.length / pageSize) || 1;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedProviders([]);
    setSelectedLevels([]);
    setOnlyFree(false);
    setWithCertificate(false);
    setMaxPrice(10000);
    setMinRating(0);
    setSelectedLanguages([]);
    setDurationCategory('all');
    setSortBy('recommended');
    setCurrentPage(1);
  };

  const toggleCategory = (catName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catName) ? prev.filter((c) => c !== catName) : [...prev, catName]
    );
    setCurrentPage(1);
  };

  const toggleProvider = (pName: string) => {
    setSelectedProviders((prev) =>
      prev.includes(pName) ? prev.filter((p) => p !== pName) : [...prev, pName]
    );
    setCurrentPage(1);
  };

  const toggleLevel = (lvl: CourseLevel) => {
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
    setCurrentPage(1);
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
    setCurrentPage(1);
  };

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Heading */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-sand-500 mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="font-semibold text-indigo-950 dark:text-sand-100">Course Catalog</span>
          </div>
          <h1 className="font-serif font-extrabold text-3xl text-indigo-950 dark:text-white">
            Explore All Courses & Certifications
          </h1>
          <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm mt-1">
            Browse 60+ verified programs across IT, Cloud, AI, and Practical Trades with cross-platform price comparison.
          </p>
        </div>

        {/* Catalog Main Layout (Sidebar Filters + Results Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* ================= DESKTOP FILTER SIDEBAR ================= */}
          <aside className="hidden lg:block lg:col-span-1 bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 p-5 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200 dark:border-indigo-800">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-950 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-saffron-500" />
                <span>Filters</span>
              </div>
              <button
                onClick={resetAllFilters}
                className="text-xs text-saffron-600 dark:text-saffron-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* 1. Quick Free Toggle */}
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                  100% Free Tuition Only
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                  SWAYAM, NPTEL & Skill India
                </span>
              </div>
              <input
                type="checkbox"
                checked={onlyFree}
                onChange={(e) => {
                  setOnlyFree(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </div>

            {/* 2. Price Range Slider */}
            {!onlyFree && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-indigo-950 dark:text-sand-100">Max Budget</span>
                  <span className="text-saffron-600 dark:text-saffron-400 font-bold">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-saffron-500 h-1.5 bg-sand-200 dark:bg-indigo-800 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* 3. Categories Checkboxes */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-indigo-950 dark:text-sand-100 block">
                Category
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between hover:text-saffron-600 cursor-pointer select-none py-0.5 text-sand-700 dark:text-sand-300"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => toggleCategory(cat.name)}
                        className="w-3.5 h-3.5 accent-saffron-500 rounded"
                      />
                      <span className="truncate max-w-[140px]">{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-sand-400">{cat.item_count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Provider Checkboxes */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-indigo-950 dark:text-sand-100 block">
                Provider
              </span>
              <div className="space-y-1.5 text-xs text-sand-700 dark:text-sand-300">
                {PROVIDERS.map((prov) => (
                  <label
                    key={prov.id}
                    className="flex items-center justify-between hover:text-saffron-600 cursor-pointer select-none py-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedProviders.includes(prov.name)}
                        onChange={() => toggleProvider(prov.name)}
                        className="w-3.5 h-3.5 accent-saffron-500 rounded"
                      />
                      <span>{prov.name}</span>
                    </div>
                    <span className="text-[10px] text-sand-400">{prov.courses_count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Skill Level */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-indigo-950 dark:text-sand-100 block">
                Skill Level
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {(['Beginner', 'Intermediate', 'Advanced'] as CourseLevel[]).map((lvl) => {
                  const isSelected = selectedLevels.includes(lvl);
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => toggleLevel(lvl)}
                      className={`px-2.5 py-1.5 rounded-lg border text-left font-medium transition-colors ${
                        isSelected
                          ? 'bg-saffron-500 text-indigo-950 border-saffron-500 font-bold'
                          : 'bg-sand-50 dark:bg-indigo-950/60 border-sand-200 dark:border-indigo-800 text-sand-700 dark:text-sand-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Language */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-indigo-950 dark:text-sand-100 block">
                Language
              </span>
              <div className="flex flex-wrap gap-1 text-xs">
                {['English', 'Hindi', 'Tamil', 'Telugu', 'Bilingual'].map((lang) => {
                  const isSelected = selectedLanguages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                        isSelected
                          ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 font-bold border-indigo-950'
                          : 'bg-sand-50 dark:bg-indigo-950/60 border-sand-200 dark:border-indigo-800 text-sand-700 dark:text-sand-300'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Minimum Rating */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-indigo-950 dark:text-sand-100 block">
                Minimum Rating
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                {[4.5, 4.7, 4.8].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => {
                      setMinRating(minRating === starVal ? 0 : starVal);
                      setCurrentPage(1);
                    }}
                    className={`flex-1 py-1 rounded-lg border text-center font-bold flex items-center justify-center gap-1 transition-colors ${
                      minRating === starVal
                        ? 'bg-saffron-500 text-indigo-950 border-saffron-500'
                        : 'bg-sand-50 dark:bg-indigo-950/60 border-sand-200 dark:border-indigo-800 text-sand-700 dark:text-sand-300'
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>{starVal}+</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 8. Certificate Included */}
            <div className="pt-2 border-t border-sand-100 dark:border-indigo-800/80">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-indigo-950 dark:text-sand-200 select-none">
                <input
                  type="checkbox"
                  checked={withCertificate}
                  onChange={(e) => {
                    setWithCertificate(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-3.5 h-3.5 accent-saffron-500 rounded"
                />
                <Award className="w-4 h-4 text-saffron-500" />
                <span>Certificate Included</span>
              </label>
            </div>
          </aside>

          {/* ================= MAIN RESULTS SECTION ================= */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Search Input & Sort Toolbar */}
            <div className="bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-sand-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Filter by keyword: 'AWS', 'Electrician', 'Python', 'Solar'..."
                  className="w-full h-10 pl-10 pr-4 bg-sand-50 dark:bg-indigo-950/80 border border-sand-200 dark:border-indigo-800 rounded-xl text-xs text-indigo-950 dark:text-white placeholder:text-sand-400 focus:outline-none focus:border-saffron-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-400 hover:text-indigo-950"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Controls (Sort & View Layout) */}
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-sand-100 dark:bg-indigo-800 rounded-xl text-xs font-bold text-indigo-950 dark:text-white"
                >
                  <Filter className="w-3.5 h-3.5 text-saffron-500" />
                  <span>Filters</span>
                </button>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-sand-500 whitespace-nowrap hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="h-10 px-3 bg-sand-50 dark:bg-indigo-950/80 border border-sand-200 dark:border-indigo-800 rounded-xl text-xs font-semibold text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                  >
                    <option value="recommended">⭐ Recommended for Me</option>
                    <option value="value">Best Value (Rating / ₹)</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="duration">Shortest Duration</option>
                  </select>
                </div>

                {/* Grid / List Toggle */}
                <div className="flex items-center bg-sand-100 dark:bg-indigo-800/80 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-indigo-950 text-indigo-950 dark:text-white shadow-xs font-bold'
                        : 'text-sand-500 hover:text-indigo-950'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-indigo-950 text-indigo-950 dark:text-white shadow-xs font-bold'
                        : 'text-sand-500 hover:text-indigo-950'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {(selectedCategories.length > 0 ||
              selectedProviders.length > 0 ||
              selectedLevels.length > 0 ||
              onlyFree ||
              selectedLanguages.length > 0) && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[11px] text-sand-500 font-semibold mr-1">Active filters:</span>
                {onlyFree && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    Free Tuition
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyFree(false)} />
                  </span>
                )}
                {selectedCategories.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sand-200 dark:bg-indigo-800 text-indigo-950 dark:text-sand-200 text-[11px]"
                  >
                    {c}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleCategory(c)} />
                  </span>
                ))}
                {selectedProviders.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sand-200 dark:bg-indigo-800 text-indigo-950 dark:text-sand-200 text-[11px]"
                  >
                    {p}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleProvider(p)} />
                  </span>
                ))}
                {selectedLevels.map((lvl) => (
                  <span
                    key={lvl}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sand-200 dark:bg-indigo-800 text-indigo-950 dark:text-sand-200 text-[11px]"
                  >
                    {lvl}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleLevel(lvl)} />
                  </span>
                ))}
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-saffron-600 dark:text-saffron-400 font-bold hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Count Header */}
            <div className="flex items-center justify-between text-xs text-sand-600 dark:text-sand-400">
              <p>
                Showing <strong className="text-indigo-950 dark:text-white">{sortedCourses.length}</strong> verified courses
              </p>
              {user && (
                <div className="flex items-center gap-1 text-saffron-600 dark:text-saffron-400 font-semibold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ranked by your profile goals</span>
                </div>
              )}
            </div>

            {/* Courses Display Grid / List */}
            {paginatedCourses.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'flex flex-col space-y-4'
                }
              >
                {paginatedCourses.map((course) => {
                  const recommendation = user
                    ? calculateRecommendationScore(course, user.preferences)
                    : undefined;

                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      recommendation={recommendation}
                      showCompare={true}
                    />
                  );
                })}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white dark:bg-indigo-900/40 rounded-2xl border border-sand-200 dark:border-indigo-800 p-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-sand-100 dark:bg-indigo-800 flex items-center justify-center text-saffron-500">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white">
                  No courses matched your exact filters
                </h3>
                <p className="text-sand-500 text-xs sm:text-sm max-w-md mx-auto">
                  Try broadening your search query, increasing your budget slider, or clearing some category filters.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl border border-sand-300 dark:border-indigo-800 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sand-100 dark:hover:bg-indigo-800 text-indigo-950 dark:text-white"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-saffron-500 text-indigo-950 shadow-sm'
                          : 'bg-white dark:bg-indigo-900 border border-sand-300 dark:border-indigo-800 text-indigo-950 dark:text-white hover:bg-sand-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-xl border border-sand-300 dark:border-indigo-800 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sand-100 dark:hover:bg-indigo-800 text-indigo-950 dark:text-white"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-medium">Loading Dakshata Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}

