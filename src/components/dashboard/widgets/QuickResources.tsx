
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, PhoneCall, Users, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resources } from "@/services/mockData";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: React.ReactNode;
}

const ResourceCard = ({ title, description, icon, action }: ResourceCardProps) => {
  return (
    <Card className="bg-white/50 dark:bg-card/50 border shadow-sm">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-start mb-2">
          <div className="mr-2 mt-1">{icon}</div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="mt-auto pt-2">{action}</div>
      </CardContent>
    </Card>
  );
};

export const QuickResources = () => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'emergency':
        return <PhoneCall className="h-4 w-4 text-red-500" />;
      case 'community':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'self-help':
        return <BookOpen className="h-4 w-4 text-green-500" />;
      default:
        return <LifeBuoy className="h-4 w-4 text-purple-500" />;
    }
  };

  const getAction = (resource: typeof resources[0]) => {
    if (resource.contact) {
      return (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs h-8"
          onClick={() => window.location.href = `tel:${resource.contact}`}
        >
          <PhoneCall className="h-3 w-3 mr-1" /> 
          Call Now
        </Button>
      );
    }
    
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-xs h-8"
        onClick={() => window.open(resource.url, '_blank')}
      >
        <ExternalLink className="h-3 w-3 mr-1" /> 
        Visit
      </Button>
    );
  };

  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <LifeBuoy className="h-5 w-5" />
          Quick Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resources.slice(0, 4).map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              icon={getIcon(resource.category)}
              action={getAction(resource)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
