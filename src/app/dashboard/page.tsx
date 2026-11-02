'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UNIQUE_COURSES } from '@/data/allCourses';
import { Course, EnrolledCourseProgress } from '@/types';
import { CourseCard } from '@/components/courses/CourseCard';
import { calculateRecommendationScore } from '@/lib/recommendation';
import {
  Compass,
  BookmarkCheck,
  Award,
  Heart,
  Settings,
  Bell,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  Upload,
} from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'overview';

  const {
    user,
    wishlist,
    enrollments,
    updateCourseProgress,
    markCourseCompleted,
    updatePreferences,
    currency,
    toggleCurrency,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'my_courses' | 'wishlist' | 'certificates' | 'settings' | 'alerts'
  >(initialTab);

  const [courseSubTab, setCourseSubTab] = useState<'in_progress' | 'completed' | 'saved'>('in_progress');

  // New certificate form state
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertOrg, setNewCertOrg] = useState('');
  const [newCertUrl, setNewCertUrl] = useState('');
  const [showCertModal, setShowCertModal] = useState(false);

  // Settings profile form state
  const [profileName, setProfileName] = useState(user?.name || 'Aarav Sharma');
  const [profileRole, setProfileRole] = useState(user?.target_role || 'Cloud Architect & DevOps Engineer');
  const [profileBudget, setProfileBudget] = useState(user?.preferences.budget_max || 4000);
  const [profileHours, setProfileHours] = useState(user?.preferences.weekly_hours || 10);

  // Wishlisted course items
  const wishlistedCourses = UNIQUE_COURSES.filter((c) => wishlist.includes(c.id));

  // Enrolled courses mapped
  const inProgressList = enrollments
    .filter((e) => e.status === 'in_progress')
    .map((e) => ({
      enrollment: e,
      course: UNIQUE_COURSES.find((c) => c.id === e.course_id),
    }))
    .filter((item): item is { enrollment: EnrolledCourseProgress; course: Course } => item.course !== undefined);

  const completedList = enrollments
    .filter((e) => e.status === 'completed')
    .map((e) => ({
      enrollment: e,
      course: UNIQUE_COURSES.find((c) => c.id === e.course_id),
    }))
    .filter((item): item is { enrollment: EnrolledCourseProgress; course: Course } => item.course !== undefined);

  const savedList = enrollments
    .filter((e) => e.status === 'saved')
    .map((e) => ({
      enrollment: e,
      course: UNIQUE_COURSES.find((c) => c.id === e.course_id),
    }))
    .filter((item): item is { enrollment: EnrolledCourseProgress; course: Course } => item.course !== undefined);

  // Recommended courses for user
  const topRecommendations = user
    ? UNIQUE_COURSES.map((c) => calculateRecommendationScore(c, user.preferences))
        .sort((a, b) => b.total_score - a.total_score)
        .slice(0, 4)
    : [];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      budget_max: profileBudget,
      weekly_hours: profileHours,
      target_role: profileRole,
    });
    addToast('Profile Updated', 'Your settings and recommendation criteria have been saved', 'success');
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertTitle) return;
    addToast('Certificate Logged!', `Recorded credential: ${newCertTitle}`, 'success');
    setShowCertModal(false);
    setNewCertTitle('');
    setNewCertOrg('');
    setNewCertUrl('');
  };

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Profile Header Banner */}
        <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-lotus-pattern opacity-10 pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
              alt={user?.name || 'Student'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-saffron-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-white">
                  Namaste, {user?.name ? user.name.split(' ')[0] : 'Learner'}!
                </h1>
                <span className="text-[10px] bg-saffron-500 text-indigo-950 font-bold px-2 py-0.5 rounded-full">
                  Active Student
                </span>
              </div>
              <p className="text-sand-300 text-xs sm:text-sm mt-0.5">
                Target Role: <strong className="text-white">{user?.target_role || 'Cloud Architect'}</strong> • {user?.location || 'India'}
              </p>
              <p className="text-[11px] text-saffron-300 mt-1 font-medium">
                Goal: "{user?.preferences.goal || 'Master in-demand IT and trade skills'}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <Link
              href="/skill-gap"
              className="px-4 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skill-Gap Analyzer</span>
            </Link>

            <Link
              href="/catalog"
              className="px-4 py-2.5 rounded-xl bg-indigo-800 hover:bg-indigo-700 text-white font-semibold text-xs border border-indigo-700 transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-sand-200 dark:border-indigo-800 pb-4 mb-8 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            <Compass className="w-4 h-4 text-saffron-500" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('my_courses')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'my_courses'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            <BookmarkCheck className="w-4 h-4 text-saffron-500" />
            <span>My Enrolled Courses ({enrollments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            <Heart className="w-4 h-4 text-red-500" />
            <span>Saved Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'certificates'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            <Award className="w-4 h-4 text-saffron-500" />
            <span>Certificates ({completedList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'alerts'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            <Bell className="w-4 h-4 text-saffron-500" />
            <span>Price-Drop Alerts</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950 shadow-sm'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            <Settings className="w-4 h-4 text-saffron-500" />
            <span>Profile & Settings</span>
          </button>
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl p-5 border border-sand-200 dark:border-indigo-800 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand-500 tracking-wider block">
                  Courses In Progress
                </span>
                <span className="font-serif font-extrabold text-3xl text-indigo-950 dark:text-white mt-1 block">
                  {inProgressList.length}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                  Active study sessions
                </span>
              </div>

              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl p-5 border border-sand-200 dark:border-indigo-800 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand-500 tracking-wider block">
                  Completed & Verified
                </span>
                <span className="font-serif font-extrabold text-3xl text-emerald-600 mt-1 block">
                  {completedList.length}
                </span>
                <span className="text-[11px] text-sand-500 font-medium mt-1 block">
                  Certificates logged
                </span>
              </div>

              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl p-5 border border-sand-200 dark:border-indigo-800 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand-500 tracking-wider block">
                  Study Hours Committed
                </span>
                <span className="font-serif font-extrabold text-3xl text-saffron-600 dark:text-saffron-400 mt-1 block">
                  {user?.preferences.weekly_hours || 10}h
                </span>
                <span className="text-[11px] text-sand-500 font-medium mt-1 block">
                  Per week target
                </span>
              </div>

              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl p-5 border border-sand-200 dark:border-indigo-800 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand-500 tracking-wider block">
                  Role Readiness
                </span>
                <span className="font-serif font-extrabold text-3xl text-indigo-700 dark:text-indigo-300 mt-1 block">
                  75%
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                  On track for {user?.target_role.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Currently Active Courses */}
            {inProgressList.length > 0 && (
              <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white flex items-center justify-between">
                  <span>Continue Your Studies</span>
                  <button
                    onClick={() => {
                      setActiveTab('my_courses');
                      setCourseSubTab('in_progress');
                    }}
                    className="text-xs font-semibold text-saffron-600 hover:underline"
                  >
                    View All Enrolled
                  </button>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inProgressList.map(({ enrollment, course }) => (
                    <div
                      key={course.id}
                      className="p-4 rounded-2xl border border-sand-200 dark:border-indigo-800 bg-sand-50/60 dark:bg-indigo-950/60 flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-12 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-saffron-600 block">
                            {course.provider}
                          </span>
                          <h4 className="font-serif font-bold text-xs text-indigo-950 dark:text-white line-clamp-1">
                            {course.title}
                          </h4>
                          <span className="text-[11px] text-sand-500">
                            Progress: {enrollment.progress_percent}%
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 bg-sand-200 dark:bg-indigo-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-saffron-500 rounded-full"
                          style={{ width: `${enrollment.progress_percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <a
                          href={course.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-indigo-700 dark:text-saffron-400 hover:underline flex items-center gap-1"
                        >
                          <span>Resume on {course.provider}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => markCourseCompleted(course.id)}
                          className="text-[11px] font-semibold text-emerald-600 hover:underline"
                        >
                          Mark Complete ✓
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Personalized Recommendations Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Personalized for Your Career Goal
                  </span>
                  <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white mt-0.5">
                    Highest Scoring Matches
                  </h3>
                </div>
                <Link href="/catalog" className="text-xs font-bold text-indigo-700 dark:text-saffron-400 hover:underline">
                  View full catalog
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topRecommendations.map((rec) => (
                  <CourseCard
                    key={rec.course.id}
                    course={rec.course}
                    recommendation={rec}
                    showCompare={true}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MY COURSES ================= */}
        {activeTab === 'my_courses' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-sand-200 dark:border-indigo-800 pb-3 text-xs font-bold">
              <button
                onClick={() => setCourseSubTab('in_progress')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  courseSubTab === 'in_progress'
                    ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950'
                    : 'text-sand-600 hover:text-indigo-950'
                }`}
              >
                In Progress ({inProgressList.length})
              </button>
              <button
                onClick={() => setCourseSubTab('completed')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  courseSubTab === 'completed'
                    ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950'
                    : 'text-sand-600 hover:text-indigo-950'
                }`}
              >
                Completed & Certificates ({completedList.length})
              </button>
              <button
                onClick={() => setCourseSubTab('saved')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  courseSubTab === 'saved'
                    ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950'
                    : 'text-sand-600 hover:text-indigo-950'
                }`}
              >
                Saved for Later ({savedList.length})
              </button>
            </div>

            {/* In Progress Tab Content */}
            {courseSubTab === 'in_progress' && (
              <div className="space-y-4">
                {inProgressList.length > 0 ? (
                  inProgressList.map(({ enrollment, course }) => (
                    <div
                      key={course.id}
                      className="bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-20 h-14 object-cover rounded-xl"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-saffron-600 block">
                            {course.provider} • {course.level}
                          </span>
                          <Link href={`/course/${course.slug}`}>
                            <h4 className="font-serif font-bold text-sm text-indigo-950 dark:text-white hover:text-saffron-500">
                              {course.title}
                            </h4>
                          </Link>
                          {enrollment.notes && (
                            <p className="text-[11px] text-sand-500 italic mt-0.5">
                              "{enrollment.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Manual Progress Slider */}
                      <div className="flex items-center gap-4 w-full md:w-72">
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-sand-500">Progress</span>
                            <span className="font-bold text-indigo-950 dark:text-white">
                              {enrollment.progress_percent}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            value={enrollment.progress_percent}
                            onChange={(e) => updateCourseProgress(course.id, Number(e.target.value))}
                            className="w-full accent-saffron-500 h-1.5 bg-sand-200 dark:bg-indigo-800 rounded cursor-pointer"
                          />
                        </div>

                        <button
                          onClick={() => markCourseCompleted(course.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap shadow-xs"
                        >
                          Mark Complete ✓
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center text-xs text-sand-500">
                    No active in-progress courses. Browse the catalog to start a new learning journey!
                  </div>
                )}
              </div>
            )}

            {/* Completed SubTab Content */}
            {courseSubTab === 'completed' && (
              <div className="space-y-4">
                {completedList.length > 0 ? (
                  completedList.map(({ enrollment, course }) => (
                    <div
                      key={course.id}
                      className="bg-white dark:bg-indigo-900/60 rounded-2xl border border-sand-200 dark:border-indigo-800 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                            Completed & Certified
                          </span>
                          <h4 className="font-serif font-bold text-sm text-indigo-950 dark:text-white">
                            {course.title}
                          </h4>
                          <span className="text-[11px] text-sand-500">
                            Issued by {course.provider} on {enrollment.certificate_date || 'September 2026'}
                          </span>
                        </div>
                      </div>

                      {enrollment.certificate_url && (
                        <a
                          href={enrollment.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-indigo-950 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-saffron-500 hover:text-indigo-950 transition-colors"
                        >
                          <span>View Official Credential</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center text-xs text-sand-500">
                    No completed courses yet. Keep learning to log your credentials!
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: WISHLIST ================= */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-sand-200 dark:border-indigo-800 pb-3">
              <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white">
                Saved Wishlist ({wishlistedCourses.length} Courses)
              </h3>
              <span className="text-xs text-sand-500">
                Receive instant price-drop alerts on wishlisted courses
              </span>
            </div>

            {wishlistedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedCourses.map((c) => (
                  <CourseCard key={c.id} course={c} showCompare={true} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center text-xs text-sand-500 space-y-3">
                <Heart className="w-8 h-8 text-sand-300 mx-auto" />
                <p>Your wishlist is empty. Browse courses and tap the heart icon to save for later.</p>
                <Link
                  href="/catalog"
                  className="inline-block px-4 py-2 bg-saffron-500 text-indigo-950 font-bold rounded-xl"
                >
                  Browse Catalog
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: CERTIFICATES ================= */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-sand-200 dark:border-indigo-800 pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white">
                  Verified Certificates & Credentials
                </h3>
                <p className="text-xs text-sand-500 mt-0.5">
                  Record certificates from Coursera, NPTEL, edX, or Skill India to build your digital trade portfolio.
                </p>
              </div>
              <button
                onClick={() => setShowCertModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-saffron-500 text-indigo-950 font-bold text-xs rounded-xl shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Record Certificate</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-indigo-900/60 border border-sand-200 dark:border-indigo-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-saffron-50 text-saffron-600 dark:bg-saffron-950/60">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-bold text-saffron-600 uppercase">
                    Amazon Web Services
                  </span>
                  <h4 className="font-serif font-bold text-sm text-indigo-950 dark:text-white">
                    AWS Certified Cloud Practitioner (CLF-C02)
                  </h4>
                  <p className="text-[11px] text-sand-500">
                    Credential ID: AWS-CCP-84729104 • Verified Active
                  </p>
                  <a
                    href="https://aws.amazon.com/verification"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 dark:text-saffron-400 hover:underline pt-1"
                  >
                    <span>Verify Credential URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Record Certificate Modal */}
            {showCertModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white dark:bg-indigo-900 rounded-3xl max-w-md w-full p-6 border border-sand-200 dark:border-indigo-800 shadow-2xl space-y-4">
                  <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
                    Record Completed Certificate
                  </h3>
                  <form onSubmit={handleAddCertificate} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-sand-700 font-semibold mb-1">
                        Certificate / Exam Title
                      </label>
                      <input
                        type="text"
                        required
                        value={newCertTitle}
                        onChange={(e) => setNewCertTitle(e.target.value)}
                        placeholder="e.g. CompTIA Security+ or PMKVY Electrician"
                        className="w-full h-10 px-3 border border-sand-300 dark:border-indigo-700 rounded-lg bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sand-700 font-semibold mb-1">
                        Issuing Provider / Institution
                      </label>
                      <input
                        type="text"
                        required
                        value={newCertOrg}
                        onChange={(e) => setNewCertOrg(e.target.value)}
                        placeholder="e.g. IIT Madras (NPTEL) or Coursera"
                        className="w-full h-10 px-3 border border-sand-300 dark:border-indigo-700 rounded-lg bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sand-700 font-semibold mb-1">
                        Verification URL or Credential Link
                      </label>
                      <input
                        type="url"
                        value={newCertUrl}
                        onChange={(e) => setNewCertUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full h-10 px-3 border border-sand-300 dark:border-indigo-700 rounded-lg bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCertModal(false)}
                        className="px-4 py-2 border rounded-xl font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-saffron-500 text-indigo-950 font-bold rounded-xl"
                      >
                        Save Certificate
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 sm:p-8 shadow-sm max-w-2xl space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white">
                Profile & Recommendation Preferences
              </h3>
              <p className="text-xs text-sand-500 mt-1">
                Customize your career goals, budget limits, and study hours to personalize the recommendation engine.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full h-10 px-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                  Target Career Role
                </label>
                <input
                  type="text"
                  value={profileRole}
                  onChange={(e) => setProfileRole(e.target.value)}
                  className="w-full h-10 px-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-sand-700 dark:text-sand-300 mb-1">
                  <span>Max Budget Threshold</span>
                  <span className="text-saffron-600">₹{profileBudget.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={500}
                  value={profileBudget}
                  onChange={(e) => setProfileBudget(Number(e.target.value))}
                  className="w-full accent-saffron-500 h-1.5 bg-sand-200 dark:bg-indigo-800 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-sand-700 dark:text-sand-300 mb-1">
                  <span>Weekly Study Commitment</span>
                  <span className="text-saffron-600">{profileHours} hrs / week</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={30}
                  step={2}
                  value={profileHours}
                  onChange={(e) => setProfileHours(Number(e.target.value))}
                  className="w-full accent-saffron-500 h-1.5 bg-sand-200 dark:bg-indigo-800 rounded cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold rounded-xl shadow-sm transition-all"
                >
                  Save Profile Preferences
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= TAB 6: PRICE DROP ALERTS ================= */}
        {activeTab === 'alerts' && (
          <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-saffron-500" />
              Price-Drop Alerts & Coupon Notifier
            </h3>
            <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed">
              Whenever a wishlisted or tracked course drops in price (or Udemy runs a 85% flash discount), Dakshata instantly alerts you so you never pay full price.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-sand-50 dark:bg-indigo-950/60 border border-sand-200 dark:border-indigo-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-indigo-950 dark:text-white block">
                    Wishlist Flash Sale Notification
                  </span>
                  <span className="text-[11px] text-sand-500">
                    Email me when my saved courses drop below ₹999
                  </span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-saffron-500 rounded" />
              </div>

              <div className="p-3.5 rounded-xl bg-sand-50 dark:bg-indigo-950/60 border border-sand-200 dark:border-indigo-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-indigo-950 dark:text-white block">
                    Govt PMKVY / NPTEL Batch Openings
                  </span>
                  <span className="text-[11px] text-sand-500">
                    Notify me when free SWAYAM semester enrollment starts
                  </span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-saffron-500 rounded" />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-medium">Loading Student Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
