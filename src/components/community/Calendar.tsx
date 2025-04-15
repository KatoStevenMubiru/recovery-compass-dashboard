import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger, 
} from "@/components/ui/popover";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose, 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger, 
} from "@/components/ui/tooltip";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { format, isToday, isSameDay, addDays, parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  AlarmClock, 
  CheckCircle2, 
  User, 
  Tag,
  Trash2,
  Edit, 
  X,
  Info
} from "lucide-react";

// Types for events
type EventType = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "support-group" | "counseling" | "workshop" | "social";
  attendees?: string[];
};

// Color mapping for event types
const eventTypeColors = {
  "support-group": "bg-blue-100 text-blue-600 hover:bg-blue-200",
  "counseling": "bg-green-100 text-green-600 hover:bg-green-200",
  "workshop": "bg-purple-100 text-purple-600 hover:bg-purple-200",
  "social": "bg-amber-100 text-amber-600 hover:bg-amber-200",
};

const eventTypeLabels = {
  "support-group": "Support Group",
  "counseling": "Counseling",
  "workshop": "Workshop",
  "social": "Social Event",
};

export function Calendar() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<EventType[]>(mockEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [viewType, setViewType] = useState<"calendar" | "list">("calendar");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  
  // New event form state
  const [newEvent, setNewEvent] = useState<Omit<EventType, "id">>({
    title: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    type: "support-group"
  });
  
  // Form validation
  const [errors, setErrors] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: ""
  });
  
  // Handle input changes for new event form
  const handleInputChange = (field: string, value: string) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      location: ""
    };
    
    if (!newEvent.title.trim()) {
      newErrors.title = "Event title is required";
    }
    
    if (!newEvent.date) {
      newErrors.date = "Date is required";
    }
    
    if (!newEvent.startTime) {
      newErrors.startTime = "Start time is required";
    }
    
    if (!newEvent.endTime) {
      newErrors.endTime = "End time is required";
    }
    
    if (newEvent.startTime >= newEvent.endTime) {
      newErrors.endTime = "End time must be after start time";
    }
    
    if (!newEvent.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  
  // Add a new event
  const handleAddEvent = (closeDialog: () => void) => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newEventWithId = {
        ...newEvent,
        id: `event-${Date.now()}`,
        attendees: []
      };
      
      setEvents(prev => [...prev, newEventWithId]);
      
      // Reset form
      setNewEvent({
        title: "",
        description: "",
        date: format(new Date(), "yyyy-MM-dd"),
        startTime: "09:00",
        endTime: "10:00",
        location: "",
        type: "support-group"
      });
      
      closeDialog();
      
      toast({
        title: "Success",
        description: "Event has been added to the calendar",
        duration: 3000
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  // Get events for the selected date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = parseISO(event.date);
      return isSameDay(eventDate, date);
    });
  };
  
  // Get events for the current view (filtered)
  const getFilteredEvents = () => {
    if (filterType === "all") {
      return events;
    }
    return events.filter(event => event.type === filterType);
  };
  
  // Handle attendance for an event
  const handleAttendEvent = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => {
        if (event.id === eventId) {
          const attendees = event.attendees || [];
          // In a real app, use actual user ID
          const userId = "user-1"; 
          
          if (attendees.includes(userId)) {
            // User is already attending, remove them
            return {
              ...event,
              attendees: attendees.filter(id => id !== userId)
            };
          } else {
            // Add user to attendees
            return {
              ...event,
              attendees: [...attendees, userId]
            };
          }
        }
        return event;
      })
    );
    
    toast({
      description: "Attendance status updated",
      duration: 2000
    });
  };
  
  // Check if current user is attending an event
  const isAttending = (event: EventType) => {
    const userId = "user-1"; // In a real app, use actual user ID
    return event.attendees?.includes(userId);
  };
  
  // Delete an event
  const handleDeleteEvent = (eventId: string) => {
    // In a real app, would likely have role-based permissions check here
    setEvents(prev => prev.filter(event => event.id !== eventId));
    
    toast({
      description: "Event has been deleted",
      duration: 2000
    });
  };
  
  // Handle day click in calendar
  const handleDateSelect = (day: Date | undefined) => {
    if (day) {
      setDate(day);
    }
  };
  
  // Render day contents for the calendar
  const renderDayContents = (day: Date) => {
    const dayEvents = events.filter(event => {
      const eventDate = parseISO(event.date);
      return isSameDay(eventDate, day);
    });
    
    let eventClasses = "relative p-2 hover:bg-muted transition-colors";
    
    if (isToday(day)) {
      eventClasses += " bg-primary/10 font-medium";
    }
    
    return (
      <div className={eventClasses}>
        <div className="text-center">{format(day, "d")}</div>
        {dayEvents.length > 0 && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center">
            {dayEvents.length <= 3 ? (
              <div className="flex gap-0.5 justify-center">
                {dayEvents.map((event, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${event.type === "support-group" ? "bg-blue-500" : 
                              event.type === "counseling" ? "bg-green-500" : 
                              event.type === "workshop" ? "bg-purple-500" : "bg-amber-500"}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-xs font-medium text-primary">
                {dayEvents.length} events
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
      {/* Calendar View */}
      <Card className="md:col-span-5">
        <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recovery Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Select
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="support-group">Support Groups</SelectItem>
                <SelectItem value="counseling">Counseling</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="social">Social Events</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex rounded-md border overflow-hidden">
              <Button
                variant={viewType === "calendar" ? "default" : "ghost"}
                size="sm"
                className="rounded-none px-3"
                onClick={() => setViewType("calendar")}
              >
                <CalendarIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewType === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-none px-3"
                onClick={() => setViewType("list")}
              >
                <Clock className="h-4 w-4" />
              </Button>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event for the recovery community calendar.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Event Title</label>
                    <Input
                      id="title"
                      placeholder="Enter event title"
                      value={newEvent.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && <p className="text-destructive text-xs">{errors.title}</p>}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium">Date</label>
                      <Input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className={errors.date ? "border-destructive" : ""}
                      />
                      {errors.date && <p className="text-destructive text-xs">{errors.date}</p>}
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium">Start Time</label>
                      <Input
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => handleInputChange("startTime", e.target.value)}
                        className={errors.startTime ? "border-destructive" : ""}
                      />
                      {errors.startTime && <p className="text-destructive text-xs">{errors.startTime}</p>}
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium">End Time</label>
                      <Input
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => handleInputChange("endTime", e.target.value)}
                        className={errors.endTime ? "border-destructive" : ""}
                      />
                      {errors.endTime && <p className="text-destructive text-xs">{errors.endTime}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      placeholder="Enter location"
                      value={newEvent.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className={errors.location ? "border-destructive" : ""}
                    />
                    {errors.location && <p className="text-destructive text-xs">{errors.location}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Type</label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value) => handleInputChange("type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support-group">Support Group</SelectItem>
                        <SelectItem value="counseling">Counseling</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="social">Social Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      placeholder="Enter event description"
                      value={newEvent.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button 
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddEvent(() => {});
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding..." : "Add Event"}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          {viewType === "calendar" ? (
            <>
              <div className="rounded-md border">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="p-0"
                  components={{
                    Day: ({ day, ...props }) => (
                      <button {...props}>
                        {renderDayContents(day)}
                      </button>
                    )
                  }}
                />
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm">
                    Events for {date ? format(date, "MMMM d, yyyy") : "Today"}
                  </h3>
                  {date && (
                    <div className="flex gap-1">
                      <Badge variant={isToday(date) ? "default" : "outline"} className="px-2 py-0 text-xs">
                        {isToday(date) ? "Today" : format(date, "EEEE")}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-3 mt-2">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2].map((_, i) => (
                        <div key={i} className="flex gap-3 p-3 border rounded-md">
                          <div className="flex-shrink-0">
                            <Skeleton className="h-10 w-10 rounded-md" />
                          </div>
                          <div className="space-y-2 flex-grow">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-3 w-1/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : date && getEventsForDate(date).length === 0 ? (
                    <div className="text-center py-8">
                      <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No events scheduled for this day</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Event
                      </Button>
                    </div>
                  ) : (
                    date && getEventsForDate(date).map((event) => (
                      <div 
                        key={event.id} 
                        className="flex gap-3 p-3 border rounded-md hover:bg-muted/40 transition-colors"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${
                          event.type === "support-group" ? "bg-blue-100" : 
                          event.type === "counseling" ? "bg-green-100" : 
                          event.type === "workshop" ? "bg-purple-100" : "bg-amber-100"
                        }`}>
                          {event.type === "support-group" ? <Users className="h-5 w-5 text-blue-600" /> : 
                           event.type === "counseling" ? <User className="h-5 w-5 text-green-600" /> : 
                           event.type === "workshop" ? <Tag className="h-5 w-5 text-purple-600" /> : 
                           <Users className="h-5 w-5 text-amber-600" />}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <Badge variant="outline" className="px-1.5 py-0 text-xs">
                              {eventTypeLabels[event.type]}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.startTime} - {event.endTime}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-3 p-3 border rounded-md">
                      <div className="flex-shrink-0">
                        <Skeleton className="h-12 w-12 rounded-md" />
                      </div>
                      <div className="space-y-2 flex-grow">
                        <Skeleton className="h-5 w-2/3" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : getFilteredEvents().length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No events found</h3>
                  <p className="text-muted-foreground mt-1">
                    {filterType === "all" 
                      ? "There are no upcoming events scheduled" 
                      : `There are no ${eventTypeLabels[filterType as keyof typeof eventTypeLabels].toLowerCase()} events scheduled`}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredEvents().map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>
                          {format(parseISO(event.date), "MMM d, yyyy")}
                          <div className="text-xs text-muted-foreground">
                            {event.startTime} - {event.endTime}
                          </div>
                        </TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${
                            event.type === "support-group" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : 
                            event.type === "counseling" ? "bg-green-50 text-green-600 hover:bg-green-100" : 
                            event.type === "workshop" ? "bg-purple-50 text-purple-600 hover:bg-purple-100" : 
                            "bg-amber-50 text-amber-600 hover:bg-amber-100"
                          }`}>
                            {eventTypeLabels[event.type]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => setSelectedEvent(event)}
                                  >
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant={isAttending(event) ? "default" : "outline"} 
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleAttendEvent(event.id)}
                                  >
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{isAttending(event) ? "Cancel attendance" : "Attend event"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Event Details Panel */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg">Event Details</CardTitle>
        </CardHeader>
        
        <CardContent>
          {selectedEvent ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge 
                    className={`${
                      selectedEvent.type === "support-group" ? "bg-blue-100 text-blue-600" : 
                      selectedEvent.type === "counseling" ? "bg-green-100 text-green-600" : 
                      selectedEvent.type === "workshop" ? "bg-purple-100 text-purple-600" : 
                      "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {eventTypeLabels[selectedEvent.type]}
                  </Badge>
                  <h3 className="text-lg font-medium mt-2">{selectedEvent.title}</h3>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => setSelectedEvent(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{format(parseISO(selectedEvent.date), "EEEE, MMMM d, yyyy")}</p>
                    <p className="text-muted-foreground">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{selectedEvent.location}</p>
                  </div>
                </div>
                
                {selectedEvent.description && (
                  <div className="mt-2">
                    <p className="text-sm whitespace-pre-line">{selectedEvent.description}</p>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-sm mb-2">Attendees</h4>
                {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {selectedEvent.attendees.map((attendee, i) => (
                      <Badge key={i} variant="secondary" className="px-2 py-0.5">
                        {attendee === "user-1" ? "You" : `User ${attendee.split("-")[1]}`}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No attendees yet</p>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1"
                  variant={isAttending(selectedEvent) ? "default" : "outline"}
                  onClick={() => handleAttendEvent(selectedEvent.id)}
                >
                  {isAttending(selectedEvent) ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Going
                    </>
                  ) : (
                    "Attend"
                  )}
                </Button>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => {
                          handleDeleteEvent(selectedEvent.id);
                          setSelectedEvent(null);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete event</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center flex-col">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="font-medium text-center">No event selected</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Select an event from the calendar to view details
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Mock events data
const mockEvents: EventType[] = [
  {
    id: "event-1",
    title: "Weekly Support Group Meeting",
    description: "Join us for our weekly peer support group where we discuss challenges and celebrate achievements in recovery. This is a safe space for everyone to share their experiences and offer mutual support.",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "18:00",
    endTime: "19:30",
    location: "Student Center, Room 203",
    type: "support-group",
    attendees: ["user-1", "user-2", "user-4"]
  },
  {
    id: "event-2",
    title: "One-on-One Counseling",
    description: "Personal counseling session with Dr. Sarah Matthews. Please come prepared with any topics or concerns you'd like to discuss.",
    date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    startTime: "10:00",
    endTime: "11:00",
    location: "Health Center, Office 115",
    type: "counseling",
    attendees: ["user-1"]
  },
  {
    id: "event-3",
    title: "Stress Management Workshop",
    description: "Learn evidence-based techniques for managing stress during exams and other high-pressure situations. This interactive workshop will cover breathing exercises, time management, and cognitive reframing.",
    date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    startTime: "14:00",
    endTime: "16:00",
    location: "Library Conference Room",
    type: "workshop",
    attendees: []
  },
  {
    id: "event-4",
    title: "Sober Social: Game Night",
    description: "Join us for a fun evening of board games, snacks, and alcohol-free beverages. A great opportunity to socialize and make new friends in a supportive environment.",
    date: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    startTime: "19:00",
    endTime: "22:00",
    location: "Student Lounge",
    type: "social",
    attendees: ["user-2", "user-3"]
  },
  {
    id: "event-5",
    title: "Mindfulness Meditation Session",
    description: "A guided meditation session focused on developing mindfulness skills that can help with recovery and overall wellbeing.",
    date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    startTime: "08:30",
    endTime: "09:15",
    location: "Wellness Center, Studio 2",
    type: "workshop",
    attendees: []
  }
]; 