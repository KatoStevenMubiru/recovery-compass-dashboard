const API_URL = import.meta.env.VITE_BACKEND_URL;

interface SobrietyData {
  id: number;
  user: number;
  date: string;
  sober_date: string;
  last_relapse_date: string | null;
  relapse_count: number;
  days_sober: number;
  days_in_recovery: number;
}

interface SobrietyResponse {
  data: SobrietyData | null;
  is_today: boolean;
  message: string;
  last_entry_date?: string;
}

export const sobrietyService = {
  async getTodaySobriety(token: string): Promise<SobrietyResponse> {
    const response = await fetch(`${API_URL}api/recovery/sobriety/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        const data = await response.json();
        return data;
      }
      throw new Error("Failed to fetch sobriety entry");
    }
    return response.json();
  },

  async createSobrietyEntry(
    token: string,
    data: {
      sober_date: string;
      last_relapse_date?: string;
      relapse_count: number;
    }
  ): Promise<SobrietyData> {
    const response = await fetch(`${API_URL}api/recovery/sobriety/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create sobriety entry");
    return response.json();
  },

  async updateSobrietyEntry(
    token: string,
    data: {
      sober_date?: string;
      last_relapse_date?: string;
      relapse_count?: number;
    }
  ): Promise<SobrietyData> {
    const response = await fetch(`${API_URL}api/recovery/sobriety/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update sobriety entry");
    return response.json();
  },
};
