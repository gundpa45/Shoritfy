import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Video, Scissors, Clock, CreditCard, Upload,
  ArrowRight, TrendingUp, Plus, Film
} from "lucide-react";
import { StatCard } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { SkeletonCard, SkeletonTable } from "../../components/ui/Skeleton";
import { EmptyState } from "../../components/ui/States";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const usageData = [
  { day: "Mon", clips: 4, videos: 1 },
  { day: "Tue", clips: 8, videos: 2 },
  { day: "Wed", clips: 6, videos: 1 },
  { day: "Thu", clips: 14, videos: 3 },
  { day: "Fri", clips: 10, videos: 2 },
  { day: "Sat", clips: 18, videos: 4 },
  { day: "Sun", clips: 12, videos: 3 },
];

const recentProjects = [
  { id: 1, name: "Tech Talk Episode 42", duration: "1:24:33", clips: 6, status: "done", date: "2h ago", score: 87 },
  { id: 2, name: "Product Demo Walkthrough", duration: "0:45:12", clips: 4, status: "done", date: "1d ago", score: 72 },
  { id: 3, name: "Weekly Podcast #18", duration: "2:01:44", clips: 9, status: "processing", date: "Just now", score: null },
  { id: 4, name: "Marketing Webinar Q4", duration: "1:15:00", clips: 5, status: "done", date: "3d ago", score: 91 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="saas-card p-3 text-xs border border-[#E5E5E3] bg-[#FFFFFF]">
        <p className="text-[#6B6B6B] mb-1 font-semibold">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="font-bold">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [loading] = useState(false);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8 max-w-[1280px] mx-auto pb-16">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#111111]">{greeting}, Alex 👋</h1>
          <p className="text-[#6B6B6B] mt-1 text-sm">Here's what's happening with your content today.</p>
        </div>
        <Link to="/upload">
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold" icon={<Plus size={16} />}>
            New Upload
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard
              icon={<Video size={18} />}
              label="Videos Processed"
              value="42"
              change={12}
              color="purple"
            />
            <StatCard
              icon={<Scissors size={18} />}
              label="AI Clips Generated"
              value="267"
              change={28}
              color="cyan"
            />
            <StatCard
              icon={<Clock size={18} />}
              label="Hours Saved"
              value="84h"
              change={18}
              color="green"
            />
            <StatCard
              icon={<CreditCard size={18} />}
              label="Credits Remaining"
              value="847"
              color="amber"
            />
          </>
        )}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage chart */}
        <div className="lg:col-span-2 saas-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-[#111111]">Processing Activity</h2>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Last 7 days</p>
            </div>
            <Badge variant="purple">
              <TrendingUp size={12} className="mr-1" />
              +28% this week
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={usageData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="clipsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="videosGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111111" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#111111" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" />
              <XAxis dataKey="day" tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="clips" name="Clips" stroke="#7C3AED" strokeWidth={2} fill="url(#clipsGrad)" />
              <Area type="monotone" dataKey="videos" name="Videos" stroke="#111111" strokeWidth={2} fill="url(#videosGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick actions */}
        <div className="saas-card p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#111111] mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/upload" className="block">
                <div className="p-4 rounded-xl bg-[#F5F5F4] border border-[#E5E5E3] cursor-pointer hover:border-[#D4D4D4] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFFFFF] border border-[#E5E5E3] flex items-center justify-center">
                      <Upload size={16} className="text-[#111111]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#111111]">Upload Video</p>
                      <p className="text-xs text-[#6B6B6B]">MP4, MOV, or YouTube URL</p>
                    </div>
                    <ArrowRight size={14} className="text-[#6B6B6B]" />
                  </div>
                </div>
              </Link>

              <Link to="/projects" className="block">
                <div className="p-4 rounded-xl bg-[#F5F5F4] border border-[#E5E5E3] cursor-pointer hover:border-[#D4D4D4] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFFFFF] border border-[#E5E5E3] flex items-center justify-center">
                      <Film size={16} className="text-[#111111]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#111111]">View Projects</p>
                      <p className="text-xs text-[#6B6B6B]">42 projects total</p>
                    </div>
                    <ArrowRight size={14} className="text-[#6B6B6B]" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F5F4] border border-[#E5E5E3] mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-[#111111]">Monthly AI Credit Usage</p>
              <span className="text-xs font-bold text-[#7C3AED]">847 / 1000</span>
            </div>
            <div className="h-2 w-full bg-[#E5E5E3] rounded-full overflow-hidden">
              <div className="h-full w-[84.7%] bg-[#7C3AED] rounded-full" />
            </div>
            <Link to="/billing">
              <Button size="sm" className="w-full mt-3 text-xs bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold">Upgrade Plan</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="saas-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-[#111111]">Recent Projects</h2>
          <Link to="/projects">
            <Button variant="secondary" size="sm" className="border-[#E5E5E3]" iconRight={<ArrowRight size={14} />}>
              View all
            </Button>
          </Link>
        </div>

        {loading ? (
          <SkeletonTable rows={4} />
        ) : recentProjects.length === 0 ? (
          <EmptyState
            icon={<Video size={24} />}
            title="No projects yet"
            description="Upload your first video to get started with AI clip generation"
            action={() => {}}
            actionLabel="Upload Video"
          />
        ) : (
          <div className="space-y-2">
            {recentProjects.map((project, i) => (
              <div
                key={project.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#F5F5F4] border border-[#E5E5E3] hover:border-[#D4D4D4] transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E5E5E3] flex items-center justify-center text-[#111111] flex-shrink-0">
                  <Film size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#111111] truncate">{project.name}</p>
                  <p className="text-xs text-[#6B6B6B]">{project.duration} · {project.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  {project.status === "processing" ? (
                    <Badge variant="amber">Processing</Badge>
                  ) : (
                    <Badge variant="green">{project.clips} clips</Badge>
                  )}
                  {project.score && (
                    <Badge variant="purple">Score: {project.score}/100</Badge>
                  )}
                  <Link to={`/results/${project.id}`}>
                    <Button variant="secondary" size="sm" className="border-[#E5E5E3]">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
