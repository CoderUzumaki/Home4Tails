import { createContext, useState, useContext, useEffect } from "react";
import petData from "../data/pets";

const PetContext = createContext(null);

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load pets data
    setPets(petData);

    // Load favorites from localStorage if any
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    setLoading(false);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (petId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(petId)) {
        return prevFavorites.filter(id => id !== petId);
      } else {
        return [...prevFavorites, petId];
      }
    });
  };

  const getFavoritePets = () => {
    return pets.filter(pet => favorites.includes(pet.id));
  };

  const getRecommendedPets = (excludeIds = []) => {
    // Simple recommendation logic - exclude favorites and return some random pets
    return pets
      .filter(pet => !excludeIds.includes(pet.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  };

  const getPetById = (id) => {
    return pets.find(pet => pet.id === id);
  };

  const value = {
    pets,
    favorites,
    toggleFavorite,
    getFavoritePets,
    getRecommendedPets,
    getPetById,
    loading
  };

  return (
    <PetContext.Provider value={value}>
      {!loading && children}
    </PetContext.Provider>
  );
};

export const usePets = () => {
  return useContext(PetContext);
};
