
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Stamp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchFilters from '@/components/search/SearchFilters';
import ListingCard from '@/components/listings/ListingCard';
import { mockListings } from '@/data/mockData';
import { SearchFilters as SearchFiltersType } from '@/types';

const Index = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredListings, setFilteredListings] = useState(mockListings.slice(0, 3));
  
  const handleSearch = (filters: SearchFiltersType) => {
    console.log('Search filters:', filters);
    // In a real app, this would make an API call with the filters
    // For now, we'll just simulate filtering the mock data
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
    
    setFilteredListings(filtered);
  };
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rentmate-600 to-rentmate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Home with RentMate
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Your trusted partner in finding a place to stay. Browse verified listings from trusted providers.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <SearchFilters onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Listings Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Listings</h2>
            <Link to="/listings" className="text-rentmate-600 hover:text-rentmate-700 flex items-center">
              View all listings
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map(listing => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(listing.id)}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500 text-lg">No listings match your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilteredListings(mockListings.slice(0, 3))}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How RentMate Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make it easy to find or list your perfect accommodation in just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-rentmate-100 text-rentmate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Search & Filter</h3>
              <p className="text-gray-600">
                Use our advanced search to find the perfect accommodation based on your preferences.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-rentmate-100 text-rentmate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stamp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply & Connect</h3>
              <p className="text-gray-600">
                Contact verified providers and apply for the accommodation that matches your needs.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-rentmate-100 text-rentmate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Move In Securely</h3>
              <p className="text-gray-600">
                Enjoy your new home with the peace of mind that comes from our verified listings.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-accent bg-opacity-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-lg shadow-lg p-8">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Have a room or apartment to rent?</h2>
              <p className="text-gray-600">
                List your property on RentMate and connect with thousands of potential tenants.
              </p>
            </div>
            <div>
              <Button className="bg-accent hover:bg-accent-dark text-white w-full md:w-auto" size="lg" asChild>
                <Link to="/list-property">Become a Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
