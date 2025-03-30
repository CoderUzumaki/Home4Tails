import Pet from '../models/petModel';

// Get all available pets
export const getAvailablePets = async (req, res) => {
  try {
    const pets = await Pet.find({ adoptionStatus: 'available' });
    res.status(200).json({ success: true, data: pets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pets', error: error.message });
  }
};

// Get a single pet by ID
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ success: false, message: 'Pet not found' });
    }
    res.status(200).json({ success: true, data: pet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pet', error: error.message });
  }
};

// Create a new pet
export const createPet = async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json({ success: true, data: newPet });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating pet', error: error.message });
  }
};

// Update a pet
export const updatePet = async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ success: false, message: 'Pet not found' });
    }

    res.status(200).json({ success: true, data: updatedPet });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating pet', error: error.message });
  }
};

// Delete a pet
export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({ success: false, message: 'Pet not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting pet', error: error.message });
  }
};
