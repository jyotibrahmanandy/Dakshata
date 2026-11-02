import { Course, RecommendationResult, UserPreferences } from '@/types';

export function calculateRecommendationScore(
  course: Course,
  preferences: UserPreferences
): RecommendationResult {
  // 1. Budget Fit (max 25)
  let budgetScore = 0;
  const userBudget = preferences.budget_max || 5000;
  if (course.is_free || course.price === 0) {
    budgetScore = 25;
  } else if (course.price <= userBudget) {
    budgetScore = 25;
  } else if (course.price <= userBudget * 1.25) {
    budgetScore = 16;
  } else if (course.price <= userBudget * 1.5) {
    budgetScore = 8;
  } else {
    budgetScore = 2;
  }

  // 2. Goal & Tag Match (max 25)
  let goalScore = 0;
  const goalLower = (preferences.goal || '').toLowerCase();
  const targetRoleLower = (preferences.target_role || '').toLowerCase();
  const searchCorpus = `${course.title} ${course.description} ${course.tags.join(' ')} ${course.category_name || ''} ${course.what_you_will_learn.join(' ')}`.toLowerCase();

  const goalWords = `${goalLower} ${targetRoleLower}`
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2);

  let matchedWordsCount = 0;
  goalWords.forEach((word) => {
    if (searchCorpus.includes(word)) {
      matchedWordsCount++;
    }
  });

  if (goalWords.length === 0) {
    goalScore = 20; // Default when no specific goal entered
  } else {
    const matchRatio = Math.min(matchedWordsCount / Math.max(goalWords.length, 1), 1.0);
    goalScore = Math.round(matchRatio * 25);
    if (goalScore < 8 && searchCorpus.includes('certified')) {
      goalScore += 4;
    }
  }

  // 3. Skill Level Match (max 20)
  let levelScore = 0;
  if (course.level === 'All Levels') {
    levelScore = 18;
  } else if (course.level === preferences.current_level) {
    levelScore = 20;
  } else if (preferences.current_level === 'Beginner' && course.level === 'Intermediate') {
    levelScore = 14; // Good aspirational step
  } else if (preferences.current_level === 'Intermediate' && (course.level === 'Beginner' || course.level === 'Advanced')) {
    levelScore = 14;
  } else {
    levelScore = 6;
  }

  // 4. Duration vs Weekly Hours fit (max 10)
  let hoursScore = 0;
  const weeklyHours = preferences.weekly_hours || 10;
  const estimatedWeeks = Math.ceil(course.duration_hours / weeklyHours);
  if (estimatedWeeks >= 2 && estimatedWeeks <= 8) {
    hoursScore = 10; // Optimal 1-2 month milestone
  } else if (estimatedWeeks < 2) {
    hoursScore = 8; // Quick win
  } else if (estimatedWeeks <= 12) {
    hoursScore = 7;
  } else {
    hoursScore = 4;
  }

  // 5. Rating weight (max 10)
  const ratingScore = Math.round((course.rating / 5) * 10);

  // 6. Language Match (max 5)
  let languageScore = 2;
  const preferredLangs = preferences.preferred_languages || ['English'];
  if (preferredLangs.length === 0 || preferredLangs.includes(course.language) || course.language === 'Bilingual') {
    languageScore = 5;
  } else if (preferredLangs.includes('English') && course.language === 'English') {
    languageScore = 5;
  }

  // 7. Certificate Weight (max 5)
  const certificateScore = course.certificate ? 5 : 2;

  // Total
  const totalScore = Math.min(
    100,
    budgetScore + goalScore + levelScore + hoursScore + ratingScore + languageScore + certificateScore
  );

  // Human-readable explanation
  const reasons: string[] = [];
  if (course.is_free) {
    reasons.push('100% Free Tuition');
  } else if (budgetScore >= 20) {
    reasons.push(`Well within your ₹${userBudget.toLocaleString('en-IN')} budget`);
  }
  if (levelScore >= 18) {
    reasons.push(`Targeted for ${preferences.current_level}s`);
  }
  if (course.certificate) {
    reasons.push('Verified Credential');
  }
  if (course.rating >= 4.8) {
    reasons.push(`Top rated (${course.rating}★ from ${course.rating_count.toLocaleString('en-IN')} learners)`);
  }
  reasons.push(`~${estimatedWeeks} wks at ${weeklyHours}h/wk`);

  const explanation = `${totalScore}% Match: ${reasons.slice(0, 3).join(' • ')}`;

  return {
    course,
    total_score: totalScore,
    breakdown: {
      budget_fit: budgetScore,
      skill_match: levelScore,
      goal_tag_match: goalScore,
      hours_fit: hoursScore,
      rating_weight: ratingScore,
      language_match: languageScore,
      certificate_weight: certificateScore,
    },
    explanation,
  };
}

export function rankCoursesForUser(
  courses: Course[],
  preferences: UserPreferences
): RecommendationResult[] {
  return courses
    .map((course) => calculateRecommendationScore(course, preferences))
    .sort((a, b) => b.total_score - a.total_score);
}

