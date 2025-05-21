import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import authService from "@/services/authService";
import { recoveryService } from "@/services/recoveryService";

// Daily Check-in
export function useDailyCheckIn() {
  return useQuery({
    queryKey: ["daily-checkin"],
    queryFn: () =>
      recoveryService.getDailyCheckIn(authService.getAccessToken()),
  });
}

export function useCreateDailyCheckIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      mood: number;
      cravings: number;
      mood_notes: string;
      academic_impact: number;
    }) =>
      recoveryService.createDailyCheckIn(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-checkin"] });
    },
  });
}

export function useUpdateDailyCheckIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      mood?: number;
      cravings?: number;
      mood_notes?: string;
      academic_impact?: number;
    }) =>
      recoveryService.updateDailyCheckIn(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-checkin"] });
    },
  });
}

// Journal
export function useJournal() {
  return useQuery({
    queryKey: ["journal"],
    queryFn: () => recoveryService.getJournal(authService.getAccessToken()),
  });
}

export function useCreateJournal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { entry: string }) =>
      recoveryService.createJournal(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal"] });
    },
  });
}

export function useUpdateJournal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { entry: string }) =>
      recoveryService.updateJournal(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal"] });
    },
  });
}

// Medication
export function useMedication() {
  return useQuery({
    queryKey: ["medication"],
    queryFn: () => recoveryService.getMedication(authService.getAccessToken()),
  });
}

export function useCreateMedication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { taken: boolean }) =>
      recoveryService.createMedication(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medication"] });
      queryClient.invalidateQueries({ queryKey: ["medication-rate"] });
    },
  });
}

export function useUpdateMedication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { taken: boolean }) =>
      recoveryService.updateMedication(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medication"] });
      queryClient.invalidateQueries({ queryKey: ["medication-rate"] });
    },
  });
}

export function useMonthlyAdherenceRate() {
  return useQuery({
    queryKey: ["medication-rate"],
    queryFn: () =>
      recoveryService.getMonthlyAdherenceRate(authService.getAccessToken()),
  });
}

// Goals
export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: () => recoveryService.getGoals(authService.getAccessToken()),
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { description: string; accomplished: boolean }) =>
      recoveryService.createGoal(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goal-progress"] });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      goalId,
      data,
    }: {
      goalId: number;
      data: { accomplished: boolean };
    }) =>
      recoveryService.updateGoal(authService.getAccessToken(), goalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goal-progress"] });
    },
  });
}

export function useGoalProgress() {
  return useQuery({
    queryKey: ["goal-progress"],
    queryFn: () =>
      recoveryService.getGoalProgress(authService.getAccessToken()),
  });
}

// Risk Score
export function useRiskScore() {
  return useQuery({
    queryKey: ["risk-score"],
    queryFn: () => recoveryService.getRiskScore(authService.getAccessToken()),
  });
}
