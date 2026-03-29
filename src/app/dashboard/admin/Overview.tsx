import { BookOpen, Calendar, DollarSign, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { bookings } from "../../../data/bookings";
import { events } from "../../../data/events";
import { mockUsers } from "../../../data/users";

const MONTHLY_DATA = [
  { month: "Oct", bookings: 42, revenue: 3840 },
  { month: "Nov", bookings: 58, revenue: 5210 },
  { month: "Dec", bookings: 89, revenue: 8920 },
  { month: "Jan", bookings: 71, revenue: 6340 },
  { month: "Feb", bookings: 95, revenue: 9540 },
  { month: "Mar", bookings: 112, revenue: 11200 },
];

const CATEGORY_DATA = [
  { name: "Music", value: 28, color: "#ec4899" },
  { name: "Technology", value: 22, color: "#3b82f6" },
  { name: "Sports", value: 18, color: "#22c55e" },
  { name: "Food", value: 15, color: "#f97316" },
  { name: "Other", value: 17, color: "#8b5cf6" },
];

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

export default function Overview() {
  const totalRevenue = bookings.reduce((s, b) => s + b.totalPrice, 0);

  const stats: StatCard[] = [
    {
      label: "Total Users",
      value: mockUsers.length,
      icon: Users,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Total Events",
      value: events.length,
      icon: Calendar,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: BookOpen,
      color: "text-green-600 bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-display font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}
            >
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-display font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold mb-4">Monthly Bookings</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar
                dataKey="bookings"
                fill="oklch(0.55 0.22 302)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v: any) => [`$${v}`, "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.75 0.17 68)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold mb-4">
            Bookings by Category
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={CATEGORY_DATA}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {CATEGORY_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {recentBookings.map((b, i) => (
              <div
                key={b.id}
                className="flex items-center gap-3 text-sm"
                data-ocid={`admin_overview.booking.item.${i + 1}`}
              >
                <img
                  src={b.eventImage}
                  alt={b.eventTitle}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{b.eventTitle}</p>
                  <p className="text-xs text-muted-foreground">{b.bookedAt}</p>
                </div>
                <span className="font-semibold text-primary">
                  ${b.totalPrice}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
