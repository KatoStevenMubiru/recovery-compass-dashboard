import { useMutation } from "@tanstack/react-query";
import authService from "@/services/authService";
import { AuthContext } from "@/contexts/AuthContext";

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => authService.requestPasswordReset(email),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      token,
      new_password,
      confirm_password,
    }: {
      token: string;
      new_password: string;
      confirm_password: string;
    }) => authService.resetPassword(token, new_password, confirm_password),
  });
}
