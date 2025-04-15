import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  ArrowLeft,
  Globe,
  UserPlus,
  Mail,
  User,
  Lock,
  School,
  Phone,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

// Mock logo component
const Logo = () => (
  <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center">
    <span className="text-primary-foreground text-2xl font-bold">RC</span>
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for form values
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    program: "",
    password: "",
    confirmPassword: "",
    emergencyContact: "",
  });
  
  // State for loading, errors, and language
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [language, setLanguage] = useState("en");
  
  // Programs list
  const programs = [
    "Bachelor of Science in Software Engineering",
    "Bachelor of Science in Computer Science",
    "Bachelor of Information Technology",
    "Bachelor of Information Systems",
    "Master of Science in Computer Science",
    "Master of Information Technology",
  ];
  
  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for the field being changed
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Check required fields
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Please enter a valid email address";
    
    if (!form.studentId) newErrors.studentId = "Student ID is required";
    if (!form.program) newErrors.program = "Program is required";
    
    // Password validation
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters long";
    
    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    // Emergency contact is recommended but not required
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Mock API call - would integrate with actual registration API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
        duration: 5000,
      });
      
      // Redirect to login
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      // Handle registration error
      console.error("Registration error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-foreground/10 z-10"></div>
        <div className="relative z-20 text-center p-8 max-w-md">
          <Logo />
          <h1 className="text-4xl font-bold text-white mt-6">Recovery Compass</h1>
          <p className="text-xl text-white/80 mt-4">Join our supportive community on your journey to wellness</p>
          
          <div className="mt-12 bg-white/10 p-6 rounded-lg text-left">
            <h3 className="text-xl font-medium mb-4 text-white">Why Join Recovery Compass?</h3>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300 shrink-0 mt-0.5" />
                <span>Access to personalized recovery resources</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300 shrink-0 mt-0.5" />
                <span>Connect with peers on similar journeys</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300 shrink-0 mt-0.5" />
                <span>Track your progress and celebrate milestones</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300 shrink-0 mt-0.5" />
                <span>Confidential support from qualified professionals</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex flex-col p-6 justify-center items-center bg-background">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" asChild className="flex items-center gap-2">
              <Link to="/login">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </Button>
            
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "English" : "Luganda"}</span>
              <Switch
                checked={language === "lg"}
                onCheckedChange={() => setLanguage(language === "en" ? "lg" : "en")}
              />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground mt-2">Join our recovery community at CoCIS</p>
          </div>
          
          {errors.submit && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className={errors.firstName ? "text-destructive" : ""}>
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={errors.firstName ? "border-destructive" : ""}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className={errors.lastName ? "text-destructive" : ""}>
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className={errors.lastName ? "border-destructive" : ""}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>
            
            <Separator />
            
            {/* Academic Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <School className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Academic Information</h2>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="studentId" className={errors.studentId ? "text-destructive" : ""}>
                  Student ID
                </Label>
                <Input
                  id="studentId"
                  value={form.studentId}
                  onChange={(e) => handleChange("studentId", e.target.value)}
                  className={errors.studentId ? "border-destructive" : ""}
                  placeholder="Enter your student ID"
                />
                {errors.studentId && (
                  <p className="text-sm text-destructive">{errors.studentId}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="program" className={errors.program ? "text-destructive" : ""}>
                  Program
                </Label>
                <Select
                  value={form.program}
                  onValueChange={(value) => handleChange("program", value)}
                >
                  <SelectTrigger className={errors.program ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select your program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Academic Programs</SelectLabel>
                      {programs.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.program && (
                  <p className="text-sm text-destructive">{errors.program}</p>
                )}
              </div>
            </div>
            
            <Separator />
            
            {/* Security Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Security</h2>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                    placeholder="Create a password (min. 8 characters)"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className={errors.confirmPassword ? "text-destructive" : ""}>
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            <Separator />
            
            {/* Emergency Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Emergency Contact</h2>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">
                  Emergency Contact Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="emergencyContact"
                    value={form.emergencyContact}
                    onChange={(e) => handleChange("emergencyContact", e.target.value)}
                    className="pl-10"
                    placeholder="Emergency contact phone number"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  This number will only be used in case of emergency
                </p>
              </div>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full mt-6" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
            
            <div className="text-center mt-6">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 