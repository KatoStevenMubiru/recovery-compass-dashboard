import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { type Medication } from "@/services/medicationService";

type MedicationFrequency = Medication["frequency"];

interface MedicationFormProps {
  medication?: Medication;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Medication, "id">) => Promise<void>;
}

export function MedicationForm({
  medication,
  isOpen,
  onClose,
  onSubmit,
}: MedicationFormProps) {
  const [formData, setFormData] = useState<Omit<Medication, "id">>({
    name: "",
    dosage: "",
    frequency: "daily",
    instructions: "",
    supports_academic: false,
  });

  useEffect(() => {
    if (medication) {
      setFormData({
        name: medication.name,
        dosage: medication.dosage,
        frequency: medication.frequency,
        instructions: medication.instructions || "",
        supports_academic: medication.supports_academic,
      });
    } else {
      setFormData({
        name: "",
        dosage: "",
        frequency: "daily",
        instructions: "",
        supports_academic: false,
      });
    }
  }, [medication]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Failed to submit medication:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {medication ? "Edit Medication" : "Add Medication"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Medication Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Medication name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage *</Label>
            <Input
              id="dosage"
              value={formData.dosage}
              onChange={(e) =>
                setFormData({ ...formData, dosage: e.target.value })
              }
              placeholder="e.g., 50mg"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency *</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value: MedicationFrequency) =>
                setFormData({ ...formData, frequency: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="twice_daily">Twice Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="as_needed">As Needed</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Input
              id="instructions"
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              placeholder="Special instructions"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="academic"
              checked={formData.supports_academic}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  supports_academic: checked as boolean,
                })
              }
            />
            <Label htmlFor="academic">Supports Academic Performance</Label>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {medication ? "Save Changes" : "Add Medication"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
