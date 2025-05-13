import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import RecoveryProgress from "./pages/Progress";
import Emergency from "./pages/Emergency";
import DailyReports from "./pages/DailyReports";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import Medication from "./pages/Medication";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Appointments from "./pages/Appointments";
import { useState } from "react";
import ChatbotWidget from "@/components/ui/ChatbotWidget";
import { AppointmentsProvider } from "./contexts/AppointmentsContext";
import { SobrietyProvider } from "./contexts/SobrietyContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SobrietyProvider>
            <AppointmentsProvider>
              <TooltipProvider>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Index />} />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/progress" element={<RecoveryProgress />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/daily-reports" element={<DailyReports />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/medication" element={<Medication />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/support" element={<NotFound />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/logout" element={<NotFound />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
                <ChatbotWidget />
              </TooltipProvider>
            </AppointmentsProvider>
          </SobrietyProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
