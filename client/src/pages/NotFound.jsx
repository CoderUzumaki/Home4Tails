import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { PawPrint, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mb-6">
        <PawPrint className="h-12 w-12 text-primary" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Oops! Page Not Found</h1>

      <p className="text-xl text-muted-foreground mb-8 text-center max-w-lg">
        We couldn't find the page you were looking for. The pet might have wandered off!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <Link to="/" className="gap-2">
            <Home size={18} />
            Back to Home
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/adopt" className="gap-2">
            <PawPrint size={18} />
            View Adoptable Pets
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
