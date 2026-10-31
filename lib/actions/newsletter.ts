"use server";

import { z } from "zod";

import { prisma } from "@/lib/db";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(254, "Email address must be 254 characters or fewer."),
});

type NewsletterActionState = {
  status: "idle" | "success" | "info" | "error";
  message: string;
};

export async function subscribeToNewsletter(
  _previousState: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const result = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0]?.message ?? "Please enter a valid email address.",
    };
  }

  const { count } = await prisma.newsletterSubscriber.createMany({
    data: [{ email: result.data.email }],
    skipDuplicates: true,
  });

  if (count === 0) {
    return {
      status: "info",
      message: "This email is already subscribed.",
    };
  }

  return {
    status: "success",
    message: "Thanks for subscribing! You’re on the list.",
  };
}
