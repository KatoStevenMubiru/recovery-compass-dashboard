import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface MedicationAdherenceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    time_taken: string;
    effectiveness_rating: number;
    notes?: string;
  }) => void;
  medicationName: string;
}

export function MedicationAdherenceForm({
  isOpen,
  onClose,
  onSubmit,
  medicationName,
}: MedicationAdherenceFormProps) {
  const [timeTaken, setTimeTaken] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  });
  const [effectivenessRating, setEffectivenessRating] = useState(3);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      time_taken: timeTaken,
      effectiveness_rating: effectivenessRating,
      notes: notes.trim() || undefined,
    };
    console.log("Form data being submitted:", formData);
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Medication Taken</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="medication">Medication</Label>
            <Input
              id="medication"
              value={medicationName}
              disabled
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="time">Time Taken</Label>
            <Input
              id="time"
              type="time"
              value={timeTaken}
              onChange={(e) => setTimeTaken(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Effectiveness Rating</Label>
            <div className="flex items-center gap-4 mt-1">
              <Slider
                value={[effectivenessRating]}
                onValueChange={([value]) => setEffectivenessRating(value)}
                min={1}
                max={5}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium">
                {effectivenessRating}/5
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about how you're feeling..."
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
