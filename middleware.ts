import { NextResponse } from 'next/server';

export function middleware(req) {
  // your logic here

  return NextResponse.next();  // MUST return something
}
