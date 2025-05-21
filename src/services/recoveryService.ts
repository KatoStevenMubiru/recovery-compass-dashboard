const API_URL = import.meta.env.VITE_BACKEND_URL;

interface DailyCheckIn {
  id: number;
  user: number;
  date: string;
  mood: number;
  cravings: number;
  mood_notes: string;
  academic_impact: number;
}

interface JournalEntry {
  id: number;
  user: number;
  date: string;
  entry: string;
}

interface MedicationRecord {
  id: number;
  user: number;
  date: string;
  taken: boolean;
}

interface Goal {
  id: number;
  user: number;
  date: string;
  description: string;
  accomplished: boolean;
}

interface GoalProgress {
  total_goals: number;
  accomplished: number;
  progress_rate: number;
}

interface RiskScore {
  risk_score: number | null;
  detail?: string;
}

interface DailyReport {
  id: number;
  date: string;
  mood: number | null;
  cravings: number | null;
  mood_notes: string | null;
  academic_impact: number | null;
  journal_entry: string | null;
  medication_taken: boolean | null;
  risk_score: number;
  days_sober: number | null;
  days_in_recovery: number | null;
  relapse_count: number | null;
  last_relapse_date: string | null;
  sober_date: string | null;
  goals_completed: number;
  total_goals: number;
  goals_progress: number;
}

export const recoveryService = {
  // Daily Check-in
  async getDailyCheckIn(token: string): Promise<DailyCheckIn> {
    const response = await fetch(`${API_URL}api/recovery/daily-checkin/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch daily check-in");
    return response.json();
  },

  async createDailyCheckIn(
    token: string,
    data: {
      mood: number;
      cravings: number;
      mood_notes: string;
      academic_impact: number;
    }
  ): Promise<DailyCheckIn> {
    const response = await fetch(`${API_URL}api/recovery/daily-checkin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create daily check-in");
    return response.json();
  },

  async updateDailyCheckIn(
    token: string,
    data: Partial<{
      mood: number;
      cravings: number;
      mood_notes: string;
      academic_impact: number;
    }>
  ): Promise<DailyCheckIn> {
    const response = await fetch(`${API_URL}api/recovery/daily-checkin/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update daily check-in");
    return response.json();
  },

  // Journal
  async getJournal(token: string): Promise<JournalEntry> {
    const response = await fetch(`${API_URL}api/recovery/journal/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch journal entry");
    return response.json();
  },

  async createJournal(
    token: string,
    data: { entry: string }
  ): Promise<JournalEntry> {
    const response = await fetch(`${API_URL}api/recovery/journal/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create journal entry");
    return response.json();
  },

  async updateJournal(
    token: string,
    data: { entry: string }
  ): Promise<JournalEntry> {
    const response = await fetch(`${API_URL}api/recovery/journal/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update journal entry");
    return response.json();
  },

  // Medication
  async getMedication(token: string): Promise<MedicationRecord> {
    const response = await fetch(`${API_URL}api/recovery/medication/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch medication record");
    return response.json();
  },

  async createMedication(
    token: string,
    data: { taken: boolean }
  ): Promise<MedicationRecord> {
    const response = await fetch(`${API_URL}api/recovery/medication/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create medication record");
    return response.json();
  },

  async updateMedication(
    token: string,
    data: { taken: boolean }
  ): Promise<MedicationRecord> {
    const response = await fetch(`${API_URL}api/recovery/medication/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update medication record");
    return response.json();
  },

  async getMonthlyAdherenceRate(
    token: string
  ): Promise<{ monthly_adherence_rate: number }> {
    const response = await fetch(
      `${API_URL}api/recovery/medication/monthly-rate/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch monthly adherence rate");
    return response.json();
  },

  // Goals
  async getGoals(token: string): Promise<Goal[]> {
    const response = await fetch(`${API_URL}api/recovery/goals/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch goals");
    return response.json();
  },

  async createGoal(
    token: string,
    data: { description: string; accomplished: boolean }
  ): Promise<Goal> {
    const response = await fetch(`${API_URL}api/recovery/goals/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create goal");
    return response.json();
  },

  async updateGoal(
    token: string,
    goalId: number,
    data: { accomplished: boolean }
  ): Promise<Goal> {
    const response = await fetch(`${API_URL}api/recovery/goals/${goalId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update goal");
    return response.json();
  },

  async getGoalProgress(token: string): Promise<GoalProgress> {
    const response = await fetch(`${API_URL}api/recovery/goals/progress/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch goal progress");
    return response.json();
  },

  // Risk Score
  async getRiskScore(token: string): Promise<RiskScore> {
    const response = await fetch(`${API_URL}api/recovery/risk-score/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch risk score");
    return response.json();
  },

  // Daily Report
  async getDailyReport(token: string, date?: string): Promise<DailyReport> {
    const url = date
      ? `${API_URL}api/recovery/daily-report/?date=${date}`
      : `${API_URL}api/recovery/daily-report/`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch daily report");
    return response.json();
  },
};
