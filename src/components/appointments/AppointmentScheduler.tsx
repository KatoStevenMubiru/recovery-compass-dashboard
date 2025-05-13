import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface AppointmentSchedulerProps {
  onScheduleAppointment: (appointment: Omit<Appointment, "id" | "status">) => void;
  onSwitchToUpcoming?: () => void; // Optional: to switch tab after scheduling
}

// Define an Appointment type (can be moved to a types file later)
export interface Appointment {
  id: string | number;
  title: string; // Healthcare provider name
  type: string; // Appointment Type
  date: string; // ISO string or formatted string
  time: string;
  location: string;
  notes?: string;
  status: "confirmed" | "pending" | "cancelled";
}

export function AppointmentScheduler({ onScheduleAppointment, onSwitchToUpcoming }: AppointmentSchedulerProps) {
  const { toast } = useToast();
  const [provider, setProvider] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!provider || !appointmentType || !date || !time || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Provider, Type, Date, Time, Location).",
        variant: "destructive",
      });
      return;
    }
    
    const newAppointment = {
      title: provider, // Using provider name as title for consistency with AppointmentsList mock
      type: appointmentType,
      date: format(date, "yyyy-MM-dd"), // Store date consistently
      time,
      location,
      notes,
      // Status will be set by parent, typically 'pending' or 'confirmed'
    };

    // Find provider display name to show in toast
    // This is a bit of a hack; ideally, provider data would be structured
    let providerDisplayName = provider;
    if (provider === "dr-johnson") providerDisplayName = "Dr. Sarah Johnson";
    else if (provider === "dr-lee") providerDisplayName = "Dr. Michael Lee";
    else if (provider === "dr-patel") providerDisplayName = "Dr. Anita Patel";
    else if (provider === "dr-williams") providerDisplayName = "Dr. Robert Williams";


    onScheduleAppointment(newAppointment as Omit<Appointment, "id" | "status">);
    
    toast({
      title: "Appointment Scheduled",
      description: `Your ${appointmentType} with ${providerDisplayName} on ${format(date, "PPP")} at ${time} has been requested.`,
    });

    // Reset form
    setProvider("");
    setAppointmentType("");
    setDate(undefined);
    setTime("");
    setLocation("");
    setNotes("");

    if (onSwitchToUpcoming) {
      onSwitchToUpcoming();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-primary">Schedule New Appointment</h2>
        <p className="text-sm text-muted-foreground">
          Book an appointment with your healthcare providers
        </p>
      </div>

      <Card className="gradient-card border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-primary">Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="provider">Healthcare Provider *</Label>
                <Select required value={provider} onValueChange={setProvider}>
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="dr-lee">Dr. Michael Lee</SelectItem>
                    <SelectItem value="dr-patel">Dr. Anita Patel</SelectItem>
                    <SelectItem value="dr-williams">Dr. Robert Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointmentType">Appointment Type *</Label>
                <Select required value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger id="appointmentType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="therapy">Therapy Session</SelectItem>
                    <SelectItem value="psychiatry">Psychiatric Consultation</SelectItem>
                    <SelectItem value="group">Group Therapy</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="intake">Initial Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                      id="date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Select required value={time} onValueChange={setTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select required value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinic">Main Clinic</SelectItem>
                    <SelectItem value="center">Mental Health Center</SelectItem>
                    <SelectItem value="hospital">City Hospital</SelectItem>
                    <SelectItem value="virtual">Virtual (Telehealth)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific concerns or information for your provider..."
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">Schedule Appointment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 