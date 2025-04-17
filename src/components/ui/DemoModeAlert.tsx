
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, X } from "lucide-react";

interface DemoModeAlertProps {
  title?: string;
  description?: string;
  className?: string;
}

const DemoModeAlert = ({
  title = "Demo Mode",
  description = "This application is running in demo mode. Some features may be limited without a Supabase connection.",
  className,
}: DemoModeAlertProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <Alert className={`relative ${className}`}>
      <Info className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
};

export default DemoModeAlert;
