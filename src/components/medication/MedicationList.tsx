
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Pill, Pencil, Trash2, School } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MedicationList() {
  const { toast } = useToast();
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Acamprosate - 333 mg",
      frequency: "daily",
      instructions: "Take three times a day with meals",
      academicSupport: true
    },
    {
      id: 2,
      name: "Bupropion - 150 mg",
      frequency: "twice daily",
      instructions: "Take one in the morning and one in the evening",
      academicSupport: false
    }
  ]);

  const handleDelete = (id: number) => {
    setMedications(prev => prev.filter(med => med.id !== id));
    toast({
      title: "Medication deleted",
      description: "The medication has been removed from your list."
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {medications.map((med, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Pill className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">{med.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Frequency: {med.frequency}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Instructions: {med.instructions}
                  </p>
                  {med.academicSupport && (
                    <div className="flex items-center gap-1 mt-2 text-primary">
                      <School className="h-4 w-4" />
                      <span className="text-sm">Supports Academic Performance</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDelete(med.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="font-medium mb-4">Add Medication</h3>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Medication Name *</Label>
              <Input id="name" placeholder="Medication name" />
            </div>
            <div>
              <Label htmlFor="dosage">Dosage *</Label>
              <Input id="dosage" placeholder="e.g., 50mg" />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="twice_daily">Twice Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="as_needed">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="instructions">Instructions</Label>
              <Input id="instructions" placeholder="Special instructions" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="academic" />
              <Label htmlFor="academic">Supports Academic Performance</Label>
            </div>
          </div>
          <Button className="w-full">Add Medication</Button>
        </div>
      </Card>
    </div>
  );
}
