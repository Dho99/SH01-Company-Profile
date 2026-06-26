import api, { AxiosError } from "./api";

export type LoginInput = { email: string; password: string };
export type LoginResult = { success: true } | { error: string };

export async function loginUser(data: LoginInput): Promise<LoginResult> {
  try {
    await api.post("/auth/login", data);
    return { success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error || "Something went wrong. Please try again.";
      return { error: message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export async function logout() {
  await api.post("/auth/logout");
  window.location.href = "/login";
}
