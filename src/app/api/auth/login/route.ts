import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { sign } from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log('Attempting login for:', email);

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Login error:", err);
    const error = err as Error;
    return NextResponse.json(
      { error: "Internal server error", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
} 