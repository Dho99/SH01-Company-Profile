"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema } from "@/lib/cms/schemas";
import type { LoginInput } from "@/lib/api/auth";
import { loginUser } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginInput) {
    const result = await loginUser(data);

    if ("error" in result) {
      toast.error(result.error);
      return;
    }

    toast.success("Signed in successfully");
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="relative hidden overflow-hidden bg-navy-deep px-12 lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/10" />
        <div className="absolute -bottom-32 -right-12 h-96 w-96 rounded-full bg-brand/8" />
        <div className="absolute right-0 top-1/3 h-48 w-48 rounded-full bg-white/3" />

        <div className="relative z-10 w-full max-w-sm text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/20 ring-1 ring-brand/30">
            <span className="text-2xl font-black text-brand">L</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            LEXA CMS
          </h1>

          <p className="mt-3 text-base leading-relaxed text-white/60">
            Manage your company profile content with confidence and ease.
          </p>

          <div className="mt-10 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:hidden">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-deep">
              <span className="text-lg font-black text-brand">L</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Sign in to your admin account to continue.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-2 h-10 w-full bg-navy-deep text-white hover:bg-navy-deep/90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing in…" : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}