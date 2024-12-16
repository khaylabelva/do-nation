// lib/lucia.ts
import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Set up the Prisma adapter for Lucia
const adapter = new PrismaAdapter(prisma.session, prisma.user);

// Initialize Lucia Auth
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'do-nation-cookie', // Cookie name
    expires: false,     
    attributes: {
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      path: '/',
      sameSite: 'lax',
    },
  },
});

// Function to retrieve the user based on session
export const getUser = async () => {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value || null;

  if (!sessionId) {
    return null; // No session ID
  }

  try {
    const { session, user } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
      // Refresh the session cookie if fresh
      const sessionCookie = await lucia.createSessionCookie(session.id);
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    if (!session) {
      // Delete expired or invalid session
      const blankCookie = await lucia.createBlankSessionCookie();
      (await cookies()).set(blankCookie.name, blankCookie.value, blankCookie.attributes);
      return null;
    }

    // Fetch the full user data from the database
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        email: true,
        // Include any other fields you need
      },
    });

    return fullUser;
  } catch (error) {
    console.error('Error validating session:', error);
    return null; // Return null on error
  }
};
