import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  AlertTriangle, 
  Mail, 
  Lock, 
  User, 
  Globe,
  HelpCircle,
  ArrowRight,
  AlertCircle
} from "lucide-react";

// Mock logo - replace with actual logo
const Logo = () => (
  <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center">
    <span className="text-primary-foreground text-2xl font-bold">RC</span>
  </div>
);

// Emergency support component
const EmergencySupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <Button 
        variant="destructive" 
        className="w-full flex items-center justify-center gap-2"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HelpCircle className="h-5 w-5" />
        Need Immediate Support?
      </Button>
      
      {isOpen && (
        <div className="mt-3 p-4 border rounded-lg bg-muted">
          <h4 className="font-semibold mb-2">Support Resources:</h4>
          <p className="mb-2">• National Addiction Hotline: <strong>0800-123-456</strong></p>
          <p className="mb-3">• Campus Counseling: <strong>0772-789-012</strong></p>
          <Button asChild className="w-full">
            <Link to="/emergency" className="flex items-center justify-center gap-2">
              Start Emergency Chat <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

const Login = () => {
  // State variables
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [language, setLanguage] = useState("en");
  
  // Handle form submission (mocked for now)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login - would integrate with authentication service
    setTimeout(() => {
      // Placeholder for future authentication logic
      setIsLoading(false);
      // Navigate programmatically after successful login
      window.location.href = "/dashboard";
    }, 1500);
  };
  
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock account creation - would integrate with registration service
    setTimeout(() => {
      // Placeholder for future registration logic
      setIsLoading(false);
      // Navigate programmatically after successful registration
      window.location.href = "/dashboard";
    }, 1500);
  };
  
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock password reset - would integrate with password reset service
    setTimeout(() => {
      setIsLoading(false);
      setIsForgotPassword(false);
      setError(null);
      // Show success message or redirect
    }, 1500);
  };
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours >= 4 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    return "Good Evening";
  };
  
  // Check if login form is valid
  const isLoginFormValid = () => {
    return email.length > 0 && password.length > 0;
  };
  
  // Check if create account form is valid
  const isCreateAccountFormValid = () => {
    return name.length > 0 && email.length > 0 && password.length > 0;
  };

  // If forgot password mode is active, show the forgot password form
  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h1 className="text-3xl font-bold">Recovery Compass</h1>
            <p className="text-muted-foreground">Your journey to wellness starts here</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>
                Enter your email and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={forgotEmail.length === 0 || isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsForgotPassword(false)}
                  >
                    Back to Login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} COCIS, Makerere University. All rights reserved.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-background to-background/80">
      {/* Left side - Branding */}
      <div className="w-full md:w-2/5 bg-primary text-primary-foreground p-8 flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-6 text-4xl font-bold">Recovery Compass</h1>
          <p className="mt-4 text-xl opacity-90">Your journey to wellness starts here</p>
          <div className="mt-12 bg-white/10 p-6 rounded-lg w-full">
            <h3 className="text-xl font-medium mb-4">Support When You Need It</h3>
            <p className="text-primary-foreground/90">
              Recovery Compass provides a safe space for your recovery journey, 
              with tools and support to help you every step of the way.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Forms */}
      <div className="w-full md:w-3/5 p-8 flex flex-col">
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>{language === "en" ? "English" : "Luganda"}</span>
            <Switch
              checked={language === "lg"}
              onCheckedChange={() => setLanguage(language === "en" ? "lg" : "en")}
            />
          </div>
        </div>
        
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
          {/* Emergency Support */}
          <EmergencySupport />
          
          <h2 className="text-3xl font-bold">{getGreeting()},</h2>
          <p className="text-xl mt-2 mb-6 text-muted-foreground">Welcome to Recovery Support</p>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register" asChild>
                <Link to="/register">Create Account</Link>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login to Your Account</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-normal"
                            onClick={() => setIsForgotPassword(true)}
                          >
                            Forgot password?
                          </Button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={!isLoginFormValid() || isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login to Recovery System"}
                      </Button>
                      
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-card px-2 text-muted-foreground text-sm">
                            or
                          </span>
                        </div>
                      </div>
                      
                      <Button type="button" variant="outline" className="w-full">
                        <img 
                          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                          alt="Google logo" 
                          className="h-5 w-5 mr-2" 
                        />
                        Sign in with Google
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Account</CardTitle>
                  <CardDescription>
                    Join Recovery Compass to start your wellness journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateAccount}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={!isCreateAccountFormValid() || isLoading}
                      >
                        {isLoading ? "Creating account..." : "Begin Your Recovery Journey"}
                      </Button>
                      
                      <Alert className="mt-4">
                        <AlertDescription>
                          By creating an account, you agree to our privacy policy. Your information is confidential.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-card px-2 text-muted-foreground text-sm">
                            or
                          </span>
                        </div>
                      </div>
                      
                      <Button type="button" variant="outline" className="w-full">
                        <img 
                          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                          alt="Google logo" 
                          className="h-5 w-5 mr-2" 
                        />
                        Sign up with Google
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()}{' '}
            <a
              className="underline underline-offset-4 hover:text-primary"
              href="https://cocis.mak.ac.ug"
              rel="noopener noreferrer"
              target="_blank"
            >
              COCIS
            </a>
            , Makerere University. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 