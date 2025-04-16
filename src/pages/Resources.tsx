import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bookmark, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  FileText, 
  UserIcon, 
  BookOpenText, 
  School, 
  Building, 
  PlayCircle, 
  ExternalLink,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for Resources
const resourcesData = {
  counselors: [
    {
      name: "Dr. Sarah Namuli",
      role: "Mental Health Counselor",
      phone: "+256-771-554422",
      email: "sarah.namuli@cocis.mak.ac.ug",
      availability: "Available Mon-Fri, 9am-5pm",
      location: "CoCIS Building, Room 302",
      specialization: "Anxiety, Depression, Substance Abuse Recovery"
    },
    {
      name: "Dr. John Mukisa",
      role: "Substance Recovery Specialist",
      phone: "+256-772-112233",
      email: "john.mukisa@cocis.mak.ac.ug",
      availability: "Available Tue & Thu, 10am-4pm",
      location: "Main Campus Health Center",
      specialization: "Drug Addiction Recovery, Rehabilitation Support"
    }
  ],
  peerGroups: [
    {
      name: "CoCIS Recovery Support Group",
      meetingTime: "Wednesdays at 5:00 PM",
      location: "CoCIS Building, Room 110",
      contact: "David Okello",
      phone: "+256-700-889977",
      description: "A safe space for students in recovery to share experiences and support each other"
    },
    {
      name: "Academic Success in Recovery",
      meetingTime: "Mondays at 6:00 PM",
      location: "Main Library, Study Room 4",
      contact: "Faith Nassali",
      phone: "+256-701-223344",
      description: "Focused on balancing academic responsibilities with recovery goals"
    },
    {
      name: "Women in Recovery",
      meetingTime: "Fridays at 4:00 PM",
      location: "Women's Resource Center, Room 2",
      contact: "Grace Atim",
      phone: "+256-702-445566",
      description: "Support group specifically for women facing addiction recovery challenges"
    }
  ],
  videos: [
    {
      title: "Understanding Addiction at University",
      description: "Learn about the science of addiction and how it affects student life",
      duration: "18:24",
      url: "https://example.com/video1"
    },
    {
      title: "Recovery Skills for Students",
      description: "Practical strategies for maintaining recovery while studying",
      duration: "24:15",
      url: "https://example.com/video2"
    },
    {
      title: "Peer Support: How to Help a Friend",
      description: "Learn how to support peers struggling with substance use issues",
      duration: "15:42",
      url: "https://example.com/video3"
    },
    {
      title: "Stress Management without Substances",
      description: "Healthy alternatives for managing academic stress",
      duration: "22:08",
      url: "https://example.com/video4"
    }
  ],
  articles: [
    {
      title: "Navigating University Life in Recovery",
      description: "Tips and strategies for balancing recovery with academic responsibilities",
      author: "Dr. Patricia Nakazibwe",
      date: "March 15, 2023",
      url: "https://example.com/article1"
    },
    {
      title: "Building a Support Network at CoCIS",
      description: "How to create a strong support system within the university community",
      author: "James Okot, Recovery Counselor",
      date: "January 22, 2023",
      url: "https://example.com/article2"
    },
    {
      title: "Recovery and Academic Success: Finding Balance",
      description: "Strategies for excelling academically while maintaining recovery",
      author: "Prof. Michael Ssenabulya",
      date: "February 10, 2023",
      url: "https://example.com/article3"
    },
    {
      title: "Relapse Prevention for University Students",
      description: "Warning signs and prevention strategies specific to the academic environment",
      author: "Dr. Elizabeth Mwesigwa",
      date: "April 5, 2023",
      url: "https://example.com/article4"
    }
  ],
  universityResources: [
    {
      name: "Makerere University Counseling Services",
      description: "Professional counseling services for all university students",
      contact: "+256-414-556677",
      website: "counseling.mak.ac.ug",
      location: "Main Campus, Block A"
    },
    {
      name: "Student Health Services",
      description: "Comprehensive health services including addiction medicine",
      contact: "+256-414-667788",
      website: "health.mak.ac.ug",
      location: "University Hospital"
    },
    {
      name: "Office of Disability Services",
      description: "Support for students with disabilities, including temporary accommodations during recovery",
      contact: "+256-414-778899",
      website: "disability.mak.ac.ug",
      location: "Administration Block, Ground Floor"
    }
  ],
  academicResources: [
    {
      name: "Academic Accommodations",
      description: "Learn about academic accommodations available for students in recovery",
      link: "/academic/accommodations"
    },
    {
      name: "Tutoring Services",
      description: "Free tutoring support for CoCIS students",
      link: "/academic/tutoring"
    },
    {
      name: "Time Management Workshop",
      description: "Weekly workshops on managing academic responsibilities",
      link: "/academic/workshops"
    },
    {
      name: "Study Skills Resources",
      description: "Online resources for developing effective study habits",
      link: "/academic/study-skills"
    }
  ]
};

