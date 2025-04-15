import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose, 
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger, 
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { 
  BookMarked, 
  Share2, 
  Heart, 
  ThumbsUp, 
  MessageSquare, 
  MoreVertical,
  Plus,
  Search,
  BookOpen,
  Link as LinkIcon,
  Video,
  Download,
  Calendar,
  Star,
  Bookmark,
  FileText,
  Phone,
  FileQuestion,
  File,
  CheckCircle2,
  Save
} from "lucide-react";

// Types for resources
type ResourceType = "article" | "video" | "document" | "link" | "contact";
type Resource = {
  id: string;
  title: string;
  description: string;
  url?: string;
  type: ResourceType;
  category: string;
  dateAdded: string;
  author?: string;
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  thumbnail?: string;
};

export function Resources() {
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // New resource form state
  const [newResource, setNewResource] = useState<Omit<Resource, "id" | "likes" | "dateAdded">>({
    title: "",
    description: "",
    url: "",
    type: "article",
    category: "addiction",
    author: "",
  });

  // Form validation
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    url: "",
    category: ""
  });
  
  // Handle input changes for new resource form
  const handleInputChange = (field: string, value: string) => {
    setNewResource(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user types
    if (field in errors) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      url: "",
      category: ""
    };
    
    if (!newResource.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!newResource.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (["article", "video", "link"].includes(newResource.type) && !newResource.url?.trim()) {
      newErrors.url = "URL is required for this resource type";
    }
    
    if (!newResource.category) {
      newErrors.category = "Category is required";
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  
  // Add a new resource
  const handleAddResource = (closeDialog: () => void) => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newResourceWithId = {
        ...newResource,
        id: `resource-${Date.now()}`,
        dateAdded: new Date().toISOString().split('T')[0],
        likes: 0,
        isLiked: false,
        isBookmarked: false
      };
      
      setResources(prev => [newResourceWithId, ...prev]);
      
      // Reset form
      setNewResource({
        title: "",
        description: "",
        url: "",
        type: "article",
        category: "addiction",
        author: "",
      });
      
      closeDialog();
      
      toast({
        title: "Success",
        description: "Resource has been added successfully",
        duration: 3000
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  // Handle like for a resource
  const handleLike = (resourceId: string) => {
    setResources(prev => 
      prev.map(resource => {
        if (resource.id === resourceId) {
          const isLiked = !resource.isLiked;
          return {
            ...resource,
            likes: isLiked ? resource.likes + 1 : resource.likes - 1,
            isLiked
          };
        }
        return resource;
      })
    );
  };
  
  // Handle bookmarking a resource
  const handleBookmark = (resourceId: string) => {
    setResources(prev => 
      prev.map(resource => {
        if (resource.id === resourceId) {
          return {
            ...resource,
            isBookmarked: !resource.isBookmarked
          };
        }
        return resource;
      })
    );
    
    toast({
      description: "Resource saved to your bookmarks",
      duration: 2000
    });
  };
  
  // Handle sharing a resource
  const handleShare = (resource: Resource) => {
    // In a real app, implement actual sharing functionality
    // For now, just simulate copying to clipboard
    toast({
      description: "Link copied to clipboard",
      duration: 2000
    });
  };
  
  // Handle resource deletion
  const handleDelete = (resourceId: string) => {
    setResources(prev => prev.filter(resource => resource.id !== resourceId));
    
    toast({
      description: "Resource has been deleted",
      duration: 2000
    });
  };
  
  // Filter resources based on current tab, search query, and category
  const getFilteredResources = () => {
    return resources.filter(resource => {
      // Filter by type
      if (activeTab !== "all" && resource.type !== activeTab) {
        return false;
      }
      
      // Filter by category
      if (selectedCategory !== "all" && resource.category !== selectedCategory) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        return (
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          (resource.author && resource.author.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  };
  
  // Get icon for resource type
  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "link":
        return <LinkIcon className="h-4 w-4" />;
      case "contact":
        return <Phone className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };
  
  // Get background color for resource type
  const getResourceBgColor = (type: ResourceType) => {
    switch (type) {
      case "article":
        return "bg-blue-50 text-blue-600";
      case "video":
        return "bg-red-50 text-red-600";
      case "document":
        return "bg-amber-50 text-amber-600";
      case "link":
        return "bg-purple-50 text-purple-600";
      case "contact":
        return "bg-green-50 text-green-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-xs">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="addiction">Addiction</SelectItem>
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="counseling">Counseling</SelectItem>
              <SelectItem value="self-help">Self-Help</SelectItem>
              <SelectItem value="community">Community Support</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>
                  Share a helpful resource with the recovery community.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input
                    id="title"
                    placeholder="Enter resource title"
                    value={newResource.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && <p className="text-destructive text-xs">{errors.title}</p>}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Resource Type</label>
                    <Select
                      value={newResource.type}
                      onValueChange={(value) => handleInputChange("type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="link">Website/Link</SelectItem>
                        <SelectItem value="contact">Contact Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={newResource.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="addiction">Addiction</SelectItem>
                        <SelectItem value="mental-health">Mental Health</SelectItem>
                        <SelectItem value="counseling">Counseling</SelectItem>
                        <SelectItem value="self-help">Self-Help</SelectItem>
                        <SelectItem value="community">Community Support</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-destructive text-xs">{errors.category}</p>}
                  </div>
                </div>
                
                {["article", "video", "link", "document"].includes(newResource.type) && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL or Resource Link</label>
                    <Input
                      placeholder="https://"
                      value={newResource.url || ""}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                      className={errors.url ? "border-destructive" : ""}
                    />
                    {errors.url && <p className="text-destructive text-xs">{errors.url}</p>}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Author/Source</label>
                  <Input
                    placeholder="Enter author or source"
                    value={newResource.author || ""}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Briefly describe this resource and how it helps with recovery"
                    value={newResource.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
                  />
                  {errors.description && <p className="text-destructive text-xs">{errors.description}</p>}
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddResource(() => {});
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add Resource"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Tabs for filtering by resource type */}
      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="link">Links</TabsTrigger>
          <TabsTrigger value="contact">Contacts</TabsTrigger>
        </TabsList>
        
        {/* Resources list */}
        <TabsContent value={activeTab} className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent className="pb-2">
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : getFilteredResources().length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center text-center space-y-3">
                <FileQuestion className="h-12 w-12 text-muted-foreground" />
                <CardTitle>No resources found</CardTitle>
                <CardDescription>
                  {searchQuery 
                    ? "No matching resources found. Try a different search term or clear filters." 
                    : activeTab !== "all" 
                      ? `No ${activeTab} resources available in the selected category.` 
                      : "No resources available in the selected category."}
                </CardDescription>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                  setSelectedCategory("all");
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredResources().map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  {resource.thumbnail && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={resource.thumbnail} 
                        alt={resource.title}
                        className="object-cover w-full h-full" 
                      />
                    </div>
                  )}
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={`${getResourceBgColor(resource.type)}`}>
                        <div className="flex items-center gap-1">
                          {getResourceIcon(resource.type)}
                          <span className="capitalize">{resource.type}</span>
                        </div>
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleShare(resource)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            <span>Share</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBookmark(resource.id)}>
                            <Bookmark className="mr-2 h-4 w-4" />
                            <span>Save</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(resource.id)}>
                            <div className="text-destructive flex items-center">
                              <span>Delete</span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <CardTitle className="text-base mt-2">{resource.title}</CardTitle>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      {resource.author && (
                        <>
                          <span>By {resource.author}</span>
                          <span className="mx-1">•</span>
                        </>
                      )}
                      <span>{resource.dateAdded}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleLike(resource.id)}
                            >
                              <Heart 
                                className={`h-4 w-4 ${resource.isLiked ? "fill-destructive text-destructive" : ""}`} 
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{resource.isLiked ? "Unlike" : "Like"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-sm text-muted-foreground">{resource.likes}</span>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleBookmark(resource.id)}
                            >
                              <Bookmark 
                                className={`h-4 w-4 ${resource.isBookmarked ? "fill-primary text-primary" : ""}`} 
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{resource.isBookmarked ? "Unsave" : "Save"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    {resource.url && (
                      <Button size="sm" onClick={() => window.open(resource.url, "_blank")}>
                        {resource.type === "document" ? (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </>
                        ) : (
                          <>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Visit
                          </>
                        )}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Mock resources data
const mockResources: Resource[] = [
  {
    id: "resource-1",
    title: "Understanding Addiction: A Comprehensive Guide",
    description: "This article provides a complete overview of addiction, its causes, effects on the brain, and modern treatment approaches. Perfect for those seeking to understand more about addiction science.",
    url: "https://example.com/addiction-guide",
    type: "article",
    category: "addiction",
    dateAdded: "2023-10-15",
    author: "Dr. Michael Johnson",
    likes: 42,
    isLiked: true,
    isBookmarked: false,
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "resource-2",
    title: "Mindfulness Techniques for Recovery",
    description: "Learn practical mindfulness exercises specifically designed for people in recovery. These techniques can help manage cravings, reduce anxiety, and promote overall mental wellbeing.",
    url: "https://example.com/mindfulness-recovery",
    type: "article",
    category: "self-help",
    dateAdded: "2023-11-02",
    author: "Sarah Williams, LMFT",
    likes: 38,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: "resource-3",
    title: "Recovery Journey: From Addiction to Freedom",
    description: "A powerful documentary following three individuals through their recovery journey, highlighting the challenges, setbacks, and ultimate triumphs they experienced along the way.",
    url: "https://example.com/recovery-documentary",
    type: "video",
    category: "addiction",
    dateAdded: "2023-09-20",
    author: "Recovery Media Productions",
    likes: 127,
    isLiked: false,
    isBookmarked: false,
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
  },
  {
    id: "resource-4",
    title: "Campus Counseling Services Directory",
    description: "A comprehensive list of all counseling services available on campus, including contact information, hours, specialties, and how to make an appointment.",
    type: "contact",
    category: "counseling",
    dateAdded: "2023-12-01",
    likes: 56,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: "resource-5",
    title: "The Science of Habit Formation",
    description: "This research paper explores the neurological basis of habit formation and how this knowledge can be applied to developing healthier lifestyle patterns during recovery.",
    url: "https://example.com/habit-formation.pdf",
    type: "document",
    category: "mental-health",
    dateAdded: "2023-10-28",
    author: "Dr. Lisa Chen, Neuroscience Department",
    likes: 19,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "resource-6",
    title: "National Recovery Helpline",
    description: "24/7 confidential helpline providing support, information, and referrals for individuals dealing with addiction and mental health issues.",
    url: "tel:1-800-123-4567",
    type: "contact",
    category: "community",
    dateAdded: "2023-11-15",
    likes: 84,
    isLiked: true,
    isBookmarked: true
  },
  {
    id: "resource-7",
    title: "Building a Support Network in Recovery",
    description: "This video workshop provides practical strategies for developing a strong support network, an essential component of long-term recovery success.",
    url: "https://example.com/support-network-workshop",
    type: "video",
    category: "community",
    dateAdded: "2023-09-05",
    author: "Community Recovery Alliance",
    likes: 63,
    isLiked: false,
    isBookmarked: false,
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: "resource-8",
    title: "Recovery Smart Goals Worksheet",
    description: "A printable worksheet to help you create specific, measurable, achievable, relevant, and time-bound goals for your recovery journey.",
    url: "https://example.com/smart-goals.pdf",
    type: "document",
    category: "self-help",
    dateAdded: "2023-11-25",
    likes: 47,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "resource-9",
    title: "College Recovery Program Website",
    description: "The official website for our campus recovery program, featuring event calendars, resources, success stories, and ways to get involved in the recovery community.",
    url: "https://example.edu/recovery",
    type: "link",
    category: "community",
    dateAdded: "2023-08-15",
    likes: 29,
    isLiked: false,
    isBookmarked: false
  }
]; 