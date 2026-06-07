import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Here you would integrate with your calendar system or email service
    // For now, we'll just log and return success
    console.log('Test drive booking:', data);

    // Example integrations:
    // - Google Calendar API
    // - Calendly API
    // - Custom database booking system
    // - Email notification to Harry

    return NextResponse.json(
      {
        success: true,
        message: 'Test drive booking received! Harry will confirm your appointment shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing test drive booking:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing your booking request' },
      { status: 500 }
    );
  }
}
