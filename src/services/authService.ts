import { AuthResponse, LoginCredentials, User } from "@/types/auth";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log("API_URL", API_URL);
    const response = await fetch(`${API_URL}api/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },

  getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  },

  getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  },

  getUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  setAuthData(data: AuthResponse) {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));
  },
};
