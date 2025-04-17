
import { City } from "@/types";

// Mock data for city suggestions
export const germanCities: City[] = [
  { id: "1", name: "Berlin", country: "Germany" },
  { id: "2", name: "Munich", country: "Germany" },
  { id: "3", name: "Hamburg", country: "Germany" },
  { id: "4", name: "Cologne", country: "Germany" },
  { id: "5", name: "Frankfurt", country: "Germany" },
  { id: "6", name: "Stuttgart", country: "Germany" },
  { id: "7", name: "Düsseldorf", country: "Germany" },
  { id: "8", name: "Dortmund", country: "Germany" },
  { id: "9", name: "Essen", country: "Germany" },
  { id: "10", name: "Leipzig", country: "Germany" },
  { id: "11", name: "Bremen", country: "Germany" },
  { id: "12", name: "Dresden", country: "Germany" },
  { id: "13", name: "Hannover", country: "Germany" },
  { id: "14", name: "Nuremberg", country: "Germany" },
  { id: "15", name: "Duisburg", country: "Germany" },
];

export const filterCities = (query: string): City[] => {
  if (!query) return [];
  const lowerCaseQuery = query.toLowerCase();
  return germanCities.filter(
    city => city.name.toLowerCase().includes(lowerCaseQuery) || 
            city.country.toLowerCase().includes(lowerCaseQuery)
  ).slice(0, 5); // Limit to 5 suggestions
};
