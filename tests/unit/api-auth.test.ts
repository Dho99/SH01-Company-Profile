import { describe, it, expect, vi, beforeEach } from "vitest";

// ============================================================
// Unit Test: API Auth Helpers (@/lib/api/auth.ts)
// Menguji loginUser() dan logout()
// ============================================================

// Mock axios-based api module
const mockPost = vi.fn();
vi.mock("@/lib/api/api", () => {
  // Buat class AxiosError tiruan untuk pengujian error handling
  class MockAxiosError extends Error {
    response?: { data?: { error?: string } };
    constructor(message: string, response?: { data?: { error?: string } }) {
      super(message);
      this.name = "AxiosError";
      this.response = response;
    }
  }

  return {
    default: { post: mockPost },
    AxiosError: MockAxiosError,
  };
});

beforeEach(() => {
  mockPost.mockReset();
});

describe("loginUser()", () => {
  it("mengembalikan { success: true } saat login berhasil", async () => {
    mockPost.mockResolvedValue({ data: { success: true } });

    const { loginUser } = await import("@/lib/api/auth");
    const result = await loginUser({
      email: "admin@lexatech.id",
      password: "admin123",
    });

    expect(result).toEqual({ success: true });
    expect(mockPost).toHaveBeenCalledWith("/auth/login", {
      email: "admin@lexatech.id",
      password: "admin123",
    });
  });

  it("mengembalikan pesan error dari server (AxiosError)", async () => {
    // Import AxiosError dari mock kita
    const { AxiosError } = await import("@/lib/api/api");
    const axiosErr = new AxiosError("Request failed");
    (axiosErr as { response?: { data?: { error?: string } } }).response = {
      data: { error: "Invalid email or password" },
    };
    mockPost.mockRejectedValue(axiosErr);

    const { loginUser } = await import("@/lib/api/auth");
    const result = await loginUser({
      email: "admin@lexatech.id",
      password: "wrong",
    });

    expect(result).toEqual({ error: "Invalid email or password" });
  });

  it('mengembalikan pesan fallback jika AxiosError tanpa response data', async () => {
    const { AxiosError } = await import("@/lib/api/api");
    const axiosErr = new AxiosError("Network error");
    mockPost.mockRejectedValue(axiosErr);

    const { loginUser } = await import("@/lib/api/auth");
    const result = await loginUser({
      email: "admin@lexatech.id",
      password: "admin123",
    });

    expect(result).toEqual({ error: "Something went wrong. Please try again." });
  });

  it("mengembalikan pesan error generik untuk error non-Axios", async () => {
    mockPost.mockRejectedValue(new Error("Unknown failure"));

    const { loginUser } = await import("@/lib/api/auth");
    const result = await loginUser({
      email: "admin@lexatech.id",
      password: "admin123",
    });

    expect(result).toEqual({ error: "Something went wrong. Please try again." });
  });
});

describe("logout()", () => {
  it("memanggil POST /auth/logout dan meredirect ke /login", async () => {
    mockPost.mockResolvedValue({ data: { success: true } });

    // Mock window.location untuk environment Node
    const mockLocation = { href: "" };
    vi.stubGlobal("window", { location: mockLocation });

    const { logout } = await import("@/lib/api/auth");
    await logout();

    expect(mockPost).toHaveBeenCalledWith("/auth/logout");
    expect(mockLocation.href).toBe("/login");

    vi.unstubAllGlobals();
  });
});
