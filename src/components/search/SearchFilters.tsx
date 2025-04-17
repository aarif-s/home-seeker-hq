
import { useState } from "react";
import { Search, CalendarIcon, Home, Filter } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CitySearch from "./CitySearch";
import { SearchFilters as SearchFiltersType, RoomType, FurnishingStatus } from "@/types";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger 
} from "@/components/ui/hover-card";

interface SearchFiltersProps {
  onSearch: (filters: SearchFiltersType) => void;
  initialFilters?: SearchFiltersType;
}

const roomTypeDescriptions = {
  private: "A private room with your own personal space, often in a shared apartment or house with common areas like kitchen and bathroom shared with others.",
  shared: "A room shared with one or more people. Lower cost but reduced privacy, ideal for short-term stays or budget-conscious renters.",
  apartment: "An entire apartment or studio for yourself, offering complete privacy and independence. May include kitchen, bathroom, living area and one or more bedrooms."
};

export const SearchFilters = ({ onSearch, initialFilters = {} }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFiltersType>({
    location: initialFilters.location || "",
    roomType: initialFilters.roomType,
    priceMin: initialFilters.priceMin || 0,
    priceMax: initialFilters.priceMax || 2000,
    availableFrom: initialFilters.availableFrom || new Date(),
    furnishingStatus: initialFilters.furnishingStatus,
    genderPreference: initialFilters.genderPreference,
  });

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleCityChange = (value: string) => {
    setFilters((prev) => ({ ...prev, location: value }));
  };

  const handleSelectChange = (
    name: string,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFilters((prev) => ({ ...prev, availableFrom: date }));
    }
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceMin: value[0],
      priceMax: value[1],
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      location: "",
      priceMin: 0,
      priceMax: 2000,
      availableFrom: new Date(),
    });
    setIsAdvancedOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="space-y-4">
        {/* Basic Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Search */}
          <CitySearch value={filters.location || ""} onChange={handleCityChange} />

          {/* Room Type */}
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div>
                  <Select
                    value={filters.roomType}
                    onValueChange={(value) => handleSelectChange("roomType", value as RoomType)}
                  >
                    <SelectTrigger className="w-full">
                      <Home className="h-4 w-4 opacity-50 mr-2" />
                      <SelectValue placeholder="Room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="private">Private Room</SelectItem>
                        <SelectItem value="shared">Shared Room</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4 text-sm">
                {filters.roomType ? (
                  <div>
                    <h4 className="font-medium mb-1">
                      {filters.roomType === 'private' ? 'Private Room' : 
                        filters.roomType === 'shared' ? 'Shared Room' : 'Apartment'}
                    </h4>
                    <p className="text-muted-foreground">
                      {roomTypeDescriptions[filters.roomType]}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Select a room type to see more details about the accommodation type.
                  </p>
                )}
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Available From */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.availableFrom ? (
                  format(filters.availableFrom, "PPP")
                ) : (
                  <span>Available from</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.availableFrom}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Advanced Filters */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Filter className="h-4 w-4 mr-2" />
            {isAdvancedOpen ? "Hide" : "Show"} advanced filters
          </Button>

          <div className="space-x-2">
            {(filters.location || filters.roomType || filters.furnishingStatus || filters.genderPreference) && (
              <Button variant="ghost" onClick={handleReset}>
                Reset
              </Button>
            )}
            <Button onClick={handleSearch} className="bg-rentmate-600 hover:bg-rentmate-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {isAdvancedOpen && (
          <div className="pt-4 border-t mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Range */}
            <div className="col-span-full md:col-span-1">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Price Range</span>
                <span className="text-sm text-gray-500">
                  €{filters.priceMin} - €{filters.priceMax}
                </span>
              </div>
              <Slider
                defaultValue={[filters.priceMin || 0, filters.priceMax || 2000]}
                max={5000}
                step={50}
                onValueChange={handlePriceChange}
                className="mt-2"
              />
            </div>

            {/* Furnishing Status */}
            <div>
              <Select
                value={filters.furnishingStatus}
                onValueChange={(value) => handleSelectChange("furnishingStatus", value as FurnishingStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Furnishing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="semi-furnished">Semi-furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Gender Preference */}
            <div>
              <Select
                value={filters.genderPreference}
                onValueChange={(value) => handleSelectChange("genderPreference", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male only</SelectItem>
                    <SelectItem value="female">Female only</SelectItem>
                    <SelectItem value="any">Any gender</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
