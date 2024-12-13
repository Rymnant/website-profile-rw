import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const token = request.cookies.get('dev-token')?.value;

    if (url.pathname.startsWith('/dashboard')) {
        if (!token) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname.startsWith('/api') && !url.pathname.startsWith('/api/login')) {
        if (!token) {
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