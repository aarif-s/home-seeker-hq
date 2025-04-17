
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

// Auth
import AuthGuard from "./components/auth/AuthGuard";
import ConnectionCheck from "./components/auth/ConnectionCheck";

const queryClient = new QueryClient();

const App = () => {
  const [envVarsChecked, setEnvVarsChecked] = useState(false);

  useEffect(() => {
    // Check for Supabase environment variables on app load
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!envVarsChecked && (!supabaseUrl || !supabaseAnonKey)) {
      toast.error(
        "Supabase environment variables are missing. Authentication and data features will not work properly.",
        { duration: 6000, id: "supabase-env-error" }
      );
    }
    
    setEnvVarsChecked(true);
  }, [envVarsChecked]);

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
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
