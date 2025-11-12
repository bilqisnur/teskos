import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;
    // Jika tidak ada token, redirect ke login
    if (!token) {
        const redirectLogin = request.nextUrl.clone();
        redirectLogin.pathname = "/login";
        return NextResponse.redirect(redirectLogin);
    }

    const path = request.nextUrl.pathname;

    
    if (path.startsWith("/admin") && role === "admin") {
        const redirectDenied = request.nextUrl.clone();
        redirectDenied.pathname = "/login";
        return NextResponse.redirect(redirectDenied);
    }

    // CASHIER tidak boleh ke /manager
    if (path.startsWith("/society") && role === "society") {
        const redirectDenied = request.nextUrl.clone();
        redirectDenied.pathname = "/login";
        return NextResponse.redirect(redirectDenied);
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/admin/:path*",
        "/society/:path*",
        "/", 
    ]
};