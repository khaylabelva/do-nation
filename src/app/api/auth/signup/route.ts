'use server'

import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { z } from "zod"
import { signUpSchema } from "@/app/auth/SignUpForm"

const prisma = new PrismaClient();

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
      // if user already exists, throw an error
      const existingUser = await prisma.user.findUnique({
          where: {
              email: values.email
          }
      })
      if (existingUser) {
          return { error: 'User already exists', success: false }
      }

      const hashedPassword = await new Argon2id().hash(values.password)

      const user = await prisma.user.create({
          data: {
              email: values.email.toLowerCase(),
              username: values.username,
              password: hashedPassword
          }
      })
      const session = await lucia.createSession(user.id, {})
      const sessionCookie = await lucia.createSessionCookie(session.id)
      ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      return { success: true }
  } catch(error)  {
      const err = error as Error
      console.error(error) 
      return { success: false, error: err.stack }
  }   
}
