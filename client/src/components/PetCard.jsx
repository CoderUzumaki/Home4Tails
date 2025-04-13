import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "..//components/ui/card";
import { Button } from "..//components/ui/button";
import { Badge } from "..//components/ui/badge";
import { Heart } from "lucide-react";
import { usePets } from "..//contexts/PetContext";
import { useAuth } from "..//contexts/AuthContext";
import { useToast } from "..//components/ui/use-toast";
import { formatCurrency } from "..//utils/formatters";

const PetCard = ({ pet }) => {
  const { favorites, toggleFavorite } = usePets();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isFavorite = favorites.includes(pet.id);

  const handleFavoriteClick = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to save pets to your favorites.",
      });
      return;
    }

    toggleFavorite(pet.id);

    toast({
      title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorite
        ? `${pet.name} has been removed from your favorites.`
        : `${pet.name} has been added to your favorites!`
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={pet.image}
          alt={pet.name}
          className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${isImageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFavorite ? 'bg-primary text-white' : 'bg-white/80 text-foreground'
          } hover:bg-primary hover:text-white transition-colors`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
        </button>
      </div>

      <CardContent className="pt-4 pb-0 flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{pet.name}</h3>
          <Badge>{pet.type}</Badge>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
          <span>{pet.breed}</span>
          <span>•</span>
          <span>{pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
          <span>•</span>
          <span>{pet.gender}</span>
        </div>

        <p className="line-clamp-2 text-muted-foreground mb-3">
          {pet.description}
        </p>

        <p className="font-medium text-primary">
          {formatCurrency(pet.adoptionFee)} adoption fee
        </p>
      </CardContent>

      <CardFooter className="pt-4">
        <Button className="w-full" asChild>
          <Link to={`/adopt/${pet.id}`}>Adopt {pet.name}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
