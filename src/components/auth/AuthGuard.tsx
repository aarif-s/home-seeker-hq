
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

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
  const { user, loading } = useSession();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-rentmate-600" />
      </div>
    );
  }

  // Not authenticated
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
