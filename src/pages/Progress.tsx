import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CheckCircle,
  Calendar as CalendarIcon,
  Activity,
  BadgeAlert,
  LineChart,
  Stars,
  BookOpen,
  PenLine,
  Goal,
  PlusCircle,
  AlertTriangle,
  Pill,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSobriety } from "@/contexts/SobrietyContext";
import { format } from "date-fns";
import {
  useTodaySobriety,
  useCreateSobriety,
  useUpdateSobriety,
} from "@/hooks/useSobriety";
import { useAuth } from "@/contexts/AuthContext";
import {
  useDailyCheckIn,
  useCreateDailyCheckIn,
  useUpdateDailyCheckIn,
  useJournal,
  useCreateJournal,
  useUpdateJournal,
  useMedication,
  useCreateMedication,
  useUpdateMedication,
  useMonthlyAdherenceRate,
  useGoals,
  useCreateGoal,
  useUpdateGoal,
  useGoalProgress,
  useRiskScore,
} from "@/hooks/useRecovery";

const RecoveryProgress = () => {
  const { toast } = useToast();
  const { daysInRecovery, updateSoberDate, isSoberDateSet } = useSobriety();

  const [selectedSoberDate, setSelectedSoberDate] = useState<Date | undefined>(
    undefined
  );
  const [isSoberDateDialogOpen, setIsSoberDateDialogOpen] = useState(false);

  const [mood, setMood] = useState(5);
  const [cravings, setCravings] = useState(5);
  const [journal, setJournal] = useState("");
  const [goal, setGoal] = useState("");
  const [medicationTaken, setMedicationTaken] = useState("");
  const [moodNotes, setMoodNotes] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const { user } = useAuth();
  const { data: sobrietyResponse, isLoading: sobrietyLoading } =
    useTodaySobriety();
  const sobriety = sobrietyResponse?.data;
  const { mutate: createSobriety } = useCreateSobriety();
  const { mutate: updateSobriety } = useUpdateSobriety();
  const [apiSoberDate, setApiSoberDate] = useState<Date | null>(null);
  const [lastRelapseDate, setLastRelapseDate] = useState<Date | null>(null);
  const [relapseCount, setRelapseCount] = useState<number>(0);

  // API Hooks
  const { data: dailyCheckIn, isLoading: checkInLoading } = useDailyCheckIn();
  const { mutate: createDailyCheckIn } = useCreateDailyCheckIn();
  const { mutate: updateDailyCheckIn } = useUpdateDailyCheckIn();

  const { data: journalEntry, isLoading: journalLoading } = useJournal();
  const { mutate: createJournal } = useCreateJournal();
  const { mutate: updateJournal } = useUpdateJournal();

  const { data: medication, isLoading: medicationLoading } = useMedication();
  const { mutate: createMedication } = useCreateMedication();
  const { mutate: updateMedication } = useUpdateMedication();
  const { data: adherenceRate } = useMonthlyAdherenceRate();

  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { mutate: createGoal } = useCreateGoal();
  const { mutate: updateGoal } = useUpdateGoal();
  const { data: goalProgress } = useGoalProgress();

  const { data: riskScoreData } = useRiskScore();

  // TODO: Replace this with your actual risk score calculation or API value
  const riskScore = 28;

  // First, add a new state for academic impact
  const [academicImpact, setAcademicImpact] = useState(50); // Default to 50%

  const handleSoberDateSave = () => {
    if (!selectedSoberDate) {
      toast({
        title: "No Date Selected",
        description: "Please select a date to update your sober date.",
        variant: "destructive",
      });
      return;
    }

    const sobrietyData = {
      sober_date: selectedSoberDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      relapse_count: sobriety?.relapse_count || 0,
      last_relapse_date: sobriety?.last_relapse_date || null,
    };

    if (sobriety) {
      // Update existing entry
      updateSobriety(sobrietyData, {
        onSuccess: () => {
          toast({
            title: "Sobriety Date Updated",
            description: "Your sobriety date has been updated successfully.",
          });
          setIsSoberDateDialogOpen(false);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to update sobriety date. Please try again.",
            variant: "destructive",
          });
          console.error("Update sobriety error:", error);
        },
      });
    } else {
      // Create new entry
      createSobriety(sobrietyData, {
        onSuccess: () => {
          toast({
            title: "Sobriety Entry Created",
            description:
              "Your first sobriety entry has been created successfully.",
          });
          setIsSoberDateDialogOpen(false);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to create sobriety entry. Please try again.",
            variant: "destructive",
          });
          console.error("Create sobriety error:", error);
        },
      });
    }
  };

  const handleRelapse = () => {
    if (!sobriety) return;

    const today = new Date().toISOString().split("T")[0];
    const sobrietyData = {
      sober_date: today,
      last_relapse_date: today,
      relapse_count: (sobriety.relapse_count || 0) + 1,
    };

    updateSobriety(sobrietyData, {
      onSuccess: () => {
        toast({
          title: "Relapse Recorded",
          description:
            "Your relapse has been recorded. Remember, recovery is a journey.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to record relapse. Please try again.",
          variant: "destructive",
        });
        console.error("Record relapse error:", error);
      },
    });
  };

  // Then, update the handleMoodAndCravingsSubmit function to include academic impact
  const handleMoodAndCravingsSubmit = () => {
    const data = {
      mood,
      cravings,
      mood_notes: moodNotes,
      academic_impact: academicImpact, // Add this field
    };

    if (dailyCheckIn) {
      updateDailyCheckIn(data, {
        onSuccess: () => {
          toast({
            title: "Mood & Cravings Updated",
            description: `Your mood (${mood}/10), cravings (${cravings}/10), and academic impact (${academicImpact}%) have been updated.`,
          });
          setMood(5);
          setCravings(5);
          setMoodNotes("");
          setAcademicImpact(50); // Reset to default
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to update check-in. Please try again.",
            variant: "destructive",
          });
          console.error("Update check-in error:", error);
        },
      });
    } else {
      createDailyCheckIn(data, {
        onSuccess: () => {
          toast({
            title: "Check-in Recorded",
            description: `Your mood (${mood}/10), cravings (${cravings}/10), and academic impact (${academicImpact}%) have been saved.`,
          });
          setMood(5);
          setCravings(5);
          setMoodNotes("");
          setAcademicImpact(50); // Reset to default
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to save check-in. Please try again.",
            variant: "destructive",
          });
          console.error("Create check-in error:", error);
        },
      });
    }
  };

  const handleJournalSubmit = () => {
    if (journal.trim() === "") {
      toast({
        title: "Empty journal entry",
        description: "Please write something in your journal before saving.",
        variant: "destructive",
      });
      return;
    }

    const data = { entry: journal };

    if (journalEntry) {
      updateJournal(data, {
        onSuccess: () => {
          toast({
            title: "Journal entry updated",
            description: "Your journal entry has been updated successfully.",
          });
          setJournal("");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to update journal entry. Please try again.",
            variant: "destructive",
          });
          console.error("Update journal error:", error);
        },
      });
    } else {
      createJournal(data, {
        onSuccess: () => {
          toast({
            title: "Journal entry saved",
            description: "Your journal entry has been saved successfully.",
          });
          setJournal("");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to save journal entry. Please try again.",
            variant: "destructive",
          });
          console.error("Create journal error:", error);
        },
      });
    }
  };

  const handleMedicationSubmit = () => {
    if (!medicationTaken) {
      toast({
        title: "Selection required",
        description: "Please select whether you took your medication.",
        variant: "destructive",
      });
      return;
    }

    const data = { taken: medicationTaken === "yes" };

    if (medication) {
      updateMedication(data, {
        onSuccess: () => {
          toast({
            title: "Medication updated",
            description: data.taken
              ? "You've successfully updated that you took your medication."
              : "You've updated that you missed your medication. Remember to follow your treatment plan.",
          });
          setMedicationTaken("");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description:
              "Failed to update medication record. Please try again.",
            variant: "destructive",
          });
          console.error("Update medication error:", error);
        },
      });
    } else {
      createMedication(data, {
        onSuccess: () => {
          toast({
            title: "Medication logged",
            description: data.taken
              ? "You've successfully logged that you took your medication."
              : "You've logged that you missed your medication. Remember to follow your treatment plan.",
          });
          setMedicationTaken("");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to log medication. Please try again.",
            variant: "destructive",
          });
          console.error("Create medication error:", error);
        },
      });
    }
  };

  const handleGoalSubmit = () => {
    if (goal.trim() === "") {
      toast({
        title: "Empty goal",
        description: "Please enter a goal before saving.",
        variant: "destructive",
      });
      return;
    }

    createGoal(
      { description: goal, accomplished: false },
      {
        onSuccess: () => {
          toast({
            title: "Goal created",
            description: "Your recovery goal has been created successfully.",
          });
          setGoal("");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to create goal. Please try again.",
            variant: "destructive",
          });
          console.error("Create goal error:", error);
        },
      }
    );
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

  useEffect(() => {
    if (sobriety) {
      setApiSoberDate(
        sobriety.sober_date ? new Date(sobriety.sober_date) : null
      );
      setLastRelapseDate(
        sobriety.last_relapse_date ? new Date(sobriety.last_relapse_date) : null
      );
      setRelapseCount(sobriety.relapse_count || 0);
    }
  }, [sobriety]);

  return (
    <DashboardLayout pageTitle="Recovery Progress">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Recovery Journey
          </h2>
          <p className="text-muted-foreground">
            Track your progress, manage your recovery goals, and view
            personalized recommendations
          </p>
        </div>

        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Sobriety Tracker</CardTitle>
              <Dialog
                open={isSoberDateDialogOpen}
                onOpenChange={setIsSoberDateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setSelectedSoberDate(apiSoberDate || new Date())
                    }
                  >
                    {isSoberDateSet ? "Update Sober Date" : "Set Sober Date"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Set Your Sober Date</DialogTitle>
                    <DialogDescription>
                      Select the date you began your sobriety journey. This can
                      be updated anytime.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedSoberDate}
                      onSelect={setSelectedSoberDate}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus={!selectedSoberDate}
                      defaultMonth={selectedSoberDate || new Date()}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      onClick={() => setIsSoberDateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSoberDateSave}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {sobrietyLoading ? (
              <div>Loading...</div>
            ) : sobriety ? (
              <>
                <div className="text-4xl font-bold mb-2 flex items-baseline">
                  {sobriety.days_sober}{" "}
                  <span className="text-sm font-normal ml-1 text-muted-foreground">
                    days sober
                  </span>
                </div>
                <div className="text-muted-foreground mb-2 text-sm">
                  Sober since:{" "}
                  {new Date(sobriety.sober_date).toLocaleDateString()}
                </div>
                <div className="text-muted-foreground mb-2 text-sm">
                  Last relapse:{" "}
                  {sobriety.last_relapse_date
                    ? new Date(sobriety.last_relapse_date).toLocaleDateString()
                    : "Never"}
                </div>
                <div className="text-muted-foreground mb-2 text-sm">
                  Relapse count: {sobriety.relapse_count}
                </div>
                {!sobrietyResponse.is_today && (
                  <div className="mt-4 p-2 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                    {sobrietyResponse.message}
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsSoberDateDialogOpen(true)}
                  >
                    Update Sober Date
                  </Button>
                  <Button variant="destructive" onClick={handleRelapse}>
                    Record Relapse
                  </Button>
                </div>
              </>
            ) : (
              <div>
                <p>No sobriety entries found. Start tracking your journey!</p>
                <Button
                  className="mt-4"
                  onClick={() => setIsSoberDateDialogOpen(true)}
                >
                  Create First Entry
                </Button>
              </div>
            )}
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
              <div className="text-3xl font-bold">
                {sobriety?.days_in_recovery || 0}
              </div>
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
              <div className="text-3xl font-bold capitalize">
                {sobriety?.relapse_count === 0 ? "active" : "recovering"}
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md text-primary flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Last Check-in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {sobriety
                  ? new Date(sobriety.date).toLocaleDateString()
                  : "Never"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">
                How are you feeling today?
              </CardTitle>
              <CardDescription>
                Rate your mood, cravings, and academic impact.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Mood (1-10)</Label>
                <Slider
                  value={[mood]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setMood(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Cravings (1-10)</Label>
                <Slider
                  value={[cravings]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setCravings(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 (Low)</span>
                  <span>10 (High)</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Academic Impact (0-100%)
                </Label>
                <Slider
                  value={[academicImpact]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setAcademicImpact(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0% (No Impact)</span>
                  <span>100% (Severe Impact)</span>
                </div>
              </div>
              <Textarea
                placeholder="Notes about your mood, cravings & academic impact (optional)"
                value={moodNotes}
                onChange={(e) => setMoodNotes(e.target.value)}
                className="resize-none"
              />
              <Button
                className="w-full"
                onClick={handleMoodAndCravingsSubmit}
                disabled={checkInLoading}
              >
                {checkInLoading ? "Saving..." : "Save Check-in"}
              </Button>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Recovery Journal
              </CardTitle>
              <CardDescription>
                Record your thoughts and experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Write about your experiences today and how they relate to your recovery..."
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="resize-none min-h-[120px]"
              />
              <Button
                className="w-full"
                onClick={handleJournalSubmit}
                disabled={journalLoading}
              >
                {journalLoading ? "Saving..." : "Save Entry"}
              </Button>

              {/* Display Journal Entries */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-4">Today's Journal Entry</h4>
                {journalLoading ? (
                  <div className="text-muted-foreground">Loading...</div>
                ) : journalEntry ? (
                  <div className="bg-secondary/10 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(journalEntry.date).toLocaleDateString()} at{" "}
                      {new Date(journalEntry.date).toLocaleTimeString()}
                    </div>
                    <p className="whitespace-pre-wrap">{journalEntry.entry}</p>
                  </div>
                ) : (
                  <div className="text-muted-foreground italic">
                    No journal entry for today yet.
                  </div>
                )}
              </div>
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
                <Label className="text-base mb-2 block">
                  Did you take your medication today?
                </Label>
                <RadioGroup
                  value={medicationTaken}
                  onValueChange={setMedicationTaken}
                >
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
              <Button
                className="w-full"
                onClick={handleMedicationSubmit}
                disabled={medicationLoading}
              >
                {medicationLoading ? "Saving..." : "Log Medication"}
              </Button>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span>Monthly Adherence Rate</span>
                  <span>{adherenceRate?.monthly_adherence_rate || 0}%</span>
                </div>
                <Progress value={adherenceRate?.monthly_adherence_rate || 0} />
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
              <Button
                className="w-full"
                onClick={handleGoalSubmit}
                disabled={goalsLoading}
              >
                {goalsLoading ? "Saving..." : "Add Goal"}
              </Button>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span>Goal Progress</span>
                  <span>
                    {goalProgress
                      ? `${goalProgress.accomplished} / ${goalProgress.total_goals} completed`
                      : "0 / 0 completed"}
                  </span>
                </div>
                <Progress
                  value={goalProgress ? goalProgress.progress_rate || 0 : 0}
                />
              </div>

              {/* Goals List */}
              <div className="mt-4 space-y-2">
                {goals?.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between p-2 bg-secondary/10 rounded-md"
                  >
                    <span className="text-sm">{goal.description}</span>
                    <Button
                      variant={goal.accomplished ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        updateGoal(
                          {
                            goalId: goal.id,
                            data: { accomplished: !goal.accomplished },
                          },
                          {
                            onSuccess: () => {
                              toast({
                                title: goal.accomplished
                                  ? "Goal marked as incomplete"
                                  : "Goal accomplished!",
                                description: goal.accomplished
                                  ? "You can still work on this goal."
                                  : "Great job! Keep up the good work!",
                              });
                            },
                          }
                        )
                      }
                    >
                      {goal.accomplished ? "Completed" : "Mark Complete"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                Personalized Recovery Plan
              </CardTitle>
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
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      (riskScoreData?.risk_score || 0) < 30
                        ? "text-green-500"
                        : (riskScoreData?.risk_score || 0) < 60
                        ? "text-amber-500"
                        : "text-red-500"
                    }`}
                  />
                  <span className="font-medium">Relapse Risk Score</span>
                </div>
                <div className="text-lg font-bold">
                  {riskScoreData?.risk_score || 0}%
                </div>
              </div>
              <Progress value={riskScoreData?.risk_score || 0} />
              <div className="mt-1 text-sm text-right text-muted-foreground">
                {getRiskLevelLabel(riskScoreData?.risk_score || 0)}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">
                Personalized Recommendations:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {[
                  "Schedule two study sessions with your academic advisor",
                  "Increase sleep hygiene by maintaining a consistent bedtime",
                  "Consider joining the Wednesday support group for additional community support",
                ].map((rec, i) => (
                  <li key={i} className="text-sm">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {showDetails && (
              <div className="mt-6 space-y-4 pt-4 border-t">
                <div>
                  <h4 className="font-medium mb-2">Risk Factors:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {[
                      "Recent academic stress",
                      "Changes in social environment",
                    ].map((factor, i) => (
                      <li key={i} className="text-sm">
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Protective Factors:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {[
                      "Strong support system",
                      "Consistent medication adherence",
                      "Regular therapy attendance",
                    ].map((factor, i) => (
                      <li key={i} className="text-sm">
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Weekly Mood Trends:</h4>
                  <div className="h-32 flex items-end gap-2">
                    {[6, 7, 5, 8, 6, 7, 8].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <div
                          className="w-full bg-primary/70 rounded-t"
                          style={{ height: `${(val / 10) * 100}%` }}
                        ></div>
                        <span className="text-xs">
                          {["M", "T", "W", "T", "F", "S", "S"][i]}
                        </span>
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
