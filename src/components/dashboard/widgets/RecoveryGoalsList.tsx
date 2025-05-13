import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Square, Target } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock data for recovery goals - replace with actual data source
const mockRecoveryGoals = [
  { id: "1", title: "Attend a support group meeting", completed: false },
  { id: "2", title: "Practice mindfulness for 10 minutes", completed: true },
  { id: "3", title: "Read a chapter from a recovery book", completed: false },
];

interface RecoveryGoal {
  id: string;
  title: string;
  completed: boolean;
}

export const RecoveryGoalsList = () => {
  const [goals, setGoals] = useState<RecoveryGoal[]>(mockRecoveryGoals);

  const toggleGoal = (id: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;

  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <Target className="h-5 w-5" />
          Recovery Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4 text-sm">
          <span>Your active goals</span>
          <span>{completedGoals}/{totalGoals} completed</span>
        </div>
        <div className="space-y-2">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center gap-2 py-1 cursor-pointer hover:bg-muted/30 rounded px-1"
              onClick={() => toggleGoal(goal.id)}
            >
              {goal.completed ? (
                <CheckSquare className="h-5 w-5 text-primary" />
              ) : (
                <Square className="h-5 w-5 text-muted-foreground" />
              )}
              <span className={cn(
                goal.completed && "line-through text-muted-foreground"
              )}>
                {goal.title}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 