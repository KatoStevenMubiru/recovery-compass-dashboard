import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import authService from "@/services/authService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck, MailWarning, Loader2 } from "lucide-react";

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [resendMessage, setResendMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/users/verify-email/${token}/`
        );
        const data = await response.json();
        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified! You can now log in.");
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
          if (data.error && data.error.toLowerCase().includes("expired")) {
            setShowResend(true);
          }
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification.");
      }
    };
    if (token) verify();
  }, [token]);

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendStatus("sending");
    setResendMessage("");
    try {
      const res = await authService.resendVerification(resendEmail);
      setResendStatus("sent");
      setResendMessage(res.message);
    } catch (error: unknown) {
      setResendStatus("error");
      let msg = "Failed to resend verification email.";
      if (error instanceof Error) {
        msg = error.message;
      }
      setResendMessage(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 gradient-card">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          {status === "success" ? (
            <MailCheck className="h-10 w-10 text-green-500 mb-2" />
          ) : status === "error" ? (
            <MailWarning className="h-10 w-10 text-destructive mb-2" />
          ) : (
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
          )}
          <CardTitle className="text-2xl font-bold text-center">
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === "verifying" && (
            <Alert className="mb-4">
              <AlertTitle>Verifying your email...</AlertTitle>
              <AlertDescription>
                Please wait while we verify your email address.
              </AlertDescription>
            </Alert>
          )}
          {status === "success" && (
            <Alert variant="default" className="mb-4">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          {status === "error" && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          {status === "success" && (
            <Button className="w-full mt-2" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          )}
          {showResend && (
            <form
              onSubmit={handleResendVerification}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <p className="mb-2 text-sm text-muted-foreground text-center">
                Your verification link has expired. Enter your email to resend
                the verification email.
              </p>
              <Input
                type="email"
                placeholder="Enter your email"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button
                type="submit"
                className="w-full"
                disabled={resendStatus === "sending"}
              >
                {resendStatus === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Resending...
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </Button>
              {resendStatus === "sent" && (
                <Alert variant="default" className="mt-2 w-full">
                  <AlertDescription>{resendMessage}</AlertDescription>
                </Alert>
              )}
              {resendStatus === "error" && (
                <Alert variant="destructive" className="mt-2 w-full">
                  <AlertDescription>{resendMessage}</AlertDescription>
                </Alert>
              )}
            </form>
          )}
          {status === "error" && !showResend && (
            <div className="mt-4 text-center">
              <Link to="/login" className="text-primary underline">
                Back to Login
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
