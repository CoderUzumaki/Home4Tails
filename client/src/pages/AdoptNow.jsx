import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePets } from "..//contexts/PetContext";
import { useAuth } from "..//contexts/AuthContext";
import { Button } from "..//components/ui/button";
import { Input } from "..//components/ui/input";
import { Label } from "..//components/ui/label";
import { Textarea } from "..//components/ui/textarea";
import { Checkbox } from "..//components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "..//components/ui/radio-group";
import { Separator } from "..//components/ui/separator";
import { Badge } from "..//components/ui/badge";
import { toast } from "..//components/ui/use-toast";
import { Check, Calendar, MapPin, Heart, Activity, PawPrint, Ruler } from "lucide-react";
import { formatCurrency } from "..//utils/formatters";

const AdoptNow = () => {
  const { id } = useParams();
  const { getPetById } = usePets();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser ? currentUser.name : "",
    email: currentUser ? currentUser.email : "",
    phone: "",
    address: "",
    housingType: "house",
    hasYard: false,
    otherPets: false,
    children: false,
    experience: "",
    employmentStatus: "",
    agreeTerms: false,
  });

  useEffect(() => {
    const fetchPet = () => {
      try {
        const foundPet = getPetById(id);
        if (foundPet) {
          setPet(foundPet);
        } else {
          navigate("/adopt", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
        navigate("/adopt", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id, getPetById, navigate]);

  useEffect(() => {
    // Check if user is logged in
    if (!currentUser && !loading) {
      toast({
        title: "Login Required",
        description: "Please log in to complete the adoption process.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/adopt/${id}` } });
    }
  }, [currentUser, loading, navigate, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Form validation
    if (!formData.agreeTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and conditions before submitting.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Application Submitted!",
        description: `Your application to adopt ${pet.name} has been received. We'll contact you soon.`,
      });
      setSubmitting(false);
      navigate("/profile");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="container px-4 py-16 flex justify-center items-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="container px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Adopt {pet.name}</h1>
        <p className="text-muted-foreground">
          Complete this application to start the adoption process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold mb-6">Adoption Application</h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
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
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-4">Living Situation</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Home Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Housing Type</Label>
                      <RadioGroup
                        value={formData.housingType}
                        onValueChange={(value) => handleRadioChange("housingType", value)}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="house" id="house" />
                          <Label htmlFor="house" className="cursor-pointer">House</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="apartment" id="apartment" />
                          <Label htmlFor="apartment" className="cursor-pointer">Apartment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="condo" id="condo" />
                          <Label htmlFor="condo" className="cursor-pointer">Condo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="cursor-pointer">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Additional Information</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasYard"
                          checked={formData.hasYard}
                          onCheckedChange={(checked) => handleCheckboxChange("hasYard", checked)}
                        />
                        <Label htmlFor="hasYard" className="cursor-pointer">
                          I have a fenced yard
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="otherPets"
                          checked={formData.otherPets}
                          onCheckedChange={(checked) => handleCheckboxChange("otherPets", checked)}
                        />
                        <Label htmlFor="otherPets" className="cursor-pointer">
                          I have other pets at home
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="children"
                          checked={formData.children}
                          onCheckedChange={(checked) => handleCheckboxChange("children", checked)}
                        />
                        <Label htmlFor="children" className="cursor-pointer">
                          I have children at home
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-4">Experience & Employment</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Pet Care Experience</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Tell us about your experience caring for pets..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employmentStatus">Employment Status</Label>
                      <Input
                        id="employmentStatus"
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleChange}
                        placeholder="e.g., Full-time, Part-time, Retired, etc."
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="agreeTerms" className="cursor-pointer text-sm">
                      I agree to the adoption terms and conditions, and I certify that all information provided is accurate.
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                      Processing...
                    </>
                  ) : (
                    `Submit Application for ${pet.name}`
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden sticky top-20">
            <div className="aspect-square">
              <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{pet.name}</h2>
                <Badge>{pet.type}</Badge>
              </div>

              <p className="text-muted-foreground mb-4">
                {pet.breed} • {pet.gender} • {pet.age} {pet.age === 1 ? 'year' : 'years'} old
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <span>{pet.location}</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    <Calendar size={16} className="text-primary" />
                  </div>
                  <span>{pet.age} {pet.age === 1 ? 'year' : 'years'} old</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    <Ruler size={16} className="text-primary" />
                  </div>
                  <span>{pet.size} Size</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    <Activity size={16} className="text-primary" />
                  </div>
                  <span>{pet.activityLevel} Energy</span>
                </li>
              </ul>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>House Trained</span>
                  <span>{pet.houseTrained ? <Check size={16} className="text-green-500" /> : "No"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vaccinated</span>
                  <span>{pet.vaccinated ? <Check size={16} className="text-green-500" /> : "No"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Neutered/Spayed</span>
                  <span>{pet.neutered ? <Check size={16} className="text-green-500" /> : "No"}</span>
                </div>
              </div>

              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Adoption Fee</span>
                  <span className="font-semibold text-primary">{formatCurrency(pet.adoptionFee)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptNow;
