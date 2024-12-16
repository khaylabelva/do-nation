import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Input validation
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
      });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 409,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        username: name,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ message: 'User created successfully', user: newUser }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error in signup route:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
