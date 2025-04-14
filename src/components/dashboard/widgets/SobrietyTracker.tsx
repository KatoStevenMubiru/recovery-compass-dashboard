
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { userProfile } from "@/services/mockData";

export const SobrietyTracker = () => {
  const { sobrietyDays } = userProfile;
  const nextMilestone = Math.ceil(sobrietyDays / 30) * 30;
  const progress = (sobrietyDays % 30) / 30 * 100;
  
  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Sobriety Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2 flex items-baseline">
          {sobrietyDays} <span className="text-sm font-normal ml-1 text-muted-foreground">days</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to {nextMilestone} days</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
