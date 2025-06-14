import api from "./api";

export const authApi = {
  login: (data: { username: string; password: string }) =>
    api.post("/auth/login", data),
  register: (data: { name: string; username: string; password: string }) =>
    api.post("/user/register", data),
  getCurrentUser: () => api.get("/user/me"),
};
