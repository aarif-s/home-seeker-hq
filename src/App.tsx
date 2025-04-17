
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import DemoModeAlert from "@/components/ui/DemoModeAlert";

// Pages
import Index from "./pages/Index";
import ListingsPage from "./pages/ListingsPage";
import ListingDetail from "./pages/ListingDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import CreateListing from "./pages/CreateListing";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import UserDashboard from "./pages/UserDashboard";

// Auth
import AuthGuard from "./components/auth/AuthGuard";
import ConnectionCheck from "./components/auth/ConnectionCheck";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Check for Supabase environment variables on app load
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      toast.info(
        "RentMate is running in demo mode with sample data. To enable full functionality, connect to Supabase.",
        { duration: 6000, id: "supabase-demo-mode" }
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ConnectionCheck />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listings/:id" element={<ListingDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/admin" 
              element={
                <AuthGuard requiredRole="admin" redirectTo="/admin/login">
                  <AdminDashboard />
                </AuthGuard>
              } 
            />
            <Route 
              path="/create-listing" 
              element={
                <AuthGuard requiredRole="provider" redirectTo="/login">
                  <CreateListing />
                </AuthGuard>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard redirectTo="/login">
                  <UserDashboard />
                </AuthGuard>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
