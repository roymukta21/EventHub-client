import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import AIAssistant from "./components/AIAssistant";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import EventDetail from "./pages/EventDetail";
import Explore from "./pages/Explore";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Bookings from "./pages/dashboard/Bookings";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Profile from "./pages/dashboard/Profile";
import Reviews from "./pages/dashboard/Reviews";
import AdminLayout from "./pages/dashboard/admin/AdminLayout";
import Analytics from "./pages/dashboard/admin/Analytics";
import ManageBookings from "./pages/dashboard/admin/ManageBookings";
import ManageEvents from "./pages/dashboard/admin/ManageEvents";
import ManageUsers from "./pages/dashboard/admin/ManageUsers";
import Overview from "./pages/dashboard/admin/Overview";
import AdminSettings from "./pages/dashboard/admin/Settings";

// Layout wrapper for public pages
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <AIAssistant />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: PublicLayout,
});

// Public pages
const indexRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: Landing,
});
const exploreRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/explore",
  component: Explore,
});
const eventDetailRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/events/$id",
  component: EventDetail,
});
const loginRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/login",
  component: Login,
});
const registerRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/register",
  component: Register,
});
const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/about",
  component: About,
});
const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/contact",
  component: Contact,
});
const blogRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/blog",
  component: Blog,
});
const blogDetailRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/blog/$id",
  component: BlogDetail,
});
const privacyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/privacy",
  component: Privacy,
});
const termsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/terms",
  component: Terms,
});

// User Dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardLayout,
  beforeLoad: () => {
    const stored = localStorage.getItem("eventhub_user");
    if (!stored) throw redirect({ to: "/login" });
  },
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/",
  component: () => {
    throw redirect({ to: "/dashboard/profile" });
  },
});

const profileRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/profile",
  component: Profile,
});
const bookingsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/bookings",
  component: Bookings,
});
const reviewsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/reviews",
  component: Reviews,
});

// Admin
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/admin",
  component: AdminLayout,
  beforeLoad: () => {
    const stored = localStorage.getItem("eventhub_user");
    if (!stored) throw redirect({ to: "/login" });
    try {
      const user = JSON.parse(stored);
      if (user.role !== "admin") throw redirect({ to: "/dashboard/profile" });
    } catch (e) {
      if (e && typeof e === "object" && "to" in e) throw e;
      throw redirect({ to: "/login" });
    }
  },
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
  component: Overview,
});
const adminEventsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/events",
  component: ManageEvents,
});
const adminUsersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/users",
  component: ManageUsers,
});
const adminBookingsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/bookings",
  component: ManageBookings,
});
const adminAnalyticsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/analytics",
  component: Analytics,
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/settings",
  component: AdminSettings,
});

// Route tree
const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    indexRoute,
    exploreRoute,
    eventDetailRoute,
    loginRoute,
    registerRoute,
    aboutRoute,
    contactRoute,
    blogRoute,
    blogDetailRoute,
    privacyRoute,
    termsRoute,
  ]),
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    profileRoute,
    bookingsRoute,
    reviewsRoute,
  ]),
  adminRoute.addChildren([
    adminIndexRoute,
    adminEventsRoute,
    adminUsersRoute,
    adminBookingsRoute,
    adminAnalyticsRoute,
    adminSettingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}
