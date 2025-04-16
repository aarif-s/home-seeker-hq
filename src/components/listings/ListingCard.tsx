
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

export const ListingCard = ({ listing, onToggleFavorite, isFavorite = false }: ListingCardProps) => {
  const {
    id,
    title,
    price,
    location,
    images,
    roomType,
    furnishingStatus,
    availableFrom,
    size,
  } = listing;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link to={`/listings/${id}`}>
        <div className="relative w-full h-48 overflow-hidden">
          {images.length > 0 ? (
            <img
              src={images[0].url}
              alt={images[0].alt}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/70 hover:bg-white rounded-full ${
              isFavorite ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart className={isFavorite ? 'fill-current' : ''} size={20} />
          </Button>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-rentmate-600 hover:bg-rentmate-700">
              {roomType === 'private'
                ? 'Private Room'
                : roomType === 'shared'
                ? 'Shared Room'
                : 'Apartment'}
            </Badge>
          </div>
        </div>
        <CardContent className="pt-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
              <p className="text-gray-500 text-sm mt-1">{location.city}, {location.zipCode}</p>
            </div>
            <p className="font-bold text-lg text-rentmate-700">
              {formatCurrency(price)}
              <span className="text-sm font-normal text-gray-500">/mo</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            <div>
              <p className="text-gray-500">Available from</p>
              <p className="font-medium">{formatDate(availableFrom)}</p>
            </div>
            <div>
              <p className="text-gray-500">Size</p>
              <p className="font-medium">{size} m²</p>
            </div>
            <div>
              <p className="text-gray-500">Furnishing</p>
              <p className="font-medium capitalize">{furnishingStatus}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3 pb-4">
          <Button variant="outline" className="w-full border-rentmate-500 text-rentmate-600 hover:bg-rentmate-50">
            View Details
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ListingCard;
