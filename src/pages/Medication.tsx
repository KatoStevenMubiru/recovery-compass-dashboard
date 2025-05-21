import { useState } from "react";
import { useMedications, useMedicationAdherence } from "@/hooks/useMedication";
import { MedicationList } from "@/components/medication/MedicationList";
import { MedicationReminders } from "@/components/medication/MedicationReminders";
import { MedicationAdherence } from "@/components/medication/MedicationAdherence";
import { MedicationForm } from "@/components/medication/MedicationForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { type Medication } from "@/services/medicationService";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function Medication() {
  const { toast } = useToast();
  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const [editingMedication, setEditingMedication] = useState<
    Medication | undefined
  >();

  const {
    medications,
    isLoading: isLoadingMedications,
    createMedication,
    updateMedication,
    deleteMedication,
  } = useMedications();

  const {
    todayAdherence,
    isLoadingToday: isLoadingAdherence,
    logAdherence,
  } = useMedicationAdherence();

  const handleAddMedication = () => {
    setIsAddingMedication(true);
  };

  const handleEditMedication = (medication: Medication) => {
    setEditingMedication(medication);
  };

  const handleDeleteMedication = async (medication: Medication) => {
    try {
      await deleteMedication.mutateAsync(medication.id);
      toast({
        title: "Success",
        description: "Medication deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete medication",
        variant: "destructive",
      });
    }
  };

  const handleLogAdherence = async (
    medicationId: number,
    taken: boolean,
    data?: {
      time_taken: string;
      effectiveness_rating: number;
      notes?: string;
    }
  ) => {
    const medication = medications?.find((m) => m.id === medicationId);
    if (!medication) return;

    try {
      const requestData = {
        medication_id: medicationId,
        medication_name: medication.name,
        taken,
        ...(taken &&
          data && {
            time_taken: data.time_taken,
            effectiveness_rating: data.effectiveness_rating,
            notes: data.notes,
          }),
      };

      console.log("Sending adherence data:", requestData);

      await logAdherence.mutateAsync(requestData);
      toast({
        title: "Success",
        description: `Medication marked as ${taken ? "taken" : "missed"}`,
      });
    } catch (error) {
      console.error("Adherence error:", error);
      toast({
        title: "Error",
        description: "Failed to log medication adherence",
        variant: "destructive",
      });
    }
  };

  const handleSubmitMedication = async (data: Omit<Medication, "id">) => {
    try {
      if (editingMedication) {
        await updateMedication.mutateAsync({
          id: editingMedication.id,
          data,
        });
        toast({
          title: "Success",
          description: "Medication updated successfully",
        });
      } else {
        await createMedication.mutateAsync(data);
        toast({
          title: "Success",
          description: "Medication added successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          editingMedication ? "update" : "add"
        } medication`,
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout pageTitle="Medication Management">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Medication Management</h1>
          <Button onClick={handleAddMedication}>
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <MedicationList
              medications={medications}
              isLoading={isLoadingMedications}
              onEdit={handleEditMedication}
              onDelete={handleDeleteMedication}
              onAdd={handleAddMedication}
            />
            <MedicationReminders
              medications={medications}
              todayAdherence={todayAdherence}
              isLoading={isLoadingMedications || isLoadingAdherence}
              onLogAdherence={handleLogAdherence}
            />
          </div>
          <div>
            <MedicationAdherence
              adherence={todayAdherence}
              isLoading={isLoadingAdherence}
            />
          </div>
        </div>

        <MedicationForm
          isOpen={isAddingMedication || !!editingMedication}
          onClose={() => {
            setIsAddingMedication(false);
            setEditingMedication(undefined);
          }}
          medication={editingMedication}
          onSubmit={handleSubmitMedication}
        />
      </div>
    </DashboardLayout>
  );
}
