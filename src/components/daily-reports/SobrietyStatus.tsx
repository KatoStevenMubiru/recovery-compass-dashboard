
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SobrietyStatusProps {
  sobriety: string;
}

export function SobrietyStatus({ sobriety }: SobrietyStatusProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-2">Sobriety Status</h2>
        <p className="text-4xl font-bold text-primary">{sobriety}</p>
      </CardContent>
    </Card>
  );
}
