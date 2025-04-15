import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, ThumbsUp, Send, Search, User, Lock, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

// Constants for categories
const CATEGORIES = {
  ACADEMIC: "Academic Support",
  RECOVERY: "Recovery Journey",
  MENTAL_HEALTH: "Mental Health",
  SOCIAL: "Social Connection",
  RESOURCES: "Resources Sharing",
  GENERAL: "General Discussion"
};

export function DiscussionForums() {
  const { toast } = useToast();
  
  // State for forum posts
  const [posts, setPosts] = useState(mockDiscussions);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for form
  const [formData, setFormData] = useState({
    title: "",
    category: CATEGORIES.ACADEMIC,
    message: ""
  });
  
  // State for validation errors
  const [errors, setErrors] = useState({
    title: "",
    message: ""
  });
  
  // State for reply functionality
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [isReplying, setIsReplying] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
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
      message: ""
    };
    
    if (!formData.title.trim()) {
      newErrors.title = "Topic title is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 500) {
      newErrors.message = "Message must be less than 500 characters";
    }
    
    setErrors(newErrors);
    return !newErrors.title && !newErrors.message;
  };
  
  // Submit a new forum post
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newPost = {
        id: `post-${Date.now()}`,
        title: formData.title,
        author: currentUser.username,
        authorId: currentUser.id,
        date: new Date().toISOString(),
        category: formData.category,
        content: formData.message,
        replies: 0,
        likes: 0,
        comments: []
      };
      
      setPosts(prev => [newPost, ...prev]);
      
      // Reset form
      setFormData({
        title: "",
        category: CATEGORIES.ACADEMIC,
        message: ""
      });
      
      toast({
        title: "Success",
        description: "Your discussion has been posted",
        duration: 3000
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Handle like functionality
  const handleLike = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
    
    toast({
      description: "Post liked successfully",
      duration: 2000
    });
  };
  
  // Handle reply functionality
  const toggleReplyForm = (postId: string) => {
    setReplyingTo(replyingTo === postId ? null : postId);
  };
  
  const handleReplySubmit = (postId: string) => {
    const replyContent = replyText[postId];
    
    if (!replyContent || replyContent.trim() === "") {
      toast({
        variant: "destructive",
        description: "Reply cannot be empty",
        duration: 3000
      });
      return;
    }
    
    setIsReplying(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComment = {
        id: `comment-${Date.now()}`,
        postId,
        author: currentUser.username,
        authorId: currentUser.id,
        content: replyContent,
        date: new Date().toISOString(),
      };
      
      setPosts(prev => 
        prev.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              replies: post.replies + 1,
              comments: [...(post.comments || []), newComment]
            };
          }
          return post;
        })
      );
      
      // Clear reply text and close form
      setReplyText(prev => ({
        ...prev,
        [postId]: ""
      }));
      setReplyingTo(null);
      setIsReplying(false);
      
      toast({
        description: "Reply posted successfully",
        duration: 2000
      });
    }, 1000);
  };
  
  // Handle post deletion
  const handleDeletePost = (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      setPosts(prev => prev.filter(post => post.id !== postId));
      
      toast({
        description: "Post deleted successfully",
        duration: 2000
      });
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Post Form */}
      <Card className="p-4 md:col-span-1">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg">Post a Message</CardTitle>
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
                placeholder="Topic Title" 
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-destructive text-xs mt-1">{errors.title}</p>
              )}
        </div>

            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
            <SelectTrigger>
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                {Object.values(CATEGORIES).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

            <div>
              <Textarea 
                placeholder="Your Message (max 500 characters)" 
                className={`min-h-[120px] ${errors.message ? "border-destructive" : ""}`} 
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
              <div className="flex justify-between mt-1">
                {errors.message ? (
                  <p className="text-destructive text-xs">{errors.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Share your thoughts, questions or experiences</p>
                )}
                <p className="text-xs text-muted-foreground">{formData.message.length}/500</p>
              </div>
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
                Post Message
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Forum Discussions */}
      <div className="md:col-span-2 space-y-6">
        <Card className="p-4">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Discussions</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-8 h-9"
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 pt-2">
            {isLoading ? (
              // Loading state
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="p-4">
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                </Card>
              ))
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium">No discussions yet</h3>
                <p className="text-muted-foreground mt-1">
                  Be the first to start a conversation!
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-base">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Posted by {post.author} • {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  
                  <p className="text-sm mb-3">{post.content}</p>
                  
                  {/* Comments section */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="mt-3 mb-3 pl-4 border-l-2">
                      <p className="text-sm font-medium mb-2">Replies</p>
                      <div className="space-y-3">
                        {post.comments.map((comment, idx) => (
                          <div key={comment.id || idx} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <p className="text-sm font-medium">{comment.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comment.date).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-sm pl-8">{comment.content}</p>
                          </div>
          ))}
        </div>
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
                              onClick={() => toggleReplyForm(post.id)}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.replies}</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reply to discussion</p>
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
                              onClick={() => handleLike(post.id)}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Like</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      {/* Delete button for the post author */}
                      {post.authorId === currentUser.id && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive hover:text-destructive/90"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete post</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                  
                  {/* Reply form */}
                  {replyingTo === post.id && (
                    <div className="mt-3 flex gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{currentUser.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex gap-2">
                        <Input
                          placeholder="Write a reply..."
                          className="flex-1 h-9"
                          value={replyText[post.id] || ""}
                          onChange={(e) => setReplyText({...replyText, [post.id]: e.target.value})}
                        />
                        <Button 
                          size="sm"
                          onClick={() => handleReplySubmit(post.id)}
                          disabled={isReplying}
                        >
                          {isReplying ? "Sending..." : "Reply"}
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            )}
          </CardContent>
          
          {posts.length > 0 && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Discussions
              </Button>
            </CardFooter>
          )}
      </Card>
        
        {/* Privacy notice */}
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Your participation in forums is confidential. All discussions are governed by our community guidelines.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

// Enhanced mock discussions
const mockDiscussions = [
  {
    id: "post-1",
    title: "How to balance recovery with exam preparation?",
    author: "michebecca",
    authorId: "user-2",
    date: "2023-03-25T15:32:00Z",
    category: CATEGORIES.ACADEMIC,
    content: "I'm struggling to balance my recovery journey with the upcoming final exams. Does anyone have strategies that worked for them?",
    replies: 2,
    likes: 5,
    comments: [
      {
        id: "comment-1",
        postId: "post-1",
        author: "davidm",
        authorId: "user-3",
        content: "I found that breaking study sessions into 25-minute blocks with short breaks helped me maintain focus without getting overwhelmed.",
        date: "2023-03-25T16:05:00Z"
      },
      {
        id: "comment-2",
        postId: "post-1",
        author: "kato.steven60",
        authorId: "user-1",
        content: "Also consider talking to your professors about your situation. Many are understanding and might offer accommodations.",
        date: "2023-03-25T17:22:00Z"
      }
    ]
  },
  {
    id: "post-2",
    title: "Started my recovery journey today",
    author: "richbecca",
    authorId: "user-4",
    date: "2023-03-24T09:15:00Z",
    category: CATEGORIES.RECOVERY,
    content: "Today marks Day 1 of my recovery journey. I'm both nervous and excited. Any tips for getting through the first week?",
    replies: 1,
    likes: 7,
    comments: [
      {
        id: "comment-3",
        postId: "post-2",
        author: "sarah_n",
        authorId: "user-5",
        content: "Congratulations on taking this important step! The first week can be challenging, but keep busy with positive activities and reach out to your support network when needed.",
        date: "2023-03-24T10:30:00Z"
      }
    ]
  }
];
