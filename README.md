# Dakshata

Course catalog and recommendation platform for practical IT certifications and vocational trades.

Dakshata aggregates, compares, and recommends courses across providers including Coursera, edX, NPTEL/SWAYAM, Udemy, and Skill India. It provides students with a single interface to compare course costs, certificate types, and syllabus roadmaps, and directs learners to official providers via outbound and affiliate links.

---

## Core Capabilities

### Recommendation Engine
Scores courses on a 0 to 100 scale using seven weighted factors: budget fit (25 points), goal and skill keyword alignment (25 points), skill level match (20 points), study hour commitment against duration (10 points), review rating (10 points), language match (5 points), and certificate availability (5 points). Each recommended card displays a brief explanation of why the course matches the learner's criteria.

### Cross-Platform Price Comparison
Calculates a rating-per-rupee score across paid and free programs. Learners can switch between INR (₹) and USD ($) across all catalog views.

### Verified Course Catalog
Includes 64 verified seed courses covering cloud computing, cybersecurity, software engineering, and vocational trades such as solar PV installation, industrial electrical work, CNC machining, and pipe welding. Includes free government programs from NPTEL, SWAYAM, and Skill India.

### Side-by-Side Comparison
Enables learners to compare up to three courses across syllabus outcomes, total duration, credential validity, and price.

### Career Roadmaps and Skill-Gap Diagnostic
Contains six structured roadmaps with milestone courses and market salary ranges in India. A diagnostic tool allows learners to check off their current skills against a target role to generate a sequence of courses bridging the gap.

### Student Workspace and Administration
Provides enrolled course progress tracking, certificate logging, wishlist management, and outbound click analytics for course links. Includes an admin dashboard with CSV course importing and daily sync execution.

---

## Tech Stack

- Framework: Next.js 14 (App Router) with TypeScript
- Styling: Tailwind CSS with deep indigo (`#2B1B5E`) and saffron (`#F2A31B`) palette
- Database: Supabase (PostgreSQL with Row Level Security policies in `src/lib/supabase/schema.sql`)
- Icons: Lucide React
- API Routes: Next.js server-side endpoints for affiliate click tracking and catalog sync

---

## Getting Started

### Prerequisites
- Node.js v18 or newer
- npm or yarn

### Installation
```bash
git clone https://github.com/your-username/dakshata.git
cd dakshata
npm install
```

### Environment Configuration
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

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running the Course Catalog Sync Job
The daily sync job can be triggered programmatically or via a cron schedule:
- API Route: `POST /api/sync`
- Schedule: `0 4 * * *` (Daily at 04:00 AM IST)
- Manual Trigger: Navigate to `/admin` and select "Sync Provider APIs Now".

### Setting Up Supabase Database (Optional)
To persist data directly to Supabase:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL Editor in your Supabase dashboard.
3. Paste and run the entire SQL script from `src/lib/supabase/schema.sql`.
4. Copy your project URL and Anon key into `.env.local`.

---

## Project Structure

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
│   ├── data/               # 64 verified course seeds, categories, roadmaps
│   ├── lib/                # Recommendation engine, Supabase clients
│   └── types/              # TypeScript interfaces
```

---

## Deployment

Dakshata is built with the Next.js 14 App Router and is deployable on Vercel:
1. Push this repository to GitHub or GitLab.
2. Import the project into the Vercel Dashboard.
3. Configure the environment variables from `.env.example`.
4. Run deployment.

---

## License

MIT License.
