
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import DemoModeAlert from '@/components/ui/DemoModeAlert';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: 'seeker' | 'provider' | 'admin';
  redirectTo?: string;
}

const AuthGuard = ({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: AuthGuardProps) => {
  const { user, loading, isSupabaseConnected } = useSession();
  const location = useLocation();
  const [showDemoAlert, setShowDemoAlert] = useState(false);

  useEffect(() => {
    // Show demo alert if not connected to Supabase and no demo alert shown yet
    if (!isSupabaseConnected && !showDemoAlert) {
      setShowDemoAlert(true);
    }
  }, [isSupabaseConnected, showDemoAlert]);

  // While loading authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-rentmate-600" />
      </div>
    );
  }

  // Using mock data for demo mode when Supabase is not connected
  if (!isSupabaseConnected) {
    // In demo mode, we simulate a logged-in user for specific roles
    const isDemoAdmin = location.pathname.startsWith('/admin');
    const isDemoProvider = location.pathname.startsWith('/create-listing');
    
    // For demo purposes, we simulate the correct user role based on the page
    if (requiredRole === 'admin' && !isDemoAdmin) {
      return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
    }
    
    if (requiredRole === 'provider' && !isDemoProvider) {
      return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
    }
    
    return (
      <>
        {showDemoAlert && (
          <div className="sticky top-0 z-50">
            <DemoModeAlert 
              title="Demo Mode - Simulated Authentication" 
              description="You're viewing a protected page in demo mode. In a production environment, this would require authentication."
            />
          </div>
        )}
        {children}
      </>
    );
  }

  // Real authentication check when Supabase is connected
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Role check (if requiredRole is specified)
  if (requiredRole && user.role !== requiredRole) {
    // For admin access, redirect to homepage
    if (requiredRole === 'admin') {
      return <Navigate to="/" replace />;
    }
    
    // For other role restrictions, redirect to login
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Authenticated and authorized
  return <>{children}</>;
};

export default AuthGuard;
