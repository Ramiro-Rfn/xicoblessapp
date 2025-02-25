import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const publicRoutes = ['/login', '/logup', '/recovery-password']

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const currentUser = request.cookies.get('xicobless_token')?.value

    if(publicRoutes.includes(pathname) && !currentUser){
      return NextResponse.next()
    }

    if (!currentUser) {
      if(pathname === '/'){
        return NextResponse.next()
      }

      return NextResponse.redirect(new URL('/login', request.url))
    }

    if(pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if(pathname === '/signup') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|svg)$).*)'],
};
