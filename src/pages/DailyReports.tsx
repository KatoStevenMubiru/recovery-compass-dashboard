import React, { useState, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DailyReportHeader } from "@/components/daily-reports/DailyReportHeader";
import { SobrietyStatus } from "@/components/daily-reports/SobrietyStatus";
import { ProgressIndicators } from "@/components/daily-reports/ProgressIndicators";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { useDailyReport } from "@/hooks/useRecovery";
import { generateDailyReportPDF } from "@/utils/pdfGenerator";

const DailyReports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);

  // Fetch daily report data
  const { data: dailyReport, isLoading } = useDailyReport(
    date ? format(date, "yyyy-MM-dd") : undefined
  );

  const handleGeneratePDF = async () => {
    if (!reportRef.current || !date) return;

    setIsPdfGenerating(true);
    try {
      await generateDailyReportPDF(reportRef.current, date);
      toast({
        title: "PDF Generated",
        description: "Your daily report PDF has been generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Prepare the data for display
  const reportData = {
    date: format(date || new Date(), "yyyy-MM-dd"),
    sobriety: dailyReport?.days_sober ?? 0,
    mood: dailyReport?.mood
      ? [
          {
            time: format(new Date(dailyReport.date), "HH:mm"),
            mood: dailyReport.mood,
          },
        ]
      : [],
    journal: dailyReport?.journal_entry
      ? [
          {
            time: format(new Date(dailyReport.date), "HH:mm"),
            content: dailyReport.journal_entry,
          },
        ]
      : [],
    medication:
      dailyReport?.medication_taken !== undefined
        ? [
            {
              name: "Daily Medication",
              status: dailyReport.medication_taken ? "taken" : "missed",
              time: format(new Date(dailyReport.date), "HH:mm"),
              notes: dailyReport.mood_notes ?? "",
            },
          ]
        : [],
    progress_summary: {
      mood_average: dailyReport?.mood ?? 0,
      mood_scale: 10,
      journal_entries: dailyReport?.journal_entry ? 1 : 0,
      goals_completed: dailyReport?.goals_completed ?? 0,
      goals_total: dailyReport?.total_goals ?? 0,
      goals_progress: dailyReport?.goals_progress ?? 0,
      medication_adherence: dailyReport?.medication_taken ? 100 : 0,
      academic_impact: dailyReport?.academic_impact ?? 0,
      risk_score: dailyReport?.risk_score ?? 0,
    },
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

        {isLoading ? (
          <div className="text-center py-8">Loading daily report...</div>
        ) : !dailyReport ? (
          <div className="text-center py-8">
            No data available for this date.
          </div>
        ) : (
          <div ref={reportRef} className="grid gap-6">
            <SobrietyStatus sobriety={`${reportData.sobriety} days`} />
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Daily Progress</h2>
              <ProgressIndicators summary={reportData.progress_summary} />
            </Card>

            {/* Recovery Overview */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Recovery Overview</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Days in Recovery</span>
                    <span className="text-lg font-semibold">
                      {dailyReport.days_in_recovery}
                    </span>
                  </div>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Relapse Count</span>
                    <span className="text-lg font-semibold">
                      {dailyReport.relapse_count}
                    </span>
                  </div>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Last Relapse</span>
                    <span className="text-sm text-muted-foreground">
                      {dailyReport.last_relapse_date
                        ? format(
                            new Date(dailyReport.last_relapse_date),
                            "MMM d, yyyy"
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sober Since</span>
                    <span className="text-sm text-muted-foreground">
                      {dailyReport.sober_date
                        ? format(
                            new Date(dailyReport.sober_date),
                            "MMM d, yyyy"
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Journal Entry */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Journal Entry</h2>
              {reportData.journal.length > 0 ? (
                <div className="space-y-4">
                  {reportData.journal.map((entry, index) => (
                    <div key={index} className="bg-secondary/10 rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-2">
                        {entry.time}
                      </div>
                      <p className="whitespace-pre-wrap">{entry.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No journal entry for today.
                </p>
              )}
            </Card>

            {/* Mood and Cravings */}
            {dailyReport.mood !== null && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Mood & Cravings</h2>
                <div className="space-y-4">
                  <div className="bg-secondary/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Mood Level</span>
                      <span className="text-sm text-muted-foreground">
                        {dailyReport.mood}/10
                      </span>
                    </div>
                    {dailyReport.mood_notes && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {dailyReport.mood_notes}
                      </p>
                    )}
                  </div>
                  {dailyReport.cravings !== null && (
                    <div className="bg-secondary/10 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Cravings Level</span>
                        <span className="text-sm text-muted-foreground">
                          {dailyReport.cravings}/10
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Medication */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Medication Status</h2>
              <div className="space-y-4">
                {reportData.medication.length > 0 ? (
                  reportData.medication.map((med, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{med.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {med.time}
                        </div>
                        {med.notes && (
                          <div className="text-sm mt-1">{med.notes}</div>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          med.status === "taken"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {med.status === "taken" ? "Taken" : "Missed"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground italic">
                    No medication logged for today.
                  </p>
                )}
              </div>
            </Card>

            {/* Goals Progress */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Goals Progress</h2>
              <div className="space-y-4">
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Goals Completed</span>
                    <span className="text-lg font-semibold">
                      {dailyReport.goals_completed} / {dailyReport.total_goals}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${dailyReport.goals_progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {dailyReport.goals_progress.toFixed(1)}% Complete
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Risk Assessment */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Risk Assessment</h2>
              <div className="space-y-4">
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Risk Score</span>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        dailyReport.risk_score < 30
                          ? "bg-green-100 text-green-800"
                          : dailyReport.risk_score < 60
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {dailyReport.risk_score}/100
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {dailyReport.risk_score < 30
                      ? "Low Risk"
                      : dailyReport.risk_score < 60
                      ? "Moderate Risk"
                      : "High Risk"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DailyReports;
