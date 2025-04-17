
import { useEffect, useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Link } from 'react-router-dom';

const ConnectionCheck = () => {
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  
  useEffect(() => {
    // Check if Supabase environment variables are set
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      setIsSupabaseConnected(false);
    }
    
    // Check if the user has dismissed the alert before
    const dismissedStatus = localStorage.getItem('connection-alert-dismissed');
    if (dismissedStatus === 'true') {
      setIsDismissed(true);
    }
  }, []);
  
  const handleDismiss = () => {
    localStorage.setItem('connection-alert-dismissed', 'true');
    setIsDismissed(true);
  };
  
  if (isSupabaseConnected || isDismissed) return null;
  
  return (
    <Alert variant="default" className="mb-6 border-rentmate-200 bg-rentmate-50">
      <Info className="h-4 w-4 text-rentmate-600" />
      <AlertTitle className="text-rentmate-700">Demo Mode Active</AlertTitle>
      <AlertDescription className="text-rentmate-600/90 space-y-2">
        <p>
          RentMate is running in demo mode with sample data. For full functionality including real-time listings and authentication, connect to Supabase.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-rentmate-200 bg-white text-rentmate-700 hover:bg-rentmate-100"
            onClick={handleDismiss}
          >
            Continue in Demo Mode
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="bg-rentmate-600 hover:bg-rentmate-700 text-white"
            asChild
          >
            <Link to="https://docs.lovable.dev/integrations/supabase/">
              Learn About Supabase
            </Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionCheck;
