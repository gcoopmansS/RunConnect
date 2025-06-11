import React from "react";
import { useAuth } from "../../context/useAuth";
import {
  Home,
  Calendar,
  Activity,
  Target,
  BarChart3,
  Settings,
  UserPlus,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const coachNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: "workouts",
      label: "Workout Library",
      icon: Activity,
      gradient: "from-orange-500 to-red-600",
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: Calendar,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: "library",
      label: "Exercise Library",
      icon: BookOpen,
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      gradient: "from-gray-500 to-slate-600",
    },
  ];

  const athleteNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: "workouts",
      label: "My Workouts",
      icon: Activity,
      gradient: "from-orange-500 to-red-600",
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: Calendar,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: "progress",
      label: "Progress",
      icon: BarChart3,
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      id: "goals",
      label: "Goals",
      icon: Target,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      id: "connect",
      label: "Find Coach",
      icon: UserPlus,
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      gradient: "from-gray-500 to-slate-600",
    },
  ];

  const navItems = user?.role === "coach" ? coachNavItems : athleteNavItems;

  const handleItemClick = (itemId: string) => {
    onTabChange(itemId);
    navigate(`/${itemId}`);
    onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl shadow-2xl transform transition-all duration-300 ease-in-out
        md:relative md:translate-x-0 md:shadow-xl md:border-r md:border-gray-200/50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 py-8 px-6 overflow-y-auto">
            <nav className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 group
                      ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-blue-500/25`
                          : "text-gray-700 hover:bg-white/80 hover:text-gray-900 hover:shadow-md backdrop-blur-sm"
                      }
                    `}
                  >
                    <div
                      className={`
                      p-2 rounded-xl mr-4 transition-all duration-200
                      ${
                        isActive
                          ? "bg-white/20"
                          : `bg-gradient-to-r ${item.gradient} text-white group-hover:scale-110`
                      }
                    `}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar footer with gradient */}
          <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium">
                RunConnect v1.0
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
