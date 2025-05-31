import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  userJournalService,
  UserJournalEntry,
} from "@/services/userJournalService";
import { Link } from "react-router-dom";

export const JournalPreview = () => {
  const {
    data: entries,
    isLoading,
    isError,
    error,
  } = useQuery<UserJournalEntry[]>({
    queryKey: ["user-journal-entries"],
    queryFn: userJournalService.getAllJournalEntries,
  });
  const latestEntry = entries && entries.length > 0 ? entries[0] : null;

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
          {isLoading && (
            <div className="text-xs text-muted-foreground">Loading...</div>
          )}
          {isError && (
            <div className="text-xs text-destructive">
              {(error as Error).message}
            </div>
          )}
          {latestEntry ? (
            <>
              <div className="text-xs text-muted-foreground">
                {format(new Date(latestEntry.created_at), "MMMM d, yyyy")}
              </div>
              <h3 className="font-semibold">{latestEntry.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {latestEntry.content}
              </p>
            </>
          ) : !isLoading && !isError ? (
            <div className="text-xs text-muted-foreground">
              No journal entries yet.
            </div>
          ) : null}
          <div className="flex justify-between items-center pt-2">
            <Link to="/journal">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary flex items-center gap-1 text-xs"
              >
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
