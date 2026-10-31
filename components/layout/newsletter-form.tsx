"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

type NewsletterActionState = {
  status: "idle" | "success" | "info" | "error";
  message: string;
};

const initialState: NewsletterActionState = {
  status: "idle",
  message: "",
};

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  return (
    <form action={formAction} className="mt-4 space-y-2">
      <Input
        type="email"
        name="email"
        required
        maxLength={254}
        autoComplete="email"
        placeholder="Your email address"
        aria-label="Your email address"
        aria-invalid={state.status === "error"}
        aria-describedby="newsletter-status"
        className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
      />

      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-md"
      >
        {pending ? "Subscribing..." : "Subscribe"}
      </Button>

      <p
        id="newsletter-status"
        role={state.status === "error" ? "alert" : "status"}
        aria-live={state.status === "error" ? "assertive" : "polite"}
        className={
          state.status === "error"
            ? "text-sm text-red-300"
            : state.status === "idle"
              ? "sr-only"
              : "text-sm text-white/80"
        }
      >
        {state.message}
      </p>
    </form>
  );
}
