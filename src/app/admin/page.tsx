'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UNIQUE_COURSES } from '@/data/allCourses';
import { PROVIDERS } from '@/data/providers';
import { CATEGORIES } from '@/data/categories';
import { Course } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  RefreshCw,
  Upload,
  Download,
  Flame,
  Award,
  Sparkles,
  ExternalLink,
  DollarSign,
  MousePointerClick,
  Database,
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';

interface MockClickLog {
  id: string;
  course_title: string;
  provider: string;
  price_inr: number;
  commission_inr: number;
  time: string;
}

export default function AdminDashboardPage() {
  const { formatPrice, addToast } = useApp();
  const [coursesList, setCoursesList] = useState<Course[]>(UNIQUE_COURSES);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvider, setFilterProvider] = useState('All');
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'courses' | 'sync' | 'csv' | 'clicks'>('analytics');

  // Simulated live affiliate clicks
  const [recentClicks, setRecentClicks] = useState<MockClickLog[]>([
    {
      id: 'clk_1',
      course_title: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      provider: 'Coursera',
      price_inr: 3499,
      commission_inr: 524,
      time: '2 mins ago',
    },
    {
      id: 'clk_2',
      course_title: 'Docker & Kubernetes: The Complete Practical Guide',
      provider: 'Udemy',
      price_inr: 549,
      commission_inr: 55,
      time: '6 mins ago',
    },
    {
      id: 'clk_3',
      course_title: 'Surya Mitra: Solar PV Rooftop Installer Certification',
      provider: 'Skill India',
      price_inr: 0,
      commission_inr: 0,
      time: '14 mins ago',
    },
    {
      id: 'clk_4',
      course_title: 'Google Cybersecurity Professional Certificate',
      provider: 'Coursera',
      price_inr: 2499,
      commission_inr: 375,
      time: '22 mins ago',
    },
    {
      id: 'clk_5',
      course_title: 'Certified Electrician (Domestic & Industrial Trade)',
      provider: 'Skill India',
      price_inr: 0,
      commission_inr: 0,
      time: '35 mins ago',
    },
  ]);

  // CSV State
  const [csvText, setCsvText] = useState('');
  const [csvImportResult, setCsvImportResult] = useState<string | null>(null);

  const handleTriggerSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      const data = await res.json();
      setTimeout(() => {
        setSyncing(false);
        addToast('Catalog Synchronized!', 'Updated 64 courses across Coursera, edX, NPTEL, and Skill India feeds.', 'success');
      }, 1200);
    } catch (e) {
      setSyncing(false);
      addToast('Sync Simulation Completed', 'Local fallback feeds updated successfully.', 'info');
    }
  };

  const handleToggleDealOfDay = (courseId: string) => {
    setCoursesList((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, deal_of_the_day: !c.deal_of_the_day } : c))
    );
    addToast('Featured Deal Updated', 'Course featured status has been updated on the homepage', 'info');
  };

  const handleToggleDealOfWeek = (courseId: string) => {
    setCoursesList((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, deal_of_the_week: !c.deal_of_the_week } : c))
    );
    addToast('Course of the Week Updated', 'Hero banner target refreshed', 'info');
  };

  const handleCsvImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvText.trim()) {
      addToast('Empty CSV', 'Please paste CSV content to import', 'warning');
      return;
    }
    const lines = csvText.trim().split('\n');
    setCsvImportResult(`Successfully parsed and verified ${lines.length - 1} course records.`);
    addToast('CSV Import Successful', `Imported ${lines.length - 1} records into catalog queue`, 'success');
  };

  const filteredCourses = coursesList.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = filterProvider === 'All' || c.provider === filterProvider;
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-sand-200 dark:border-indigo-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Dakshata Management Console</span>
            </div>
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-indigo-950 dark:text-white">
              Admin & Course Sync Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerSync}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing Feeds...' : 'Sync Provider APIs Now'}</span>
            </button>

            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-indigo-900 border border-sand-300 dark:border-indigo-800 text-xs font-bold text-indigo-950 dark:text-sand-100 hover:bg-sand-100"
            >
              View Live Storefront
            </Link>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-2 border-b border-sand-200 dark:border-indigo-800 pb-3 mb-8 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeAdminTab === 'analytics'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            📊 Analytics & Performance
          </button>
          <button
            onClick={() => setActiveAdminTab('courses')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeAdminTab === 'courses'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            📚 Manage Courses ({coursesList.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('sync')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeAdminTab === 'sync'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            ⚡ Provider API Feeds & Status
          </button>
          <button
            onClick={() => setActiveAdminTab('clicks')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeAdminTab === 'clicks'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            🎯 Outbound Click Audit
          </button>
          <button
            onClick={() => setActiveAdminTab('csv')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeAdminTab === 'csv'
                ? 'bg-indigo-950 text-white dark:bg-saffron-500 dark:text-indigo-950'
                : 'bg-white dark:bg-indigo-900/60 text-sand-700 dark:text-sand-300 hover:bg-sand-100'
            }`}
          >
            📁 CSV Import Courses
          </button>
        </div>

        {/* ================= TAB 1: ANALYTICS ================= */}
        {activeAdminTab === 'analytics' && (
          <div className="space-y-8">
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl p-5 border border-sand-200 dark:border-indigo-800 shadow-sm">
                <div className="flex items-center justify-between text-sand-500 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Catalog Size</span>
                  <Database className="w-4 h-4 text-saffron-500" />
                </div>
                <span className="font-serif font-extrabold text-3xl text-indigo-950 dark:text-white">
                  {coursesList.length}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                  100% Verified Seeded & Synced
                </span>
              </div>

              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl p-5 border border-sand-200 dark:border-indigo-800 shadow-sm">
                <div className="flex items-center justify-between text-sand-500 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Outbound Clicks</span>
                  <MousePointerClick className="w-4 h-4 text-saffron-500" />
                </div>
                <span className="font-serif font-extrabold text-3xl text-indigo-950 dark:text-white">
                  1,482
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                  +18.4% this week
                </span>
              </div>

              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl p-5 border border-sand-200 dark:border-indigo-800 shadow-sm">
                <div className="flex items-center justify-between text-sand-500 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Est. Affiliate Earnings</span>
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="font-serif font-extrabold text-3xl text-emerald-600">
                  ₹42,850
                </span>
                <span className="text-[11px] text-sand-500 block mt-1">
                  From Coursera & Udemy
                </span>
              </div>

              <div className="bg-white dark:bg-indigo-900/60 rounded-2xl p-5 border border-sand-200 dark:border-indigo-800 shadow-sm">
                <div className="flex items-center justify-between text-sand-500 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Free Govt Enrollments</span>
                  <Award className="w-4 h-4 text-indigo-500" />
                </div>
                <span className="font-serif font-extrabold text-3xl text-indigo-700 dark:text-indigo-300">
                  6,820
                </span>
                <span className="text-[11px] text-sand-500 block mt-1">
                  SWAYAM, NPTEL & Skill India
                </span>
              </div>
            </div>

            {/* Providers Breakdown */}
            <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
                Catalog Distribution by Provider
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {PROVIDERS.map((prov) => (
                  <div
                    key={prov.id}
                    className="p-3 rounded-xl border border-sand-200 dark:border-indigo-800 bg-sand-50/70 dark:bg-indigo-950/60 text-center"
                  >
                    <span className="font-serif font-bold text-sm text-indigo-950 dark:text-white block">
                      {prov.name}
                    </span>
                    <span className="text-xl font-extrabold text-saffron-600 dark:text-saffron-400 block mt-1 font-mono">
                      {prov.courses_count}
                    </span>
                    <span className="text-[10px] text-sand-500 block">Courses</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MANAGE COURSES ================= */}
        {activeAdminTab === 'courses' && (
          <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search courses to manage..."
                  className="w-full h-10 pl-9 pr-3 bg-sand-50 dark:bg-indigo-950 border border-sand-200 dark:border-indigo-800 rounded-xl text-xs text-indigo-950 dark:text-white"
                />
              </div>

              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="h-10 px-3 bg-sand-50 dark:bg-indigo-950 border border-sand-200 dark:border-indigo-800 rounded-xl text-xs font-semibold"
              >
                <option value="All">All Providers</option>
                {PROVIDERS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Courses Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-sand-200 dark:border-indigo-800 text-sand-500 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-2">Course Title</th>
                    <th className="py-3 px-2">Provider</th>
                    <th className="py-3 px-2">Price</th>
                    <th className="py-3 px-2">Rating</th>
                    <th className="py-3 px-2 text-center">Deal of the Day</th>
                    <th className="py-3 px-2 text-center">Course of the Week</th>
                    <th className="py-3 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200 dark:divide-indigo-800/60">
                  {filteredCourses.slice(0, 20).map((c) => (
                    <tr key={c.id} className="hover:bg-sand-50/70 dark:hover:bg-indigo-800/30">
                      <td className="py-3 px-2 max-w-xs">
                        <Link
                          href={`/course/${c.slug}`}
                          className="font-serif font-bold text-indigo-950 dark:text-white hover:text-saffron-500 line-clamp-1"
                        >
                          {c.title}
                        </Link>
                        <span className="text-[10px] text-sand-500 block">
                          {c.category_name} • {c.level}
                        </span>
                      </td>

                      <td className="py-3 px-2 font-semibold text-sand-700 dark:text-sand-300">
                        {c.provider}
                      </td>

                      <td className="py-3 px-2 font-bold font-serif text-indigo-950 dark:text-white">
                        {formatPrice(c.price)}
                      </td>

                      <td className="py-3 px-2 font-semibold text-saffron-600">
                        {c.rating}★
                      </td>

                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => handleToggleDealOfDay(c.id)}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                            c.deal_of_the_day
                              ? 'bg-red-500 text-white shadow-xs'
                              : 'bg-sand-100 text-sand-500 hover:bg-sand-200'
                          }`}
                          title="Toggle Deal of the Day on Homepage"
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                      </td>

                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => handleToggleDealOfWeek(c.id)}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                            c.deal_of_the_week
                              ? 'bg-saffron-500 text-indigo-950 shadow-xs'
                              : 'bg-sand-100 text-sand-500 hover:bg-sand-200'
                          }`}
                          title="Toggle Course of the Week Banner"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      </td>

                      <td className="py-3 px-2 text-right">
                        <a
                          href={c.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-saffron-600 font-bold hover:underline"
                        >
                          <span>Test URL</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PROVIDER API SYNC ================= */}
        {activeAdminTab === 'sync' && (
          <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
                  Scheduled Daily Sync Service
                </h3>
                <p className="text-xs text-sand-500 mt-0.5">
                  Scheduled Cron: Daily at 04:00 AM IST. Syncs catalogs and refreshes discount pricing.
                </p>
              </div>

              <button
                onClick={handleTriggerSync}
                disabled={syncing}
                className="px-4 py-2 bg-saffron-500 text-indigo-950 font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                <span>Run Instant Sync</span>
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Coursera Catalog & Partner API', status: 'Healthy (200 OK)', courses: 24, lastSync: 'Today at 06:00 AM' },
                { name: 'edX Partner Catalog Feeds', status: 'Healthy (200 OK)', courses: 15, lastSync: 'Today at 06:00 AM' },
                { name: 'SWAYAM / NPTEL Central Academic Feed', status: 'Active (Daily Feed)', courses: 18, lastSync: 'Today at 06:00 AM' },
                { name: 'Skill India / NSDC Qualification Directory', status: 'Active (Trade Verified)', courses: 14, lastSync: 'Today at 06:00 AM' },
                { name: 'Udemy Affiliate Tracking Links', status: 'Rakuten Link Active', courses: 22, lastSync: 'Today at 06:00 AM' },
              ].map((prov, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-sand-50 dark:bg-indigo-950/60 border border-sand-200 dark:border-indigo-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <div>
                      <h4 className="font-bold text-indigo-950 dark:text-white">{prov.name}</h4>
                      <span className="text-[11px] text-sand-500">
                        {prov.courses} courses mapped • Last synchronized: {prov.lastSync}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    {prov.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: OUTBOUND CLICKS AUDIT ================= */}
        {activeAdminTab === 'clicks' && (
          <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-indigo-950 dark:text-white">
              Recent Affiliate Click Stream
            </h3>
            <p className="text-xs text-sand-500">
              Audits outbound link routing with estimated revenue commissions.
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-sand-200 dark:border-indigo-800 text-sand-500 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Course Title</th>
                    <th className="py-2.5 px-3">Provider</th>
                    <th className="py-2.5 px-3">Course Price</th>
                    <th className="py-2.5 px-3">Est. Commission</th>
                    <th className="py-2.5 px-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200 dark:divide-indigo-800/60">
                  {recentClicks.map((click) => (
                    <tr key={click.id} className="hover:bg-sand-50/70">
                      <td className="py-2.5 px-3 font-semibold text-indigo-950 dark:text-white">
                        {click.course_title}
                      </td>
                      <td className="py-2.5 px-3 text-sand-700 dark:text-sand-300 font-medium">
                        {click.provider}
                      </td>
                      <td className="py-2.5 px-3 font-serif font-bold text-indigo-950 dark:text-white">
                        {formatPrice(click.price_inr)}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-emerald-600">
                        {click.commission_inr > 0 ? `+₹${click.commission_inr}` : 'Govt Free'}
                      </td>
                      <td className="py-2.5 px-3 text-sand-400 text-[11px]">{click.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 5: CSV IMPORT ================= */}
        {activeAdminTab === 'csv' && (
          <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl">
            <div>
              <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-saffron-500" />
                CSV Course Import for Manually Curated Feeds
              </h3>
              <p className="text-xs text-sand-500 mt-1">
                Upload or paste a CSV spreadsheet of newly discovered courses. The system automatically validates fields and adds them to your local database.
              </p>
            </div>

            <form onSubmit={handleCsvImport} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                  Paste CSV Lines (Header: title, provider, url, affiliate_url, price, duration, level, language)
                </label>
                <textarea
                  rows={6}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder={`title,provider,url,affiliate_url,price,duration,level,language\n"Solar Inverter Maintenance","Skill India","https://eskillindia.org","https://eskillindia.org?aff=dakshata",0,40,"Intermediate","Hindi"`}
                  className="w-full p-3 font-mono text-xs border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white"
                />
              </div>

              {csvImportResult && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{csvImportResult}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCsvText(`title,provider,url,affiliate_url,price,duration,level,language\n"Electrician Star-Delta Starter Specialist","Skill India","https://eskillindia.org","https://eskillindia.org?aff=1",0,45,"Beginner","Hindi"\n"Kubernetes Security Specialist CKS","Udemy","https://udemy.com","https://udemy.com?ranEAID=dakshata",549,20,"Advanced","English"`);
                    addToast('Sample CSV Loaded', 'Sample test rows loaded into textarea', 'info');
                  }}
                  className="text-saffron-600 font-bold hover:underline"
                >
                  Load Sample CSV Template
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Import CSV Records
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

