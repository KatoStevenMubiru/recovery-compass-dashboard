import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, XCircle } from "lucide-react";
import {
  type Medication,
  type MedicationAdherence,
} from "@/services/medicationService";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { MedicationAdherenceForm } from "./MedicationAdherenceForm";

interface MedicationRemindersProps {
  medications?: Medication[];
  todayAdherence?: MedicationAdherence[];
  isLoading: boolean;
  onLogAdherence?: (
    medicationId: number,
    taken: boolean,
    data?: {
      time_taken: string;
      effectiveness_rating: number;
      notes?: string;
    }
  ) => void;
}

export function MedicationReminders({
  medications,
  todayAdherence,
  isLoading,
  onLogAdherence,
}: MedicationRemindersProps) {
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (!medications?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No medications to track</p>
      </div>
    );
  }

  const getAdherenceStatus = (medicationId: number) => {
    return todayAdherence?.find((a) => a.medication_id === medicationId);
  };

  const handleMarkTaken = (medication: Medication) => {
    setSelectedMedication(medication);
  };

  const handleMarkMissed = (medication: Medication) => {
    onLogAdherence?.(medication.id, false);
  };

  const handleAdherenceSubmit = (data: {
    time_taken: string;
    effectiveness_rating: number;
    notes?: string;
  }) => {
    if (selectedMedication) {
      onLogAdherence?.(selectedMedication.id, true, data);
      setSelectedMedication(null);
    }
  };

  return (
    <div className="space-y-4">
      {medications.map((medication) => {
        const adherence = getAdherenceStatus(medication.id);
        const isTaken = adherence?.taken;

        return (
          <Card key={medication.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{medication.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {medication.dosage} • {medication.frequency}
                  </p>
                  {adherence?.time_taken && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Taken at{" "}
                      {format(
                        new Date(`2000-01-01T${adherence.time_taken}`),
                        "h:mm a"
                      )}
                    </p>
                  )}
                  {adherence?.effectiveness_rating && (
                    <p className="text-sm text-muted-foreground">
                      Effectiveness: {adherence.effectiveness_rating}/5
                    </p>
                  )}
                  {adherence?.notes && (
                    <p className="text-sm text-muted-foreground">
                      Notes: {adherence.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {isTaken === undefined ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkTaken(medication)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                        Taken
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkMissed(medication)}
                      >
                        <XCircle className="h-4 w-4 mr-2 text-red-600" />
                        Missed
                      </Button>
                    </>
                  ) : (
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                        isTaken
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {isTaken ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      {isTaken ? "Taken" : "Missed"}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {selectedMedication && (
        <MedicationAdherenceForm
          isOpen={!!selectedMedication}
          onClose={() => setSelectedMedication(null)}
          onSubmit={handleAdherenceSubmit}
          medicationName={selectedMedication.name}
        />
      )}
    </div>
  );
}
