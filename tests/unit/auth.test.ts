import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";

// ============================================================
// Unit Test: Auth Configuration (@/lib/auth.ts)
// Menguji authorize, jwt callback, session callback, dan redirect
// ============================================================

// Mock bcryptjs
const mockCompare = vi.fn();
vi.mock("bcryptjs", () => ({ default: { compare: mockCompare } }));

// Mock prisma
const mockFindUnique = vi.fn();
vi.mock("@/lib/db", () => ({
  prisma: {
    user: { findUnique: mockFindUnique },
  },
}));

// Mock PrismaAdapter
vi.mock("@auth/prisma-adapter", () => ({
  PrismaAdapter: vi.fn(() => ({})),
}));

// Tangkap konfigurasi NextAuth dan authorize function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let capturedConfig: Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let capturedAuthorize: (credentials: any) => Promise<any>;

vi.mock("next-auth/providers/credentials", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (opts: any) => {
    capturedAuthorize = opts.authorize;
    return { id: "credentials", type: "credentials", ...opts };
  },
}));

vi.mock("next-auth", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (config: Record<string, any>) => {
    capturedConfig = config;
    return { handlers: {}, auth: vi.fn(), signIn: vi.fn(), signOut: vi.fn() };
  },
}));

// Await import dalam beforeAll agar capturedConfig dan capturedAuthorize terisi
beforeAll(async () => {
  await import("@/lib/auth");
});

beforeEach(() => {
  mockFindUnique.mockReset();
  mockCompare.mockReset();
});

// ============================================================
// 1. authorize() — Fungsi autentikasi credentials
// ============================================================
describe("authorize()", () => {
  it("mengembalikan user saat email dan password valid", async () => {
    const mockUser = {
      id: "user-1",
      email: "admin@lexatech.id",
      name: "Admin",
      role: "ADMIN",
      passwordHash: "$2a$12$hashedpassword",
    };

    mockFindUnique.mockResolvedValue(mockUser);
    mockCompare.mockResolvedValue(true);

    const result = await capturedAuthorize({
      email: "admin@lexatech.id",
      password: "admin123",
    });

    expect(result).toEqual({
      id: "user-1",
      email: "admin@lexatech.id",
      name: "Admin",
      role: "ADMIN",
    });
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: "admin@lexatech.id" },
    });
    expect(mockCompare).toHaveBeenCalledWith(
      "admin123",
      "$2a$12$hashedpassword"
    );
  });

  it("mengembalikan null saat user tidak ditemukan", async () => {
    mockFindUnique.mockResolvedValue(null);

    const result = await capturedAuthorize({
      email: "notfound@test.com",
      password: "password",
    });

    expect(result).toBeNull();
    expect(mockCompare).not.toHaveBeenCalled();
  });

  it("mengembalikan null saat user tidak memiliki passwordHash", async () => {
    mockFindUnique.mockResolvedValue({
      id: "user-2",
      email: "no-password@test.com",
      name: "No Password",
      passwordHash: null,
    });

    const result = await capturedAuthorize({
      email: "no-password@test.com",
      password: "anything",
    });

    expect(result).toBeNull();
    expect(mockCompare).not.toHaveBeenCalled();
  });

  it("mengembalikan null saat password salah", async () => {
    mockFindUnique.mockResolvedValue({
      id: "user-1",
      email: "admin@lexatech.id",
      name: "Admin",
      role: "ADMIN",
      passwordHash: "$2a$12$hashedpassword",
    });
    mockCompare.mockResolvedValue(false);

    const result = await capturedAuthorize({
      email: "admin@lexatech.id",
      password: "wrongpassword",
    });

    expect(result).toBeNull();
  });
});

// ============================================================
// 2. jwt callback — Menyimpan role dan id ke JWT token
// ============================================================
describe("jwt callback", () => {
  it("menyimpan role dan id ke token saat user ada", async () => {
    const jwtCallback = capturedConfig.callbacks.jwt;

    const token = { sub: "some-sub" };
    const user = { id: "user-1", role: "ADMIN" };

    const result = await jwtCallback({ token, user });

    expect(result.role).toBe("ADMIN");
    expect(result.id).toBe("user-1");
  });

  it("tidak menimpa token saat user tidak tersedia (subsequent request)", async () => {
    const jwtCallback = capturedConfig.callbacks.jwt;

    const token = { sub: "some-sub", role: "ADMIN", id: "user-1" };

    const result = await jwtCallback({ token, user: undefined });

    // Token tetap mempertahankan nilai yang sudah ada
    expect(result.role).toBe("ADMIN");
    expect(result.id).toBe("user-1");
  });
});

// ============================================================
// 3. session callback — Meneruskan role dan id ke session user
// ============================================================
describe("session callback", () => {
  it("meneruskan role dan id dari token ke session.user", async () => {
    const sessionCallback = capturedConfig.callbacks.session;

    const session = { user: { email: "admin@lexatech.id" } };
    const token = { role: "ADMIN", id: "user-1" };

    const result = await sessionCallback({ session, token });

    expect((result.user as Record<string, unknown>).role).toBe("ADMIN");
    expect((result.user as Record<string, unknown>).id).toBe("user-1");
  });

  it("mengembalikan session tanpa perubahan jika session.user tidak ada", async () => {
    const sessionCallback = capturedConfig.callbacks.session;

    const session = {};
    const token = { role: "ADMIN", id: "user-1" };

    const result = await sessionCallback({ session, token });

    // Tidak ada user property, tidak crash
    expect(result).toEqual({});
  });
});

// ============================================================
// 4. redirect callback — Redirect dari / ke /admin
// ============================================================
describe("redirect callback", () => {
  it("melakukan redirect dari / ke /admin", async () => {
    const redirectCallback = capturedConfig.callbacks.redirect;

    const result = await redirectCallback({
      url: "/",
      baseUrl: "http://localhost:3000",
    });

    expect(result).toBe("http://localhost:3000/admin");
  });

  it("mengembalikan URL asli untuk path selain /", async () => {
    const redirectCallback = capturedConfig.callbacks.redirect;

    const result = await redirectCallback({
      url: "/some-page",
      baseUrl: "http://localhost:3000",
    });

    expect(result).toBe("/some-page");
  });
});
