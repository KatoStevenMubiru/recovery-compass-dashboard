import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Phone, Award, User, LogOut, BookOpen, Users } from "lucide-react";
import { userProfile } from "@/services/mockData";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout pageTitle="Profile">
      <div className="space-y-8">
        {/* User Info Card */}
        <Card className="max-w-2xl mx-auto shadow-lg border-0 gradient-card">
          <CardHeader className="flex flex-col items-center gap-2 pb-2">
            <Avatar className="h-20 w-20 mb-2 shadow-md">
              {userProfile.avatar ? (
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              ) : (
                <AvatarFallback>JD</AvatarFallback>
              )}
            </Avatar>
            <CardTitle className="text-2xl font-bold text-center">{userProfile.name}</CardTitle>
            <CardDescription className="text-center">Your information is confidential under Uganda's Data Protection Act 2019</CardDescription>
            <Badge variant="secondary" className="mt-2 px-3 py-1 text-sm font-medium">
              <User className="h-4 w-4 mr-1 inline" /> Student • CoCIS
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined: {userProfile.recoveryStartDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.sobrietyDays} days in recovery</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col md:flex-row gap-2 justify-center">
              <Button variant="outline" className="w-full md:w-auto" disabled>
                Change Password
              </Button>
              <Button variant="destructive" className="w-full md:w-auto" onClick={() => navigate('/login')}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
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
              <div className="text-sm text-muted-foreground">Journal Entries</div>
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
              <div className="text-sm text-muted-foreground">Meetings Attended</div>
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
            <CardDescription>Threads, stories, and milestones will appear here.</CardDescription>
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