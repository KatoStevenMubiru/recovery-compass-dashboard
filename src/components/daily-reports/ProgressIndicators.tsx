
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Smile, PencilLine, CheckCircle2, Pill, BarChart2 } from "lucide-react";

interface ProgressSummary {
  mood_average: number;
  mood_scale: number;
  journal_entries: number;
  goals_completed: number;
  goals_total: number;
  medication_adherence: number;
  academic_impact: number;
}

interface ProgressIndicatorsProps {
  summary: ProgressSummary;
}

export function ProgressIndicators({ summary }: ProgressIndicatorsProps) {
  const indicators = [
    {
      icon: <Smile className="h-5 w-5" />,
      label: "Mood Average",
      value: `${summary.mood_average.toFixed(1)} / ${summary.mood_scale}.0`,
      progress: (summary.mood_average / summary.mood_scale) * 100
    },
    {
      icon: <PencilLine className="h-5 w-5" />,
      label: "Journal Entries",
      value: summary.journal_entries.toString(),
      progress: (summary.journal_entries / 5) * 100 // Assuming 5 is max entries per day
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      label: "Goals Completed",
      value: `${summary.goals_completed} of ${summary.goals_total}`,
      progress: (summary.goals_completed / summary.goals_total) * 100
    },
    {
      icon: <Pill className="h-5 w-5" />,
      label: "Medication Adherence",
      value: `${summary.medication_adherence}%`,
      progress: summary.medication_adherence
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      label: "Academic Impact",
      value: `${summary.academic_impact.toFixed(1)} / 100`,
      progress: summary.academic_impact
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {indicators.map((indicator, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              {indicator.icon}
              <h3 className="font-medium">{indicator.label}</h3>
            </div>
            <p className="text-xl font-bold mb-2">{indicator.value}</p>
            <Progress value={indicator.progress} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
