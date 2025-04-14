
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { appointments } from "@/services/mockData";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const UpcomingAppointments = () => {
  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.slice(0, 2).map((appointment, idx) => (
            <div key={appointment.id} className={cn("space-y-2", idx > 0 && "pt-2")}>
              {idx > 0 && <Separator className="mb-3" />}
              <h3 className="font-medium">{appointment.title}</h3>
              <div className="flex flex-col gap-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-3 w-3" />
                  {format(new Date(appointment.date), "EEEE, MMMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-3 w-3" />
                  {appointment.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-3 w-3" />
                  {appointment.location}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2 flex justify-end">
            <Link to="/appointments">
              <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1 text-xs">
                View all appointments
                <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
