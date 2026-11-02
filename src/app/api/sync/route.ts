import { NextResponse } from 'next/server';
import { UNIQUE_COURSES } from '@/data/allCourses';

export async function POST(request: Request) {
  try {
    // Simulated daily cron or admin triggered catalog sync
    const syncResults = {
      timestamp: new Date().toISOString(),
      status: 'completed',
      providers_synced: [
        {
          provider: 'Coursera Partner API',
          status: 'SUCCESS',
          courses_updated: 18,
          new_courses_discovered: 2,
          latency_ms: 340,
        },
        {
          provider: 'edX Catalog API',
          status: 'SUCCESS',
          courses_updated: 12,
          new_courses_discovered: 1,
          latency_ms: 410,
        },
        {
          provider: 'SWAYAM / NPTEL Public Feed',
          status: 'SUCCESS',
          courses_updated: 14,
          new_courses_discovered: 0,
          latency_ms: 180,
        },
        {
          provider: 'Skill India / NSDC Trade Directory',
          status: 'SUCCESS',
          courses_updated: 16,
          new_courses_discovered: 3,
          latency_ms: 220,
        },
        {
          provider: 'Udemy Affiliate Tracking Feeds',
          status: 'SUCCESS',
          courses_updated: 22,
          new_courses_discovered: 1,
          latency_ms: 290,
        },
      ],
      total_courses_in_database: UNIQUE_COURSES.length,
      deals_refreshed: 2,
    };

    return NextResponse.json({ success: true, data: syncResults });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    cron_schedule: '0 4 * * * (Daily at 04:00 AM IST)',
    last_run: new Date(Date.now() - 3600000 * 5).toISOString(),
    next_scheduled_run: new Date(Date.now() + 3600000 * 19).toISOString(),
  });
}
