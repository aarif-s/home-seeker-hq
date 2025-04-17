
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const ConnectionCheck = () => {
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(true);
  
  useEffect(() => {
    // Check if Supabase environment variables are set
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      setIsSupabaseConnected(false);
    }
  }, []);
  
  if (isSupabaseConnected) return null;
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Connection Issue</AlertTitle>
      <AlertDescription className="space-y-4">
        <p>
          This application requires connection to Supabase for authentication and data storage.
          Currently, the Supabase environment variables are not set.
        </p>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white"
            onClick={() => window.open('https://docs.lovable.dev/integrations/supabase/', '_blank')}
          >
            View Documentation
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionCheck;
