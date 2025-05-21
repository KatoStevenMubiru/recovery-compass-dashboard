import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  medicationService,
  type Medication,
  type MedicationAdherence,
} from "@/services/medicationService";
import authService from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";

// Hook for managing medications
export function useMedications() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: medications, isLoading } = useQuery({
    queryKey: ["medications"],
    queryFn: () =>
      medicationService.getMedications(authService.getAccessToken()),
  });

  const createMedication = useMutation({
    mutationFn: (data: Omit<Medication, "id">) =>
      medicationService.createMedication(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      toast({
        title: "Success",
        description: "Medication created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create medication",
        variant: "destructive",
      });
    },
  });

  const updateMedication = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<Medication, "id">>;
    }) =>
      medicationService.updateMedication(
        authService.getAccessToken(),
        id,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      toast({
        title: "Success",
        description: "Medication updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update medication",
        variant: "destructive",
      });
    },
  });

  const deleteMedication = useMutation({
    mutationFn: (id: number) =>
      medicationService.deleteMedication(authService.getAccessToken(), id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      toast({
        title: "Success",
        description: "Medication deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete medication",
        variant: "destructive",
      });
    },
  });

  return {
    medications,
    isLoading,
    createMedication,
    updateMedication,
    deleteMedication,
  };
}

// Hook for medication adherence
export function useMedicationAdherence(medicationId?: number) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: todayAdherence, isLoading: isLoadingToday } = useQuery({
    queryKey: ["medication-adherence", "today"],
    queryFn: () =>
      medicationService.getTodayAdherence(authService.getAccessToken()),
  });

  const { data: adherenceHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["medication-adherence", medicationId],
    queryFn: () =>
      medicationId
        ? medicationService.getAdherenceHistory(
            authService.getAccessToken(),
            medicationId
          )
        : null,
    enabled: !!medicationId,
  });

  const logAdherence = useMutation({
    mutationFn: (data: Omit<MedicationAdherence, "id" | "date">) =>
      medicationService.logAdherence(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medication-adherence"] });
      toast({
        title: "Success",
        description: "Medication adherence logged successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to log medication adherence",
        variant: "destructive",
      });
    },
  });

  return {
    todayAdherence,
    adherenceHistory,
    isLoadingToday,
    isLoadingHistory,
    logAdherence,
  };
}

// Hook for side effects
export function useSideEffects(medicationId?: number) {
  const { data: sideEffects, isLoading } = useQuery({
    queryKey: ["medication-side-effects", medicationId],
    queryFn: () =>
      medicationId
        ? medicationService.getSideEffects(
            authService.getAccessToken(),
            medicationId
          )
        : null,
    enabled: !!medicationId,
  });

  return {
    sideEffects,
    isLoading,
  };
}
