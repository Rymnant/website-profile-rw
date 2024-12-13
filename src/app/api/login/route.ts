import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  if (password === process.env.DEV_SECRET_KEY) {
    (await cookies()).set('dev-token', password, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}