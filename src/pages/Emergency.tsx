
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  Send
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the form schema
const formSchema = z.object({
  description: z.string().min(10, "Please provide at least 10 characters"),
  contact_preference: z.enum(["phone", "email", "sms", "whatsapp"]),
  urgency_level: z.enum(["low", "medium", "high"]),
  academic_impact: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Emergency = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<() => void>(() => {});
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: ""
  });

  // Define emergency contacts
  const emergencyContacts = [
    {
      id: 1,
      name: "Dr. Sarah Namuli",
      role: "Mental Health Counselor",
      phone: "+256-771-554422",
      availability: "Available Mon-Fri, 9am-5pm",
      location: "Recovery Center, Room 302"
    },
    {
      id: 2,
      name: "Dr. John Mukisa",
      role: "Substance Recovery Specialist",
      phone: "+256-772-112233",
      availability: "Available Tue & Thu, 10am-4pm",
      location: "Main Health Center"
    },
    {
      id: 3,
      name: "Crisis Helpline",
      role: "24/7 Emergency Support",
      phone: "+256-772-308331",
      availability: "Available 24/7",
      location: "Remote Assistance"
    }
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
      description: "Are you sure you want to submit this emergency report? This will alert the emergency team."
    });
    
    setDialogAction(() => () => {
      // In a real app, this would send the data to an API
      console.log("Emergency report submitted:", data);
      
      toast({
        title: "Report Submitted",
        description: "Your emergency report has been submitted. Help is on the way.",
      });
      
      form.reset({
        description: "",
        contact_preference: "phone",
        urgency_level: "medium",
        academic_impact: "",
      });
      
      setIsDialogOpen(false);
    });
    
    setIsDialogOpen(true);
  };

  // Handle emergency call
  const handleCall = (phoneNumber: string, name: string) => {
    setDialogContent({
      title: "Confirm Call",
      description: `You are about to call ${name}. Continue?`
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
                <Card key={contact.id} className="overflow-hidden border hover:shadow-md transition-shadow">
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
                        <p className="text-xs text-muted-foreground">{contact.availability}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-recovery-blue" />
                        <p className="text-xs text-muted-foreground">{contact.location}</p>
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
              Submit an urgent crisis report for immediate assistance with your recovery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low - I need assistance but it's not urgent</SelectItem>
                          <SelectItem value="medium">Medium - I need help soon</SelectItem>
                          <SelectItem value="high">High - I need immediate assistance</SelectItem>
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
                        Is this emergency affecting your studies or recovery progress? (Optional)
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

        {/* Privacy notice */}
        <div className="text-center text-sm text-muted-foreground">
          Your data is confidential and protected under applicable privacy laws
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
              <DialogDescription>{dialogContent.description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={dialogAction}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Emergency;
