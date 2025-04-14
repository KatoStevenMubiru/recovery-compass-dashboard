
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { journalEntries } from "@/services/mockData";
import { Link } from "react-router-dom";

export const JournalPreview = () => {
  const latestEntry = journalEntries[0];
  
  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Journal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {format(new Date(latestEntry.date), "MMMM d, yyyy")}
          </div>
          <h3 className="font-semibold">{latestEntry.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {latestEntry.content}
          </p>
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center">
              <span className="text-xs font-medium mr-1">Mood:</span>
              <span className="text-xs">{latestEntry.mood}/10</span>
            </div>
            <Link to="/journal">
              <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1 text-xs">
                View all entries
                <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
