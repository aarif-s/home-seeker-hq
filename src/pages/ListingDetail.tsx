
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Calendar, 
  Home, 
  MapPin, 
  Wifi, 
  ShowerHead, 
  UtensilsCrossed,
  Bed, 
  User,
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { mockListings, mockUsers } from '@/data/mockData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Listing } from '@/types';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // This would be an API call in a real app
    setIsLoading(true);
    // Simulating API delay
    setTimeout(() => {
      const found = mockListings.find(item => item.id === id);
      if (found) {
        setListing(found);
      }
      setIsLoading(false);
    }, 300);
  }, [id]);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-60 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
          <p className="text-gray-600 mb-6">
            The accommodation you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/listings">Browse All Listings</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const provider = mockUsers.find(user => user.id === listing.providerId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/listings">Listings</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-gray-500 font-normal">
                {listing.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <div className="flex items-center mb-3">
              <Badge className="bg-rentmate-600 hover:bg-rentmate-700 mr-2">
                {listing.roomType === 'private'
                  ? 'Private Room'
                  : listing.roomType === 'shared'
                  ? 'Shared Room'
                  : 'Apartment'}
              </Badge>
              <Badge variant="outline" className="text-gray-600 border-gray-300">
                {listing.furnishingStatus === 'furnished'
                  ? 'Furnished'
                  : listing.furnishingStatus === 'semi-furnished'
                  ? 'Semi-furnished'
                  : 'Unfurnished'}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{`${listing.location.address}, ${listing.location.city}, ${listing.location.zipCode}`}</span>
            </div>
          </div>
          <div className="flex items-start space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFavorite}
              className={isFavorite ? 'text-red-500' : 'text-gray-500'}
            >
              <Heart className={isFavorite ? 'fill-current' : ''} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 />
            </Button>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {listing.images.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg aspect-video bg-gray-200">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
              {/* Include an empty carousel item if there are no images */}
              {listing.images.length === 0 && (
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg aspect-video bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="md:col-span-2">
            {/* Key Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Calendar className="h-6 w-6 text-rentmate-600 mb-2" />
                  <p className="text-sm text-gray-500">Available From</p>
                  <p className="font-medium">{formatDate(listing.availableFrom)}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Home className="h-6 w-6 text-rentmate-600 mb-2" />
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-medium">{listing.size} m²</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Clock className="h-6 w-6 text-rentmate-600 mb-2" />
                  <p className="text-sm text-gray-500">Minimum Stay</p>
                  <p className="font-medium">6 months</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <User className="h-6 w-6 text-rentmate-600 mb-2" />
                  <p className="text-sm text-gray-500">Gender Preference</p>
                  <p className="font-medium capitalize">{listing.genderPreference || 'Any'}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="text-gray-700 space-y-4">
                <p>{listing.description}</p>
              </div>
            </div>
            
            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    {amenity.includes('WiFi') ? <Wifi className="h-5 w-5 text-rentmate-600 mr-2" /> :
                     amenity.includes('Kitchen') ? <UtensilsCrossed className="h-5 w-5 text-rentmate-600 mr-2" /> :
                     amenity.includes('Bathroom') || amenity.includes('Shower') ? <ShowerHead className="h-5 w-5 text-rentmate-600 mr-2" /> :
                     amenity.includes('Bedroom') || amenity.includes('Bed') ? <Bed className="h-5 w-5 text-rentmate-600 mr-2" /> :
                     <div className="h-5 w-5 rounded-full bg-rentmate-100 text-rentmate-600 flex items-center justify-center mr-2">✓</div>
                    }
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* House Rules */}
            {listing.rules && listing.rules.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">House Rules</h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {listing.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Map */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Map will be implemented in future updates</p>
              </div>
              <p className="mt-2 text-gray-600">
                {listing.location.address}, {listing.location.city}, {listing.location.zipCode}, {listing.location.country}
              </p>
            </div>
          </div>
          
          {/* Right Column - Contact & Apply */}
          <div>
            <div className="sticky top-24">
              {/* Price Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-rentmate-700">
                      {formatCurrency(listing.price)}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Available from {formatDate(listing.availableFrom)}
                    </p>
                  </div>
                  
                  <Button className="w-full mb-3 bg-rentmate-600 hover:bg-rentmate-700">
                    Contact Provider
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Schedule Viewing
                  </Button>
                </CardContent>
              </Card>
              
              {/* Provider Card */}
              {provider && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={provider.profileImage} alt={provider.name} />
                        <AvatarFallback className="bg-rentmate-200 text-rentmate-700">
                          {provider.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <p className="text-sm text-gray-500">Verified Provider</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Typically responds within 24 hours
                    </p>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ListingDetail;
