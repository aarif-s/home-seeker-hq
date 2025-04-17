
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSession } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockListings } from "@/data/mockData";
import ListingCard from "@/components/listings/ListingCard";
import { Building, Heart, MessageSquare, UserCog, History, Bell, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UserDashboard = () => {
  const { user } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Demo data
  const savedListings = mockListings.slice(0, 2);
  const recentViews = mockListings.slice(2, 4);
  
  const notifications = [
    {
      id: "1",
      title: "New message",
      description: "You've received a new message from Apartment Provider",
      time: "10 minutes ago",
      isRead: false,
    },
    {
      id: "2",
      title: "Application update",
      description: "Your application for Cozy Studio in Berlin has been approved",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: "3",
      title: "Price drop alert",
      description: "A listing you saved has decreased in price",
      time: "Yesterday",
      isRead: true,
    },
    {
      id: "4",
      title: "Account verified",
      description: "Your account has been successfully verified",
      time: "3 days ago",
      isRead: true,
    },
  ];

  const applications = [
    {
      id: "app1",
      property: "Cozy Studio in Berlin Mitte",
      status: "Approved",
      date: "April 12, 2025",
      landlord: "Berlin Apartments GmbH"
    },
    {
      id: "app2",
      property: "Modern Room in Shared Flat",
      status: "Pending",
      date: "April 10, 2025",
      landlord: "Julia Schmidt"
    },
    {
      id: "app3",
      property: "Spacious 1-Bedroom near University",
      status: "Declined",
      date: "April 5, 2025",
      landlord: "Student Housing Inc."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">My Dashboard</h1>
            <p className="text-gray-600">
              Manage your profile, applications, and saved listings
            </p>
          </div>
          
          {/* User Profile Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.profileImage} alt={user?.name} />
              <AvatarFallback className="text-xl bg-rentmate-100 text-rentmate-600">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold mb-1">{user?.name || "Demo User"}</h2>
              <p className="text-gray-600 mb-2">{user?.email || "demo@rentmate.example"}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <Badge className="bg-rentmate-600">
                  {user?.role === "seeker" ? "Accommodation Seeker" : 
                   user?.role === "provider" ? "Accommodation Provider" : "Demo User"}
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600">
                  {user?.isVerified ? "Verified Account" : "Demo Account"}
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="flex items-center">
                <UserCog className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            
            <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-rentmate-600">{savedListings.length}</div>
                <div className="text-sm text-gray-500">Saved Listings</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-rentmate-600">{applications.length}</div>
                <div className="text-sm text-gray-500">Applications</div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="saved" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="saved" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                Recently Viewed
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved">
              {savedListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedListings.map(listing => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.includes(listing.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Saved Listings</CardTitle>
                    <CardDescription>
                      You haven't saved any listings yet. Browse our listings and click the heart icon to save properties you're interested in.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <a href="/listings">Browse Listings</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="applications">
              {applications.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {applications.map(app => (
                    <Card key={app.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{app.property}</h3>
                            <p className="text-gray-600">Applied on {app.date}</p>
                            <p className="text-sm mt-1">Landlord: {app.landlord}</p>
                          </div>
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <Badge className={
                              app.status === "Approved" ? "bg-green-600" :
                              app.status === "Pending" ? "bg-amber-500" :
                              "bg-red-600"
                            }>
                              {app.status}
                            </Badge>
                            <Button variant="outline" size="sm" className="whitespace-nowrap">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Applications</CardTitle>
                    <CardDescription>
                      You haven't applied to any properties yet. Browse our listings to find your perfect accommodation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <a href="/listings">Browse Listings</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>
                    Stay in touch with accommodation providers and potential roommates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Messages Yet</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      When you start conversations with accommodation providers or roommates, they'll appear here.
                    </p>
                    <Button asChild>
                      <a href="/listings">Browse Listings to Connect</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              {recentViews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentViews.map(listing => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.includes(listing.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Recently Viewed Listings</CardTitle>
                    <CardDescription>
                      You haven't viewed any listings recently. Browse our listings to find your perfect accommodation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <a href="/listings">Browse Listings</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Stay updated with the latest activity on your account.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Mark All as Read
                  </Button>
                </CardHeader>
                <CardContent>
                  {notifications.length > 0 ? (
                    <div className="space-y-4">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border rounded-lg flex items-start space-x-4 ${
                            notification.isRead ? 'bg-white' : 'bg-rentmate-50'
                          }`}
                        >
                          <div className={`p-2 rounded-full ${
                            notification.isRead ? 'bg-gray-100' : 'bg-rentmate-100'
                          }`}>
                            <Bell className={`h-5 w-5 ${
                              notification.isRead ? 'text-gray-500' : 'text-rentmate-600'
                            }`} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{notification.title}</h4>
                              <span className="text-sm text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{notification.description}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="flex-shrink-0">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Notifications</h3>
                      <p className="text-gray-600">
                        You're all caught up! We'll notify you here when there's new activity.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
