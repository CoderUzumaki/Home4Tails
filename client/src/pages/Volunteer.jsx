import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { toast } from "../components/ui/use-toast";
import { Coffee, Calendar, Clock, Users, HeartHandshake, Megaphone, Shield, PawPrint } from "lucide-react";

const opportunities = [
  {
    icon: <PawPrint className="h-10 w-10 text-primary" />,
    title: "Animal Care",
    description: "Help feed, exercise, and socialize our shelter animals.",
    frequency: "Weekly",
    commitment: "3-5 hours",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Event Coordination",
    description: "Help plan and run adoption events and fundraisers.",
    frequency: "Monthly",
    commitment: "5-10 hours",
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: "Foster Program",
    description: "Provide temporary homes for animals awaiting adoption.",
    frequency: "Ongoing",
    commitment: "2+ weeks",
  },
  {
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    title: "Outreach & Education",
    description: "Visit schools and events to educate about pet adoption.",
    frequency: "Monthly",
    commitment: "2-3 hours",
  },
];

const faqs = [
  {
    question: "Do I need prior experience to volunteer?",
    answer: "No prior experience is necessary for most volunteer roles. We provide all the training and guidance you'll need. Some specialized positions may require specific skills or experience, but we have plenty of opportunities for everyone regardless of background.",
  },
  {
    question: "What is the minimum time commitment?",
    answer: "We ask for a minimum commitment of 4 hours per month for at least 3 months. This helps provide consistency for our animals and makes the training investment worthwhile. Some roles, like fostering, may require longer commitments.",
  },
  {
    question: "Can I volunteer as part of a group or corporate team?",
    answer: "Yes! We welcome group volunteering opportunities. Corporate teams, school groups, and community organizations can arrange special volunteer days or ongoing partnerships. Please contact our volunteer coordinator for group arrangements.",
  },
  {
    question: "Is there an age requirement for volunteers?",
    answer: "Volunteers must be at least 16 years old to work independently. Youth ages 12-15 can volunteer alongside a parent or guardian. We also offer a special Youth Volunteer Program for teens interested in animal welfare careers.",
  },
  {
    question: "Can volunteering lead to employment at Home4Tails?",
    answer: "While volunteering doesn't guarantee employment, many of our staff members started as volunteers. Volunteering is a great way to gain experience, demonstrate your commitment, and be considered when positions become available.",
  },
];

const Volunteer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    interests: [],
    availability: [],
    experience: "",
    reason: "",
    referral: "",
    commitment: "short-term",
    agreeTerms: false,
  });

  const interestOptions = [
    { id: "animal-care", label: "Animal Care" },
    { id: "event-coordination", label: "Event Coordination" },
    { id: "foster-program", label: "Foster Program" },
    { id: "outreach", label: "Outreach & Education" },
    { id: "administrative", label: "Administrative Support" },
    { id: "fundraising", label: "Fundraising" },
    { id: "transport", label: "Animal Transport" },
  ];

  const availabilityOptions = [
    { id: "weekday-morning", label: "Weekday Mornings" },
    { id: "weekday-afternoon", label: "Weekday Afternoons" },
    { id: "weekday-evening", label: "Weekday Evenings" },
    { id: "weekend-morning", label: "Weekend Mornings" },
    { id: "weekend-afternoon", label: "Weekend Afternoons" },
    { id: "weekend-evening", label: "Weekend Evenings" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInterestChange = (id, checked) => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, interests: [...prev.interests, id] };
      } else {
        return { ...prev, interests: prev.interests.filter(item => item !== id) };
      }
    });
  };

  const handleAvailabilityChange = (id, checked) => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, availability: [...prev.availability, id] };
      } else {
        return { ...prev, availability: prev.availability.filter(item => item !== id) };
      }
    });
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the volunteer terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    if (formData.interests.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one volunteer interest.",
        variant: "destructive",
      });
      return;
    }

    if (formData.availability.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select when you're available to volunteer.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll contact you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div>
      <section className="relative bg-muted/30 overflow-hidden">
        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Coffee className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Volunteer With Us
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Join our team of dedicated volunteers and help make a difference in the lives of animals in need.
              Your time and skills can help save lives and create forever homes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Volunteer Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We have various volunteer opportunities to match your interests, skills, and availability.
              Every role makes a significant impact in our mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {opportunity.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
                  <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Frequency: {opportunity.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Time Commitment: {opportunity.commitment}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="gap-2" size="lg" asChild>
              <a href="#volunteer-form">Apply to Volunteer <Users className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold mb-6">Why Volunteer?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Make a Direct Impact</h3>
                    <p className="text-muted-foreground">Your time directly helps animals find loving homes and receive the care they need.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Join a Community</h3>
                    <p className="text-muted-foreground">Connect with fellow animal lovers who share your passion and values.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Gain Experience</h3>
                    <p className="text-muted-foreground">Develop new skills and knowledge in animal care, customer service, and more.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <h3 className="text-2xl font-bold mb-6" id="volunteer-form">Volunteer Application</h3>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Home Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold text-lg mb-4">Volunteer Preferences</h4>

                      <div className="space-y-4 mb-4">
                        <Label>What are you interested in? (Select all that apply)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {interestOptions.map(option => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={option.id}
                                checked={formData.interests.includes(option.id)}
                                onCheckedChange={(checked) => handleInterestChange(option.id, checked)}
                              />
                              <Label htmlFor={option.id} className="cursor-pointer">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 mb-4">
                        <Label>When are you available to volunteer? (Select all that apply)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {availabilityOptions.map(option => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={option.id}
                                checked={formData.availability.includes(option.id)}
                                onCheckedChange={(checked) => handleAvailabilityChange(option.id, checked)}
                              />
                              <Label htmlFor={option.id} className="cursor-pointer">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label>Volunteer Commitment</Label>
                        <RadioGroup
                          value={formData.commitment}
                          onValueChange={(value) => handleRadioChange("commitment", value)}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="short-term" id="short-term" />
                            <Label htmlFor="short-term" className="cursor-pointer">Short-term (1-3 months)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium-term" id="medium-term" />
                            <Label htmlFor="medium-term" className="cursor-pointer">Medium-term (3-6 months)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="long-term" id="long-term" />
                            <Label htmlFor="long-term" className="cursor-pointer">Long-term (6+ months)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold text-lg mb-4">Experience & Motivation</h4>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="experience">Relevant Experience</Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="Tell us about any experience you have working with animals or in volunteer roles..."
                          required
                        />
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="reason">Why do you want to volunteer with us?</Label>
                        <Textarea
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          placeholder="Share your motivations and what you hope to gain from volunteering..."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="referral">How did you hear about our volunteer program?</Label>
                        <Select
                          value={formData.referral}
                          onValueChange={(value) => handleRadioChange("referral", value)}
                        >
                          <SelectTrigger id="referral">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="social-media">Social Media</SelectItem>
                            <SelectItem value="friend">Friend/Family</SelectItem>
                            <SelectItem value="event">Community Event</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleChange({ target: { name: "agreeTerms", type: "checkbox", checked } })}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="agreeTerms" className="cursor-pointer text-sm">
                          I agree to the volunteer terms and conditions, and I understand that submission of this application does not guarantee placement.
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                          Processing...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our volunteer program.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 shadow-sm border border-border">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact our volunteer coordinator
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;
