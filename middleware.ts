import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  
  // Check if the Authorization header is present
  if (!authHeader) {
    return new Response('Authorization Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // Decode the authorization header
  const auth = authHeader.split(' ')[1];
  const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

  // Check the password
  if (pwd !== '14725') {
    return new Response('Unauthorized', {
      status: 403,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/check-in/:path*'], // Protect admin and check-in routes
  };
  