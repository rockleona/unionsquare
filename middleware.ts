import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const session_cookie = request.cookies.get("session")
  if(!session_cookie) {
    return NextResponse.redirect('/login')
  }
}