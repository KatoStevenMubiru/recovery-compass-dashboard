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
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/authService";

// Logo component matching dashboard style
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
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    anonymous_name: "",
    student_id: "",
    program: "",
    emergency_contact: "",
  });

  // State for loading, errors, and language
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Clear error for the field being changed
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Check required fields
    if (!form.first_name) newErrors.first_name = "First name is required";
    if (!form.last_name) newErrors.last_name = "Last name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email address";
    if (!form.anonymous_name)
      newErrors.anonymous_name = "Anonymous name is required";

    if (!form.student_id) newErrors.student_id = "Student ID is required";
    if (!form.program) newErrors.program = "Program is required";

    // Password validation
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";

    if (!form.password_confirm)
      newErrors.password_confirm = "Please confirm your password";
    else if (form.password !== form.password_confirm)
      newErrors.password_confirm = "Passwords do not match";

    // Emergency contact is recommended but not required

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await authService.register(form);
      toast({
        title: "Registration successful",
        description: "Check your email for a verification link.",
        duration: 5000,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: unknown) {
      let message = "Registration failed. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      }
      setErrors({ submit: message });
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
          <h1 className="text-4xl font-bold text-white mt-6">
            Recovery Compass
          </h1>
          <p className="text-xl text-white/80 mt-4">
            Join our supportive community on your journey to wellness
          </p>

          <div className="mt-12 bg-white/10 p-6 rounded-lg text-left shadow-md">
            <h3 className="text-xl font-medium mb-4 text-white">
              Why Join Recovery Compass?
            </h3>
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
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {language === "en" ? "English" : "Luganda"}
              </span>
              <Switch
                checked={language === "lg"}
                onCheckedChange={() =>
                  setLanguage(language === "en" ? "lg" : "en")
                }
              />
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">
              Create Your Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join our recovery community at CoCIS
            </p>
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
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="first_name"
                      className={errors.first_name ? "text-destructive" : ""}
                    >
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      className={errors.first_name ? "border-destructive" : ""}
                      placeholder="Enter your first name"
                    />
                    {errors.first_name && (
                      <p className="text-sm text-destructive">
                        {errors.first_name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="last_name"
                      className={errors.last_name ? "text-destructive" : ""}
                    >
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      className={errors.last_name ? "border-destructive" : ""}
                      placeholder="Enter your last name"
                    />
                    {errors.last_name && (
                      <p className="text-sm text-destructive">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className={errors.email ? "text-destructive" : ""}
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`pl-10 ${
                        errors.email ? "border-destructive" : ""
                      }`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="anonymous_name"
                    className={errors.anonymous_name ? "text-destructive" : ""}
                  >
                    Anonymous Forum Name
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="anonymous_name"
                      name="anonymous_name"
                      value={form.anonymous_name}
                      onChange={handleChange}
                      className={`pl-10 ${
                        errors.anonymous_name ? "border-destructive" : ""
                      }`}
                      placeholder="Enter a display name for the community forum"
                    />
                  </div>
                  {errors.anonymous_name && (
                    <p className="text-sm text-destructive">
                      {errors.anonymous_name}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    This name will be shown in the community forum to protect
                    your privacy
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information Section */}
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <School className="h-5 w-5 text-primary" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="student_id"
                    className={errors.student_id ? "text-destructive" : ""}
                  >
                    Student ID
                  </Label>
                  <Input
                    id="student_id"
                    name="student_id"
                    value={form.student_id}
                    onChange={handleChange}
                    className={errors.student_id ? "border-destructive" : ""}
                    placeholder="Enter your student ID"
                  />
                  {errors.student_id && (
                    <p className="text-sm text-destructive">
                      {errors.student_id}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="program"
                    className={errors.program ? "text-destructive" : ""}
                  >
                    Program
                  </Label>
                  <Select
                    value={form.program}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, program: value }))
                    }
                  >
                    <SelectTrigger
                      className={errors.program ? "border-destructive" : ""}
                    >
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
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className={errors.password ? "text-destructive" : ""}
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      className={`pl-10 ${
                        errors.password ? "border-destructive" : ""
                      }`}
                      placeholder="Create a password (min. 8 characters)"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password_confirm"
                    className={
                      errors.password_confirm ? "text-destructive" : ""
                    }
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password_confirm"
                      name="password_confirm"
                      type="password"
                      value={form.password_confirm}
                      onChange={handleChange}
                      className={`pl-10 ${
                        errors.password_confirm ? "border-destructive" : ""
                      }`}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.password_confirm && (
                    <p className="text-sm text-destructive">
                      {errors.password_confirm}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact">
                    Emergency Contact Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="emergency_contact"
                      name="emergency_contact"
                      value={form.emergency_contact}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Emergency contact phone number"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This number will only be used in case of emergency
                  </p>
                </div>
              </CardContent>
            </Card>

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
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline"
                >
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
