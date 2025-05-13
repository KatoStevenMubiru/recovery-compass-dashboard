import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, PartyPopper } from "lucide-react";
import { useSobriety } from "@/contexts/SobrietyContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const SobrietyTracker = () => {
  const { daysInRecovery, isSoberDateSet } = useSobriety();
  
  const nextMilestoneTarget = 30;
  const daysTowardsMilestone = daysInRecovery % nextMilestoneTarget;
  const progressToMilestone = (daysTowardsMilestone / nextMilestoneTarget) * 100;
  const currentMilestoneDisplay = Math.floor(daysInRecovery / nextMilestoneTarget) * nextMilestoneTarget;
  const nextMilestoneDisplay = currentMilestoneDisplay + nextMilestoneTarget;

  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Sobriety Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSoberDateSet ? (
          <>
            <div className="text-3xl font-bold mb-2 flex items-baseline">
              {daysInRecovery} <span className="text-sm font-normal ml-1 text-muted-foreground">days</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextMilestoneDisplay} days</span>
                <span>{Math.round(progressToMilestone)}%</span>
              </div>
              <Progress value={progressToMilestone} className="h-2" />
            </div>
          </>
        ) : (
          <div className="text-center py-3">
            <PartyPopper className="h-10 w-10 mx-auto mb-2 text-muted-foreground opacity-70" />
            <p className="text-sm text-muted-foreground mb-2">
              Set your sober date to start tracking!
            </p>
            <Link to="/progress">
              <Button variant="outline" size="sm">Go to Progress Page</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
