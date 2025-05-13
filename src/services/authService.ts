import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth";
import { authFetch } from "./authFetch";

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

  async register(data: RegisterCredentials): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}api/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      console.error("Registration error:", error);
      throw new Error(error.detail || "Registration failed");
    }
    return response.json();
  },

  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}api/users/verify-email/${token}/`, {
      method: "GET",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Verification failed");
    }
    return response.json();
  },

  async resendVerification(email: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}api/users/resend-verification/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to resend verification email");
    }
    return data;
  },

  async refreshToken(refresh: string): Promise<{ access: string }> {
    const response = await fetch(`${API_URL}api/users/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to refresh token");
    }
    return data;
  },

  async getProfile() {
    const response = await authFetch(`${API_URL}api/users/profile/`);
    if (!response.ok) throw new Error("Failed to fetch profile");
    return response.json();
  },

  async updateProfile(data: Partial<User>) {
    const response = await authFetch(`${API_URL}api/users/profile/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update profile");
    return response.json();
  },

  async updatePassword(current_password: string, new_password: string) {
    const response = await authFetch(`${API_URL}api/users/profile/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current_password, new_password }),
    });
    if (!response.ok) throw new Error("Failed to update password");
    return response.json();
  },

  async deleteAccount(password: string) {
    const response = await authFetch(`${API_URL}api/users/profile/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) throw new Error("Failed to delete account");
    return response.json();
  },
};
