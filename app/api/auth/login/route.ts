import { NextResponse } from "next/server";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/lib/cms/schemas";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }
    throw error;
  }
}
