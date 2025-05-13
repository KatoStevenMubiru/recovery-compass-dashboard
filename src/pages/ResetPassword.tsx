import React, { useState } from "react";
import { useResetPassword } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useParams, useNavigate } from "react-router-dom";

// Mock logo - replace with actual logo if you have one
const Logo = () => (
  <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
    <span className="text-primary-foreground text-2xl font-bold">RC</span>
  </div>
);

const ResetPassword = () => {
  const { token = "" } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate, isPending } = useResetPassword();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { token, new_password: newPassword, confirm_password: confirmPassword },
      {
        onSuccess: (data) => {
          toast({
            title: "Success",
            description: data.message,
          });
          setTimeout(() => navigate("/login"), 2000);
        },
        onError: (error: unknown) => {
          let message = "Failed to reset password.";
          if (error instanceof Error) message = error.message;
          console.error("Reset password error:", error);
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold">Recovery Compass</h1>
          <p className="text-muted-foreground">
            Your journey to wellness starts here
          </p>
        </div>
        <div className="bg-white rounded shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Reset Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} COCIS, Makerere University. All rights
          reserved.
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
