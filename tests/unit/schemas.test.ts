import { describe, it, expect } from "vitest";
import { loginSchema } from "@/lib/cms/schemas";

// ============================================================
// Unit Test: Login Schema Validation (@/lib/cms/schemas.ts)
// Menguji validasi Zod untuk login form
// ============================================================

describe("loginSchema", () => {
  it("menerima email dan password yang valid", () => {
    const result = loginSchema.safeParse({
      email: "admin@lexatech.id",
      password: "admin123",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("admin@lexatech.id");
      expect(result.data.password).toBe("admin123");
    }
  });

  it("menolak email yang tidak valid", () => {
    const result = loginSchema.safeParse({
      email: "bukan-email",
      password: "admin123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find(
        (issue) => issue.path[0] === "email"
      );
      expect(emailError).toBeDefined();
      expect(emailError!.message).toBe("Valid email is required");
    }
  });

  it("menolak email yang kosong", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "admin123",
    });

    expect(result.success).toBe(false);
  });

  it("menolak password yang kosong", () => {
    const result = loginSchema.safeParse({
      email: "admin@lexatech.id",
      password: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find(
        (issue) => issue.path[0] === "password"
      );
      expect(passwordError).toBeDefined();
      expect(passwordError!.message).toBe("Password is required");
    }
  });

  it("menolak jika email dan password keduanya kosong", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("menolak jika field email tidak ada", () => {
    const result = loginSchema.safeParse({
      password: "admin123",
    });

    expect(result.success).toBe(false);
  });

  it("menolak jika field password tidak ada", () => {
    const result = loginSchema.safeParse({
      email: "admin@lexatech.id",
    });

    expect(result.success).toBe(false);
  });
});
