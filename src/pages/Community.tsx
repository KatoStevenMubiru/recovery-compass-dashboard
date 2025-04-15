
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiscussionForums } from "@/components/community/DiscussionForums";
import { SuccessStories } from "@/components/community/SuccessStories";

const Community = () => {
  const [activeTab, setActiveTab] = useState("forums");

  return (
    <DashboardLayout pageTitle="Recovery Community Support">
      <p className="text-sm text-muted-foreground mb-6">
        Your participation in forums and stories is confidential under Uganda's Data Protection Act 2019
      </p>

      <Tabs defaultValue="forums" className="space-y-6">
        <TabsList>
          <TabsTrigger value="forums">Discussion Forums</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="forums">
          <DiscussionForums />
        </TabsContent>

        <TabsContent value="stories">
          <SuccessStories />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Community;
