
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid2X2, List, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchFilters from '@/components/search/SearchFilters';
import ListingCard from '@/components/listings/ListingCard';
import { mockListings } from '@/data/mockData';
import { SearchFilters as SearchFiltersType, Listing } from '@/types';

const ListingsPage = () => {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // This would be an API call in a real app
    setIsLoading(true);
    // Simulating API delay
    setTimeout(() => {
      setListings(mockListings);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearch = (filters: SearchFiltersType) => {
    setIsLoading(true);
    // In a real app, this would make an API call with the filters
    // For now, we'll just simulate filtering the mock data
    setTimeout(() => {
      const filtered = mockListings.filter(listing => {
        // Filter by location
        if (filters.location && !listing.location.city.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        
        // Filter by room type
        if (filters.roomType && listing.roomType !== filters.roomType) {
          return false;
        }
        
        // Filter by price range
        if (
          (filters.priceMin !== undefined && listing.price < filters.priceMin) ||
          (filters.priceMax !== undefined && listing.price > filters.priceMax)
        ) {
          return false;
        }
        
        // Filter by available from date
        if (filters.availableFrom && new Date(listing.availableFrom) > new Date(filters.availableFrom)) {
          return false;
        }
        
        // Filter by furnishing status
        if (filters.furnishingStatus && listing.furnishingStatus !== filters.furnishingStatus) {
          return false;
        }
        
        // Filter by gender preference
        if (
          filters.genderPreference &&
          listing.genderPreference !== 'any' &&
          listing.genderPreference !== filters.genderPreference
        ) {
          return false;
        }
        
        return true;
      });
      
      setListings(filtered);
      setIsLoading(false);
    }, 500);
  };
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Home</h1>
            <p className="text-gray-600 mt-2">
              Browse through our selection of verified accommodations
            </p>
          </div>
          
          {/* Search Filters */}
          <div className="mb-8">
            <SearchFilters onSearch={handleSearch} />
          </div>
          
          {/* Results Count & View Toggle */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {isLoading ? 'Loading...' : `${listings.length} accommodations found`}
            </p>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-rentmate-600 hover:bg-rentmate-700' : ''}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-rentmate-600 hover:bg-rentmate-700' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Listings */}
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="listings">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white rounded-lg shadow-md h-80 animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : listings.length > 0 ? (
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-4"
                }>
                  {listings.map(listing => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.includes(listing.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any accommodations matching your search criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => handleSearch({})}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="map">
              <div className="bg-gray-100 rounded-lg border h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-4">Map view will be implemented in future updates</p>
                  <p className="text-sm text-gray-400">Integration with Google Maps or Mapbox</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ListingsPage;
