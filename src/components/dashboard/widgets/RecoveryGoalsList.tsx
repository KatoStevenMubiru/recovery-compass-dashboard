import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Square, Target } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Goal {
  id: number;
  user: number;
  date: string;
  description: string;
  accomplished: boolean;
}

interface GoalProgress {
  total_goals: number;
  accomplished: number;
  progress_rate: number;
}

interface RecoveryGoalsListProps {
  goals: Goal[] | undefined;
  isLoading: boolean;
  goalProgress: GoalProgress | undefined;
  onCreateGoal: (description: string) => void;
  onToggleGoal: (goalId: number, accomplished: boolean) => void;
}

export const RecoveryGoalsList = ({
  goals,
  isLoading,
  goalProgress,
  onCreateGoal,
  onToggleGoal,
}: RecoveryGoalsListProps) => {
  const [newGoal, setNewGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      onCreateGoal(newGoal);
      setNewGoal("");
    }
  };

  if (isLoading) {
    return (
      <Card className="gradient-card border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recovery Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-3">
            <p className="text-sm text-muted-foreground">Loading goals...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <Target className="h-5 w-5" />
          Recovery Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-4">
          <Textarea
            placeholder="Add a new recovery goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="mb-2"
          />
          <Button type="submit" className="w-full">
            Add Goal
          </Button>
        </form>

        {goalProgress && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {goalProgress.accomplished}/{goalProgress.total_goals} completed
              </span>
            </div>
            <Progress value={goalProgress.progress_rate} className="h-2" />
          </div>
        )}

        <div className="space-y-2">
          {goals?.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center gap-2 py-1 cursor-pointer hover:bg-muted/30 rounded px-1"
              onClick={() => onToggleGoal(goal.id, goal.accomplished)}
            >
              {goal.accomplished ? (
                <CheckSquare className="h-5 w-5 text-primary" />
              ) : (
                <Square className="h-5 w-5 text-muted-foreground" />
              )}
              <span
                className={cn(
                  goal.accomplished && "line-through text-muted-foreground"
                )}
              >
                {goal.description}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
