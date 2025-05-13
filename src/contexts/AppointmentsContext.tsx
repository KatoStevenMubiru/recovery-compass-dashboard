import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { format } from 'date-fns'; // Ensure date-fns is installed
import { Appointment } from '@/components/appointments/AppointmentScheduler'; // Assuming type is here
import { useToast } from '@/hooks/use-toast';

// Moved mock appointments here to be the initial state for the context
const initialMockAppointments: Appointment[] = [
  {
    id: "mock-1",
    title: "Dr. Sarah Johnson",
    type: "Psychiatrist",
    date: "2024-08-15", 
    time: "10:00 AM",
    location: "Wellness Clinic, Room 302",
    status: "confirmed",
  },
  {
    id: "mock-2",
    title: "Dr. Michael Lee",
    type: "Therapist",
    date: "2024-08-18",
    time: "02:30 PM",
    location: "Mental Health Center",
    status: "confirmed",
  },
  {
    id: "mock-3",
    title: "Support Group",
    type: "Group Session",
    date: "2024-08-20",
    time: "05:00 PM",
    location: "Community Center",
    status: "pending",
  },
  {
    id: "mock-4",
    title: "Dr. Anita Patel",
    type: "Follow-up",
    date: format(new Date(new Date().setDate(new Date().getDate() + 7)), "yyyy-MM-dd"), // 7 days from now
    time: "11:00 AM",
    location: "Virtual (Telehealth)",
    status: "pending",
  },
];

interface AppointmentsContextType {
  appointments: Appointment[];
  upcomingAppointments: Appointment[];
  pastOrCancelledAppointments: Appointment[];
  addAppointment: (newAppointmentData: Omit<Appointment, "id" | "status">) => void;
  cancelAppointment: (id: string | number) => void;
  // Reschedule might be added later
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>(initialMockAppointments);

  const addAppointment = useCallback((newAppointmentData: Omit<Appointment, "id" | "status">) => {
    const newAppointmentWithId: Appointment = {
      ...newAppointmentData,
      id: `appt-${Date.now()}`,
      status: "pending",
    };
    setAppointments((prevAppointments) => 
      [...prevAppointments, newAppointmentWithId].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    );
    toast({
        title: "Appointment Request Sent",
        description: `Your ${newAppointmentData.type} with ${newAppointmentData.title} is pending confirmation.`,
      });
  }, [toast]);

  const cancelAppointment = useCallback((id: string | number) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map(app => app.id === id ? { ...app, status: "cancelled" } : app)
    );
    toast({
      title: "Appointment Cancelled",
      description: "The appointment has been marked as cancelled.",
      variant: "warning" // Changed to warning, as destructive might be too strong for just a status change
    });
  }, [toast]);

  const upcomingAppointments = useMemo(() => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    return appointments
      .filter(app => app.status !== 'cancelled' && new Date(app.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [appointments]);

  const pastOrCancelledAppointments = useMemo(() => {
     const today = new Date(new Date().setHours(0, 0, 0, 0));
    return appointments
      .filter(app => app.status === 'cancelled' || new Date(app.date) < today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Show most recent past first
  }, [appointments]);

  return (
    <AppointmentsContext.Provider value={{ appointments, upcomingAppointments, pastOrCancelledAppointments, addAppointment, cancelAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
}; 