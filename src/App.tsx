import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RecoveryProgress from "./pages/Progress";
import Emergency from "./pages/Emergency";
import DailyReports from "./pages/DailyReports";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import Medication from "./pages/Medication";
import { useState } from "react";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/progress" element={<RecoveryProgress />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/daily-reports" element={<DailyReports />} />
            <Route path="/community" element={<Community />} />
            <Route path="/medication" element={<Medication />} />
            <Route path="/journal" element={<NotFound />} />
            <Route path="/appointments" element={<NotFound />} />
            <Route path="/support" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
            <Route path="/help" element={<NotFound />} />
            <Route path="/logout" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
