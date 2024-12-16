import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
      });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
      });
    }

    // Success response (authentication successful)
    return new Response(JSON.stringify({ message: 'Login successful', user: { id: user.id, email: user.email, username: user.username } }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error in sign-in route:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
