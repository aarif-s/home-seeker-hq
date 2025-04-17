
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}

const UserAvatar = ({ user, size = "md", showStatus = false }: UserAvatarProps) => {
  const getAvatarSize = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8";
      case "lg":
        return "h-16 w-16";
      default:
        return "h-10 w-10";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative">
      <Avatar className={getAvatarSize()}>
        <AvatarImage src={user.profileImage} alt={user.name} />
        <AvatarFallback className="bg-rentmate-200 text-rentmate-700">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      
      {showStatus && user.isVerified && (
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
      )}
    </div>
  );
};

export default UserAvatar;
