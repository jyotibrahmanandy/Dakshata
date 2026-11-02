import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { course_id, course_title, provider, price_inr, source } = body;

    const commissionRate = provider === 'Coursera' ? 0.15 : provider === 'Udemy' ? 0.10 : 0.05;
    const estimatedCommission = Math.round((price_inr || 0) * commissionRate);

    const logRecord = {
      id: `clk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      course_id,
      course_title,
      provider,
      price_inr: price_inr || 0,
      estimated_commission_inr: estimatedCommission,
      source: source || 'catalog_card',
      timestamp: new Date().toISOString(),
      user_agent: request.headers.get('user-agent') || 'browser',
    };

    // Return successfully logged record
    return NextResponse.json({ success: true, log: logRecord });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

