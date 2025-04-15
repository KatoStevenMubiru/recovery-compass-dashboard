import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar } from "./Sidebar";
import { Menu, X, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

export const DashboardLayout = ({ children, pageTitle }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {!isMobile && (
        <div className="w-64 h-full hidden md:block">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 border-b">
          <div className="flex items-center">
            {isMobile && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar isMobile onClose={() => setIsOpen(false)} />
                </SheetContent>
              </Sheet>
            )}
            <h1 className="text-xl font-bold">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/profile">
              <Avatar className="cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Card className="gradient-card border-0 shadow-md">
            <div className="p-6">{children}</div>
          </Card>
        </main>
      </div>
    </div>
  );
};
