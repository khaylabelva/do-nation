'use server'

import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation"
import { toast } from "sonner";

export const logOut = async () => {
  const currentSessionId = (await cookies()).get('lucia_session')?.value;

  if (currentSessionId) {
      await lucia.invalidateSession(currentSessionId);
  } else {
    toast.error('Failed to log out');
    return;
  }

  const sessionCookie = await lucia.createBlankSessionCookie();
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  toast.success('You have been logged out');
  return redirect('/');
};
