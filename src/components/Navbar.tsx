"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useState, useEffect } from "react";

const categories = [
  "Music", "Technology", "Sports", "Arts",
  "Food", "Business", "Health", "Education",
];

function NavLink({
  href,
  children,
  ocid,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  ocid: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      data-ocid={ocid}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" data-ocid="navbar.home_link">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">EventHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="navbar.home_link"
            >
              Home
            </Link>

            {/* Explore: server এ plain link, client এ dropdown */}
            {!mounted ? (
              <Link
                href="/explore"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Explore <ChevronDown className="w-3.5 h-3.5" />
              </Link>
            ) : (
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
                <DropdownMenuContent className="w-56 p-2" data-ocid="navbar.explore_dropdown_menu">
                  <Link href="/explore">
                    <DropdownMenuItem className="cursor-pointer font-medium">All Events</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  {categories.map((cat) => (
                    <Link key={cat} href="/explore">
                      <DropdownMenuItem className="cursor-pointer">{cat}</DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <NavLink href="/about" ocid="navbar.about_link" onClick={() => setMobileOpen(false)}>About</NavLink>
            <NavLink href="/contact" ocid="navbar.contact_link" onClick={() => setMobileOpen(false)}>Contact</NavLink>
            <NavLink href="/blog" ocid="navbar.blog_link" onClick={() => setMobileOpen(false)}>Blog</NavLink>
            {mounted && user && (
              <NavLink href="/dashboard/profile" ocid="navbar.dashboard_link" onClick={() => setMobileOpen(false)}>
                Dashboard
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden sm:flex" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {!mounted ? (
              <div className="hidden md:flex items-center gap-2 w-[120px] h-8" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="flex items-center gap-2 rounded-full" data-ocid="navbar.profile_dropdown">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block text-sm font-medium">{user.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard/profile">
                    <DropdownMenuItem className="cursor-pointer gap-2"><User className="w-4 h-4" /> Profile</DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard/profile">
                    <DropdownMenuItem className="cursor-pointer gap-2"><Settings className="w-4 h-4" /> Settings</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer gap-2 text-destructive" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" data-ocid="navbar.login_button">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary text-primary-foreground">Sign Up</Button>
                </Link>
              </div>
            )}

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-3">
          <Link href="/" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/explore" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Explore</Link>
          <Link href="/about" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="/blog" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Blog</Link>
          {mounted && user && (
            <Link href="/dashboard/profile" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          )}
          <div className="flex items-center gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
            {mounted && !user && (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="bg-primary text-primary-foreground">Sign Up</Button>
                </Link>
              </>
            )}
            {mounted && user && (
              <Button variant="outline" size="sm" onClick={handleLogout}>Log out</Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}