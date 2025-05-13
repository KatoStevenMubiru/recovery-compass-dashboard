import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, X } from "lucide-react";
import { useState } from "react";
import { type Appointment } from "./AppointmentScheduler"; // Import Appointment type

// Mock data for appointments - This will be removed or become initial data in parent
// const mockAppointments = [
//   {
//     id: 1,
//     title: "Dr. Sarah Johnson",
//     type: "Psychiatrist",
//     date: "2023-12-15",
//     time: "10:00 AM",
//     location: "Wellness Clinic, Room 302",
//     status: "confirmed",
//   },
//   {
//     id: 2,
//     title: "Dr. Michael Lee",
//     type: "Therapist",
//     date: "2023-12-18",
//     time: "2:30 PM",
//     location: "Mental Health Center",
//     status: "confirmed",
//   },
//   {
//     id: 3,
//     title: "Support Group",
//     type: "Group Session",
//     date: "2023-12-20",
//     time: "5:00 PM",
//     location: "Community Center",
//     status: "pending",
//   },
// ];

interface AppointmentsListProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string | number) => void;
  onScheduleNew: () => void; // To switch to the scheduler tab
}

export function AppointmentsList({ appointments, onCancelAppointment, onScheduleNew }: AppointmentsListProps) {
  // const [appointments, setAppointments] = useState(mockAppointments); // State moved to parent

  // const cancelAppointment = (id: number) => { // Logic moved to parent
  //   setAppointments(appointments.filter((app) => app.id !== id));
  // };

  const getBadgeVariant = (status: string) => {
    if (status === "confirmed") return "success";
    if (status === "pending") return "warning";
    return "destructive"; // for cancelled
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-primary">Upcoming Appointments</h2>
        <Button variant="outline">Export</Button>
      </div>

      {appointments.length === 0 ? (
        <Card className="gradient-card border-0 shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg">No upcoming appointments</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Schedule your first appointment to get started on your recovery journey.
            </p>
            <Button className="mt-4" onClick={onScheduleNew}>Schedule Appointment</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="gradient-card border-0 shadow-md overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-primary">{appointment.title}</CardTitle>
                    <CardDescription>{appointment.type}</CardDescription>
                  </div>
                  <Badge variant={getBadgeVariant(appointment.status) as any}>
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-3 flex justify-between">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onCancelAppointment(appointment.id)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}