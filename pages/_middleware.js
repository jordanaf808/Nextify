
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  // If User is logged in, Token will exist.
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  if(pathname.includes('/api/auth') || token){
      // If it's an auth request, or token is true, allow the *request* to continue
    return NextResponse.next();
  }
  // if the token is false and path is not to login, redirect to the Login page.
  if(!token && pathname !== '/login'){
    return NextResponse.redirect('/login');
  }
} 