export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface SyllabusItem {
  week: number;
  title: string;
  duration?: string;
  topics: string[];
}

export interface Course {
  id: string;
  provider: string; // Coursera, edX, NPTEL/SWAYAM, Udemy, AWS Skill Builder, Skill India
  provider_id: string;
  external_id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  long_description?: string;
  url: string;
  affiliate_url: string;
  image: string;
  price: number; // in INR
  original_price: number; // in INR
  currency: string; // 'INR' or 'USD'
  level: CourseLevel;
  duration_hours: number;
  language: string; // 'Hindi', 'English', 'Tamil', 'Telugu', 'Bilingual'
  rating: number; // e.g. 4.8
  rating_count: number;
  certificate: boolean;
  is_free: boolean;
  tags: string[]; // e.g. ['Trending', 'Best Value', 'Certified', 'IT Certification', 'Vocational']
  category_id: string;
  category_name?: string;
  what_you_will_learn: string[];
  requirements?: string[];
  syllabus?: SyllabusItem[];
  instructor?: string;
  institution?: string; // e.g. 'Google', 'IIT Madras', 'AWS', 'Schneider Electric'
  best_value_score?: number; // Calculated rating per rupee metric
  deal_of_the_day?: boolean;
  deal_of_the_week?: boolean;
  last_synced_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  item_count: number;
  section: 'it_certifications' | 'vocational_trades' | 'free_programs' | 'business_finance';
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  affiliate_network: string;
  home_url: string;
  rating: number;
  courses_count: number;
  badge_text: string;
  api_integrated: boolean;
}

export interface LearningStep {
  step_number: number;
  title: string;
  duration_weeks: number;
  description: string;
  key_skills: string[];
  course_ids: string[];
}

export interface LearningPath {
  id: string;
  role: string;
  title: string;
  slug: string;
  description: string;
  estimated_months: number;
  target_salary_inr: string;
  job_growth: string;
  category: string;
  skills_covered: string[];
  steps: LearningStep[];
}

export interface CourseReview {
  id: string;
  course_id: string;
  user_name: string;
  user_avatar: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  helpful_votes: number;
  verified_enrollment: boolean;
}

export interface UserPreferences {
  goal: string;
  current_level: CourseLevel;
  budget_max: number;
  weekly_hours: number;
  preferred_languages: string[];
  target_role?: string;
  interest_tags?: string[];
}

export interface EnrolledCourseProgress {
  course_id: string;
  progress_percent: number;
  status: 'saved' | 'in_progress' | 'completed';
  started_at: string;
  completed_at?: string;
  last_accessed: string;
  notes?: string;
  certificate_url?: string;
  certificate_date?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  phone?: string;
  location?: string;
  preferences: UserPreferences;
  wishlist: string[];
  enrollments: EnrolledCourseProgress[];
  target_role: string;
  current_skills: string[];
  created_at: string;
}

export interface RecommendationResult {
  course: Course;
  total_score: number; // 0 - 100
  breakdown: {
    budget_fit: number; // max 25
    skill_match: number; // max 20
    goal_tag_match: number; // max 25
    hours_fit: number; // max 10
    rating_weight: number; // max 10
    language_match: number; // max 5
    certificate_weight: number; // max 5
  };
  explanation: string;
}

export interface AffiliateClickRecord {
  id: string;
  course_id: string;
  course_title: string;
  provider: string;
  timestamp: string;
  user_id?: string;
  source: string;
  price_inr: number;
  estimated_commission_inr: number;
  ip_pseudo: string;
}

export interface FilterState {
  searchQuery: string;
  categories: string[];
  providers: string[];
  levels: CourseLevel[];
  priceRange: [number, number];
  onlyFree: boolean;
  withCertificate: boolean;
  durationRange: [number, number]; // in hours
  minRating: number;
  languages: string[];
  sortBy: 'recommended' | 'rating' | 'price_low' | 'price_high' | 'value' | 'duration_short';
}
