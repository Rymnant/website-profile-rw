import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    const url = request.nextUrl.clone()
    const secret = process.env.DEV_SECRET_KEY

    if(url.pathname.startsWith('/dashboard')){
        const token = request.cookies.get('creator-token')?.value

        if(token !== secret){
            url.pathname = "/unauthorized"
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path']
}