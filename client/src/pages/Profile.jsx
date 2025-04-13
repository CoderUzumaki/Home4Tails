import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePets } from "../contexts/PetContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { toast } from "../components/ui/use-toast";
import { User, Mail, Phone, MapPin, Edit, Save, Heart, FileText, HeartHandshake, Calendar } from "lucide-react";
import PetCard from "../components/PetCard";
import { formatCurrency } from "../utils/formatters";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { getFavoritePets } = usePets();
  const favoritePets = getFavoritePets();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: "555-123-4567",
    address: "123 Pet Lovers Lane, Tail City",
    bio: "Animal lover passionate about rescue and adoption. Proud pet parent to two rescue cats.",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Mock data for applications
  const applications = [
    {
      id: "app-1",
      petName: "Luna",
      petImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      date: "April 10, 2025",
      status: "Pending",
    },
    {
      id: "app-2",
      petName: "Max",
      petImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce",
      date: "April 5, 2025",
      status: "Approved",
    },
  ];

  // Mock data for donations
  const donations = [
    {
      id: "don-1",
      amount: 50,
      date: "April 12, 2025",
      type: "One-time",
      for: "Medical Fund",
    },
    {
      id: "don-2",
      amount: 25,
      date: "March 12, 2025",
      type: "Monthly",
      for: "General Support",
    },
    {
      id: "don-3",
      amount: 100,
      date: "February 15, 2025",
      type: "One-time",
      for: "Emergency Relief",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="container px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card rounded-xl shadow-sm border border-border mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{profile.name}</h1>
                    <p className="text-muted-foreground">Member since April 2025</p>
                  </div>

                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <span className="mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={16} className="mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profile.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={profile.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={profile.address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        name="bio"
                        value={profile.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span>{profile.address}</span>
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <User size={16} className="text-muted-foreground mt-1" />
                      <span>{profile.bio}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart size={16} />
              <span>Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Applications</span>
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <HeartHandshake size={16} />
              <span>Donations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="mt-6">
            <h2 className="text-xl font-semibold mb-6">Favorite Pets</h2>

            {favoritePets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritePets.map(pet => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-border rounded-lg">
                <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-1">No Favorites Yet</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't added any pets to your favorites list yet.
                </p>
                <Button asChild>
                  <Link to="/adopt">Browse Adoptable Pets</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <h2 className="text-xl font-semibold mb-6">My Applications</h2>

            <div className="space-y-4">
              {applications.map(app => (
                <div
                  key={app.id}
                  className="flex flex-col sm:flex-row gap-4 items-start p-4 bg-card rounded-lg border border-border hover:shadow-sm transition-shadow"
                >
                  <div className="h-16 w-16 rounded-md overflow-hidden">
                    <img
                      src={app.petImage}
                      alt={app.petName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-medium">Application for {app.petName}</h3>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{app.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={app.status === "Approved" ? "success" : "secondary"}
                        className={app.status === "Approved" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {app.status}
                      </Badge>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="donations" className="mt-6">
            <h2 className="text-xl font-semibold mb-6">My Donations</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Designated For</th>
                    <th className="text-left py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {donations.map(donation => (
                    <tr key={donation.id} className="hover:bg-muted/30">
                      <td className="py-3 px-4">{donation.date}</td>
                      <td className="py-3 px-4">{formatCurrency(donation.amount)}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-primary/10 border-0">
                          {donation.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{donation.for}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">Receipt</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Donations: <span className="font-semibold text-foreground">{formatCurrency(donations.reduce((acc, d) => acc + d.amount, 0))}</span>
                </p>
              </div>
              <Button asChild>
                <Link to="/donate">Make a New Donation</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
