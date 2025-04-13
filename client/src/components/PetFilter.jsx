import { useState } from "react";
import { Button } from "..//components/ui/button";
import { Input } from "..//components/ui/input";
import { Label } from "..//components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "..//components/ui/select";
import { Checkbox } from "..//components/ui/checkbox";
import { Slider } from "..//components/ui/slider";
import { Search, Plus, Minus, Filter, X } from "lucide-react";

const PetFilter = ({ onFilterChange }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    gender: "",
    minAge: 0,
    maxAge: 15,
    goodWithChildren: false,
    goodWithDogs: false,
    goodWithCats: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFilters(prev => ({ ...prev, [name]: checked }));
  };

  const handleAgeChange = (value) => {
    setFilters(prev => ({
      ...prev,
      minAge: value[0],
      maxAge: value[1]
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "",
      gender: "",
      minAge: 0,
      maxAge: 15,
      goodWithChildren: false,
      goodWithDogs: false,
      goodWithCats: false,
    });
    onFilterChange({
      search: "",
      type: "",
      gender: "",
      minAge: 0,
      maxAge: 15,
      goodWithChildren: false,
      goodWithDogs: false,
      goodWithCats: false,
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="bg-card rounded-xl border border-border mb-8 overflow-hidden">
      <div className="p-4">
        {/* Search bar - always visible */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Search pets by name or breed..."
            className="pl-10"
          />
        </div>

        {/* Toggle filters button */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFilters}
            className="gap-2"
          >
            {isFiltersOpen ? <Minus size={16} /> : <Plus size={16} />}
            {isFiltersOpen ? "Hide Filters" : "Show Filters"}
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="gap-2 text-muted-foreground"
            >
              <X size={16} /> Reset
            </Button>
            <Button
              size="sm"
              onClick={applyFilters}
              className="gap-2"
            >
              <Filter size={16} /> Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Expandable filter options */}
      {isFiltersOpen && (
        <div className="p-4 border-t border-border bg-muted/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Pet Type</Label>
              <Select
                value={filters.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Dog">Dogs</SelectItem>
                  <SelectItem value="Cat">Cats</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={filters.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Any Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Gender</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Age Range</Label>
                <span className="text-sm text-muted-foreground">
                  {filters.minAge} - {filters.maxAge === 15 ? "15+" : filters.maxAge} years
                </span>
              </div>
              <Slider
                value={[filters.minAge, filters.maxAge]}
                min={0}
                max={15}
                step={1}
                onValueChange={handleAgeChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Good With</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="goodWithChildren"
                  checked={filters.goodWithChildren}
                  onCheckedChange={(checked) => handleCheckboxChange("goodWithChildren", checked)}
                />
                <Label htmlFor="goodWithChildren" className="cursor-pointer">Children</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="goodWithDogs"
                  checked={filters.goodWithDogs}
                  onCheckedChange={(checked) => handleCheckboxChange("goodWithDogs", checked)}
                />
                <Label htmlFor="goodWithDogs" className="cursor-pointer">Dogs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="goodWithCats"
                  checked={filters.goodWithCats}
                  onCheckedChange={(checked) => handleCheckboxChange("goodWithCats", checked)}
                />
                <Label htmlFor="goodWithCats" className="cursor-pointer">Cats</Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetFilter;
