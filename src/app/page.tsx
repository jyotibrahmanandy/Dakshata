import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { CourseOfTheWeekBanner } from '@/components/home/CourseOfTheWeekBanner';
import { CourseRows } from '@/components/home/CourseRows';
import { ProviderStrip } from '@/components/home/ProviderStrip';
import { LearningPathsPreview } from '@/components/home/LearningPathsPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { UNIQUE_COURSES } from '@/data/allCourses';

export default function HomePage() {
  const dealOfTheDay = UNIQUE_COURSES.find((c) => c.deal_of_the_day) || UNIQUE_COURSES[0];
  const courseOfTheWeek = UNIQUE_COURSES.find((c) => c.deal_of_the_week) || UNIQUE_COURSES[7];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Category Sidebar & 'Find My Course' Wizard */}
      <HeroSection dealOfTheDayCourse={dealOfTheDay} />

      {/* 2. Trust Strip (100% Unbiased, Govt & Global, Best Value) */}
      <TrustStrip />

      {/* 3. Category Tiles (TechNova style soft rounded cards with counts) */}
      <CategoryTiles />

      {/* 4. Course of the Week Banner (MusicStore style banner) */}
      <CourseOfTheWeekBanner course={courseOfTheWeek} />

      {/* 5. Course Card Rows (Trending, Top Rated, Free Govt, Best Value) */}
      <CourseRows allCourses={UNIQUE_COURSES} />

      {/* 6. Partner & Provider Strip (Coursera, edX, NPTEL, Udemy, Skill India) */}
      <ProviderStrip />

      {/* 7. Learning Paths / Roadmaps Preview */}
      <LearningPathsPreview />

      {/* 8. Student Testimonials */}
      <TestimonialsSection />
    </div>
  );
}
