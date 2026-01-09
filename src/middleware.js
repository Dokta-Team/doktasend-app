// middleware.ts in Next.js
import { NextResponse } from 'next/server';


export function middleware(req) {
    const token = req.cookies.get('DOKTA_ACCESS_TOKEN')?.value;
    console.log("Middlewqare NEXT_PUBLIC_API_URL: ", token)
    console.log("Middlewqare NEXT_PUBLIC_API_URL: ", process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : 'process.env.NEXT_PUBLIC_API_URL not set')
    const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/admin');
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*'],
};
