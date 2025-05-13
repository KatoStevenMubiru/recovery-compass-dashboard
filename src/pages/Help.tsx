import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { HelpCircle, BookOpen, Mail, MessageSquare, ThumbsUp, Phone, AlertTriangle, User } from "lucide-react";

const faqs = [
  {
    question: "How do I report a crisis?",
    answer: "Go to the Emergency SOS section in the sidebar or click the red Emergency button. You can submit a crisis report or call the 24/7 helpline at 0800-624-456.",
  },
  {
    question: "How is my data kept confidential?",
    answer: "Your data is encrypted and only accessible to authorized personnel. You can manage your privacy settings in the Settings page.",
  },
  {
    question: "How can I access academic support?",
    answer: "Academic support resources are available in the Resources section and through your dashboard.",
  },
];

const Help = () => {
  const [tab, setTab] = useState("faq");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setContact({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setFeedback("");
    setTimeout(() => setFeedbackSubmitted(false), 4000);
  };

  return (
    <DashboardLayout pageTitle="Help & FAQ">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-primary">
            <HelpCircle className="h-6 w-6 text-primary" /> Help & FAQ
          </h2>
          <p className="text-muted-foreground">Find answers, resources, and support for your recovery journey.</p>
        </div>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardContent className="p-5">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="faq" className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> FAQ</TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center gap-2"><Mail className="h-4 w-4" /> Contact</TabsTrigger>
                <TabsTrigger value="feedback" className="flex items-center gap-2"><ThumbsUp className="h-4 w-4" /> Feedback</TabsTrigger>
              </TabsList>

              {/* FAQ Tab */}
              <TabsContent value="faq">
                <Card className="gradient-card border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to common questions about the recovery system.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {faqs.map((faq, idx) => (
                        <div key={idx}>
                          <div className="font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" />{faq.question}</div>
                          <div className="text-muted-foreground ml-6">{faq.answer}</div>
                          {idx < faqs.length - 1 && <Separator className="my-3" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact">
                <Card className="gradient-card border-0 shadow-md max-w-xl mx-auto">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">Contact Support</CardTitle>
                    <CardDescription>Get help with technical issues, account questions, or recovery support.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={handleContactSubmit}>
                      <Input name="name" placeholder="Your Name" value={contact.name} onChange={handleContactChange} required />
                      <Input name="email" type="email" placeholder="Your Email" value={contact.email} onChange={handleContactChange} required />
                      <Textarea name="message" placeholder="How can we help you?" value={contact.message} onChange={handleContactChange} required />
                      <Button type="submit" className="w-full">Send Request</Button>
                      {submitted && <div className="text-green-600 text-sm mt-2">Your help request has been submitted. We'll contact you soon.</div>}
                    </form>
                    <Separator className="my-4" />
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0800-624-456 (24/7 Support)</div>
                      <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> help@mak.ac.ug</div>
                      <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" /> For emergencies, use the Emergency SOS in the sidebar.</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Feedback Tab */}
              <TabsContent value="feedback">
                <Card className="gradient-card border-0 shadow-md max-w-xl mx-auto">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">Feedback</CardTitle>
                    <CardDescription>Help us improve the recovery system with your feedback.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={handleFeedbackSubmit}>
                      <Textarea placeholder="Your feedback about the system..." value={feedback} onChange={e => setFeedback(e.target.value)} required />
                      <Button type="submit" className="w-full">Submit Feedback</Button>
                      {feedbackSubmitted && <div className="text-green-600 text-sm mt-2">Thank you for your feedback!</div>}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Help; 