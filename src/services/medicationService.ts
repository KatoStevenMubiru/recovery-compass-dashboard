const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: "daily" | "twice_daily" | "weekly" | "as_needed" | "other";
  instructions: string;
  supports_academic: boolean;
}

export interface MedicationAdherence {
  id: number;
  medication_id: number;
  medication_name: string;
  taken: boolean;
  time_taken?: string;
  effectiveness_rating?: number;
  notes?: string;
  side_effects?: string;
  date: string;
}

export interface AdherenceStatistics {
  total_days: number;
  taken_days: number;
  adherence_rate: number;
  average_effectiveness: number;
}

export interface AdherenceHistory {
  logs: MedicationAdherence[];
  statistics: AdherenceStatistics;
}

export interface SideEffectRecord {
  date: string;
  side_effects: string;
  effectiveness_rating: number;
}

export const medicationService = {
  // Medication Management
  async getMedications(token: string): Promise<Medication[]> {
    const response = await fetch(`${API_URL}api/recovery/medications/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch medications");
    return response.json();
  },

  async createMedication(
    token: string,
    data: Omit<Medication, "id">
  ): Promise<Medication> {
    const response = await fetch(`${API_URL}api/recovery/medications/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create medication");
    return response.json();
  },

  async updateMedication(
    token: string,
    id: number,
    data: Partial<Omit<Medication, "id">>
  ): Promise<Medication> {
    const response = await fetch(`${API_URL}api/recovery/medications/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update medication");
    return response.json();
  },

  async deleteMedication(token: string, id: number): Promise<void> {
    const response = await fetch(`${API_URL}api/recovery/medications/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to delete medication");
  },

  // Medication Adherence
  async logAdherence(
    token: string,
    data: Omit<MedicationAdherence, "id" | "date">
  ): Promise<MedicationAdherence> {
    console.log(
      "API Request URL:",
      `${API_URL}api/recovery/medications/adherence/`
    );
    console.log("API Request Data:", data);

    const response = await fetch(
      `${API_URL}api/recovery/medications/adherence/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error Response:", errorData);
      throw new Error("Failed to log adherence");
    }

    return response.json();
  },

  async getTodayAdherence(token: string): Promise<MedicationAdherence[]> {
    const response = await fetch(
      `${API_URL}api/recovery/medications/adherence/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch today's adherence");
    return response.json();
  },

  async getAdherenceHistory(
    token: string,
    medicationId: number,
    startDate?: string,
    endDate?: string
  ): Promise<AdherenceHistory> {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const response = await fetch(
      `${API_URL}api/recovery/medications/${medicationId}/adherence/?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch adherence history");
    return response.json();
  },

  async getSideEffects(
    token: string,
    medicationId: number
  ): Promise<SideEffectRecord[]> {
    const response = await fetch(
      `${API_URL}api/recovery/medications/${medicationId}/side-effects/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch side effects");
    return response.json();
  },
};
