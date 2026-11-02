'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserPreferences, EnrolledCourseProgress } from '@/types';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  currency: 'INR' | 'USD';
  toggleCurrency: () => void;
  formatPrice: (priceInInr: number) => string;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (courseId: string) => void;
  isInWishlist: (courseId: string) => boolean;

  // Course Compare
  compareList: string[];
  addToCompare: (courseId: string) => boolean;
  removeFromCompare: (courseId: string) => void;
  clearCompare: () => void;
  isInCompare: (courseId: string) => boolean;

  // Enrollments & Progress
  enrollments: EnrolledCourseProgress[];
  updateCourseProgress: (courseId: string, percent: number, notes?: string) => void;
  markCourseCompleted: (courseId: string, certUrl?: string) => void;
  saveCourseForLater: (courseId: string) => void;
  getCourseProgress: (courseId: string) => EnrolledCourseProgress | undefined;

  // Auth & Profile
  login: (email: string, name?: string) => void;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  completeOnboarding: (prefs: UserPreferences) => void;
  hasCompletedOnboarding: boolean;

  // Toast feedback
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  goal: 'Pass AWS or Cloud Certification and get a job',
  current_level: 'Beginner',
  budget_max: 4000,
  weekly_hours: 10,
  preferred_languages: ['English', 'Hindi'],
  target_role: 'Cloud Architect & DevOps Engineer',
  interest_tags: ['Cloud', 'DevOps', 'AWS', 'Certified'],
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr-demo-dakshata',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@dakshata.in',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98765 43210',
  location: 'Pune, Maharashtra',
  target_role: 'Cloud Architect & DevOps Engineer',
  current_skills: ['Basic Linux', 'Python Basics', 'Networking'],
  preferences: DEFAULT_PREFERENCES,
  wishlist: ['crs-aws-solutions-architect', 'crs-docker-k8s-mastery'],
  enrollments: [
    {
      course_id: 'crs-aws-practitioner',
      progress_percent: 100,
      status: 'completed',
      started_at: '2026-09-01T00:00:00Z',
      completed_at: '2026-09-25T00:00:00Z',
      last_accessed: '2026-09-25T00:00:00Z',
      certificate_url: 'https://aws.amazon.com/verification/ccp-aarav-sharma-2026',
      certificate_date: '2026-09-25',
    },
    {
      course_id: 'crs-aws-solutions-architect',
      progress_percent: 65,
      status: 'in_progress',
      started_at: '2026-10-01T00:00:00Z',
      last_accessed: '2026-10-31T14:30:00Z',
      notes: 'Completed Module 3 VPC Peering and Multi-AZ Aurora failovers.',
    },
  ],
  created_at: '2026-09-01T00:00:00Z',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [wishlist, setWishlist] = useState<string[]>(['crs-aws-solutions-architect', 'crs-docker-k8s-mastery']);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [enrollments, setEnrollments] = useState<EnrolledCourseProgress[]>(DEFAULT_PROFILE.enrollments);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('dakshata_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        if (parsed.wishlist) setWishlist(parsed.wishlist);
        if (parsed.enrollments) setEnrollments(parsed.enrollments);
      } else {
        // Pre-populate with realistic demo user for instantaneous interactive testing
        setUser(DEFAULT_PROFILE);
      }

      const storedWishlist = localStorage.getItem('dakshata_wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }

      const storedCompare = localStorage.getItem('dakshata_compare');
      if (storedCompare) {
        setCompareList(JSON.parse(storedCompare));
      }

      const storedCurrency = localStorage.getItem('dakshata_currency');
      if (storedCurrency === 'USD' || storedCurrency === 'INR') {
        setCurrency(storedCurrency);
      }
    } catch (e) {
      console.error('Storage reading error', e);
    }
  }, []);

  const addToast = (title: string, message?: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCurrency = () => {
    const next = currency === 'INR' ? 'USD' : 'INR';
    setCurrency(next);
    localStorage.setItem('dakshata_currency', next);
    addToast('Currency Updated', `Showing prices in ${next === 'INR' ? 'Indian Rupee (₹)' : 'US Dollar ($)'}`, 'info');
  };

  const formatPrice = (priceInInr: number) => {
    if (priceInInr === 0) return 'Free';
    if (currency === 'INR') {
      return `₹${priceInInr.toLocaleString('en-IN')}`;
    }
    // Approx INR to USD conversion (1 USD ≈ 84 INR)
    const usd = Math.round(priceInInr / 84);
    return `$${usd}`;
  };

  // Wishlist
  const toggleWishlist = (courseId: string) => {
    setWishlist((prev) => {
      let updated: string[];
      if (prev.includes(courseId)) {
        updated = prev.filter((id) => id !== courseId);
        addToast('Removed from Wishlist', 'Course removed from your saved list', 'info');
      } else {
        updated = [...prev, courseId];
        addToast('Saved to Wishlist', 'Course saved for future reference', 'success');
      }
      localStorage.setItem('dakshata_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (courseId: string) => wishlist.includes(courseId);

  // Compare
  const addToCompare = (courseId: string) => {
    if (compareList.includes(courseId)) {
      addToast('Already in Compare', 'This course is already added to comparison tray', 'info');
      return true;
    }
    if (compareList.length >= 3) {
      addToast('Compare Tray Full', 'You can compare up to 3 courses simultaneously. Remove one to add another.', 'warning');
      return false;
    }
    const updated = [...compareList, courseId];
    setCompareList(updated);
    localStorage.setItem('dakshata_compare', JSON.stringify(updated));
    addToast('Added to Compare', `Comparison tray now has ${updated.length}/3 courses`, 'success');
    return true;
  };

  const removeFromCompare = (courseId: string) => {
    const updated = compareList.filter((id) => id !== courseId);
    setCompareList(updated);
    localStorage.setItem('dakshata_compare', JSON.stringify(updated));
    addToast('Removed from Compare', 'Course removed from comparison tray', 'info');
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem('dakshata_compare');
  };

  const isInCompare = (courseId: string) => compareList.includes(courseId);

  // Enrollments
  const updateCourseProgress = (courseId: string, percent: number, notes?: string) => {
    setEnrollments((prev) => {
      const existing = prev.find((e) => e.course_id === courseId);
      const now = new Date().toISOString();
      let updated: EnrolledCourseProgress[];
      if (existing) {
        updated = prev.map((e) =>
          e.course_id === courseId
            ? {
                ...e,
                progress_percent: percent,
                status: percent >= 100 ? 'completed' : 'in_progress',
                completed_at: percent >= 100 ? now : e.completed_at,
                last_accessed: now,
                notes: notes !== undefined ? notes : e.notes,
              }
            : e
        );
      } else {
        updated = [
          ...prev,
          {
            course_id: courseId,
            progress_percent: percent,
            status: percent >= 100 ? 'completed' : 'in_progress',
            started_at: now,
            completed_at: percent >= 100 ? now : undefined,
            last_accessed: now,
            notes,
          },
        ];
      }
      return updated;
    });
    addToast('Progress Updated', `Course progress set to ${percent}%`, 'success');
  };

  const markCourseCompleted = (courseId: string, certUrl?: string) => {
    const now = new Date().toISOString();
    setEnrollments((prev) =>
      prev.map((e) =>
        e.course_id === courseId
          ? {
              ...e,
              progress_percent: 100,
              status: 'completed',
              completed_at: now,
              certificate_url: certUrl || e.certificate_url,
              certificate_date: new Date().toISOString().split('T')[0],
            }
          : e
      )
    );
    addToast('Congratulations!', 'Course marked as completed with certificate logged', 'success');
  };

  const saveCourseForLater = (courseId: string) => {
    const now = new Date().toISOString();
    setEnrollments((prev) => {
      if (prev.some((e) => e.course_id === courseId)) return prev;
      return [
        ...prev,
        {
          course_id: courseId,
          progress_percent: 0,
          status: 'saved',
          started_at: now,
          last_accessed: now,
        },
      ];
    });
    addToast('Course Tracked', 'Course added to your learning dashboard', 'success');
  };

  const getCourseProgress = (courseId: string) => {
    return enrollments.find((e) => e.course_id === courseId);
  };

  // Auth
  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_PROFILE,
      email,
      name: name || email.split('@')[0],
    };
    setUser(newUser);
    localStorage.setItem('dakshata_user', JSON.stringify(newUser));
    addToast('Welcome back!', `Logged in as ${newUser.name}`, 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dakshata_user');
    addToast('Logged Out', 'You have been safely signed out', 'info');
  };

  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    if (!user) return;
    const updated = {
      ...user,
      preferences: {
        ...user.preferences,
        ...newPrefs,
      },
    };
    setUser(updated);
    localStorage.setItem('dakshata_user', JSON.stringify(updated));
    addToast('Preferences Saved', 'Your recommendation signals have been updated', 'success');
  };

  const completeOnboarding = (prefs: UserPreferences) => {
    setHasCompletedOnboarding(true);
    if (user) {
      const updated = {
        ...user,
        preferences: prefs,
        target_role: prefs.target_role || user.target_role,
      };
      setUser(updated);
      localStorage.setItem('dakshata_user', JSON.stringify(updated));
    }
    addToast('Onboarding Complete!', 'Your personalized catalog is ready', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: true, // Demo admin access permitted
        currency,
        toggleCurrency,
        formatPrice,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        enrollments,
        updateCourseProgress,
        markCourseCompleted,
        saveCourseForLater,
        getCourseProgress,
        login,
        logout,
        updatePreferences,
        completeOnboarding,
        hasCompletedOnboarding,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
