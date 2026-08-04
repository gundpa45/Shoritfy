import { motion } from "framer-motion";
import { TrendingUp, Eye, Clock, Users } from "lucide-react";
import { StatCard } from "../../components/ui/Card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from "recharts";

const weeklyData = [
  { day: "Mon", views: 1200, clips: 4 },
  { day: "Tue", views: 2400, clips: 8 },
  { day: "Wed", views: 1800, clips: 6 },
  { day: "Thu", views: 3600, clips: 12 },
  { day: "Fri", views: 2800, clips: 10 },
  { day: "Sat", views: 4200, clips: 15 },
  { day: "Sun", views: 3100, clips: 11 },
];

const platformData = [
  { name: "TikTok", value: 42, color: "#7C3AED" },
  { name: "Instagram", value: 31, color: "#06B6D4" },
  { name: "YT Shorts", value: 18, color: "#22C55E" },
  { name: "Twitter/X", value: 9, color: "#EAB308" },
];

const engagementData = [
  { month: "Mar", rate: 4.2 },
  { month: "Apr", rate: 5.1 },
  { month: "May", rate: 4.8 },
  { month: "Jun", rate: 6.2 },
  { month: "Jul", rate: 7.4 },
  { month: "Aug", rate: 8.1 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="saas-card p-3 text-xs border border-[#E5E5E3] bg-[#FFFFFF]">
        <p className="text-[#6B6B6B] mb-1 font-semibold">{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }} className="font-bold">
            {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-[1280px] mx-auto pb-16">
      {/* Editorial Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#111111]">Analytics</h1>
        <p className="text-[#6B6B6B] mt-1 text-sm">Track your content performance across all platforms</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Eye size={18} />} label="Total Views" value="19.4K" change={34} color="purple" />
        <StatCard icon={<TrendingUp size={18} />} label="Avg. Engagement" value="8.1%" change={22} color="cyan" />
        <StatCard icon={<Clock size={18} />} label="Watch Time" value="142h" change={15} color="green" />
        <StatCard icon={<Users size={18} />} label="Followers Gained" value="+847" change={41} color="amber" />
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly views bar chart */}
        <div className="lg:col-span-2 saas-card p-6">
          <h2 className="text-base font-bold text-[#111111] mb-5">Weekly Views & Clips</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" />
              <XAxis dataKey="day" tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="views" name="Views" fill="#7C3AED" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="clips" name="Clips" fill="#111111" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform distribution pie */}
        <div className="saas-card p-6">
          <h2 className="text-base font-bold text-[#111111] mb-5">Platform Distribution</h2>
          <div className="flex flex-col items-center">
            <PieChart width={160} height={160}>
              <Pie
                data={platformData}
                cx={75}
                cy={75}
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {platformData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="space-y-2.5 w-full mt-4">
              {platformData.map(p => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span className="text-[#6B6B6B] font-medium">{p.name}</span>
                  </div>
                  <span className="text-[#111111] font-bold">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Engagement line chart */}
      <div className="saas-card p-6">
        <h2 className="text-base font-bold text-[#111111] mb-5">Engagement Rate Over Time</h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={engagementData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" />
            <XAxis dataKey="month" tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="rate"
              name="Engagement"
              stroke="#7C3AED"
              strokeWidth={2.5}
              dot={{ fill: "#7C3AED", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top clips */}
      <div className="saas-card p-6">
        <h2 className="text-base font-bold text-[#111111] mb-4">Top Performing Clips</h2>
        <div className="divide-y divide-[#E5E5E3]">
          {[
            { title: "The moment that changed everything", platform: "TikTok", views: "4.2K", engagement: "12.4%" },
            { title: "Why everyone got this wrong", platform: "Instagram", views: "3.8K", engagement: "9.1%" },
            { title: "Controversial take on AI safety", platform: "YT Shorts", views: "2.9K", engagement: "8.7%" },
            { title: "Breaking news in the industry", platform: "Twitter/X", views: "2.1K", engagement: "7.3%" },
          ].map((clip, i) => (
            <div key={i} className="flex items-center gap-4 py-3.5">
              <span className="text-xs font-bold text-[#6B6B6B] w-4">#{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#111111] truncate">{clip.title}</p>
                <p className="text-xs text-[#6B6B6B]">{clip.platform}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#111111]">{clip.views} views</p>
                <p className="text-xs font-semibold text-green-600">{clip.engagement} eng.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
