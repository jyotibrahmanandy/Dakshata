import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
}

const ARTICLES: Article[] = [
  {
    slug: 'how-to-clear-aws-solutions-architect-india',
    title: 'How to Clear AWS Solutions Architect (SAA-C03) in India on a Budget',
    excerpt: 'Step-by-step 8-week preparation playbook: Avoid overpriced ₹25k bootcamps by combining official AWS digital labs, low-cost practice tests, and voucher strategies.',
    category: 'Cloud Certifications',
    date: 'October 26, 2026',
    readTime: '6 min read',
    author: 'Aditya Deshmukh (AWS Certified)',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  },
  {
    slug: 'electrician-to-solar-epc-contractor-surya-mitra',
    title: 'From Domestic Electrician to Solar EPC Contractor: The Surya Mitra Path',
    excerpt: 'How to leverage the Ministry of New & Renewable Energy (MNRE) certified trade qualification to bid for rooftop solar net-metering projects under PM Surya Ghar Yojana.',
    category: 'Vocational Trades',
    date: 'October 20, 2026',
    readTime: '8 min read',
    author: 'Vikram Gurjar (Solar Contractor)',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
  },
  {
    slug: 'coursera-vs-udemy-vs-nptel-compared',
    title: 'Coursera vs. Udemy vs. NPTEL: Where Should Indian Students Invest Time?',
    excerpt: 'An unbiased comparison of accreditation rigor, academic credit recognition, job-market weight, and actual cost per study hour across the top 3 platforms.',
    category: 'Career Strategy',
    date: 'October 15, 2026',
    readTime: '7 min read',
    author: 'Dakshata Research Team',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
  },
  {
    slug: 'cnc-machining-aerospace-manufacturing-careers',
    title: 'Why Precision CNC Machining is One of India’s Fastest Growing Careers',
    excerpt: 'With defense corridor expansions and automotive export surges, certified CNC and VMC machinists command high wages. Here is how to master G-code and CAM.',
    category: 'Smart Manufacturing',
    date: 'October 08, 2026',
    readTime: '5 min read',
    author: 'Praveen Sharma (Toolroom Lead)',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-saffron-500/15 border border-saffron-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-saffron-700 dark:text-saffron-300 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-saffron-500" />
            <span>Practical Knowledge Hub</span>
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-indigo-950 dark:text-white">
            Dakshata Career Guides & Playbooks
          </h1>
          <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm mt-2">
            Actionable advice on exam preparation, trade certifications, salary benchmarks, and cost-effective learning.
          </p>
        </div>

        {/* Featured First Article */}
        <div className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 p-6 sm:p-8 shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-saffron-500 text-indigo-950 px-2.5 py-1 rounded-full">
              Featured Guide
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-indigo-950 dark:text-white leading-tight">
              {ARTICLES[0].title}
            </h2>
            <p className="text-sand-600 dark:text-sand-300 text-xs sm:text-sm leading-relaxed">
              {ARTICLES[0].excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-sand-500 pt-2">
              <span className="flex items-center gap-1 font-medium">
                <User className="w-3.5 h-3.5" />
                {ARTICLES[0].author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {ARTICLES[0].date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {ARTICLES[0].readTime}
              </span>
            </div>
            <div className="pt-2">
              <Link
                href="/catalog?category=Cloud+%26+DevOps"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-saffron-500 hover:text-indigo-950 transition-all shadow-sm"
              >
                <span>Read Guide & View Relevant Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-video lg:aspect-auto lg:h-72 rounded-2xl overflow-hidden bg-indigo-950">
            <img
              src={ARTICLES[0].image}
              alt={ARTICLES[0].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3 Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.slice(1).map((art, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-indigo-900/60 rounded-3xl border border-sand-200 dark:border-indigo-800 overflow-hidden shadow-sm hover:shadow-dakshata transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video w-full overflow-hidden bg-indigo-950">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-wider block">
                    {art.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-indigo-950 dark:text-white line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-sand-600 dark:text-sand-400 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-sand-100 dark:border-indigo-800/60 mt-4 flex items-center justify-between text-[11px] text-sand-500">
                <span>{art.readTime}</span>
                <Link
                  href="/catalog"
                  className="font-bold text-saffron-600 hover:text-indigo-950 flex items-center gap-1"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
