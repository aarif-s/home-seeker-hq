import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { filterCities } from "@/utils/cityData";
import { City } from "@/types";

interface CitySearchProps {
  value: string;
  onChange: (value: string) => void;
}

const CitySearch = ({ value, onChange }: CitySearchProps) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 🔁 Sync query when value changes from parent
  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (query.length > 1) {
      setSuggestions(filterCities(query));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    onChange(inputValue); // Sync with parent as you type
  };

  const handleSelectCity = (city: City) => {
    onChange(city.name); // Parent state updates value, which syncs query via useEffect
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MapPin className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="City, neighborhood..."
        className="pl-10"
        value={query}
        onChange={handleInputChange}
        onFocus={() => query.length > 1 && setIsOpen(true)}
      />
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {suggestions.map((city) => (
              <li
                key={city.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleSelectCity(city)}
              >
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{city.name}, {city.country}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
