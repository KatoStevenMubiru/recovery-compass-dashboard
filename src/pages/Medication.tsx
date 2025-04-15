
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MedicationList } from "@/components/medication/MedicationList";
import { MedicationReminders } from "@/components/medication/MedicationReminders";
import { MedicationAdherence } from "@/components/medication/MedicationAdherence";

const Medication = () => {
  return (
    <DashboardLayout pageTitle="Medication Management">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Track, manage, and get reminders for your medications
        </p>

        <Tabs defaultValue="medications" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="adherence">Adherence</TabsTrigger>
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
