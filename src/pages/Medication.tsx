import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-primary">Medication Management</h2>
          <p className="text-sm text-muted-foreground">
            Track, manage, and get reminders for your medications
          </p>
        </div>

        <Card className="gradient-card border-0 shadow-md">
          <CardContent className="p-5">
            <Tabs defaultValue="medications" className="w-full">
              <TabsList className="w-full justify-start mb-4">
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Medication;
