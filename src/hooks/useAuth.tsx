
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { toast } from 'sonner';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!, 
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (userData: {
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    userRole: 'seeker' | 'provider'
  }) => {
    setIsLoading(true);
    
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
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return { signUp, signIn, signOut, isLoading };
};

export const useSession = () => {
  const [user, setUser] = useState<User | null>(null);

  // TODO: Implement session tracking
  return { user };
};

export { supabase };

