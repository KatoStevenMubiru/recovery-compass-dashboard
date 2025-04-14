
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SobrietyTracker } from "@/components/dashboard/widgets/SobrietyTracker";
import { MoodTracker } from "@/components/dashboard/widgets/MoodTracker";
import { JournalPreview } from "@/components/dashboard/widgets/JournalPreview";
import { UpcomingAppointments } from "@/components/dashboard/widgets/UpcomingAppointments";
import { QuickResources } from "@/components/dashboard/widgets/QuickResources";
import { DailyTaskList } from "@/components/dashboard/widgets/DailyTaskList";
import { userProfile } from "@/services/mockData";

const Index = () => {
  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back, {userProfile.name.split(' ')[0]}</h2>
          <p className="text-muted-foreground">
            Track your progress, manage your appointments, and access resources all in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SobrietyTracker />
          <MoodTracker />
          <JournalPreview />
          <UpcomingAppointments />
          <QuickResources />
          <DailyTaskList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
