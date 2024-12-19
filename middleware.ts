import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session_cookie = request.cookies.get("session")
  
  if (!session_cookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  const pathname = new URL(request.url).pathname
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/performance', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/performance', '/users']
}