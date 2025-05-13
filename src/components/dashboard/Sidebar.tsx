import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  BookOpen,
  Calendar,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  AlertTriangle,
  FileText,
  Users,
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: BarChart2, label: "Progress", path: "/progress" },
  { icon: FileText, label: "Daily Reports", path: "/daily-reports" },
  { icon: Pill, label: "Medication", path: "/medication" },
  { icon: BookOpen, label: "Journal", path: "/journal" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: BookOpen, label: "Resources", path: "/resources" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: AlertTriangle, label: "Emergency SOS", path: "/emergency" },
];

const bottomNavItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" },
];

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isMobile, onClose }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  const currentPath = location.pathname;

  const handleClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="p-4 flex items-center justify-center border-b border-sidebar-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-sidebar text-lg font-bold">RC</span>
          </div>
          <span className="ml-2 text-xl font-bold">Recovery Compass</span>
        </div>
      </div>

      <div className="flex-1 py-8 px-3">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={handleClick}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  currentPath === item.path &&
                    "bg-sidebar-accent text-sidebar-accent-foreground",
                  item.path === "/emergency" &&
                    "mt-2 bg-red-600/20 text-red-600 hover:bg-red-600/30 hover:text-red-700",
                  currentPath === "/emergency" &&
                    item.path === "/emergency" &&
                    "bg-red-600/30 text-red-700"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="py-4 px-3 border-t border-sidebar-border">
        <nav className="space-y-2">
          {bottomNavItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={handleClick}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  currentPath === item.path &&
                    "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center gap-2 justify-start px-4 py-2",
              location.pathname === "/login" && "bg-muted"
            )}
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </div>
  );
};
