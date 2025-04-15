
import { Card } from "@/components/ui/card";
import { Bell, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function MedicationReminders() {
  const reminders = [
    {
      medication: "Acamprosate - 333 mg",
      time: "8:00 AM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      isEnabled: true
    },
    {
      medication: "Acamprosate - 333 mg",
      time: "2:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      isEnabled: true
    },
    {
      medication: "Acamprosate - 333 mg",
      time: "8:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      isEnabled: true
    },
    {
      medication: "Bupropion - 150 mg",
      time: "9:00 AM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      isEnabled: true
    },
    {
      medication: "Bupropion - 150 mg",
      time: "9:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      isEnabled: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {reminders.map((reminder, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="font-medium">{reminder.medication}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{reminder.time}</span>
                    <Calendar className="h-3.5 w-3.5 ml-2" />
                    <span>{reminder.days.join(", ")}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Switch id={`reminder-${index}`} checked={reminder.isEnabled} />
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <h3 className="font-medium mb-4">Add New Reminder</h3>
        <Button className="w-full">+ Add Medication Reminder</Button>
      </Card>
    </div>
  );
}
