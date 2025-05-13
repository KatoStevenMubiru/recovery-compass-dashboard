import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { differenceInDays, isValid, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const LOCAL_STORAGE_SOBER_DATE_KEY = 'recoveryCompassSoberDate';

interface SobrietyContextType {
  soberDate: Date | null;
  daysInRecovery: number;
  updateSoberDate: (newDate: Date | null) => void;
  isSoberDateSet: boolean;
}

const SobrietyContext = createContext<SobrietyContextType | undefined>(undefined);

export const SobrietyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [soberDate, setSoberDate] = useState<Date | null>(() => {
    const storedDate = localStorage.getItem(LOCAL_STORAGE_SOBER_DATE_KEY);
    if (storedDate) {
      const parsed = parseISO(storedDate);
      return isValid(parsed) ? parsed : null;
    }
    return null; // Default to null if not set or invalid
  });

  useEffect(() => {
    if (soberDate && isValid(soberDate)) {
      localStorage.setItem(LOCAL_STORAGE_SOBER_DATE_KEY, soberDate.toISOString());
    } else {
      localStorage.removeItem(LOCAL_STORAGE_SOBER_DATE_KEY);
    }
  }, [soberDate]);

  const updateSoberDate = useCallback((newDate: Date | null) => {
    if (newDate && isValid(newDate)) {
      setSoberDate(newDate);
      toast({
        title: "Sober Date Updated",
        description: `Your sober date has been set to ${newDate.toLocaleDateString()}.`,
      });
    } else if (newDate === null) {
      setSoberDate(null);
      localStorage.removeItem(LOCAL_STORAGE_SOBER_DATE_KEY);
      toast({
        title: "Sober Date Cleared",
        description: "Your sober date has been cleared.",
        variant: "default"
      });
    } else {
        toast({
            title: "Invalid Date",
            description: "The selected date was invalid. Please try again.",
            variant: "destructive"
        });
    }
  }, [toast]);

  const daysInRecovery = useMemo(() => {
    if (soberDate && isValid(soberDate)) {
      return differenceInDays(new Date(), soberDate);
    }
    return 0;
  }, [soberDate]);

  const isSoberDateSet = useMemo(() => soberDate !== null && isValid(soberDate), [soberDate]);

  return (
    <SobrietyContext.Provider value={{ soberDate, daysInRecovery, updateSoberDate, isSoberDateSet }}>
      {children}
    </SobrietyContext.Provider>
  );
};

export const useSobriety = () => {
  const context = useContext(SobrietyContext);
  if (context === undefined) {
    throw new Error('useSobriety must be used within a SobrietyProvider');
  }
  return context;
}; 