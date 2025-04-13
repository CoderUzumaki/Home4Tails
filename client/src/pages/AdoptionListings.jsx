import { useState, useEffect } from "react";
import { usePets } from "../contexts/PetContext";
import PetCard from "../components/PetCard";
import PetFilter from "../components/PetFilter";
import { PawPrint } from "lucide-react";

const AdoptionListings = () => {
  const { pets } = usePets();
  const [displayedPets, setDisplayedPets] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    type: "",
    gender: "",
    minAge: 0,
    maxAge: 15,
    goodWithChildren: false,
    goodWithDogs: false,
    goodWithCats: false,
  });

  useEffect(() => {
    // Apply filters
    let filtered = [...pets];

    // Search filter
    if (activeFilters.search.trim()) {
      const searchTerm = activeFilters.search.toLowerCase().trim();
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm) ||
        pet.breed.toLowerCase().includes(searchTerm)
      );
    }

    // Type filter
    if (activeFilters.type) {
      filtered = filtered.filter(pet => pet.type === activeFilters.type);
    }

    // Gender filter
    if (activeFilters.gender) {
      filtered = filtered.filter(pet => pet.gender === activeFilters.gender);
    }

    // Age filter
    filtered = filtered.filter(pet =>
      pet.age >= activeFilters.minAge && pet.age <= activeFilters.maxAge
    );

    // Good with filters
    if (activeFilters.goodWithChildren) {
      filtered = filtered.filter(pet => pet.goodWith.includes("children"));
    }

    if (activeFilters.goodWithDogs) {
      filtered = filtered.filter(pet => pet.goodWith.includes("dogs"));
    }

    if (activeFilters.goodWithCats) {
      filtered = filtered.filter(pet => pet.goodWith.includes("cats"));
    }

    setDisplayedPets(filtered);
  }, [pets, activeFilters]);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="container px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Pet</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our available pets and find your new best friend today.
          Use the filters to narrow down your search.
        </p>
      </div>

      <PetFilter onFilterChange={handleFilterChange} />

      {displayedPets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedPets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-block p-4 bg-muted rounded-full mb-4">
            <PawPrint className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Pets Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any pets matching your search criteria.
            Try adjusting your filters or check back later as new pets become available.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdoptionListings;
