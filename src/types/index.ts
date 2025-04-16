export type UserRole = 'seeker' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  profileImage?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface ListingImage {
  id: string;
  url: string;
  alt: string;
}

export type RoomType = 'private' | 'shared' | 'apartment';
export type FurnishingStatus = 'furnished' | 'semi-furnished' | 'unfurnished';
export type ListingStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    zipCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  images: ListingImage[];
  roomType: RoomType;
  furnishingStatus: FurnishingStatus;
  availableFrom: Date;
  availableUntil?: Date;
  size: number; // in square meters
  amenities: string[];
  rules?: string[];
  genderPreference?: 'male' | 'female' | 'any';
  status: ListingStatus;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  location?: string;
  roomType?: RoomType;
  priceMin?: number;
  priceMax?: number;
  availableFrom?: Date;
  furnishingStatus?: FurnishingStatus;
  genderPreference?: string;
}

export type AuthProvider = 'email' | 'google' | 'linkedin';
