
import { Listing, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'seeker',
    isVerified: true,
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'provider',
    isVerified: true,
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@rentmate.com',
    role: 'admin',
    isVerified: true,
    createdAt: new Date('2022-12-01')
  }
];

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Cozy Studio Apartment in City Center',
    description: 'A beautiful studio apartment in the heart of the city. Perfect for students or young professionals. The apartment is close to public transport, shops, and restaurants.',
    price: 850,
    location: {
      address: '123 Main Street, Apt 4B',
      city: 'Berlin',
      zipCode: '10115',
      country: 'Germany',
      coordinates: {
        lat: 52.5200,
        lng: 13.4050
      }
    },
    images: [
      {
        id: '101',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        alt: 'Living room with windows'
      },
      {
        id: '102',
        url: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc',
        alt: 'Kitchen area'
      }
    ],
    roomType: 'apartment',
    furnishingStatus: 'furnished',
    availableFrom: new Date('2023-06-01'),
    size: 35,
    amenities: ['WiFi', 'Heating', 'Kitchen', 'Washing Machine', 'TV'],
    rules: ['No pets', 'No smoking', 'No parties'],
    genderPreference: 'any',
    status: 'approved',
    providerId: '2',
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-04-20')
  },
  {
    id: '2',
    title: 'Private Room in Shared Apartment',
    description: 'Bright private room in a shared 3-bedroom apartment. The apartment is shared with two friendly students. Common areas include a fully equipped kitchen, living room, and bathroom.',
    price: 450,
    location: {
      address: '456 Oak Avenue',
      city: 'Munich',
      zipCode: '80331',
      country: 'Germany',
      coordinates: {
        lat: 48.1351,
        lng: 11.5820
      }
    },
    images: [
      {
        id: '201',
        url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
        alt: 'Bedroom with desk'
      },
      {
        id: '202',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
        alt: 'Shared living room'
      }
    ],
    roomType: 'private',
    furnishingStatus: 'semi-furnished',
    availableFrom: new Date('2023-05-15'),
    size: 18,
    amenities: ['WiFi', 'Heating', 'Kitchen', 'Washing Machine', 'Balcony'],
    genderPreference: 'female',
    status: 'approved',
    providerId: '2',
    createdAt: new Date('2023-03-28'),
    updatedAt: new Date('2023-04-05')
  },
  {
    id: '3',
    title: 'Modern 2-Bedroom Apartment near University',
    description: 'Spacious and modern 2-bedroom apartment located just 10 minutes walk from the university. Perfect for students or young professionals. The apartment has been recently renovated.',
    price: 1200,
    location: {
      address: '789 University Boulevard',
      city: 'Hamburg',
      zipCode: '20148',
      country: 'Germany',
      coordinates: {
        lat: 53.5511,
        lng: 9.9937
      }
    },
    images: [
      {
        id: '301',
        url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb',
        alt: 'Modern living room'
      },
      {
        id: '302',
        url: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf',
        alt: 'Kitchen with island'
      }
    ],
    roomType: 'apartment',
    furnishingStatus: 'furnished',
    availableFrom: new Date('2023-07-01'),
    size: 75,
    amenities: ['WiFi', 'Heating', 'Modern Kitchen', 'Washing Machine', 'Dryer', 'Balcony', 'Parking'],
    rules: ['No pets', 'No smoking'],
    genderPreference: 'any',
    status: 'approved',
    providerId: '2',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-05-10')
  },
  {
    id: '4',
    title: 'Shared Room in Student House',
    description: 'Shared room in a lively student house with 5 other international students. Great opportunity to meet new people and make friends. The house is located in a student-friendly neighborhood.',
    price: 320,
    location: {
      address: '101 Student Lane',
      city: 'Frankfurt',
      zipCode: '60306',
      country: 'Germany',
      coordinates: {
        lat: 50.1109,
        lng: 8.6821
      }
    },
    images: [
      {
        id: '401',
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
        alt: 'Shared bedroom'
      },
      {
        id: '402',
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf',
        alt: 'Common room'
      }
    ],
    roomType: 'shared',
    furnishingStatus: 'furnished',
    availableFrom: new Date('2023-06-15'),
    size: 16,
    amenities: ['WiFi', 'Heating', 'Shared Kitchen', 'Shared Bathroom', 'Laundry Room'],
    genderPreference: 'male',
    status: 'approved',
    providerId: '2',
    createdAt: new Date('2023-04-22'),
    updatedAt: new Date('2023-05-01')
  },
  {
    id: '5',
    title: 'Penthouse Apartment with City Views',
    description: 'Luxurious penthouse apartment with panoramic city views. The apartment features high-end finishes, a spacious terrace, and modern appliances. Perfect for professionals or small families.',
    price: 2500,
    location: {
      address: '1000 Skyline Avenue, PH3',
      city: 'Cologne',
      zipCode: '50667',
      country: 'Germany',
      coordinates: {
        lat: 50.9375,
        lng: 6.9603
      }
    },
    images: [
      {
        id: '501',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        alt: 'Penthouse living area'
      },
      {
        id: '502',
        url: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897',
        alt: 'Terrace with city view'
      }
    ],
    roomType: 'apartment',
    furnishingStatus: 'furnished',
    availableFrom: new Date('2023-08-01'),
    size: 120,
    amenities: ['WiFi', 'Heating', 'Air Conditioning', 'Luxury Kitchen', 'Washing Machine', 'Dryer', 'Terrace', 'Parking', 'Gym Access'],
    rules: ['No pets', 'No smoking', 'No parties', 'References required'],
    genderPreference: 'any',
    status: 'approved',
    providerId: '2',
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-05-18')
  }
];
