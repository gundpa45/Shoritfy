import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Film, Search, Filter, Plus, Clock, Scissors,
  MoreHorizontal, Trash2, Eye, Download
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/States";
import { SkeletonTable } from "../../components/ui/Skeleton";
import { cn } from "../../lib/utils";

const MOCK_PROJECTS = [
  { id: 1, name: "Tech Talk Episode 42", duration: "1:24:33", clips: 6, status: "done", date: "2h ago", score: 87, size: "2.4 GB" },
  { id: 2, name: "Product Demo Walkthrough", duration: "0:45:12", clips: 4, status: "done", date: "1d ago", score: 72, size: "856 MB" },
  { id: 3, name: "Weekly Podcast #18", duration: "2:01:44", clips: 9, status: "processing", date: "Just now", score: null, size: "1.1 GB" },
  { id: 4, name: "Marketing Webinar Q4", duration: "1:15:00", clips: 5, status: "done", date: "3d ago", score: 91, size: "780 MB" },
  { id: 5, name: "Team Meeting Highlights", duration: "0:52:18", clips: 3, status: "done", date: "5d ago", score: 65, size: "620 MB" },
  { id: 6, name: "Conference Keynote 2025", duration: "3:12:44", clips: 14, status: "done", date: "1w ago", score: 89, size: "4.2 GB" },
];

const statusConfig = {
  done: { label: "Done", variant: "green" },
  processing: { label: "Processing", variant: "amber" },
  failed: { label: "Failed", variant: "red" },
};

export default function ProjectsPage() {
  const [projects] = useState(MOCK_PROJECTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading] = useState(false);

  const filtered = projects.filter(p => {
    const matchSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-[1280px] mx-auto pb-16">
      {/* Editorial Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#111111]">Projects</h1>
          <p className="text-[#6B6B6B] mt-1 text-sm">{filtered.length} projects total</p>
        </div>
        <Link to="/upload">
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold" icon={<Plus size={16} />}>
            New Project
          </Button>
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-[#FFFFFF] border border-[#E5E5E3] text-[#111111] text-sm placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#7C3AED]"
            aria-label="Search projects"
          />
        </div>
        <div className="flex gap-1">
          {[
            { label: "All", value: "all" },
            { label: "Done", value: "done" },
            { label: "Processing", value: "processing" },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={cn(
                "px-3 h-10 rounded-xl text-xs font-bold transition-all border",
                statusFilter === f.value
                  ? "bg-[#7C3AED] border-[#7C3AED] text-white"
                  : "bg-[#FFFFFF] border-[#E5E5E3] text-[#6B6B6B] hover:text-[#111111]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects list */}
      {loading ? (
        <SkeletonTable rows={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Film size={24} />}
          title="No projects found"
          description="Upload a video to create your first project with AI-generated clips"
          action={() => {}}
          actionLabel="Upload Video"
        />
      ) : (
        <div className="saas-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-[#E5E5E3] bg-[#F5F5F4] text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
            <span>Project</span>
            <span>Duration</span>
            <span>Clips</span>
            <span>AI Score</span>
            <span>Status</span>
            <span />
          </div>

          <div className="divide-y divide-[#E5E5E3]">
            {filtered.map((project, i) => {
              const status = statusConfig[project.status];
              return (
                <div
                  key={project.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-[#F5F5F4] transition-all group"
                >
                  {/* Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E5E5E3] flex items-center justify-center text-[#111111] flex-shrink-0">
                      <Film size={16} />
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`/results/${project.id}`}
                        className="text-sm font-bold text-[#111111] hover:text-[#7C3AED] transition-colors truncate block"
                      >
                        {project.name}
                      </Link>
                      <p className="text-xs text-[#6B6B6B]">{project.size} · {project.date}</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#6B6B6B]">
                    <Clock size={13} />
                    {project.duration}
                  </div>

                  {/* Clips */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#6B6B6B]">
                    <Scissors size={13} />
                    {project.clips}
                  </div>

                  {/* Score */}
                  <div>
                    {project.score ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#E5E5E3] rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              project.score >= 80 ? "bg-[#7C3AED]" : "bg-[#111111]"
                            )}
                            style={{ width: `${project.score}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-[#111111]">{project.score}/100</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#6B6B6B]">—</span>
                    )}
                  </div>

                  {/* Status */}
                  <Badge variant={status.variant}>{status.label}</Badge>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/results/${project.id}`}>
                      <Button variant="secondary" size="icon" className="border-[#E5E5E3]" aria-label="View clips">
                        <Eye size={14} className="text-[#6B6B6B]" />
                      </Button>
                    </Link>
                    <Button variant="secondary" size="icon" className="border-[#E5E5E3]" aria-label="Download clips">
                      <Download size={14} className="text-[#6B6B6B]" />
                    </Button>
                    <Button variant="secondary" size="icon" className="border-[#E5E5E3] hover:text-red-600" aria-label="Delete project">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
