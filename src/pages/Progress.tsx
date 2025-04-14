import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Calendar as CalendarIcon, Activity, BadgeAlert, LineChart, Stars, BookOpen, PenLine, Goal, PlusCircle, AlertTriangle, Pill } from "lucide-react";
import { userProfile } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";

const mockData = {
  daysInRecovery: 45,
  recoveryStatus: "active",
  nextCheckIn: "2025-04-18",
  medicationAdherence: 85,
  academicImpact: 72,
  weeklyMoodTrend: [6, 7, 5, 8, 6, 7, 8],
  riskScore: 28,
  goalsCompleted: 7,
  goalsTotal: 10,
  recommendations: [
    "Schedule two study sessions with your academic advisor",
    "Increase sleep hygiene by maintaining a consistent bedtime",
    "Consider joining the Wednesday support group for additional community support"
  ],
  riskFactors: ["Recent academic stress", "Changes in social environment"],
  protectiveFactors: ["Strong support system", "Consistent medication adherence", "Regular therapy attendance"]
};

const RecoveryProgress = () => {
  const { toast } = useToast();
  const [mood, setMood] = useState(5);
  const [journal, setJournal] = useState("");
  const [goal, setGoal] = useState("");
  const [medicationTaken, setMedicationTaken] = useState("");
  const [moodNotes, setMoodNotes] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  
  const handleMoodSubmit = () => {
    toast({
      title: "Mood recorded",
      description: `Your mood (${mood}/10) has been saved.`,
    });
    setMood(5);
    setMoodNotes("");
  };

  const handleJournalSubmit = () => {
    if (journal.trim() === "") {
      toast({
        title: "Empty journal entry",
        description: "Please write something in your journal before saving.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Journal entry saved",
      description: "Your journal entry has been saved successfully.",
    });
    setJournal("");
  };

  const handleGoalSubmit = () => {
    if (goal.trim() === "") {
      toast({
        title: "Empty goal",
        description: "Please enter a goal before saving.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Goal created",
      description: "Your recovery goal has been created successfully.",
    });
    setGoal("");
  };

  const handleMedicationSubmit = () => {
    if (!medicationTaken) {
      toast({
        title: "Selection required",
        description: "Please select whether you took your medication.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Medication logged",
      description: medicationTaken === "yes" 
        ? "You've successfully logged that you took your medication." 
        : "You've logged that you missed your medication. Remember to follow your treatment plan.",
    });
    setMedicationTaken("");
  };

  const getAcademicPerformanceLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const getRiskLevelLabel = (score) => {
    if (score < 30) return "Low Risk";
    if (score < 60) return "Moderate Risk";
    return "High Risk";
  };

  return (
    <DashboardLayout pageTitle="Recovery Progress">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Recovery Journey
          </h2>
          <p className="text-muted-foreground">
            Track your progress, manage your recovery goals, and view personalized recommendations
          </p>
        </div>

        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Sobriety Tracker</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">Update Sober Date</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Set Your Sober Date</DialogTitle>
                    <DialogDescription>
                      Select the date you began your sobriety journey
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={new Date(Date.now() - (mockData.daysInRecovery * 24 * 60 * 60 * 1000))}
                      onSelect={() => {}}
                      disabled={(date) => date > new Date()}
                      className="pointer-events-auto"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={() => toast({
                      title: "Sober date updated",
                      description: "Your sobriety date has been updated successfully."
                    })}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2 flex items-baseline">
              {mockData.daysInRecovery} <span className="text-sm font-normal ml-1 text-muted-foreground">days</span>
            </div>
            <div className="text-muted-foreground mb-4 text-sm">
              Sober since: {new Date(Date.now() - (mockData.daysInRecovery * 24 * 60 * 60 * 1000)).toLocaleDateString()}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next milestone</span>
                <span>{mockData.daysInRecovery % 30}/30 days ({Math.round((mockData.daysInRecovery % 30) / 30 * 100)}%)</span>
              </div>
              <Progress value={(mockData.daysInRecovery % 30) / 30 * 100} />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md text-primary flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Days in Recovery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockData.daysInRecovery}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md text-primary flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Recovery Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold capitalize">{mockData.recoveryStatus}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md text-primary flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Next Check-in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{new Date(mockData.nextCheckIn).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">How are you feeling today?</CardTitle>
              <CardDescription>Rate your mood on a scale of 1-10</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Slider
                  value={[mood]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setMood(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Very Low</span>
                  <span>Very High</span>
                </div>
              </div>
              <Textarea
                placeholder="Notes about your mood (optional)"
                value={moodNotes}
                onChange={(e) => setMoodNotes(e.target.value)}
                className="resize-none"
              />
              <Button className="w-full" onClick={handleMoodSubmit}>
                Save Mood
              </Button>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Recovery Journal
              </CardTitle>
              <CardDescription>Record your thoughts and experiences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Write about your experiences today and how they relate to your recovery..."
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="resize-none min-h-[120px]"
              />
              <Button className="w-full" onClick={handleJournalSubmit}>
                Save Entry
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Medication Adherence
              </CardTitle>
              <CardDescription>Log your daily medication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className="text-base mb-2 block">Did you take your medication today?</Label>
                <RadioGroup value={medicationTaken} onValueChange={setMedicationTaken}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button className="w-full" onClick={handleMedicationSubmit}>
                Log Medication
              </Button>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span>Monthly Adherence Rate</span>
                  <span>{mockData.medicationAdherence}%</span>
                </div>
                <Progress value={mockData.medicationAdherence} />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Goal className="h-4 w-4" />
                Recovery Goals
              </CardTitle>
              <CardDescription>Track your recovery milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Set a new recovery goal..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="resize-none"
              />
              <Button className="w-full" onClick={handleGoalSubmit}>
                Add Goal
              </Button>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span>Goal Progress</span>
                  <span>{mockData.goalsCompleted} / {mockData.goalsTotal} completed</span>
                </div>
                <Progress 
                  value={(mockData.goalsCompleted / mockData.goalsTotal) * 100}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Academic Impact</CardTitle>
            <CardDescription>How your recovery is affecting your academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center">
                <div className="grow">
                  <Progress value={mockData.academicImpact} />
                </div>
                <div className="ml-4 min-w-16 text-2xl font-bold">
                  {mockData.academicImpact}%
                </div>
              </div>
              <p className="mt-2 text-sm">
                {getAcademicPerformanceLabel(mockData.academicImpact)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                This score reflects how your recovery activities are impacting your academic performance. 
                Higher medication adherence and consistent check-ins contribute to better academic outcomes.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Personalized Recovery Plan</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide" : "View"} Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-5 w-5 ${mockData.riskScore < 30 ? "text-green-500" : mockData.riskScore < 60 ? "text-amber-500" : "text-red-500"}`} />
                  <span className="font-medium">Relapse Risk Score</span>
                </div>
                <div className="text-lg font-bold">{mockData.riskScore}%</div>
              </div>
              <Progress 
                value={mockData.riskScore}
              />
              <div className="mt-1 text-sm text-right text-muted-foreground">
                {getRiskLevelLabel(mockData.riskScore)}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Personalized Recommendations:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {mockData.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm">{rec}</li>
                ))}
              </ul>
            </div>

            {showDetails && (
              <div className="mt-6 space-y-4 pt-4 border-t">
                <div>
                  <h4 className="font-medium mb-2">Risk Factors:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {mockData.riskFactors.map((factor, i) => (
                      <li key={i} className="text-sm">{factor}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Protective Factors:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {mockData.protectiveFactors.map((factor, i) => (
                      <li key={i} className="text-sm">{factor}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Weekly Mood Trends:</h4>
                  <div className="h-32 flex items-end gap-2">
                    {mockData.weeklyMoodTrend.map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full bg-primary/70 rounded-t"
                          style={{ height: `${(val/10) * 100}%` }}
                        ></div>
                        <span className="text-xs">{["M","T","W","T","F","S","S"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecoveryProgress;
