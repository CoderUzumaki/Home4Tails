import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { HeartHandshake, PawPrint, HandHelping } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5"></div>
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Make a Difference in a Pet's Life Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            There are many ways to help our furry friends find their forever homes.
            Whether you adopt, donate, or volunteer, every action matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-xl p-6 shadow-sm border border-muted flex flex-col items-center text-center animate-slide-in">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <PawPrint className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Adopt a Pet</h3>
            <p className="text-muted-foreground mb-6">
              Give a loving home to a pet in need and gain a loyal companion for life.
            </p>
            <Button className="mt-auto" asChild>
              <Link to="/adopt">Browse Adoptable Pets</Link>
            </Button>
          </div>

          <div className="bg-background rounded-xl p-6 shadow-sm border border-muted flex flex-col items-center text-center animate-slide-in" style={{animationDelay: "0.2s"}}>
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <HeartHandshake className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Make a Donation</h3>
            <p className="text-muted-foreground mb-6">
              Support our mission with a one-time or recurring donation to help care for animals.
            </p>
            <Button className="mt-auto" asChild>
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>

          <div className="bg-background rounded-xl p-6 shadow-sm border border-muted flex flex-col items-center text-center animate-slide-in" style={{animationDelay: "0.4s"}}>
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <HandHelping className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Volunteer With Us</h3>
            <p className="text-muted-foreground mb-6">
              Give your time and skills to help our pets and make a direct impact in their lives.
            </p>
            <Button className="mt-auto" asChild>
              <Link to="/volunteer">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
