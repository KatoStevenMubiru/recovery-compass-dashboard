import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  AlertTriangle,
  Copy,
  MessageSquare,
  Mail,
  Clock,
  MapPin,
  Send,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  crisisReportService,
  CrisisReport,
} from "@/services/crisisReportService";

// Define the form schema
const formSchema = z.object({
  description: z.string().min(10, "Please provide at least 10 characters"),
  contact_preference: z.enum(["phone", "email", "sms", "whatsapp"]),
  urgency_level: z.enum(["low", "medium", "high"]),
  academic_impact: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const contactPrefMap = {
  phone: "PHONE",
  email: "EMAIL",
  sms: "SMS",
  whatsapp: "WHATSAPP",
} as const;
const urgencyMap = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
} as const;
const reverseContactPrefMap = {
  PHONE: "phone",
  EMAIL: "email",
  SMS: "sms",
  WHATSAPP: "whatsapp",
} as const;
const reverseUrgencyMap = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

const Emergency = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<() => void>(() => {});
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });

  const queryClient = useQueryClient();
  const [editReport, setEditReport] = useState<CrisisReport | null>(null);
  const [deleteReport, setDeleteReport] = useState<CrisisReport | null>(null);

  const {
    data: reports,
    isLoading: reportsLoading,
    error: reportsError,
  } = useQuery({
    queryKey: ["crisis-reports"],
    queryFn: crisisReportService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: crisisReportService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crisis-reports"] });
      toast({
        title: "Report Submitted",
        description:
          "Your emergency report has been submitted. Help is on the way.",
      });
      form.reset();
    },
    onError: (e: unknown) => {
      const err = e as Error;
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Parameters<typeof crisisReportService.update>[1];
    }) => crisisReportService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crisis-reports"] });
      setEditReport(null);
      toast({ title: "Report Updated" });
    },
    onError: (e: unknown) => {
      const err = e as Error;
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => crisisReportService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crisis-reports"] });
      setDeleteReport(null);
      toast({ title: "Report Deleted" });
    },
    onError: (e: unknown) => {
      const err = e as Error;
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  // Define emergency contacts
  const emergencyContacts = [
    {
      id: 1,
      name: "Dr. Sarah Namuli",
      role: "Mental Health Counselor",
      phone: "+256-771-554422",
      availability: "Available Mon-Fri, 9am-5pm",
      location: "Recovery Center, Room 302",
    },
    {
      id: 2,
      name: "Dr. John Mukisa",
      role: "Substance Recovery Specialist",
      phone: "+256-772-112233",
      availability: "Available Tue & Thu, 10am-4pm",
      location: "Main Health Center",
    },
    {
      id: 3,
      name: "Crisis Helpline",
      role: "24/7 Emergency Support",
      phone: "+256-772-308331",
      availability: "Available 24/7",
      location: "Remote Assistance",
    },
  ];

  // Initialize form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      contact_preference: "phone",
      urgency_level: "medium",
      academic_impact: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    setDialogContent({
      title: "Confirm Report Submission",
      description:
        "Are you sure you want to submit this emergency report? This will alert the emergency team.",
    });
    setDialogAction(() => () => {
      createMutation.mutate({
        emergency_description: data.description,
        contact_preference:
          contactPrefMap[
            data.contact_preference as keyof typeof contactPrefMap
          ],
        urgency_level:
          urgencyMap[data.urgency_level as keyof typeof urgencyMap],
        academic_impact: data.academic_impact,
      });
      setIsDialogOpen(false);
    });
    setIsDialogOpen(true);
  };

  // Handle emergency call
  const handleCall = (phoneNumber: string, name: string) => {
    setDialogContent({
      title: "Confirm Call",
      description: `You are about to call ${name}. Continue?`,
    });

    setDialogAction(() => () => {
      window.location.href = `tel:${phoneNumber}`;
      setIsDialogOpen(false);
    });

    setIsDialogOpen(true);
  };

  // Handle SMS
  const handleSMS = (phoneNumber: string) => {
    window.location.href = `sms:${phoneNumber}`;
  };

  // Handle Email
  const handleEmail = (email: string = "help@recovery.org") => {
    window.location.href = `mailto:${email}?subject=Emergency%20Assistance%20Request`;
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: text,
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <DashboardLayout pageTitle="Emergency SOS">
      <div className="space-y-6">
        {/* Emergency Call Section */}
        <Card className="bg-gradient-to-r from-red-500/90 to-red-600 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Action
            </CardTitle>
            <CardDescription className="text-white/90">
              Need immediate support? Call our 24/7 helpline directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full text-lg py-6 bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 shadow-md"
              onClick={() => handleCall("+256-772-308331", "Crisis Helpline")}
            >
              <Phone className="mr-2 h-5 w-5" /> Call Crisis Helpline Now
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>
              Professional support available for your recovery journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className="overflow-hidden border hover:shadow-md transition-shadow"
                >
                  <CardHeader className="bg-recovery-blue-light/30 pb-2">
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription>{contact.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 mt-0.5 text-recovery-blue" />
                        <div className="flex-1">
                          <p className="text-sm font-medium flex items-center gap-1">
                            {contact.phone}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 ml-auto"
                              onClick={() => copyToClipboard(contact.phone)}
                            >
                              <Copy className="h-3 w-3" />
                              <span className="sr-only">Copy</span>
                            </Button>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-0.5 text-recovery-blue" />
                        <p className="text-xs text-muted-foreground">
                          {contact.availability}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-recovery-blue" />
                        <p className="text-xs text-muted-foreground">
                          {contact.location}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center"
                        onClick={() => handleCall(contact.phone, contact.name)}
                      >
                        <Phone className="h-3 w-3 mr-1" /> Call
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center"
                        onClick={() => handleSMS(contact.phone)}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" /> SMS
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center"
                        onClick={() => handleEmail()}
                      >
                        <Mail className="h-3 w-3 mr-1" /> Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Crisis Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Report Crisis Now
            </CardTitle>
            <CardDescription>
              Submit an urgent crisis report for immediate assistance with your
              recovery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe Your Emergency</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about your current emergency situation so we can assist you appropriately..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_preference"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Contact Preference</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone">Phone Call</Label>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <RadioGroupItem value="sms" id="sms" />
                            <Label htmlFor="sms">SMS</Label>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <RadioGroupItem value="whatsapp" id="whatsapp" />
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">
                            Low - I need assistance but it's not urgent
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium - I need help soon
                          </SelectItem>
                          <SelectItem value="high">
                            High - I need immediate assistance
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="academic_impact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Impact</FormLabel>
                      <FormDescription>
                        Is this emergency affecting your studies or recovery
                        progress? (Optional)
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="How is this affecting your progress? (Optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" /> Submit Emergency Report
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Your Previous Crisis Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Your Previous Crisis Reports</CardTitle>
            <CardDescription>
              View, edit, or delete your past emergency reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reportsLoading ? (
              <div>Loading...</div>
            ) : reportsError ? (
              <div className="text-red-500">Error loading reports</div>
            ) : !reports || reports.length === 0 ? (
              <div>No previous reports found.</div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <Card key={report.id} className="border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <div className="font-semibold">
                          {report.emergency_description}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Submitted:{" "}
                          {new Date(report.created_at).toLocaleString()}
                        </div>
                        <div className="text-xs">
                          Contact: {report.contact_preference} | Urgency:{" "}
                          {report.urgency_level}
                        </div>
                        {report.academic_impact && (
                          <div className="text-xs">
                            Academic Impact: {report.academic_impact}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditReport(report)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteReport(report)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Privacy notice */}
        <div className="text-center text-sm text-muted-foreground">
          Your data is confidential and protected under applicable privacy laws
        </div>

        {/* Edit Dialog */}
        <Dialog
          open={!!editReport}
          onOpenChange={(open) => !open && setEditReport(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Crisis Report</DialogTitle>
            </DialogHeader>
            {editReport && (
              <EditCrisisReportForm
                report={editReport}
                onCancel={() => setEditReport(null)}
                onSave={(data) => {
                  updateMutation.mutate({
                    id: editReport.id,
                    data: {
                      emergency_description: data.description,
                      contact_preference:
                        contactPrefMap[
                          data.contact_preference as keyof typeof contactPrefMap
                        ],
                      urgency_level:
                        urgencyMap[
                          data.urgency_level as keyof typeof urgencyMap
                        ],
                      academic_impact: data.academic_impact,
                    },
                  });
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          open={!!deleteReport}
          onOpenChange={(open) => !open && setDeleteReport(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Crisis Report</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this report? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteReport(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  deleteReport && deleteMutation.mutate(deleteReport.id)
                }
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
              <DialogDescription>{dialogContent.description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={dialogAction}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

function EditCrisisReportForm({
  report,
  onCancel,
  onSave,
}: {
  report: CrisisReport;
  onCancel: () => void;
  onSave: (data: FormData) => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: report.emergency_description,
      contact_preference: reverseContactPrefMap[
        report.contact_preference as keyof typeof reverseContactPrefMap
      ] as "phone" | "email" | "sms" | "whatsapp",
      urgency_level: reverseUrgencyMap[
        report.urgency_level as keyof typeof reverseUrgencyMap
      ] as "low" | "medium" | "high",
      academic_impact: report.academic_impact || "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe Your Emergency</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_preference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Preference</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-wrap"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="edit-phone" />
                    <Label htmlFor="edit-phone">Phone Call</Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="email" id="edit-email" />
                    <Label htmlFor="edit-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="sms" id="edit-sms" />
                    <Label htmlFor="edit-sms">SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="whatsapp" id="edit-whatsapp" />
                    <Label htmlFor="edit-whatsapp">WhatsApp</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="urgency_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Urgency Level</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">
                    Low - I need assistance but it's not urgent
                  </SelectItem>
                  <SelectItem value="medium">
                    Medium - I need help soon
                  </SelectItem>
                  <SelectItem value="high">
                    High - I need immediate assistance
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="academic_impact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Impact</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}

export default Emergency;
