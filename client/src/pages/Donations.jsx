import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { toast } from "../components/ui/use-toast";
import { ArrowRight, PawPrint, Heart, Home, ShoppingBag, PiggyBank, Syringe } from "lucide-react";

const donationOptions = [
  { value: "25", label: "$25" },
  { value: "50", label: "$50" },
  { value: "100", label: "$100" },
  { value: "custom", label: "Custom Amount" },
];

const usageCategories = [
  {
    icon: <Syringe className="h-10 w-10 text-primary" />,
    title: "Medical Care",
    description: "Vaccines, medications, surgeries, and routine check-ups for pets in our care."
  },
  {
    icon: <ShoppingBag className="h-10 w-10 text-primary" />,
    title: "Food & Supplies",
    description: "Quality food, treats, toys, bedding, and other essential supplies for daily care."
  },
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: "Shelter Operations",
    description: "Maintaining our facilities, utilities, and creating a safe environment for animals."
  },
  {
    icon: <PiggyBank className="h-10 w-10 text-primary" />,
    title: "Emergency Fund",
    description: "Special care for animals with unique medical needs or emergency situations."
  },
];

const Donations = () => {
  const { currentUser } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationForm, setDonationForm] = useState({
    name: currentUser ? currentUser.name : "",
    email: currentUser ? currentUser.email : "",
    anonymous: false,
    message: "",
    specificUse: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate custom amount if selected
    if (selectedAmount === "custom" && (!customAmount || isNaN(customAmount) || Number(customAmount) <= 0)) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const amount = selectedAmount === "custom" ? customAmount : selectedAmount;

      toast({
        title: "Thank You for Your Donation!",
        description: `Your ${isMonthly ? "monthly" : "one-time"} donation of $${amount} has been processed successfully.`,
      });

      setIsProcessing(false);
      // Reset form or redirect as needed
    }, 2000);
  };

  return (
    <div>
      <section className="relative bg-muted/30 overflow-hidden">
        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Support Our Mission
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Your donation directly helps us provide care, shelter, and loving homes for animals in need.
              Every contribution, no matter the size, makes a difference in a pet's life.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-12">
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-6">How Your Donation Helps</h2>

              <div className="space-y-8">
                {usageCategories.map((category, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-muted/30 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <PawPrint className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">100% Transparent:</span> We're committed to transparency in how your donations are used.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Over 85% of all donations go directly to animal care, with financial reports available upon request.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <h2 className="text-2xl font-bold mb-6">Make Your Donation</h2>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base mb-3 block">Select Donation Amount</Label>
                      <RadioGroup
                        value={selectedAmount}
                        onValueChange={handleAmountSelect}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3"
                      >
                        {donationOptions.map((option) => (
                          <div key={option.value} className="relative">
                            <RadioGroupItem
                              value={option.value}
                              id={`amount-${option.value}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`amount-${option.value}`}
                              className="flex h-12 items-center justify-center rounded-md border border-border bg-background text-center text-base font-medium peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:bg-muted/50 cursor-pointer transition-colors"
                            >
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {selectedAmount === "custom" && (
                        <div className="mt-3">
                          <Label htmlFor="customAmount">Enter Amount ($)</Label>
                          <Input
                            id="customAmount"
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="mt-1"
                            min="1"
                            step="1"
                            required={selectedAmount === "custom"}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isMonthly"
                        checked={isMonthly}
                        onCheckedChange={setIsMonthly}
                      />
                      <Label htmlFor="isMonthly" className="cursor-pointer">
                        Make this a monthly recurring donation
                      </Label>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Donor Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={donationForm.name}
                            onChange={handleInputChange}
                            required={!donationForm.anonymous}
                            disabled={donationForm.anonymous}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={donationForm.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          name="anonymous"
                          checked={donationForm.anonymous}
                          onCheckedChange={(checked) => handleInputChange({ target: { name: "anonymous", type: "checkbox", checked } })}
                        />
                        <Label htmlFor="anonymous" className="cursor-pointer">
                          Make this donation anonymous
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Add a Message (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={donationForm.message}
                        onChange={handleInputChange}
                        placeholder="Share why you're donating or add a special message..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specificUse">Specific Use for Donation (Optional)</Label>
                      <Input
                        id="specificUse"
                        name="specificUse"
                        value={donationForm.specificUse}
                        onChange={handleInputChange}
                        placeholder="E.g., Medical fund, Food supplies, etc."
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <span className="mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Donation <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Your payment information is securely processed. Home4Tails will never store your credit card details.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Other Ways to Help</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your support can come in many forms beyond financial donations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">In-Kind Donations</h3>
              <p className="text-muted-foreground mb-4">
                Donate pet food, toys, bedding, cleaning supplies, and other items from our wishlist.
              </p>
              <Button variant="outline" className="w-full">View Our Wishlist</Button>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Volunteer Your Time</h3>
              <p className="text-muted-foreground mb-4">
                We're always looking for compassionate individuals to help at our shelter or events.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/volunteer">Volunteer Opportunities</Link>
              </Button>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Corporate Partnerships</h3>
              <p className="text-muted-foreground mb-4">
                Partner with us for events, sponsorships, or employee volunteer days.
              </p>
              <Button variant="outline" className="w-full">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donations;
