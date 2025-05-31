import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  Share2,
  Bookmark,
  Search,
  Send,
  Smile,
  Image as ImageIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { communityService } from "@/services/communityService";
import authService from "@/services/authService";

const currentUser = authService.getUser();

export function SuccessStories() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [storyData, setStoryData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setStoryData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: "",
      content: "",
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

  const handleSubmit = () => {
    if (!validateForm()) return;

    createStoryMutation.mutate({
      title: storyData.title,
      story: storyData.content,
      tags: storyData.tags,
    });
  };

  const handleLike = (storyId: number) => {
    likeStoryMutation.mutate(storyId);
  };

  const handleBookmark = (storyId: number) => {
    bookmarkStoryMutation.mutate(storyId);
  };

  const handleShare = (storyId: number) => {
    toast({
      description: "Share feature will be implemented soon",
      duration: 2000,
    });
  };

  const {
    data: stories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["success-stories"],
    queryFn: communityService.getAllStories,
  });

  const createStoryMutation = useMutation({
    mutationFn: communityService.createStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["success-stories"] });
      setStoryData({ title: "", content: "", tags: "" });
      toast({
        title: "Success",
        description: "Your success story has been shared",
        duration: 3000,
      });
    },
  });

  const likeStoryMutation = useMutation({
    mutationFn: communityService.likeStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["success-stories"] });
      toast({ description: "Story liked successfully", duration: 2000 });
    },
  });

  const bookmarkStoryMutation = useMutation({
    mutationFn: communityService.bookmarkStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["success-stories"] });
      toast({ description: "Story bookmarked", duration: 2000 });
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-4 md:col-span-1">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg">Share Your Success Story</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {(currentUser?.anonymous_name || "Anonymous")
                  .substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {currentUser?.anonymous_name || "Anonymous"}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentUser?.role || ""} • {currentUser?.student_id || ""}
              </p>
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
                className={`min-h-[180px] ${
                  errors.content ? "border-destructive" : ""
                }`}
                value={storyData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
              />
              <div className="flex justify-between mt-1">
                {errors.content ? (
                  <p className="text-destructive text-xs">{errors.content}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Your story can inspire others on their recovery journey
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {storyData.content.length} characters
                </p>
              </div>
            </div>

            <div>
              <Input
                placeholder="Tags (comma separated)"
                value={storyData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Example: Recovery, Mental Health, Academic
              </p>
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
            disabled={createStoryMutation.isPending}
          >
            {createStoryMutation.isPending ? (
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

      <div className="md:col-span-2 space-y-6">
        <Card className="p-4">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Success Stories</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search stories..." className="pl-8 h-9" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            {isLoading ? (
              Array(2)
                .fill(0)
                .map((_, i) => (
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
            ) : stories?.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium">No success stories yet</h3>
                <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                  Be the first to share your recovery journey and inspire others
                  with your achievements
                </p>
              </div>
            ) : (
              stories.map((story) => (
                <Card key={story.id} className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {story.user_anon_name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{story.user_anon_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(story.created_at).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
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
                          >
                            <Bookmark className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save story</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <h3 className="text-lg font-medium mb-2">{story.title}</h3>
                  <p className="text-sm mb-4 whitespace-pre-line">
                    {story.story}
                  </p>

                  {story.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.split(",").map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="px-2 py-0 text-xs"
                        >
                          {tag.trim()}
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
                              <Heart className="h-4 w-4" />
                              <span>{story.like_count}</span>
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

          {stories?.length > 0 && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                View More Stories
              </Button>
            </CardFooter>
          )}
        </Card>

        <Alert className="bg-primary/5 border-primary/20">
          <AlertDescription className="text-sm">
            <span className="font-medium">
              Recovery is a journey, not a destination.
            </span>{" "}
            Every step forward, no matter how small, is a victory worth
            celebrating.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
