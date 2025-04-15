
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Calendar, BarChart2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MedicationAdherence() {
  // Sample adherence data
  const adherenceData = {
    weeklyRate: 92,
    monthlyRate: 88,
    missedDoses: [
      { date: "Apr 12, 2025", medication: "Acamprosate - 333 mg", time: "2:00 PM" },
      { date: "Apr 8, 2025", medication: "Bupropion - 150 mg", time: "9:00 PM" },
    ],
    dailyLog: [
      { date: "Apr 15, 2025", status: "complete" },
      { date: "Apr 14, 2025", status: "complete" },
      { date: "Apr 13, 2025", status: "complete" },
      { date: "Apr 12, 2025", status: "partial" },
      { date: "Apr 11, 2025", status: "complete" },
      { date: "Apr 10, 2025", status: "complete" },
      { date: "Apr 9, 2025", status: "complete" },
      { date: "Apr 8, 2025", status: "partial" },
    ]
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-500" />
            Adherence Rate
          </h3>
          <Tabs defaultValue="week" className="w-[200px]">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <TabsContent value="week" className="mt-2 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Weekly Adherence</span>
                <span className="font-medium">{adherenceData.weeklyRate}%</span>
              </div>
              <Progress value={adherenceData.weeklyRate} className="h-2" />
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="mt-2 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Adherence</span>
                <span className="font-medium">{adherenceData.monthlyRate}%</span>
              </div>
              <Progress value={adherenceData.monthlyRate} className="h-2" />
            </div>
          </TabsContent>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-500" />
          Missed Doses
        </h3>
        {adherenceData.missedDoses.length > 0 ? (
          <div className="space-y-3">
            {adherenceData.missedDoses.map((dose, index) => (
              <div key={index} className="flex items-start justify-between border-b pb-2 last:border-0">
                <div>
                  <p className="font-medium">{dose.medication}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{dose.date}</span>
                    <span className="mx-1">•</span>
                    <span>{dose.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No missed doses this period. Great job!</p>
        )}
      </Card>

      <Card className="p-4">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Daily Log
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {adherenceData.dailyLog.map((day, index) => (
            <div key={index} className="text-center">
              <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full 
                ${day.status === 'complete' ? 'bg-green-100 text-green-700' : 
                  day.status === 'partial' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'}`}>
                {day.status === 'complete' ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
              </div>
              <div className="mt-1 text-xs">{day.date.split(',')[0]}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
