'use server'

import { PrismaClient } from '@prisma/client';
import { z } from "zod"
import { signInSchema } from "@/app/auth/SignInForm"
import { Argon2id } from 'oslo/password'
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  const user = await prisma.user.findUnique({
      where: {
          email: values.email
      }
  })
  if (!user || !user.password) {
      return { success: false, error: "Invalid Credentials!" }
  }
  const passwordMatch = await new Argon2id().verify(user.password, values.password)
  if (!passwordMatch) {
      return { success: false, error: "Invalid Credentials!" }
  }

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = await lucia.createSessionCookie(session.id)
  ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return { success: true }
}
