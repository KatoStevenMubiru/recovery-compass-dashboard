import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiscussionForums } from "@/components/community/DiscussionForums";
import { SuccessStories } from "@/components/community/SuccessStories";
import { Resources } from "@/components/community/Resources";
import { Calendar } from "@/components/community/Calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Calendar as CalendarIcon, MessageSquare } from "lucide-react";

const Community = () => {
  return (
    <DashboardLayout pageTitle="Recovery Community Support">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Community Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Connect, share, and grow together. Your participation in forums and stories is confidential under Uganda's Data Protection Act 2019.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Next: Support Group (Tomorrow)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">+5 new resources this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">15 with new activity today</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="forums" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-2 w-full">
            <TabsTrigger value="forums" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Discussion Forums</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Success Stories</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forums">
            <Card>
              <CardHeader>
                <CardTitle>Discussion Forums</CardTitle>
                <CardDescription>
                  Connect with peers and share experiences in a safe environment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DiscussionForums />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories">
            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>
                  Share your recovery journey and inspire others with your success story.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SuccessStories />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Community;
