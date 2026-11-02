# Dakshata (दक्षता) — Online Course Catalog & Recommendation Platform

> *"Skill is your power."*

**Dakshata** (meaning skill, competence, and expertise) is an online course catalog and recommendation platform focused on practical skills, IT certifications, and professional trades. It aggregates, compares, and recommends courses from verified providers (**Coursera, edX, NPTEL/SWAYAM, Udemy, AWS Skill Builder, Skill India / NSDC**) and connects students via affiliate and outbound links with zero markup.

---

## 🌟 Key Features

1. **"Find My Course" Smart Recommendation Engine**:
   - Multi-factor scoring model (0–100) combining **Budget Fit** (25 pts), **Goal & Tag Alignment** (25 pts), **Skill Level Match** (20 pts), **Study Hours vs Course Duration** (10 pts), **Verified Rating** (10 pts), **Language Match** (5 pts), and **Certificate Availability** (5 pts).
   - Shows a transparent, human-readable *"Why recommended"* badge on each course card.

2. **Cross-Platform Price Comparison & Best-Value Metric**:
   - Calculates a rating-per-rupee score to surface top-value courses.
   - Interactive INR (₹) / USD ($) currency switcher with automatic currency conversion.

3. **60+ Verified Realistic Seed Courses**:
   - Spans **IT & Cloud Certifications** (AWS SAA-C03, Azure AZ-104, Google Cybersecurity, CKA Kubernetes, Full-Stack React/Next.js).
   - Spans **Vocational Trades** (PMKVY Electrician, Surya Mitra Solar PV Rooftop, CNC VMC Machinist, HVAC Technician, EV Powertrain, TIG/6G Pipe Welder).
   - Features **100% Free Tuition Programs** from government portals (**NPTEL, SWAYAM, Skill India**).

4. **Multi-Course Side-by-Side Comparison**:
   - Compare up to 3 courses simultaneously across pricing, rating, best-value score, skill level, duration, certificates, and learning outcomes.

5. **Structured Career Learning Paths**:
   - 6 roadmaps (Cloud & DevOps, Full Stack Web Dev, Industrial Electrician & Solar PV, Data Analyst & BI, CNC Machinist, Cybersecurity SOC Analyst) with projected annual salaries in INR and step-by-step milestones.

6. **Interactive Skill-Gap Analyzer**:
   - Learners select their target career role, check off the skills they already possess, and receive an instant readiness percentage and personalized curriculum to bridge the missing competencies.

7. **Student Dashboard & Progress Tracker**:
   - Track enrolled courses (In Progress with slider percentage updates, Completed with certificate logging, Saved for Later).
   - Personal wishlist with price-drop notification preferences.
   - Record and link official credential URLs.

8. **Admin Panel & Scheduled Daily Sync**:
   - Analytics metrics (catalog size, outbound affiliate clicks, estimated commission revenue in INR).
   - Provider API sync status and manual synchronization trigger (`/api/sync`).
   - Feature flags for **Deal of the Day** (with live countdown clock) and **Course of the Week**.
   - CSV Course Import tool for manually curated feeds.
   - Real-time outbound click audit log.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom Design System (Deep Indigo `#2B1B5E`, Saffron Gold `#F2A31B`, Warm Sand `#FBF7F0`)
- **Database**: Supabase (PostgreSQL, Row Level Security policies, Auth schema included in `src/lib/supabase/schema.sql`)
- **Icons**: Lucide React
- **API Routes**: Server-side endpoints for affiliate click tracking and catalog sync

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v18 or newer
- npm or yarn

### 2. Installation
```bash
git clone https://github.com/your-username/dakshata.git
cd dakshata
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
NEXT_PUBLIC_SITE_NAME="Dakshata"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_TAGLINE="Skill is your power."

# Supabase (Optional: Local fallback state is active by default so the app works immediately)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Affiliate Credentials
COURSERA_AFFILIATE_ID=dakshata_coursera
UDEMY_AFFILIATE_TRACKING_ID=dakshata_udemy
ADMIN_SECRET_KEY=dakshata_admin_2026
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running the Course Catalog Sync Job
The daily sync job can be triggered programmatically or via a cron schedule:
- **API Route**: `POST /api/sync`
- **Schedule**: `0 4 * * *` (Daily at 04:00 AM IST)
- **Manual Trigger**: Navigate to `/admin` and click **"Sync Provider APIs Now"**.

### 6. Setting Up Supabase Database (Optional)
To persist data directly to Supabase:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and run the entire SQL script from `src/lib/supabase/schema.sql`.
4. Copy your project URL and Anon key into `.env.local`.

---

## 📦 Project Structure

```
├── public/                 # Static assets and SVG favicon
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Homepage (Hero, Deals, Categories, Rows)
│   │   ├── catalog/        # Course catalog with multi-facet filters
│   │   ├── course/[slug]/  # Course detail view with syllabus & reviews
│   │   ├── compare/        # Side-by-side course compare (up to 3)
│   │   ├── roadmap/        # Career roadmaps directory & interactive timelines
│   │   ├── skill-gap/      # Skill-gap role diagnostic tool
│   │   ├── dashboard/      # Student learning area (progress, wishlist, certs)
│   │   ├── admin/          # Admin management, sync control & CSV import
│   │   ├── categories/     # Complete taxonomy breakdown
│   │   ├── blog/           # Actionable career guides & playbooks
│   │   ├── auth/           # Login, Signup, Onboarding questionnaire
│   │   ├── api/            # Server-side sync and affiliate click logging
│   │   ├── layout.tsx      # Root layout with fonts & providers
│   │   └── globals.css     # Tailwind styling & design tokens
│   ├── components/
│   │   ├── layout/         # Header, Footer, Logo, AnnouncementBar, Toaster
│   │   ├── courses/        # CourseCard with match score & pricing
│   │   └── home/           # Hero, Deal of Day, CategoryTiles, TrustStrip
│   ├── context/            # React context (user, wishlist, compare, currency)
│   ├── data/               # 60+ verified course seeds, categories, roadmaps
│   ├── lib/                # Recommendation engine, Supabase clients
│   └── types/              # Comprehensive TypeScript interfaces
```

---

## 🌐 Deploy to Vercel

Dakshata is built with standard Next.js 14 App Router and is 100% deploy-ready for Vercel:
1. Push this repository to GitHub / GitLab.
2. Import the project into your Vercel Dashboard.
3. Add the environment variables from `.env.example`.
4. Click **Deploy**.

---

## 📄 License
MIT License. Crafted with passion for skill empowerment across India.
