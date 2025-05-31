import authService from "./authService";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface CrisisReport {
  id: number;
  emergency_description: string;
  contact_preference: "PHONE" | "EMAIL" | "SMS" | "WHATSAPP";
  urgency_level: "LOW" | "MEDIUM" | "HIGH";
  academic_impact?: string;
  created_at: string;
  user_anon_name: string;
}

export const crisisReportService = {
  async getAll(): Promise<CrisisReport[]> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/crisis-reports/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch crisis reports");
    return response.json();
  },

  async create(data: {
    emergency_description: string;
    contact_preference: "PHONE" | "EMAIL" | "SMS" | "WHATSAPP";
    urgency_level: "LOW" | "MEDIUM" | "HIGH";
    academic_impact?: string;
  }): Promise<CrisisReport> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/crisis-reports/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create crisis report");
    return response.json();
  },

  async update(
    id: number,
    data: Partial<Omit<CrisisReport, "id" | "created_at" | "user_anon_name">>
  ): Promise<CrisisReport> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/crisis-reports/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to update crisis report");
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/crisis-reports/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to delete crisis report");
  },

  async get(id: number): Promise<CrisisReport> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/crisis-reports/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch crisis report");
    return response.json();
  },
};
