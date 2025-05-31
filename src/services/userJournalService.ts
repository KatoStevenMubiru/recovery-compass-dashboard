import authService from "./authService";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface UserJournalEntry {
  id: number;
  user: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const userJournalService = {
  async getAllJournalEntries(): Promise<UserJournalEntry[]> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/journal-entries/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch journal entries");
    return response.json();
  },

  async createJournalEntry(data: {
    title: string;
    content: string;
  }): Promise<UserJournalEntry> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/journal-entries/`, {
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

  async updateJournalEntry(
    id: number,
    data: { title: string; content: string }
  ): Promise<UserJournalEntry> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/journal-entries/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to update journal entry");
    return response.json();
  },

  async deleteJournalEntry(id: number): Promise<void> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/journal-entries/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to delete journal entry");
  },

  async getJournalEntry(id: number): Promise<UserJournalEntry> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/journal-entries/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch journal entry");
    return response.json();
  },
};
