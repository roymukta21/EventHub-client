import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import {
  Calendar,
  LayoutDashboard,
  LogOut,
  Moon,
  Star,
  Sun,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const router = useRouter();

  if (!user) {
    router.navigate({ to: "/login" });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const navItems = [
    { to: "/dashboard/profile", icon: User, label: "My Profile" },
    { to: "/dashboard/bookings", icon: Calendar, label: "My Bookings" },
    { to: "/dashboard/reviews", icon: Star, label: "My Reviews" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md h-16 flex items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">EventHub</span>
        </Link>
        <span className="font-display font-semibold text-muted-foreground hidden sm:block">
          Dashboard
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2"
                data-ocid="dashboard.profile_dropdown"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <Link to="/dashboard/profile">
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <User className="w-4 h-4" /> Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer gap-2 text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-60 border-r border-border bg-sidebar hidden md:flex flex-col py-6 px-4 shrink-0">
          <div className="flex flex-col items-center gap-2 mb-8 pb-6 border-b border-border">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <Badge variant="secondary" className="text-xs mt-1 capitalize">
                {user.role}
              </Badge>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors [&.active]:bg-sidebar-accent [&.active]:text-sidebar-primary"
                data-ocid={`dashboard.${item.label.toLowerCase().replace(/ /g, "_")}_link`}
              >
                <item.icon className="w-4 h-4" /> {item.label}
              </Link>
            ))}
            {user.role === "admin" && (
              <Link
                to="/dashboard/admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors mt-2 border-t border-border pt-4"
              >
                <LayoutDashboard className="w-4 h-4" /> Admin Panel
              </Link>
            )}
          </nav>
          <div className="mt-auto">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
