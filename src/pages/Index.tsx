import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SobrietyTracker } from "@/components/dashboard/widgets/SobrietyTracker";
import { MoodTracker } from "@/components/dashboard/widgets/MoodTracker";
import { JournalPreview } from "@/components/dashboard/widgets/JournalPreview";
import { UpcomingAppointments } from "@/components/dashboard/widgets/UpcomingAppointments";
import { QuickResources } from "@/components/dashboard/widgets/QuickResources";
import {
  DailyTaskList,
  Task,
} from "@/components/dashboard/widgets/DailyTaskList";
import { RecoveryGoalsList } from "@/components/dashboard/widgets/RecoveryGoalsList";
import { dailyTasks as mockDailyTasks } from "@/services/mockData";
import { AddTaskForm } from "@/components/dashboard/forms/AddTaskForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(mockDailyTasks);
  const [isAddTaskSheetOpen, setIsAddTaskSheetOpen] = useState(false);
  const { user } = useAuth();

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user?.first_name || "User"}
          </h2>
          <p className="text-muted-foreground">
            Track your progress, manage your appointments, and access resources
            all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SobrietyTracker />
          <MoodTracker />
          <JournalPreview />
          <UpcomingAppointments />
          <QuickResources />

          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex justify-end mb-2">
              <Sheet
                open={isAddTaskSheetOpen}
                onOpenChange={setIsAddTaskSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Add a New Daily Task</SheetTitle>
                  </SheetHeader>
                  <AddTaskForm
                    onAddTask={addTask}
                    onClose={() => setIsAddTaskSheetOpen(false)}
                  />
                </SheetContent>
              </Sheet>
            </div>
            <DailyTaskList tasks={tasks} toggleTask={toggleTask} />
          </div>

          <RecoveryGoalsList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
