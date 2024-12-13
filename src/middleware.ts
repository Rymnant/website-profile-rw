import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Don't apply middleware to static files or Next.js internals
    if (request.nextUrl.pathname.startsWith('/_next/') || 
        request.nextUrl.pathname.includes('.')) {
        return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    const secret = process.env.NEXT_PUBLIC_DEV_SECRET_KEY;
    if (!secret) {
        return new NextResponse(
            JSON.stringify({ message: "Environment variable NEXT_PUBLIC_DEV_SECRET_KEY is missing" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
    const token = request.cookies.get('dev-token')?.value;

    // Remove console logs in production
    if (process.env.NODE_ENV === 'development') {
        console.log('token', token);
        console.log('secret', secret);
    }

    // Ensure secret and token are defined
    if (!secret || !token) {
        return new NextResponse(
            JSON.stringify({ message: "Environment variables or token missing" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    if (url.pathname.startsWith('/dashboard')) {
        if (token !== secret) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname.startsWith('/api')) {
        if (token !== secret) {
            // Changed to return a JSON response instead of redirecting
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/:path*'],
};