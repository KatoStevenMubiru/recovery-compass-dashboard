
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DiscussionForums() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Post a Message</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback>KS</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">kato.steven60</p>
            <p className="text-xs text-muted-foreground">student - 22345</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input placeholder="Topic Title" />
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Academic Support" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic Support</SelectItem>
              <SelectItem value="mental">Mental Health</SelectItem>
              <SelectItem value="recovery">Recovery</SelectItem>
            </SelectContent>
          </Select>

          <Textarea placeholder="Your Message" className="min-h-[100px]" />

          <Button className="w-full">Post Message</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Discussions</h3>
        <div className="space-y-4">
          {mockDiscussions.map((discussion, index) => (
            <DiscussionItem key={index} {...discussion} />
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">View All Discussions</Button>
      </Card>
    </div>
  );
}

const DiscussionItem = ({ title, author, date, category, replies, likes }: any) => (
  <Card className="p-4">
    <h4 className="font-medium mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground">Posted by {author} in {category}</p>
    <div className="flex items-center gap-4 mt-2">
      <div className="flex items-center gap-1">
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm">{replies} Replies</span>
      </div>
      <div className="flex items-center gap-1">
        <ThumbsUp className="w-4 h-4" />
        <span className="text-sm">{likes} Likes</span>
      </div>
    </div>
  </Card>
);

const mockDiscussions = [
  {
    title: "HELP??",
    author: "michebecca",
    date: "2025-03-25",
    category: "Mental Health",
    content: "Anyone up for some fun activities like sports",
    replies: 1,
    likes: 0,
  },
  {
    title: "UPDATE",
    author: "richbecca",
    date: "2025-03-25",
    category: "Recovery",
    content: "Started my steps to freedom today",
    replies: 0,
    likes: 0,
  },
];
