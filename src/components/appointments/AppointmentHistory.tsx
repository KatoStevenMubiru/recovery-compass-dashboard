import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useState } from "react";
import { Appointment } from "./AppointmentScheduler"; // Import the Appointment type

// Mock data for past appointments
const mockPastAppointments = [
  {
    id: 1,
    provider: "Dr. Sarah Johnson",
    type: "Psychiatrist",
    date: "2023-11-15",
    time: "10:00 AM",
    location: "Wellness Clinic",
    status: "completed",
  },
  {
    id: 2,
    provider: "Dr. Michael Lee",
    type: "Therapist",
    date: "2023-11-05",
    time: "2:30 PM",
    location: "Mental Health Center",
    status: "completed",
  },
  {
    id: 3,
    provider: "Support Group",
    type: "Group Session",
    date: "2023-10-20",
    time: "5:00 PM",
    location: "Community Center",
    status: "cancelled",
  },
  {
    id: 4,
    provider: "Dr. Anita Patel",
    type: "Therapist",
    date: "2023-10-10",
    time: "11:00 AM",
    location: "Main Clinic",
    status: "completed",
  },
  {
    id: 5,
    provider: "Dr. Robert Williams",
    type: "Psychiatrist",
    date: "2023-09-18",
    time: "3:00 PM",
    location: "City Hospital",
    status: "no-show",
  },
];

interface AppointmentHistoryProps {
  appointments: Appointment[];
}

export function AppointmentHistory({ appointments }: AppointmentHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBadgeVariant = (status: Appointment["status"] | string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "destructive";
      case "no-show":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-primary">Appointment History</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 max-w-xs"
            />
          </div>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <Card className="gradient-card border-0 shadow-md">
        <CardContent className="p-0">
          <div className="rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No appointment history found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.title}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.location}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(appointment.status) as any}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 