import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type MedicationAdherence } from "@/services/medicationService";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface MedicationAdherenceProps {
  adherence?: MedicationAdherence[];
  isLoading: boolean;
}

export function MedicationAdherence({
  adherence,
  isLoading,
}: MedicationAdherenceProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!adherence?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No adherence data available</p>
      </div>
    );
  }

  const takenCount = adherence.filter((a) => a.taken).length;
  const adherenceRate = (takenCount / adherence.length) * 100;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Today's Adherence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Adherence</span>
                <span className="text-sm font-medium">
                  {adherenceRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={adherenceRate} className="h-2" />
            </div>
            <div className="grid gap-4">
              {adherence.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{record.medication_name}</p>
                    {record.time_taken && (
                      <p className="text-sm text-muted-foreground">
                        Taken at{" "}
                        {format(
                          new Date(`2000-01-01T${record.time_taken}`),
                          "h:mm a"
                        )}
                      </p>
                    )}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      record.taken
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {record.taken ? "Taken" : "Missed"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
