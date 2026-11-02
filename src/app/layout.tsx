import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/layout/Toaster';

export const metadata: Metadata = {
  title: 'Dakshata | Online Course Catalog & Recommendation Platform',
  description: 'Dakshata (Skill is your power): Discover, compare, and get personalized recommendations for IT certifications and vocational trades across Coursera, edX, NPTEL/SWAYAM, Udemy, and Skill India.',
  keywords: [
    'Dakshata',
    'Course Catalog India',
    'IT Certifications',
    'Vocational Trades',
    'NPTEL SWAYAM Free Courses',
    'Skill India PMKVY',
    'AWS Solutions Architect',
    'Electrician Certification',
    'CNC Machining',
    'Solar PV Installer',
  ],
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%232B1B5E'/><path d='M32 24 H52 C65 24 74 34 74 50 C74 66 65 76 52 76 H32 V24 Z' fill='none' stroke='%23F2A31B' stroke-width='6'/><path d='M50 36 C50 36 60 48 60 55 C60 60.5 55.5 65 50 65 C44.5 65 40 60.5 40 55 C40 48 50 36 50 36 Z' fill='%23F2A31B'/></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-sand-50 text-indigo-950 dark:bg-indigo-950 dark:text-sand-100 antialiased selection:bg-saffron-500 selection:text-indigo-950">
        <AppProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
