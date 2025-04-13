import { Link } from "react-router-dom";
import { usePets } from "../contexts/PetContext";
import PetCard from "../components/PetCard";
import { Button } from "../components/ui/button";
import { Heart } from "lucide-react";

const FavoritePets = () => {
  const { getFavoritePets, getRecommendedPets } = usePets();

  const favoritePets = getFavoritePets();
  const recommendedPets = getRecommendedPets(favoritePets.map(pet => pet.id));

  return (
    <div className="container px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Your Favorite Pets</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here are the pets you've saved to your favorites list.
          You can manage your favorites and view recommended pets based on your preferences.
        </p>
      </div>

      {favoritePets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoritePets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-lg mb-12">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Favorites Yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You haven't added any pets to your favorites list yet.
            Browse our available pets and click the heart icon to add them to your favorites.
          </p>
          <Button size="lg" asChild>
            <Link to="/adopt">Browse Adoptable Pets</Link>
          </Button>
        </div>
      )}

      {favoritePets.length > 0 && (
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on your favorites, we think you might be interested in these pets too.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-12">
        <Button variant="outline" size="lg" asChild>
          <Link to="/adopt">See All Pets</Link>
        </Button>
      </div>
    </div>
  );
};

export default FavoritePets;
