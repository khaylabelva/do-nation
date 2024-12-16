import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";

export async function POST() {
  try {
    // Get the session cookie from the request
    const sessionId = (await cookies()).get("lucia_session")?.value;

    // If no session cookie exists, return success
    if (!sessionId) {
      return new Response(
        JSON.stringify({ message: "User already signed out." }),
        { status: 200 }
      );
    }

    // Invalidate the session in Lucia
    await lucia.invalidateSession(sessionId);

    // Create a blank session cookie to clear the session
    const sessionCookie = await lucia.createBlankSessionCookie();
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response(JSON.stringify({ message: "Sign-out successful." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in sign-out route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
