
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Square } from "lucide-react";
import { dailyTasks } from "@/services/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const DailyTaskList = () => {
  const [tasks, setTasks] = useState(dailyTasks);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Calculate completion percentage
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const percentComplete = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <CheckSquare className="h-5 w-5" />
          Daily Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
