
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MedicationList } from "@/components/medication/MedicationList";
import { MedicationReminders } from "@/components/medication/MedicationReminders";
import { MedicationAdherence } from "@/components/medication/MedicationAdherence";
import { useToast } from "@/hooks/use-toast";
import { 
  Pill, 
  Bell, 
  ActivitySquare 
} from "lucide-react";

const Medication = () => {
  const { toast } = useToast();

  return (
    <DashboardLayout pageTitle="Medication Management">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Track, manage, and get reminders for your medications
        </p>

        <Tabs defaultValue="medications" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="medications" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Medications
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Reminders
            </TabsTrigger>
            <TabsTrigger value="adherence" className="flex items-center gap-2">
              <ActivitySquare className="h-4 w-4" />
              Adherence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="medications">
            <MedicationList />
          </TabsContent>

          <TabsContent value="reminders">
            <MedicationReminders />
          </TabsContent>

          <TabsContent value="adherence">
            <MedicationAdherence />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Medication;
