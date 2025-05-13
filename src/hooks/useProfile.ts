import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authService.getProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: authService.deleteAccount,
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: ({
      current_password,
      new_password,
    }: {
      current_password: string;
      new_password: string;
    }) => authService.updatePassword(current_password, new_password),
  });
}
