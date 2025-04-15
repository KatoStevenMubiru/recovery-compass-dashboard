import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, Heart, Share2, Bookmark, Search, Send, Smile, Image as ImageIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Mock user data
const currentUser = {
  id: "user-1",
  name: "Kato Steven",
  username: "kato.steven60",
  studentId: "22345",
  role: "student",
  avatar: null
};

export function SuccessStories() {
  const { toast } = useToast();
  
  // State for stories
  const [stories, setStories] = useState(mockStories);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for form
  const [storyData, setStoryData] = useState({
    title: "",
    content: "",
    tags: ""
  });
  
  // State for validation errors
  const [errors, setErrors] = useState({
    title: "",
    content: ""
  });
  
  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setStoryData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors = {
      title: "",
      content: ""
    };
    
    if (!storyData.title.trim()) {
      newErrors.title = "Story title is required";
    }
    
    if (!storyData.content.trim()) {
      newErrors.content = "Story content is required";
    } else if (storyData.content.length < 50) {
      newErrors.content = "Story should be at least 50 characters";
    }
    
    setErrors(newErrors);
    return !newErrors.title && !newErrors.content;
  };
  
  // Submit a new story
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const tags = storyData.tags.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const newStory = {
        id: `story-${Date.now()}`,
        title: storyData.title,
        content: storyData.content,
        author: currentUser.username,
        authorId: currentUser.id,
        date: new Date().toISOString(),
        likes: 0,
        tags: tags.length > 0 ? tags : ["Recovery"],
        saved: false
      };
      
      setStories(prev => [newStory, ...prev]);
      
      // Reset form
      setStoryData({
        title: "",
        content: "",
        tags: ""
      });
      
      toast({
        title: "Success",
        description: "Your success story has been shared",
        duration: 3000
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Handle like functionality
  const handleLike = (storyId: string) => {
    setStories(prev => 
      prev.map(story => 
        story.id === storyId ? { ...story, likes: story.likes + 1 } : story
      )
    );
    
    toast({
      description: "Story liked successfully",
      duration: 2000
    });
  };
  
  // Handle bookmark functionality
  const handleBookmark = (storyId: string) => {
    setStories(prev => 
      prev.map(story => 
        story.id === storyId ? { ...story, saved: !story.saved } : story
      )
    );
    
    const story = stories.find(s => s.id === storyId);
    const action = story?.saved ? 'removed from' : 'added to';
    
    toast({
      description: `Story ${action} your bookmarks`,
      duration: 2000
    });
  };
  
  // Handle share functionality
  const handleShare = (storyId: string) => {
    // In a real implementation, this would open a share dialog
    toast({
      description: "Share feature will be implemented soon",
      duration: 2000
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Story Form */}
      <Card className="p-4 md:col-span-1">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg">Share Your Success Story</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{currentUser.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{currentUser.username}</p>
              <p className="text-xs text-muted-foreground">{currentUser.role} • {currentUser.studentId}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Input 
                placeholder="Story Title" 
                value={storyData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-destructive text-xs mt-1">{errors.title}</p>
              )}
            </div>
            
            <div>
              <Textarea 
                placeholder="Share your journey and achievements..." 
                className={`min-h-[180px] ${errors.content ? "border-destructive" : ""}`} 
                value={storyData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
              />
              <div className="flex justify-between mt-1">
                {errors.content ? (
                  <p className="text-destructive text-xs">{errors.content}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Your story can inspire others on their recovery journey</p>
                )}
                <p className="text-xs text-muted-foreground">{storyData.content.length} characters</p>
              </div>
            </div>
            
            <div>
              <Input 
                placeholder="Tags (comma separated)" 
                value={storyData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Example: Recovery, Mental Health, Academic</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" type="button">
                <ImageIcon className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
              <Button variant="outline" size="sm" type="button">
                <Smile className="h-4 w-4 mr-2" />
                Add Emoji
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Posting...</span>
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Share Story
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Success Stories Feed */}
      <div className="md:col-span-2 space-y-6">
        <Card className="p-4">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Success Stories</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search stories..." 
                  className="pl-8 h-9"
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-2">
            {isLoading ? (
              // Loading state
              Array(2).fill(0).map((_, i) => (
                <Card key={i} className="p-4">
                  <div className="space-y-3">
                    <div className="flex gap-2 items-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32 mt-1" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-32 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </Card>
              ))
            ) : stories.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium">No success stories yet</h3>
                <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                  Be the first to share your recovery journey and inspire others with your achievements
                </p>
              </div>
            ) : (
              stories.map((story) => (
                <Card key={story.id} className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{story.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{story.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(story.date).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleBookmark(story.id)}
                            className={story.saved ? "text-primary" : ""}
                          >
                            <Bookmark className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{story.saved ? "Remove from bookmarks" : "Save story"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-2">{story.title}</h3>
                  <p className="text-sm mb-4 whitespace-pre-line">{story.content}</p>
                  
                  {story.tags && story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="px-2 py-0 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="flex items-center gap-1 px-2"
                              onClick={() => handleLike(story.id)}
                            >
                              <Heart className={`h-4 w-4 ${story.liked ? "fill-red-500 text-red-500" : ""}`} />
                              <span>{story.likes}</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Show appreciation</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="flex items-center gap-1 px-2"
                              onClick={() => handleShare(story.id)}
                            >
                              <Share2 className="h-4 w-4" />
                              <span>Share</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Share this story</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </CardContent>
          
          {stories.length > 0 && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                View More Stories
              </Button>
            </CardFooter>
          )}
        </Card>
        
        {/* Inspirational alert */}
        <Alert className="bg-primary/5 border-primary/20">
          <AlertDescription className="text-sm">
            <span className="font-medium">Recovery is a journey, not a destination.</span> Every step forward, no matter how small, is a victory worth celebrating.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

// Enhanced mock stories
const mockStories = [
  {
    id: "story-1",
    title: "6 Months Clean and Back on Track Academically",
    content: "Six months ago, I couldn't imagine making it through a day without using. Today, I'm not only clean but I've also made the Dean's List for the first time. It hasn't been easy—there were days when the cravings were overwhelming, and times when academic pressure made me want to relapse.\n\nWhat helped me was finding a supportive community on campus and having a counselor who believed in me even when I didn't believe in myself. I've learned to tackle assignments one at a time rather than getting overwhelmed by everything at once.\n\nIf you're struggling, please know that there is hope. Recovery isn't linear, but it is possible.",
    author: "alex_recovery",
    authorId: "user-7",
    date: "2023-02-15T10:24:00Z",
    likes: 42,
    tags: ["Academic Success", "Recovery Milestone", "Sobriety"],
    saved: false
  },
  {
    id: "story-2",
    title: "Finding My Passion Again Through Recovery",
    content: "Before my addiction, I was passionate about art and design. During my darkest days, I lost all interest in creating. My recovery journey at university has not only helped me stay clean but also reconnect with my creativity.\n\nThe campus art therapy program became my sanctuary. At first, I couldn't even hold a paintbrush without shaking, but with each session, I rediscovered the joy of expression. My professors noticed the change too—my work became more authentic and powerful.\n\nToday, I'm three years sober and have just been accepted into a prestigious design internship. Recovery gave me back my future.",
    author: "creative_soul",
    authorId: "user-8",
    date: "2023-01-22T16:05:00Z",
    likes: 37,
    tags: ["Creative Recovery", "Art Therapy", "Career Success"],
    saved: true
  }
];
