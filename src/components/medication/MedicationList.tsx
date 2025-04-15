
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pill, Pencil, Trash2 } from "lucide-react";

export function MedicationList() {
  const medications = [
    {
      name: "Acamprosate - 333 mg",
      frequency: "daily",
      instructions: "Take three times a day with meals",
      academicSupport: true
    },
    {
      name: "Bupropion - 150 mg",
      frequency: "twice daily",
      instructions: "Take one in the morning and one in the evening"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {medications.map((med, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Pill className="h-5 w-5 mt-1 text-blue-500" />
                <div>
                  <h3 className="font-medium">{med.name}</h3>
                  <p className="text-sm text-muted-foreground">Frequency: {med.frequency}</p>
                  <p className="text-sm text-muted-foreground">Instructions: {med.instructions}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <h3 className="font-medium mb-4">Add Medication</h3>
        <div className="space-y-4">
          <Input placeholder="Medication Name *" />
          <Input placeholder="Dosage *" />
          <Input placeholder="Instructions" />
          <Button className="w-full">Add Medication</Button>
        </div>
      </Card>
    </div>
  );
}
