import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.password) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
      });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
      });
    }

    // Create a session using Lucia Auth
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);

    // Set the session cookie in the response
    (await
      // Set the session cookie in the response
      cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    // Return success response
    return new Response(
      JSON.stringify({
        message: 'Sign in successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in sign-in route:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
