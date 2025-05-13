import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Lock, User, Shield, Moon, Globe, AlertTriangle, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout pageTitle="Settings">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-primary">Account & Recovery Settings</h2>
          <p className="text-muted-foreground">
            Manage your account, privacy, and recovery-related preferences.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Section */}
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg text-primary">Profile Information</CardTitle>
              </div>
              <CardDescription>Update your personal and recovery profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={() => navigate('/profile')}>Edit Profile</Button>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg text-primary">Security</CardTitle>
              </div>
              <CardDescription>Change your password and manage security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={() => navigate('/profile')}>Change Password</Button>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg text-primary">Notifications</CardTitle>
              </div>
              <CardDescription>Control reminders for medication, meetings, and recovery milestones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={() => navigate('/progress')}>Manage Notifications</Button>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <EyeOff className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg text-primary">Privacy</CardTitle>
              </div>
              <CardDescription>Review and adjust your privacy and data sharing settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={() => navigate('/resources')}>Privacy Settings</Button>
            </CardContent>
          </Card>

          {/* Language & Theme */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg text-primary">Language & Region</CardTitle>
                </div>
                <CardDescription>Set your preferred language and region.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" onClick={() => navigate('/profile')}>Change Language</Button>
              </CardContent>
            </Card>
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg text-primary">Theme</CardTitle>
                </div>
                <CardDescription>Switch between light and dark mode for comfort.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" onClick={() => alert('Theme toggle coming soon!')}>Toggle Theme</Button>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-4" />

          {/* Danger Zone */}
          <Card className="gradient-card border-0 shadow-md bg-destructive/5">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription>Irreversible and destructive actions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive" onClick={() => navigate('/login')}>Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
