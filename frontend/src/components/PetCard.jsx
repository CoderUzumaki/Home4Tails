import React from 'react';
import { FaMars, FaVenus } from 'react-icons/fa';

const PetCard = ({ pet }) => {
  // Add a check to handle undefined pet prop
  if (!pet) {
    return <div className="rounded-xl bg-white p-4 shadow-md">Pet data not available</div>;
  }

  const { name, gender, type, breed, age, image } = pet;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg sm:flex sm:h-64 sm:max-w-2xl">
      {/* Pet Image */}
      <div className="h-48 sm:h-auto sm:w-2/5 md:w-1/2">
        <img
          src={image}
          alt={`${name} - ${breed}`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Pet Details */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <span className="flex items-center text-gray-600">
              {gender === 'Male' ? (
                <FaMars className="text-blue-500" />
              ) : (
                <FaVenus className="text-pink-500" />
              )}
            </span>
          </div>

          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {type}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Breed:</span> {breed}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Age:</span> {age} years
            </p>
          </div>
        </div>

        <div className="mt-4">
          <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
            Adopt Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
