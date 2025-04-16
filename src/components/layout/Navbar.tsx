
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  X,
  User,
  Heart,
  LogOut,
  Settings,
  Home,
  PlusCircle,
  LayoutDashboard,
} from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This would come from your auth state management
  const isLoggedIn = false;
  const userRole = 'seeker' as 'seeker' | 'provider' | 'admin';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <span className="text-2xl font-bold text-rentmate-600">
            Rent<span className="text-accent">Mate</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Navigation Links */}
          <Link to="/listings" className="text-gray-700 hover:text-rentmate-600">
            Find a Home
          </Link>
          
          {isLoggedIn && userRole === 'provider' && (
            <Link to="/my-listings" className="text-gray-700 hover:text-rentmate-600">
              My Listings
            </Link>
          )}
          
          {isLoggedIn && userRole === 'admin' && (
            <Link to="/admin" className="text-gray-700 hover:text-rentmate-600">
              Admin Dashboard
            </Link>
          )}

          {/* User Menu or Auth Buttons */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="bg-rentmate-200 text-rentmate-700">JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Favorites</span>
                </DropdownMenuItem>
                {userRole === 'provider' && (
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Add Listing</span>
                  </DropdownMenuItem>
                )}
                {userRole === 'admin' && (
                  <DropdownMenuItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-rentmate-600 hover:bg-rentmate-700" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-6 space-y-4 border-t">
          <Link
            to="/listings"
            className="block py-2 text-gray-700 hover:text-rentmate-600"
            onClick={closeMenu}
          >
            Find a Home
          </Link>
          
          {isLoggedIn && userRole === 'provider' && (
            <Link
              to="/my-listings"
              className="block py-2 text-gray-700 hover:text-rentmate-600"
              onClick={closeMenu}
            >
              My Listings
            </Link>
          )}
          
          {isLoggedIn && userRole === 'admin' && (
            <Link
              to="/admin"
              className="block py-2 text-gray-700 hover:text-rentmate-600"
              onClick={closeMenu}
            >
              Admin Dashboard
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="block py-2 text-gray-700 hover:text-rentmate-600"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <Link
                to="/favorites"
                className="block py-2 text-gray-700 hover:text-rentmate-600"
                onClick={closeMenu}
              >
                Favorites
              </Link>
              {userRole === 'provider' && (
                <Link
                  to="/create-listing"
                  className="block py-2 text-gray-700 hover:text-rentmate-600"
                  onClick={closeMenu}
                >
                  Add Listing
                </Link>
              )}
              <Link
                to="/settings"
                className="block py-2 text-gray-700 hover:text-rentmate-600"
                onClick={closeMenu}
              >
                Settings
              </Link>
              <button className="block w-full py-2 text-left text-gray-700 hover:text-rentmate-600">
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
              </Button>
              <Button className="w-full bg-rentmate-600 hover:bg-rentmate-700" asChild>
                <Link to="/register" onClick={closeMenu}>
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
