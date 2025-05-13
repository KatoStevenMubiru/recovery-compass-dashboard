import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Mail,
  Phone,
  Award,
  User,
  LogOut,
  BookOpen,
  Users,
} from "lucide-react";
import { userProfile } from "@/services/mockData";
import { useNavigate } from "react-router-dom";
import {
  useProfile,
  useUpdatePassword,
  useUpdateProfile,
} from "@/hooks/useProfile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();
  const { mutate: updatePassword } = useUpdatePassword();
  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();
  const { toast } = useToast();
  const [showPasswordForm, setShowPasswordForm] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [editMode, setEditMode] = React.useState(false);
  const [editFields, setEditFields] = React.useState({
    first_name: "",
    last_name: "",
    anonymous_name: "",
    program: "",
    emergency_contact: "",
  });
  const { logout } = useAuth();

  React.useEffect(() => {
    if (profile && editMode) {
      setEditFields({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        anonymous_name: profile.anonymous_name || "",
        program: profile.program || "",
        emergency_contact: profile.emergency_contact || "",
      });
    }
  }, [profile, editMode]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editFields, {
      onSuccess: () => {
        toast({
          title: "Profile updated!",
          description: "Your profile information was updated successfully.",
        });
        setEditMode(false);
      },
      onError: (error: unknown) => {
        let message = "An error occurred";
        if (error instanceof Error) message = error.message;
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      },
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassword(
      { current_password: currentPassword, new_password: newPassword },
      {
        onSuccess: () => {
          toast({
            title: "Password updated!",
            description: "Your password was changed successfully.",
          });
          setShowPasswordForm(false);
          setCurrentPassword("");
          setNewPassword("");
        },
        onError: (error: unknown) => {
          let message = "An error occurred";
          if (error instanceof Error) message = error.message;
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Profile">
        <div className="flex justify-center items-center h-96">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Profile">
      <div className="space-y-8">
        {/* User Info Card */}
        <Card className="max-w-2xl mx-auto shadow-lg border-0 gradient-card">
          <CardHeader className="flex flex-col items-center gap-2 pb-2">
            <Avatar className="h-20 w-20 mb-2 shadow-md">
              {profile?.avatar ? (
                <AvatarImage
                  src={profile.avatar}
                  alt={profile.name || profile.first_name}
                />
              ) : (
                <AvatarFallback>
                  {profile
                    ? `${(profile.first_name?.[0] || "").toUpperCase()}${(
                        profile.last_name?.[0] || ""
                      ).toUpperCase()}`
                    : "JD"}
                </AvatarFallback>
              )}
            </Avatar>
            <CardTitle className="text-2xl font-bold text-center">
              {profile?.name ||
                `${profile?.first_name || ""} ${profile?.last_name || ""}`}
            </CardTitle>
            {profile?.anonymous_name && (
              <div className="text-center text-muted-foreground text-sm">
                Anonymous Name:{" "}
                <span className="font-semibold">{profile.anonymous_name}</span>
              </div>
            )}
            <CardDescription className="text-center">
              Your information is confidential under Uganda's Data Protection
              Act 2019
            </CardDescription>
            <Badge
              variant="secondary"
              className="mt-2 px-3 py-1 text-sm font-medium"
            >
              <User className="h-4 w-4 mr-1 inline" />{" "}
              {profile?.program || "Student"}
            </Badge>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode((v) => !v)}
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {editMode ? (
              <form
                onSubmit={handleProfileUpdate}
                className="space-y-3 max-w-md mx-auto"
              >
                <Input
                  name="first_name"
                  placeholder="First Name"
                  value={editFields.first_name}
                  onChange={handleEditChange}
                  required
                />
                <Input
                  name="last_name"
                  placeholder="Last Name"
                  value={editFields.last_name}
                  onChange={handleEditChange}
                  required
                />
                <Input
                  name="anonymous_name"
                  placeholder="Anonymous Name"
                  value={editFields.anonymous_name}
                  onChange={handleEditChange}
                  required
                />
                <Input
                  name="program"
                  placeholder="Program"
                  value={editFields.program}
                  onChange={handleEditChange}
                  required
                />
                <Input
                  name="emergency_contact"
                  placeholder="Emergency Contact"
                  value={editFields.emergency_contact}
                  onChange={handleEditChange}
                  required
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={isUpdatingProfile}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {profile?.emergency_contact || profile?.phone || "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Date Joined:{" "}
                    {profile?.date_joined
                      ? new Date(profile.date_joined).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {profile?.sobrietyDays || profile?.sobriety_days || "-"}{" "}
                    days in recovery
                  </span>
                </div>
              </div>
            )}
            <Separator className="my-4" />
            <div className="flex flex-col md:flex-row gap-2 justify-center">
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => setShowPasswordForm((v) => !v)}
              >
                Change Password
              </Button>
              <Button
                variant="destructive"
                className="w-full md:w-auto"
                onClick={() => {
                  logout();
                  // The navigation is handled inside the logout function in AuthContext
                }}
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
            {showPasswordForm && (
              <form
                onSubmit={handlePasswordUpdate}
                className="mt-4 space-y-3 max-w-md mx-auto"
              >
                <Input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className=""
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className=""
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Update Password
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Recovery Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5" />
                Recovery Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-sm text-muted-foreground">
                Journal Entries
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Support Meetings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">25</div>
              <div className="text-sm text-muted-foreground">
                Meetings Attended
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-sm text-muted-foreground">Milestones</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Placeholder */}
        <Card className="max-w-4xl mx-auto shadow-md border-0">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Threads, stories, and milestones will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-center py-8">
              No recent activity yet.
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
