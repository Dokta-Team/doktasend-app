// middleware.ts in Next.js
import { NextResponse } from 'next/server';


export function middleware(req) {
    try {
        const token = req.cookies.get('DOKTA_ACCESS_TOKEN')?.value;
        console.log("Middlewqare back: ", token)
        const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/admin');
        if (isProtectedRoute && !token) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*'],
};
