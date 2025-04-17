
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, X } from "lucide-react";

interface DemoModeAlertProps {
  title?: string;
  description?: string;
  className?: string;
}

const DemoModeAlert = ({
  title = "Demo Mode Active",
  description = "RentMate is currently running in demo mode with sample data. Connect to Supabase for full functionality including authentication and real-time listings.",
  className,
}: DemoModeAlertProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <Alert className={`relative border-rentmate-600/20 bg-rentmate-50 ${className}`}>
      <Info className="h-4 w-4 text-rentmate-600" />
      <AlertTitle className="text-rentmate-700">{title}</AlertTitle>
      <AlertDescription className="text-rentmate-600/80">{description}</AlertDescription>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-rentmate-100 transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4 text-rentmate-600" />
      </button>
    </Alert>
  );
};

export default DemoModeAlert;
