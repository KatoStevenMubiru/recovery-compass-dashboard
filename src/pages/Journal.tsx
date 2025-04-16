import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { journalEntries as initialEntries } from "@/services/mockData";
import { format } from "date-fns";
import { BookOpen, Calendar, Edit, PenTool, Trash2 } from "lucide-react";

const Journal = () => {
  const [entries, setEntries] = useState(initialEntries);
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "",
  });
  const [activeTab, setActiveTab] = useState("entries");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newEntry.title.trim() || !newEntry.content.trim() || !newEntry.mood.trim()) return;
    setEntries([
      {
        id: `journal-${Date.now()}`,
        date: format(new Date(), "yyyy-MM-dd"),
        title: newEntry.title,
        content: newEntry.content,
        mood: Number(newEntry.mood),
      },
      ...entries,
    ]);
    setNewEntry({ title: "", content: "", mood: "" });
    setActiveTab("entries");
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <DashboardLayout pageTitle="Journal">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Recovery Journal</h2>
          <p className="text-muted-foreground">
            Track your recovery journey and reflect on your progress.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="entries" className="space-y-6">
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
              {entries.length === 0 && (
                <p className="text-muted-foreground text-center">No journal entries yet.</p>
              )}
              {entries.map((entry) => (
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
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)} title="Delete entry">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        <Button variant="ghost" size="icon" disabled title="Edit (coming soon)">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
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
                <form className="space-y-4" onSubmit={handleAddEntry}>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input input-bordered w-full"
                      value={newEntry.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="content">Content</label>
                    <textarea
                      id="content"
                      name="content"
                      className="input input-bordered w-full min-h-[100px]"
                      value={newEntry.content}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="mood">Mood (1-10)</label>
                    <input
                      id="mood"
                      name="mood"
                      type="number"
                      min="1"
                      max="10"
                      className="input input-bordered w-full"
                      value={newEntry.mood}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Entry</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Journal;
