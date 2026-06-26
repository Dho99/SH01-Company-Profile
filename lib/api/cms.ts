import api from "./api";

export async function apiDelete(endpoint: string) {
  await api.delete(endpoint);
}
