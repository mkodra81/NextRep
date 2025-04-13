import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  X,
  TrendingUp,
  Dumbbell,
  Trophy,
  Calendar,
  Users,
  MessageCircle,
  User,
  Settings,
  MenuIcon,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
   const navigate = useNavigate();
  

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("subscriptionPlan");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (mobileMenuOpen) {
    return (
      <div className="fixed inset-0 bg-gym-black bg-opacity-90 z-50 md:hidden">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">GymAI Planner</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>

          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-white">John Doe</div>
                <Badge className="bg-gym-blue text-white">Pro Plan</Badge>
              </div>
            </div>

            <nav className="space-y-3">
              <SidebarLink
                icon={<TrendingUp size={18} />}
                label="Dashboard"
                active
                mobile
              />
              <SidebarLink
                icon={<Dumbbell size={18} />}
                label="Workouts"
                mobile
              />
              <SidebarLink
                icon={<Trophy size={18} />}
                label="Progress"
                mobile
              />
              <SidebarLink
                icon={<Calendar size={18} />}
                label="Schedule"
                mobile
              />
              <SidebarLink
                icon={<Users size={18} />}
                label="Community"
                mobile
              />
              <SidebarLink
                icon={<MessageCircle size={18} />}
                label="AI Assistant"
                mobile
              />
              <SidebarLink icon={<User size={18} />} label="Profile" mobile />
              <SidebarLink
                icon={<Settings size={18} />}
                label="Settings"
                mobile
              />
            </nav>
          </div>

          <div className="mt-auto p-4 border-t border-gray-800">
            <Button
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" /> Log Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gym-black text-white">
      <div className="md:hidden bg-gym-black text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">GymAI Planner</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">GymAI Planner</h2>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">John Doe</div>
            <Badge className="bg-gym-blue text-white">Pro Plan</Badge>
          </div>
        </div>

        <nav className="space-y-1">
          <SidebarLink
            icon={<TrendingUp size={18} />}
            label="Dashboard"
            active
          />
          <SidebarLink icon={<Dumbbell size={18} />} label="Workouts" />
          <SidebarLink icon={<Trophy size={18} />} label="Progress" />
          <SidebarLink icon={<Calendar size={18} />} label="Schedule" />
          <SidebarLink icon={<Users size={18} />} label="Community" />
          <SidebarLink
            icon={<MessageCircle size={18} />}
            label="AI Assistant"
          />
          <SidebarLink icon={<User size={18} />} label="Profile" />
          <SidebarLink icon={<Settings size={18} />} label="Settings" />
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-800">
        <Button
          variant="outline"
          className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" /> Log Out
        </Button>
      </div>
    </aside>
  );
};

const SidebarLink = ({
  icon,
  label,
  active = false,
  mobile = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  mobile?: boolean;
}) => {
  return (
    <a
      href="#"
      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
        active
          ? "bg-gym-blue text-white"
          : mobile
          ? "text-gray-300 hover:bg-gray-800"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

export default Navbar;
