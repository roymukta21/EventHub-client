import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Calendar,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
//import { useAuth } from "../context/AuthContext";
//import { useTheme } from "../context/ThemeContext";

const categories = [
  "Music",
  "Technology",
  "Sports",
  "Arts",
  "Food",
  "Business",
  "Health",
  "Education",
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
  };

  const NavLink = ({
    to,
    children,
    ocid,
  }: { to: string; children: React.ReactNode; ocid: string }) => (
    <Link
      to={to}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      data-ocid={ocid}
      onClick={() => setMobileOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            data-ocid="navbar.home_link"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              EventHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="navbar.home_link"
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="navbar.explore_link"
                >
                  Explore <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 p-2"
                data-ocid="navbar.explore_dropdown_menu"
              >
                <Link to="/explore" onClick={() => setMobileOpen(false)}>
                  <DropdownMenuItem className="cursor-pointer font-medium">
                    All Events
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to="/explore"
                    onClick={() => setMobileOpen(false)}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      {cat}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <NavLink to="/about" ocid="navbar.about_link">
              About
            </NavLink>
            <NavLink to="/contact" ocid="navbar.contact_link">
              Contact
            </NavLink>
            {user && (
              <NavLink to="/blog" ocid="navbar.blog_link">
                Blog
              </NavLink>
            )}
            {user && (
              <NavLink to="/dashboard/profile" ocid="navbar.dashboard_link">
                Dashboard
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full"
                    data-ocid="navbar.profile_dropdown"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block text-sm font-medium">
                      {user.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <Link to="/dashboard/profile">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <User className="w-4 h-4" /> Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/dashboard/profile">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <Settings className="w-4 h-4" /> Settings
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
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="navbar.login_button"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block py-2 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
            data-ocid="navbar.mobile_home_link"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="block py-2 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
            data-ocid="navbar.mobile_explore_link"
          >
            Explore
          </Link>
          <Link
            to="/about"
            className="block py-2 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
          {user && (
            <Link
              to="/blog"
              className="block py-2 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
          )}
          {user && (
            <Link
              to="/dashboard/profile"
              className="block py-2 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <div className="flex items-center gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
            {!user && (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid="navbar.mobile_login_button"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