const recoveryResources = [
  {
    title: "Understanding Addiction",
    description: "A guide to addiction challenges for university students.",
    url: "https://example.com/article1",
    icon: BookOpen,
  },
  {
    title: "Stress Management Techniques",
    description: "Video guide for managing stress during exams.",
    url: "https://example.com/video1",
    icon: BookOpen,
  },
  {
    title: "Official Counseling Services",
    description: "University mental health and addiction services.",
    url: "https://counseling.mak.ac.ug",
    icon: UserIcon,
  },
];

const Resources = () => {
  const [activeTab, setActiveTab] = useState("counselors");

  return (
    <DashboardLayout pageTitle="Recovery Resources & Support">
      <div className="container max-w-7xl mx-auto p-4">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Recovery & Support Resources</h1>
            <Button variant="destructive" asChild>
              <Link to="/emergency" className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Emergency SOS
              </Link>
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            Access mental health resources, counseling information, and recovery support. All resources are confidential and designed to support your wellbeing.
          </p>
          <div className="flex items-center p-3 bg-muted rounded-lg mt-2">
            <Bookmark className="h-5 w-5 mr-2" />
            <p className="text-sm">
              Privacy: All resources accessed are confidential. No personal usage data is shared with university administration.
              <Link to="/settings" className="text-primary ml-2">
                View privacy settings
              </Link>
            </p>
          </div>
        </div>

        {/* Recovery Resources Section */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <CardTitle>Recovery Resources</CardTitle>
            <CardDescription>Helpful articles, videos, and links to support your recovery journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recoveryResources.map((res, idx) => (
                <a href={res.url} target="_blank" rel="noopener noreferrer" key={idx} className="block">
                  <Card className="hover:shadow-lg transition-shadow border-0">
                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                      <res.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{res.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">{res.description}</div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="counselors" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="counselors">Counselors</TabsTrigger>
            <TabsTrigger value="peer-support">Peer Support</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="university">University</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
          </TabsList>

          <TabsContent value="counselors" className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <UserIcon className="h-5 w-5 mr-2" />
              Find Qualified Counselors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resourcesData.counselors.map((counselor, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{counselor.name}</CardTitle>
                        <CardDescription>{counselor.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{counselor.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{counselor.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{counselor.availability}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{counselor.location}</span>
                    </div>
                    <div className="pt-2">
                      <strong>Specialization:</strong> {counselor.specialization}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Contact Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="peer-support" className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <Users className="h-5 w-5 mr-2" />
              Join Peer Support Groups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resourcesData.peerGroups.map((group, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{group.meetingTime}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{group.location}</span>
                    </div>
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{group.contact} ({group.phone})</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary">Join Group</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <PlayCircle className="h-5 w-5 mr-2" />
              Recovery Educational Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resourcesData.videos.map((video, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{video.duration}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Watch Now
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <FileText className="h-5 w-5 mr-2" />
              Recovery Articles and Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resourcesData.articles.map((article, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{article.title}</CardTitle>
                    <CardDescription>{article.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{article.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" />
                        Read More
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="university" className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <Building className="h-5 w-5 mr-2" />
              University Support Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resourcesData.universityResources.map((resource, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{resource.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{resource.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`https://${resource.website}`} target="_blank" rel="noopener noreferrer" className="text-primary">
                          {resource.website}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{resource.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <a href={`https://${resource.website}`} target="_blank" rel="noopener noreferrer">
                        Visit Resource
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <School className="h-5 w-5 mr-2" />
              Academic Success Resources
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Academic Support for Recovery</CardTitle>
                <CardDescription>
                  Resources to help balance your recovery and academic responsibilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resourcesData.academicResources.map((resource, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-1">{resource.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={resource.link}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Access Resource
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Resources; 