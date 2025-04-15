
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DailyReportHeader } from "@/components/daily-reports/DailyReportHeader";
import { SobrietyStatus } from "@/components/daily-reports/SobrietyStatus";
import { ProgressIndicators } from "@/components/daily-reports/ProgressIndicators";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock data for the daily report
const mockDailyReport = {
  date: "2025-04-14",
  sobriety: "32 days",
  mood: [
    { time: "08:30", mood: "happy" },
    { time: "13:15", mood: "anxious" },
    { time: "19:45", mood: "calm" }
  ],
  journal: [
    { time: "09:15", content: "Started the day with meditation. Feeling focused." },
    { time: "16:30", content: "Had a challenging moment at work but managed to stay calm." }
  ],
  goals: [
    { description: "Attend weekly support group", status: "completed", target_date: "2025-04-12" },
    { description: "Complete mindfulness course", status: "in_progress", target_date: "2025-04-30" },
    { description: "Exercise daily for 30 minutes", status: "in_progress", target_date: "2025-04-15" }
  ],
  medication: [
    { name: "Med A", status: "taken", time: "08:00", notes: "Taken with breakfast" },
    { name: "Med B", status: "taken", time: "20:00", notes: "Taken after dinner" }
  ],
  progress_summary: {
    mood_average: 7.5,
    mood_scale: 10,
    journal_entries: 2,
    goals_completed: 1,
    goals_total: 3,
    medication_adherence: 100,
    academic_impact: 85
  }
};

const DailyReports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const { toast } = useToast();
  
  const handleGeneratePDF = () => {
    setIsPdfGenerating(true);
    setTimeout(() => {
      setIsPdfGenerating(false);
      toast({
        title: "PDF Generated",
        description: "Your daily report PDF has been generated successfully",
      });
      console.log("PDF would be generated here");
    }, 2000);
  };

  return (
    <DashboardLayout pageTitle="Daily Recovery Reports">
      <div className="space-y-6">
        <div className="mb-6">
          <DailyReportHeader
            date={date}
            onDateChange={setDate}
            onGeneratePDF={handleGeneratePDF}
            isPdfGenerating={isPdfGenerating}
          />
        </div>

        <div className="grid gap-6">
          <SobrietyStatus sobriety={mockDailyReport.sobriety} />
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Daily Progress</h2>
            <ProgressIndicators summary={mockDailyReport.progress_summary} />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DailyReports;
