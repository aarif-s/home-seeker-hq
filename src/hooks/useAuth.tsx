
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { toast } from 'sonner';

// Initialize Supabase client with explicit error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if required environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

// Set default URLs to prevent runtime errors
const fallbackUrl = 'https://placeholder-project.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

// Initialize Supabase client
const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseAnonKey || fallbackKey
);

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on component mount
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        // Get user profile data
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
        
        if (userData) {
          setCurrentUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            isVerified: userData.is_verified,
            createdAt: new Date(userData.created_at),
            lastLogin: userData.last_login ? new Date(userData.last_login) : undefined,
            profileImage: userData.profile_image
          });
        }
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile data
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (userData) {
            setCurrentUser({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              isVerified: userData.is_verified,
              createdAt: new Date(userData.created_at),
              lastLogin: userData.last_login ? new Date(userData.last_login) : undefined,
              profileImage: userData.profile_image
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (userData: {
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    userRole: 'seeker' | 'provider'
  }) => {
    if (!supabaseUrl || !supabaseAnonKey) {
      toast.error('Supabase environment variables are not set. Authentication is unavailable.');
      return;
    }
    
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Create user in Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.userRole
          }
        }
      });

      if (authError) throw authError;

      // Create user profile in users table
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: data.user?.id,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          role: userData.userRole,
          is_verified: false
        }]);

      if (profileError) throw profileError;

      toast.success('Account created successfully! Please verify your email.');
      navigate('/login');
    } catch (error: any) {
      setAuthError(error.message);
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!supabaseUrl || !supabaseAnonKey) {
      toast.error('Supabase environment variables are not set. Authentication is unavailable.');
      return;
    }
    
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      toast.success('Logged in successfully!');
      
      // Redirect based on user role
      if (currentUser?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      setAuthError(error.message);
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    signUp, 
    signIn, 
    signOut, 
    isLoading, 
    currentUser,
    authError
  };
};

export const useSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    const getSession = async () => {
      setLoading(true);
      
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          // Get user profile data
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
          
          if (userData) {
            setUser({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              isVerified: userData.is_verified,
              createdAt: new Date(userData.created_at),
              lastLogin: userData.last_login ? new Date(userData.last_login) : undefined,
              profileImage: userData.profile_image
            });
          }
        }
      } catch (error) {
        console.error('Session error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // Get user profile data
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userData) {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            isVerified: userData.is_verified,
            createdAt: new Date(userData.created_at),
            lastLogin: userData.last_login ? new Date(userData.last_login) : undefined,
            profileImage: userData.profile_image
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
};

export { supabase };
