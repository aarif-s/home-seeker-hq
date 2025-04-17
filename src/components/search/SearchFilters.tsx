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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CitySearch from "./CitySearch";
import { SearchFilters as SearchFiltersType, RoomType, FurnishingStatus } from "@/types";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger 
} from "@/components/ui/hover-card";
import { useSession } from "@/hooks/useAuth";

const roomTypeDescriptions = {
  private: "A private room with your own personal space, often in a shared apartment or house with common areas like kitchen and bathroom shared with others.",
  shared: "A room shared with one or more people. Lower cost but reduced privacy, ideal for short-term stays or budget-conscious renters.",
  apartment: "An entire apartment or studio for yourself, offering complete privacy and independence. May include kitchen, bathroom, living area and one or more bedrooms."
};

const roomTypeSuitability = {
  private: "Students, young professionals, long-term stays",
  shared: "Students on a budget, short-term stays, social living",
  apartment: "Couples, small families, remote workers, longer-term stays"
};

const roomTypeAmenities = {
  private: "Personal bedroom, shared common areas, possibly shared bathroom",
  shared: "Bunk beds or shared room space, communal facilities",
  apartment: "Complete kitchen, private bathroom, living area, possible balcony"
};

interface SearchFiltersProps {
  onSearch: (filters: SearchFiltersType) => void;
  initialFilters?: SearchFiltersType;
}

export const SearchFilters = ({ onSearch, initialFilters = {} }: SearchFiltersProps) => {
  const { user } = useSession();
  const isSupabaseConnected = !!import.meta.env.VITE_SUPABASE_URL;

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

  const getDemoText = (type: string) => {
    if (isSupabaseConnected || type !== "location") return null;

    return (
      <div className="absolute inset-0 flex items-center pointer-events-none text-gray-600 text-sm pl-3 opacity-70">
        Try "Berlin" or "Munich"
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 relative">
      {!isSupabaseConnected && (
        <div className="absolute top-2 right-2 text-xs text-gray-500 bg-yellow-50 px-2 py-1 rounded">
          Demo Mode
        </div>
      )}
      
      <div className="space-y-4">
        {/* Basic Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Location Search */}
          <div className="relative">
            <CitySearch 
              value={filters.location || ""} 
              onChange={handleCityChange} 
            />
            {getDemoText("location")}
          </div>

          {/* Room Type */}
          <div className="relative">
            <HoverCard openDelay={300} closeDelay={200}>
              <HoverCardTrigger asChild>
                <div className="relative">
                  <Select
                    value={filters.roomType}
                    onValueChange={(value) => handleSelectChange("roomType", value as RoomType)}
                  >
                    <SelectTrigger className="w-full">
                      <Home className="h-4 w-4 opacity-50 mr-2" />
                      <SelectValue placeholder="Room Type" />
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
              <HoverCardContent className="w-80 p-4">
                {filters.roomType ? (
                  <div>
                    <h4 className="font-medium mb-2">
                      {filters.roomType === 'private' ? 'Private Room' : 
                        filters.roomType === 'shared' ? 'Shared Room' : 'Apartment'}
                    </h4>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700">
                        {roomTypeDescriptions[filters.roomType]}
                      </p>
                      <div className="pt-2 border-t">
                        <span className="font-medium text-xs text-gray-500">SUITABLE FOR:</span>
                        <p className="text-gray-700 mt-1">{roomTypeSuitability[filters.roomType]}</p>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="font-medium text-xs text-gray-500">TYPICALLY INCLUDES:</span>
                        <p className="text-gray-700 mt-1">{roomTypeAmenities[filters.roomType]}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Home className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 text-sm">
                      Select a room type to see more details about the accommodation type
                    </p>
                  </div>
                )}
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Available From */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal relative"
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
            <div className="col-span-full md:col-span-1 relative">
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
            <div className="relative">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      <strong>Furnished:</strong> Includes all furniture and appliances<br />
                      <strong>Semi-furnished:</strong> Basic furniture only<br />
                      <strong>Unfurnished:</strong> No furniture provided
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Gender Preference */}
            <div className="relative">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Some accommodations may be available to specific genders only,<br />
                      especially in shared living situations.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
