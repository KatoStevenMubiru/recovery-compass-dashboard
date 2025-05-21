import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pill, Pencil, Trash2, School, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Medication } from "@/services/medicationService";
import { Skeleton } from "@/components/ui/skeleton";

interface MedicationListProps {
  medications?: Medication[];
  isLoading: boolean;
  onEdit: (medication: Medication) => void;
  onDelete: (medication: Medication) => void;
  onAdd: () => void;
}

export function MedicationList({
  medications,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}: MedicationListProps) {
  const { toast } = useToast();

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
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">No medications added yet</p>
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Medications</CardTitle>
        <Button onClick={onAdd} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((medication) => (
            <div
              key={medication.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div>
                <h3 className="font-medium">{medication.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {medication.dosage} • {medication.frequency}
                </p>
                {medication.instructions && (
                  <p className="text-sm mt-2">{medication.instructions}</p>
                )}
                {medication.supports_academic && (
                  <div className="flex items-center gap-1 mt-2 text-primary">
                    <School className="h-4 w-4" />
                    <span className="text-sm">
                      Supports Academic Performance
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(medication)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(medication)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
