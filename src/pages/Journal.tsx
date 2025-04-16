
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { journalEntries } from "@/services/mockData";
import { format } from "date-fns";
import { BookOpen, Calendar, Edit, PenTool } from "lucide-react";

const Journal = () => {
  return (
    <DashboardLayout pageTitle="Journal">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Recovery Journal</h2>
          <p className="text-muted-foreground">
            Track your recovery journey and reflect on your progress.
          </p>
        </div>

        <Tabs defaultValue="entries" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-[400px]">
            <TabsTrigger value="entries" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Journal Entries</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              <span>New Entry</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="entries">
            <div className="grid gap-6">
              {journalEntries.map((entry) => (
                <Card key={entry.id} className="border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{entry.title}</CardTitle>
                        <CardDescription>
                          <Calendar className="h-4 w-4 inline-block mr-1" />
                          {format(new Date(entry.date), "MMMM d, yyyy")}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{entry.content}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-sm font-medium">Mood:</span>
                      <span className="text-sm text-muted-foreground">{entry.mood}/10</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Create New Entry</CardTitle>
                <CardDescription>
                  Write about your thoughts, feelings, and experiences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Journal entry form will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Journal;
