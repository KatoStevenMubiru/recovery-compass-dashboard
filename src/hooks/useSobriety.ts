import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import authService from "@/services/authService";
import { sobrietyService } from "@/services/sobrietyService";

export function useTodaySobriety() {
  return useQuery({
    queryKey: ["sobriety", "today"],
    queryFn: () =>
      sobrietyService.getTodaySobriety(authService.getAccessToken()),
  });
}

export function useCreateSobriety() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      sober_date: string;
      last_relapse_date?: string;
      relapse_count: number;
    }) =>
      sobrietyService.createSobrietyEntry(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sobriety", "today"] });
    },
  });
}

export function useUpdateSobriety() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      sober_date?: string;
      last_relapse_date?: string;
      relapse_count?: number;
    }) =>
      sobrietyService.updateSobrietyEntry(authService.getAccessToken(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sobriety", "today"] });
    },
  });
}
