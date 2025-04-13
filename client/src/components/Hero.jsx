import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-muted/30 overflow-hidden">
      <div className="container px-4 py-16 md:py-32 flex flex-col items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-3xl text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Find Your Perfect
            <span className="text-primary"> Furry Companion</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Connect with adoptable pets and give them the loving home they deserve.
            Our mission is to bring loving pets and caring humans together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 group" asChild>
              <Link to="/adopt">
                Browse Pets
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/volunteer">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
