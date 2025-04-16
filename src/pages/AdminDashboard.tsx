
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Users,
  Settings,
  ListFilter,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash,
  EyeIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockListings, mockUsers } from "@/data/mockData";
import { Listing, ListingStatus } from "@/types";

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [listings, setListings] = useState(mockListings);
  
  const pendingListings = listings.filter(listing => listing.status === 'pending');
  const approvedListings = listings.filter(listing => listing.status === 'approved');
  const rejectedListings = listings.filter(listing => listing.status === 'rejected');
  
  const updateListingStatus = (id: string, status: ListingStatus) => {
    setListings(
      listings.map(listing => 
        listing.id === id ? { ...listing, status, updatedAt: new Date() } : listing
      )
    );
  };
  
  const deleteListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="hidden md:flex bg-white border-r w-64 flex-col">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            <Link
              to="#overview"
              className={`flex items-center px-4 py-3 text-sm rounded-md ${
                activeTab === "overview"
                  ? "bg-rentmate-100 text-rentmate-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="#listings"
              className={`flex items-center px-4 py-3 text-sm rounded-md ${
                activeTab === "listings"
                  ? "bg-rentmate-100 text-rentmate-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("listings")}
            >
              <Home className="h-5 w-5 mr-3" />
              Listings
            </Link>
            <Link
              to="#users"
              className={`flex items-center px-4 py-3 text-sm rounded-md ${
                activeTab === "users"
                  ? "bg-rentmate-100 text-rentmate-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-5 w-5 mr-3" />
              Users
            </Link>
            <Link
              to="#settings"
              className={`flex items-center px-4 py-3 text-sm rounded-md ${
                activeTab === "settings"
                  ? "bg-rentmate-100 text-rentmate-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
          <div className="p-8">
            {/* Mobile View Tab Selector */}
            <div className="md:hidden mb-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      {activeTab === "overview" && <LayoutDashboard className="mr-2 h-4 w-4" />}
                      {activeTab === "listings" && <Home className="mr-2 h-4 w-4" />}
                      {activeTab === "users" && <Users className="mr-2 h-4 w-4" />}
                      {activeTab === "settings" && <Settings className="mr-2 h-4 w-4" />}
                      <span className="capitalize">{activeTab}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setActiveTab("overview")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("listings")}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>Listings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("users")}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Users</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Dashboard Overview */}
            {activeTab === "overview" && (
              <div>
                <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Total Listings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{listings.length}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        +12.5% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Pending Approval
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{pendingListings.length}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        Requires your review
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Total Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{mockUsers.length}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        +8.2% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Monthly Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">€1,245</div>
                      <p className="text-xs text-green-500 mt-1">
                        +18.2% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Recent Activity */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest actions and updates on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {listings.slice(0, 5).map((listing) => (
                        <div key={listing.id} className="flex items-start">
                          <div className="mr-4">
                            <Avatar>
                              <AvatarImage src={listing.images[0]?.url} alt={listing.title} />
                              <AvatarFallback className="bg-rentmate-200">
                                {listing.title.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{listing.title}</p>
                            <p className="text-sm text-gray-500">
                              {
                                listing.status === 'approved' ? 'Listed by provider' :
                                listing.status === 'pending' ? 'Pending approval' :
                                'Rejected by admin'
                              }
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(listing.updatedAt)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button className="bg-rentmate-600 hover:bg-rentmate-700">
                    Review Pending Listings
                  </Button>
                  <Button variant="outline">
                    Manage Featured Listings
                  </Button>
                  <Button variant="outline">
                    Generate Reports
                  </Button>
                </div>
              </div>
            )}
            
            {/* Listings Management */}
            {activeTab === "listings" && (
              <div>
                <h1 className="text-3xl font-bold mb-6">Listings Management</h1>
                
                <Tabs defaultValue="pending" className="w-full mb-8">
                  <TabsList>
                    <TabsTrigger value="pending" className="relative">
                      Pending
                      {pendingListings.length > 0 && (
                        <Badge className="ml-2 bg-rentmate-600">{pendingListings.length}</Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    <TabsTrigger value="all">All Listings</TabsTrigger>
                  </TabsList>
                  
                  {/* Pending Listings Tab */}
                  <TabsContent value="pending">
                    {pendingListings.length === 0 ? (
                      <div className="text-center py-12">
                        <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">No pending listings</h3>
                        <p className="mt-1 text-gray-500">All listings have been reviewed.</p>
                      </div>
                    ) : (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Listing</TableHead>
                              <TableHead>Provider</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Submitted</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pendingListings.map((listing) => (
                              <TableRow key={listing.id}>
                                <TableCell>
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-200">
                                      {listing.images.length > 0 ? (
                                        <img
                                          src={listing.images[0].url}
                                          alt={listing.title}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                          <Home className="h-5 w-5" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="font-medium">{truncateText(listing.title, 30)}</div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {mockUsers.find(user => user.id === listing.providerId)?.name || "Unknown"}
                                </TableCell>
                                <TableCell>{listing.location.city}</TableCell>
                                <TableCell>€{listing.price}/mo</TableCell>
                                <TableCell>{formatDate(listing.createdAt)}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
                                    >
                                      <EyeIcon className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="default"
                                      size="sm"
                                      onClick={() => updateListingStatus(listing.id, 'approved')}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => updateListingStatus(listing.id, 'rejected')}
                                    >
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Approved Listings Tab */}
                  <TabsContent value="approved">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Listing</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {approvedListings.map((listing) => (
                            <TableRow key={listing.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-200">
                                    {listing.images.length > 0 ? (
                                      <img
                                        src={listing.images[0].url}
                                        alt={listing.title}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Home className="h-5 w-5" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="font-medium">{truncateText(listing.title, 30)}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {mockUsers.find(user => user.id === listing.providerId)?.name || "Unknown"}
                              </TableCell>
                              <TableCell>{listing.location.city}</TableCell>
                              <TableCell>€{listing.price}/mo</TableCell>
                              <TableCell>
                                <Badge className="bg-green-500">Active</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
                                  >
                                    <EyeIcon className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => updateListingStatus(listing.id, 'rejected')}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  {/* Rejected Listings Tab */}
                  <TabsContent value="rejected">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Listing</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Rejected On</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rejectedListings.map((listing) => (
                            <TableRow key={listing.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-200">
                                    {listing.images.length > 0 ? (
                                      <img
                                        src={listing.images[0].url}
                                        alt={listing.title}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Home className="h-5 w-5" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="font-medium">{truncateText(listing.title, 30)}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {mockUsers.find(user => user.id === listing.providerId)?.name || "Unknown"}
                              </TableCell>
                              <TableCell>{listing.location.city}</TableCell>
                              <TableCell>€{listing.price}/mo</TableCell>
                              <TableCell>{formatDate(listing.updatedAt)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
                                  >
                                    <EyeIcon className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => updateListingStatus(listing.id, 'approved')}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteListing(listing.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  {/* All Listings Tab */}
                  <TabsContent value="all">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Listing</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {listings.map((listing) => (
                            <TableRow key={listing.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-200">
                                    {listing.images.length > 0 ? (
                                      <img
                                        src={listing.images[0].url}
                                        alt={listing.title}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Home className="h-5 w-5" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="font-medium">{truncateText(listing.title, 30)}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {mockUsers.find(user => user.id === listing.providerId)?.name || "Unknown"}
                              </TableCell>
                              <TableCell>
                                {listing.status === 'approved' && (
                                  <Badge className="bg-green-500">Approved</Badge>
                                )}
                                {listing.status === 'pending' && (
                                  <Badge className="bg-yellow-500">Pending</Badge>
                                )}
                                {listing.status === 'rejected' && (
                                  <Badge className="bg-red-500">Rejected</Badge>
                                )}
                              </TableCell>
                              <TableCell>{listing.location.city}</TableCell>
                              <TableCell>€{listing.price}/mo</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
                                  >
                                    <EyeIcon className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteListing(listing.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {/* Users Management - Placeholder */}
            {activeTab === "users" && (
              <div>
                <h1 className="text-3xl font-bold mb-6">Users Management</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>User Directory</CardTitle>
                    <CardDescription>Manage all registered users on the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="mr-3">
                                    <AvatarImage src={user.profileImage} alt={user.name} />
                                    <AvatarFallback className="bg-rentmate-200">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="font-medium">{user.name}</div>
                                </div>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge className={
                                  user.role === 'admin' 
                                    ? 'bg-purple-500' 
                                    : user.role === 'provider' 
                                    ? 'bg-blue-500' 
                                    : 'bg-gray-500'
                                }>
                                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={user.isVerified ? 'bg-green-500' : 'bg-yellow-500'}>
                                  {user.isVerified ? 'Verified' : 'Unverified'}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatDate(user.createdAt)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                  >
                                    <EyeIcon className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Settings - Placeholder */}
            {activeTab === "settings" && (
              <div>
                <h1 className="text-3xl font-bold mb-6">Platform Settings</h1>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Configure general platform settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-500 py-12">
                      Settings panel will be implemented in future updates
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
