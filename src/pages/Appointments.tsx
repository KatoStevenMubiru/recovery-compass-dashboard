import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ListChecks } from "lucide-react";
import { AppointmentsList } from "@/components/appointments/AppointmentsList";
import { AppointmentScheduler } from "@/components/appointments/AppointmentScheduler";
import { AppointmentHistory } from "@/components/appointments/AppointmentHistory";
import { useState } from "react";
import { useAppointments } from "@/contexts/AppointmentsContext";

const Appointments = () => {
  const {
    upcomingAppointments,
    pastOrCancelledAppointments,
    addAppointment,
    cancelAppointment,
  } = useAppointments();

  const [activeTab, setActiveTab] = useState<string>("upcoming");

  return (
    <DashboardLayout pageTitle="Appointments">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-primary">Appointments</h2>
          <p className="text-sm text-muted-foreground">
            Schedule, manage, and review your healthcare appointments
          </p>
        </div>

        <Card className="gradient-card border-0 shadow-md">
          <CardContent className="p-5">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="upcoming" className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4" />
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule New
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <AppointmentsList
                  appointments={upcomingAppointments}
                  onCancelAppointment={cancelAppointment}
                  onScheduleNew={() => setActiveTab("schedule")}
                />
              </TabsContent>

              <TabsContent value="schedule">
                <AppointmentScheduler
                  onScheduleAppointment={addAppointment}
                  onSwitchToUpcoming={() => setActiveTab("upcoming")}
                />
              </TabsContent>

              <TabsContent value="history">
                <AppointmentHistory appointments={pastOrCancelledAppointments} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Appointments; 