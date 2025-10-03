import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTokenExpired } from './lib/auth';

const protectedRoutes = ['/live', '/profile', '/chats'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 2️⃣ Read token from cookies
  const token = req.cookies.get('accessToken')?.value;

  // 1️⃣ Redirect to / if navigate to signup/signin when user is authenticated
  if (
    token &&
    ['/login', '/register'].some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 3️⃣ Protected/Admin routes → require token
  if (!token) {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      const signinUrl = new URL('/login', req.url);
      signinUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signinUrl);
    }
    return NextResponse.next();
  }
  try {
    // 4️⃣ Expired token → clear cookie and redirect to signin
    if (isTokenExpired(token)) {
      const signinUrl = new URL('/login', req.url);
      signinUrl.searchParams.set('callbackUrl', pathname);
      signinUrl.searchParams.set('reason', 'tokenExpired');
      const res = NextResponse.redirect(signinUrl);
      res.cookies.set('accessToken', '', {
        path: '/',
        httpOnly: true,
        maxAge: 0,
      });
      return res;
    }

    // 5️⃣ Decode for role checks
    // const decodedToken: any = jwt.decode(token);
    // const role = decodedToken?.role as string | undefined; // e.g., "user" | "admin"

    // 6️⃣ Admin-only routes
    // if (adminRoutes.some((route) => pathname.startsWith(route))) {
    //   if (role !== "admin") {
    //     return NextResponse.redirect(new URL("/unauthorized", req.url));
    //   }
    // }
  } catch (err) {
    console.error('JWT verification failed:', err);
    const signinUrl = new URL('/signin', req.url);
    signinUrl.searchParams.set('callbackUrl', pathname);
    signinUrl.searchParams.set('reason', 'invalid_token');
    return NextResponse.redirect(signinUrl);
  }

  // ✅ Otherwise allow access
  return NextResponse.next();
}

// Apply middleware to relevant routes only
export const config = {
  matcher: [
    // Public
    '/login',
    '/register',
    '/home',
    '/',

    // Protected
    '/live',
    '/chats/:path*',
    '/profile/:path*',
  ],
};
