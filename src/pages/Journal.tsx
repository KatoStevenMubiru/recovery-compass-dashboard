import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { BookOpen, Calendar, Edit, PenTool, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userJournalService,
  UserJournalEntry,
} from "@/services/userJournalService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const Journal = () => {
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });
  const [activeTab, setActiveTab] = useState("entries");
  const queryClient = useQueryClient();
  const [editingEntry, setEditingEntry] = useState<UserJournalEntry | null>(
    null
  );
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  // Fetch all journal entries
  const {
    data: entries,
    isLoading,
    isError,
    error,
  } = useQuery<UserJournalEntry[]>({
    queryKey: ["user-journal-entries"],
    queryFn: userJournalService.getAllJournalEntries,
  });

  // Create entry
  const createMutation = useMutation({
    mutationFn: userJournalService.createJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-journal-entries"] });
      setNewEntry({ title: "", content: "" });
      setActiveTab("entries");
    },
  });

  // Delete entry
  const deleteMutation = useMutation({
    mutationFn: userJournalService.deleteJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-journal-entries"] });
    },
  });

  // Edit entry
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { title: string; content: string };
    }) => userJournalService.updateJournalEntry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-journal-entries"] });
      setEditingEntry(null);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;
    createMutation.mutate(newEntry);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const openEdit = (entry: UserJournalEntry) => {
    setEditingEntry(entry);
    setEditForm({ title: entry.title, content: entry.content });
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;
    updateMutation.mutate({ id: editingEntry.id, data: editForm });
  };

  const handleEditCancel = () => {
    setEditingEntry(null);
  };

  return (
    <DashboardLayout pageTitle="Journal">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-primary">
            Recovery Journal
          </h2>
          <p className="text-muted-foreground">
            Track your recovery journey and reflect on your progress.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          defaultValue="entries"
          className="space-y-6"
        >
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
              {isLoading && (
                <p className="text-muted-foreground text-center">Loading...</p>
              )}
              {isError && (
                <p className="text-destructive text-center">
                  {(error as Error).message}
                </p>
              )}
              {entries && entries.length === 0 && (
                <p className="text-muted-foreground text-center">
                  No journal entries yet.
                </p>
              )}
              {entries &&
                entries.map((entry) => (
                  <Card
                    key={entry.id}
                    className="gradient-card border-0 shadow-md"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-primary">
                            {entry.title}
                          </CardTitle>
                          <CardDescription className="flex items-center">
                            <Calendar className="h-4 w-4 inline-block mr-1 text-muted-foreground" />
                            {format(new Date(entry.created_at), "MMMM d, yyyy")}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(entry.id)}
                            title="Delete entry"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(entry)}
                            title="Edit entry"
                          >
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{entry.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-primary" />
                  Create New Entry
                </CardTitle>
                <CardDescription>
                  Write about your thoughts, feelings, and experiences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleAddEntry}>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      value={newEntry.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Entry title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      className="min-h-[150px]"
                      value={newEntry.content}
                      onChange={handleInputChange}
                      required
                      placeholder="Write your thoughts here..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Entry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Journal Entry Dialog */}
        <Dialog
          open={!!editingEntry}
          onOpenChange={(open) => {
            if (!open) setEditingEntry(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Journal Entry</DialogTitle>
              <DialogDescription>
                Update your journal entry below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditInputChange}
                  required
                  placeholder="Entry title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  className="min-h-[150px]"
                  value={editForm.content}
                  onChange={handleEditInputChange}
                  required
                  placeholder="Write your thoughts here..."
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleEditCancel}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
              {updateMutation.isError && (
                <div className="text-destructive text-sm mt-2">
                  {(updateMutation.error as Error).message}
                </div>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Journal;
