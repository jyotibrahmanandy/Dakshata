import { Course } from '@/types';
import { COURSES } from './courses';
import { ADDITIONAL_COURSES } from './coursesAdditional';
import { SEED_CATALOG_PART3 } from './seedCatalog';
import { SEED_CATALOG_PART4 } from './seedCatalogPart4';

export const ALL_COURSES: Course[] = [
  ...COURSES,
  ...ADDITIONAL_COURSES,
  ...SEED_CATALOG_PART3,
  ...SEED_CATALOG_PART4,
];

// Ensure unique by ID
const seenIds = new Set<string>();
export const UNIQUE_COURSES: Course[] = ALL_COURSES.filter((course) => {
  if (seenIds.has(course.id)) return false;
  seenIds.add(course.id);
  return true;
}).map((course) => {
  if (course.is_free || course.price === 0) {
    return {
      ...course,
      best_value_score: 99.8,
    };
  }
  const priceFactor = Math.max(course.price / 1000, 0.5);
  const score = parseFloat(((course.rating / priceFactor) * 10).toFixed(1));
  return {
    ...course,
    best_value_score: score,
  };
});

