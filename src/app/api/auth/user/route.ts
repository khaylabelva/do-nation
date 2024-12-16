// app/api/auth/user/route.ts
import { getUser } from '@/lib/lucia';

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ user: null, message: 'No active session' }),
        { status: 200 }
      );
    }

    // Return user details
    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user session:', error);
    return new Response(
      JSON.stringify({ user: null, message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
