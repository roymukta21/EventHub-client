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
import { events } from "../../../data/events";

const TOP_EVENTS = events
  .sort((a, b) => b.totalBookings - a.totalBookings)
  .slice(0, 5)
  .map((e) => ({
    name: e.title.slice(0, 20) + (e.title.length > 20 ? "..." : ""),
    bookings: e.totalBookings,
  }));

const REVENUE_TREND = [
  { month: "Aug", revenue: 4200 },
  { month: "Sep", revenue: 5800 },
  { month: "Oct", revenue: 3840 },
  { month: "Nov", revenue: 6210 },
  { month: "Dec", revenue: 8920 },
  { month: "Jan", revenue: 6340 },
  { month: "Feb", revenue: 9540 },
  { month: "Mar", revenue: 11200 },
];

const CAT_DATA = [
  { name: "Music", value: 32, color: "#ec4899" },
  { name: "Technology", value: 25, color: "#3b82f6" },
  { name: "Sports", value: 18, color: "#22c55e" },
  { name: "Arts", value: 10, color: "#8b5cf6" },
  { name: "Food", value: 9, color: "#f97316" },
  { name: "Other", value: 6, color: "#6b7280" },
];

const STAT_CARDS = [
  { label: "Avg Booking Value", val: "$122" },
  { label: "Top Category", val: "Music" },
  { label: "Conversion Rate", val: "12.4%" },
  { label: "Return Visitors", val: "68%" },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-display font-bold">Analytics</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((s) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="text-2xl font-display font-bold text-primary">
              {s.val}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold mb-4">
            Top 5 Events by Bookings
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={TOP_EVENTS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" fontSize={11} />
              <YAxis type="category" dataKey="name" width={100} fontSize={10} />
              <Tooltip />
              <Bar
                dataKey="bookings"
                fill="oklch(0.55 0.22 302)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold mb-4">
            Revenue Trend (8 months)
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={REVENUE_TREND}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip formatter={(v: any) => [`$${v}`, "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.75 0.17 68)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-display font-semibold mb-4">
          Category Distribution
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                data={CAT_DATA}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
              >
                {CAT_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v}%`, "Share"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3">
            {CAT_DATA.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: d.color }}
                />
                <span>
                  {d.name}: {d.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
