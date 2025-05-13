import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface DailyTaskListProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
}

export const DailyTaskList = ({ tasks, toggleTask }: DailyTaskListProps) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <CheckSquare className="h-5 w-5" />
          Daily Tasks
        </CardTitle>
        {/* Placeholder for Add Task Button/Trigger - will be added in Index.tsx */}
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No tasks for today. Add some tasks to get started!
          </p>
        ) : (
          <>
            <div className="flex justify-between mb-4 text-sm">
              <span>Today's tasks</span>
              <span>{completedTasks}/{totalTasks} completed</span>
            </div>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center gap-2 py-1 cursor-pointer hover:bg-muted/30 rounded px-1"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? (
                    <CheckSquare className="h-5 w-5 text-primary" />
                  ) : (
                    <Square className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className={cn(
                    task.completed && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
