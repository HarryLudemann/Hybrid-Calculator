import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Here you would integrate with your email service
    // For now, we'll just log and return success
    console.log('Lead submission:', data);

    // Example: You could send an email here using a service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Nodemailer
    // - etc.

    // For now, just acknowledge receipt
    return NextResponse.json(
      {
        success: true,
        message: 'Lead submitted successfully. Harry will contact you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing your request' },
      { status: 500 }
    );
  }
}
