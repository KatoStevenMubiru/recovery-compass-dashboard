
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, ImageIcon } from "lucide-react";

export function SuccessStories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Share Your Story</h3>
        
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
          <Input placeholder="Story Title" />
          <Textarea placeholder="Your Story" className="min-h-[150px]" />
          
          <Button variant="outline" className="w-full">
            <ImageIcon className="w-4 h-4 mr-2" />
            Add Photo (Optional)
          </Button>
          
          <Button className="w-full">Share Story</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Success Stories</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Read inspiring stories from students who have overcome addiction challenges
        </p>
        
        <div className="space-y-4">
          {mockStories.map((story, index) => (
            <StoryItem key={index} {...story} />
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4">View All Stories</Button>
      </Card>
    </div>
  );
}

const StoryItem = ({ title, author, date, content, replies, likes }: any) => (
  <Card className="p-4 border-l-4 border-l-green-500">
    <h4 className="font-medium mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground">Shared by {author} on {date}</p>
    <p className="text-sm mt-2">{content}</p>
    
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

const mockStories = [
  {
    title: "Motivation",
    author: "miriam",
    date: "15/03/2025",
    content: "I'm happy I have started on my sobriety journey",
    replies: 0,
    likes: 0,
  },
  {
    title: "Happy",
    author: "kato.steven60",
    date: "12/03/2025",
    content: "Am happy",
    replies: 1,
    likes: 2,
  },
];
