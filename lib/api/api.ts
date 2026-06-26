import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
    (res) => res,
    (error: AxiosError<{ error?: string }>) => {
        const message =
            error.response?.data?.error ?? error.message ?? "Something went wrong";
        error.message = message;
        return Promise.reject(error);
    },
);

export default api;
export { AxiosError };
