import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

const navItems = [
  { to: "/dashboard/admin", icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard/admin/events", icon: Calendar, label: "Manage Events" },
  { to: "/dashboard/admin/users", icon: Users, label: "Manage Users" },
  { to: "/dashboard/admin/bookings", icon: BookOpen, label: "Manage Bookings" },
  { to: "/dashboard/admin/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/dashboard/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  if (!user || (user.role ?? "").toLowerCase() !== "admin") {
    navigate({ to: "/" });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md h-16 flex items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">EventHub</span>
        </Link>
        <span className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5">
          Admin
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-60 border-r border-border bg-sidebar hidden md:flex flex-col py-6 px-4 shrink-0">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-primary">Administrator</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors [&.active]:bg-sidebar-accent [&.active]:text-sidebar-primary"
                data-ocid={`admin.${item.label.toLowerCase().replace(/ /g, "_")}_link`}
              >
                <item.icon className="w-4 h-4" /> {item.label}{" "}
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />
              </Link>
            ))}
          </nav>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive mt-4"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
