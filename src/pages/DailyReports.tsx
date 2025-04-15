import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart2, 
  Download, 
  FileText, 
  Smile,
  PencilLine, 
  Clock,
  CheckCircle2, 
  AlertCircle, 
  Clock3, 
  HelpCircle,
  Pill
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

// Helper functions
const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "in_progress":
      return <Clock3 className="h-4 w-4 text-amber-500" />;
    case "cancelled":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <HelpCircle className="h-4 w-4 text-blue-500" />;
  }
};

const getMoodLabel = (mood: string) => {
  switch (mood) {
    case "happy":
      return "Happy";
    case "sad":
      return "Sad";
    case "anxious":
      return "Anxious";
    case "calm":
      return "Calm";
    default:
      return mood;
  }
};

const DailyReports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  
  // This would be replaced with an actual API call in a real implementation
  const dailyReport = mockDailyReport;

  const handleGeneratePDF = () => {
    setIsPdfGenerating(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      setIsPdfGenerating(false);
      // In a real implementation, this would handle PDF generation
      console.log("PDF would be generated here with actual library");
    }, 2000);
  };

  // Progress bar component for better visualization
  const ProgressBar = ({ value, max = 100 }: { value: number; max?: number }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <DashboardLayout pageTitle="Daily Recovery Reports">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <Card className="w-full md:w-1/2">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button 
                  variant="default" 
                  className="gap-2"
                  disabled={isPdfGenerating}
                  onClick={handleGeneratePDF}
                >
                  <Download className="h-4 w-4" />
                  {isPdfGenerating ? "Generating..." : "Generate PDF Report"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full md:w-1/2">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">Sobriety Status</h3>
                <p className="text-3xl font-bold text-primary">{dailyReport.sobriety}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="medication">Medication</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Smile className="h-5 w-5" />
                    <h3 className="font-medium">Mood Average</h3>
                  </div>
                  <p className="text-xl font-bold">
                    {dailyReport.progress_summary.mood_average.toFixed(1)} / {dailyReport.progress_summary.mood_scale}.0
                  </p>
                  <ProgressBar 
                    value={dailyReport.progress_summary.mood_average} 
                    max={dailyReport.progress_summary.mood_scale} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PencilLine className="h-5 w-5" />
                    <h3 className="font-medium">Journal Entries</h3>
                  </div>
                  <p className="text-xl font-bold">
                    {dailyReport.progress_summary.journal_entries}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <h3 className="font-medium">Goals Completed</h3>
                  </div>
                  <p className="text-xl font-bold">
                    {dailyReport.progress_summary.goals_completed} of {dailyReport.progress_summary.goals_total}
                  </p>
                  <ProgressBar 
                    value={dailyReport.progress_summary.goals_completed} 
                    max={dailyReport.progress_summary.goals_total} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Pill className="h-5 w-5" />
                    <h3 className="font-medium">Medication Adherence</h3>
                  </div>
                  <p className="text-xl font-bold">
                    {dailyReport.progress_summary.medication_adherence}%
                  </p>
                  <ProgressBar 
                    value={dailyReport.progress_summary.medication_adherence} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart2 className="h-5 w-5" />
                    <h3 className="font-medium">Academic Impact</h3>
                  </div>
                  <p className="text-xl font-bold">
                    {dailyReport.progress_summary.academic_impact.toFixed(1)} / 100
                  </p>
                  <ProgressBar 
                    value={dailyReport.progress_summary.academic_impact} 
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="mood">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <Smile className="h-5 w-5" />
                  Mood Entries
                </h3>
                <Separator className="my-4" />
                
                {dailyReport.mood && dailyReport.mood.length > 0 ? (
                  <div className="space-y-4">
                    {dailyReport.mood.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-md bg-muted">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{entry.time}</span>
                        </div>
                        <div>
                          <span className="font-medium">{getMoodLabel(entry.mood)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">No mood entries for this date</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="journal">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5" />
                  Journal Entries
                </h3>
                <Separator className="my-4" />
                
                {dailyReport.journal && dailyReport.journal.length > 0 ? (
                  <div className="space-y-4">
                    {dailyReport.journal.map((entry, index) => (
                      <div key={index} className="p-4 rounded-md border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="h-4 w-4" />
                          <span>{entry.time}</span>
                        </div>
                        <p>{entry.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">No journal entries for this date</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  Recovery Goals
                </h3>
                <Separator className="my-4" />
                
                {dailyReport.goals && dailyReport.goals.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Target Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dailyReport.goals.map((goal, index) => (
                        <TableRow key={index}>
                          <TableCell>{goal.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(goal.status)}
                              <span>{goal.status.replace('_', ' ')}</span>
                            </div>
                          </TableCell>
                          <TableCell>{goal.target_date || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground">No active goals for this date</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medication">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <Pill className="h-5 w-5" />
                  Medication
                </h3>
                <Separator className="my-4" />
                
                {dailyReport.medication && dailyReport.medication.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dailyReport.medication.map((med, index) => (
                        <TableRow key={index}>
                          <TableCell>{med.name}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              med.status === 'taken' ? 'bg-green-100 text-green-800' :
                              med.status === 'missed' ? 'bg-red-100 text-red-800' :
                              med.status === 'delayed' ? 'bg-amber-100 text-amber-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {med.status}
                            </span>
                          </TableCell>
                          <TableCell>{med.time || '-'}</TableCell>
                          <TableCell>{med.notes || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground">No medication records for this date</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DailyReports;
