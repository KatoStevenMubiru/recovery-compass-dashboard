import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
  onClose?: () => void; // Optional: to close the sheet/modal after adding
}

export const AddTaskForm = ({ onAddTask, onClose }: AddTaskFormProps) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") {
      // Optionally, add some validation feedback here
      return;
    }
    onAddTask(taskTitle.trim());
    setTaskTitle(""); // Clear input after adding
    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label htmlFor="taskTitle" className="mb-2 block text-sm font-medium">
          New Task Title
        </Label>
        <Input
          id="taskTitle"
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="E.g., Read for 30 minutes"
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Add Task
      </Button>
    </form>
  );
}; 