import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
/* import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/search")) {
		console.log("here");
		// This logic is only applied to /about
	}

	if (request.nextUrl.pathname.startsWith("/login")) {
		// This logic is only applied to /dashboard
	}
}
 */
// middleware.ts

const protectedRoutes = ["/search", "/search-result"];
const onlyNotAuthRoutes = ["/login"];

import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const token = await getToken({ req });

	const isAuthenticated = !!token;

	if (onlyNotAuthRoutes.includes(req.nextUrl.pathname) && isAuthenticated) {
		NextResponse.redirect(new URL(`/`, req.url));
	}

	if (protectedRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
		return NextResponse.redirect(
			new URL(`/api/auth/signin?callbackUrl=${path}`, req.url)
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: protectedRoutes,
};
