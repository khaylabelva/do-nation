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
    },
  },
});

export const getUser = async () => {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value || null;
    if (!sessionId) {
        return null; // No session cookie, no user
    }

    let user;
    try {
        const { session, user: validatedUser } = await lucia.validateSession(sessionId);

        if (session && session.fresh) {
            // Refreshing session cookie
            const sessionCookie = await lucia.createSessionCookie(session.id);
            (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }

        if (!session) {
            // Create blank session cookie if no valid session
            const sessionCookie = await lucia.createBlankSessionCookie();
            (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return null; // No valid session means no user
        }

        user = validatedUser; // Assign validated user from Lucia
    } catch (error) {
        console.error("Error validating session:", error);
        return null; // Return null if validation fails
    }

    if (!user || !user.id) {
        return null; // No user ID, no user to fetch
    }

    // Query the database for additional user details
    const dbUser = await prisma.user.findUnique({
        where: {
            id: user.id, // Ensure user.id is defined
        },
        select: {
            username: true,
            email: true,
            totalAksi: true,
            totalDonasi: true,
        },
    });

    return dbUser;
};
