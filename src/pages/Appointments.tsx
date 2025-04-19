import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ListChecks } from "lucide-react";
import { AppointmentsList } from "@/components/appointments/AppointmentsList";
import { AppointmentScheduler } from "@/components/appointments/AppointmentScheduler";
import { AppointmentHistory } from "@/components/appointments/AppointmentHistory";
import { useToast } from "@/hooks/use-toast";

const Appointments = () => {
  const { toast } = useToast();

  return (
    <DashboardLayout pageTitle="Appointments">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Schedule, manage, and review your healthcare appointments
        </p>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full justify-start">
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
            <AppointmentsList />
          </TabsContent>

          <TabsContent value="schedule">
            <AppointmentScheduler />
          </TabsContent>

          <TabsContent value="history">
            <AppointmentHistory />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Appointments; 