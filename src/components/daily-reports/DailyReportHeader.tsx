
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface DailyReportHeaderProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  onGeneratePDF: () => void;
  isPdfGenerating: boolean;
}

export function DailyReportHeader({ date, onDateChange, onGeneratePDF, isPdfGenerating }: DailyReportHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left">
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button 
        variant="default" 
        className="gap-2"
        disabled={isPdfGenerating}
        onClick={onGeneratePDF}
      >
        <Download className="h-4 w-4" />
        {isPdfGenerating ? "Generating..." : "Generate PDF Report"}
      </Button>
    </div>
  );
}
