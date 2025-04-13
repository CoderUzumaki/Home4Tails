import { Heart, Shield, Clock, MessageSquareHeart } from "lucide-react";

const features = [
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: "Loving Matches",
    description: "We carefully match pets with the right families to ensure a lasting bond and happy homes.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Fully Vetted",
    description: "All our pets are vaccinated, spayed/neutered, and given a thorough health check before adoption.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Lifetime Support",
    description: "We're here for the entire journey, offering resources and advice for as long as you need.",
  },
  {
    icon: <MessageSquareHeart className="h-10 w-10 text-primary" />,
    title: "Community Care",
    description: "Join our community of pet lovers sharing experiences, tips, and heartwarming stories.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Home4Tails</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're dedicated to creating perfect matches between pets and their forever families,
            with comprehensive care and support throughout the adoption journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
