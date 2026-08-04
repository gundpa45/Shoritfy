import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Download, Share2, Trash2, Pencil,
  Clock, BarChart2, Filter, Search, Grid, List, Award, Sparkles, ArrowLeft
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { ScoreBadge } from "../../components/ui/Badge";
import { Modal, ConfirmDialog } from "../../components/ui/Modal";
import { SkeletonClipCard } from "../../components/ui/Skeleton";
import { formatDuration, cn } from "../../lib/utils";
import { aiService } from "../../services/ai.service";

function ThumbnailPlaceholder({ index }) {
  const bgStyles = [
    "bg-[#18181C]",
    "bg-[#1A1620]",
    "bg-[#141A1C]",
    "bg-[#181C16]",
    "bg-[#1E1C1A]",
    "bg-[#1C1822]",
  ];
  return (
    <div className={`w-full h-full ${bgStyles[index % bgStyles.length]} flex items-center justify-center relative`}>
      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
        <Play size={22} className="text-[#D4FF3F] fill-[#D4FF3F] ml-0.5" />
      </div>
    </div>
  );
}

function ClipCard({ clip, index, onPlay, onDelete, onRename }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      className="rounded-2xl border border-white/10 bg-[#121214] overflow-hidden group flex flex-col justify-between shadow-lg hover:border-white/20 transition-all"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#0A0A0B]">
        <ThumbnailPlaceholder index={index} />

        {/* Hover overlay */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center gap-3"
            >
              <button
                onClick={() => onPlay(clip)}
                className="w-14 h-14 rounded-full bg-[#D4FF3F] text-[#0A0A0B] flex items-center justify-center shadow-[0_0_24px_rgba(212,255,63,0.4)] hover:scale-105 transition-all"
                aria-label="Play clip"
              >
                <Play size={24} className="fill-[#0A0A0B] ml-0.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score badge */}
        <div className="absolute top-3 right-3">
          <ScoreBadge score={clip.score} />
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white px-2 py-0.5 rounded bg-black/80 border border-white/10 font-mono">
            <Clock size={10} className="text-[#D4FF3F]" />
            {formatDuration(clip.duration || 45)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <p className="text-sm font-bold text-[#F5F5F5] leading-snug line-clamp-2">
          {clip.title}
        </p>

        {/* Score indicator */}
        <div className="flex items-center gap-2">
          <BarChart2 size={13} className="text-[#A1A1A6]" />
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                clip.score >= 90 ? "bg-[#D4FF3F]" : clip.score >= 80 ? "bg-[#D4FF3F]/80" : "bg-white/40"
              )}
              style={{ width: `${clip.score}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#D4FF3F] font-mono">{clip.score}/100</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            className="btn-accent flex-1 text-xs font-bold h-9"
            icon={<Download size={12} />}
          >
            Download
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onRename(clip)}
            className="h-9 w-9 border-white/10 text-[#A1A1A6] hover:text-white hover:bg-white/10"
            aria-label="Rename clip"
          >
            <Pencil size={13} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 border-white/10 text-[#A1A1A6] hover:text-white hover:bg-white/10"
            aria-label="Share clip"
          >
            <Share2 size={13} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onDelete(clip)}
            className="h-9 w-9 border-white/10 text-[#A1A1A6] hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20"
            aria-label="Delete clip"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function VideoPreviewModal({ clip, onClose }) {
  return (
    <Modal isOpen={!!clip} onClose={onClose} title={clip?.title} size="lg">
      {clip && (
        <div className="space-y-6 text-[#F5F5F5]">
          <div className="aspect-[9/16] w-52 mx-auto bg-[#0A0A0B] rounded-2xl overflow-hidden border border-white/10 relative shadow-xl">
            <ThumbnailPlaceholder index={0} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#D4FF3F] text-[#0A0A0B] flex items-center justify-center cursor-pointer shadow-[0_0_24px_rgba(212,255,63,0.4)]">
                <Play size={22} className="fill-[#0A0A0B] ml-0.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-xs text-[#A1A1A6] font-mono">Duration</p>
              <p className="text-sm font-bold text-[#F5F5F5] mt-0.5">{formatDuration(clip.duration || 45)}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-xs text-[#A1A1A6] font-mono">AI Virality Score</p>
              <p className="text-sm font-bold text-[#D4FF3F] mt-0.5 font-mono">{clip.score}/100</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-xs text-[#A1A1A6] font-mono">Format</p>
              <p className="text-sm font-bold text-[#F5F5F5] mt-0.5">9:16 Vertical</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#A1A1A6] mb-2 uppercase tracking-wider font-mono">
              AI Generated Hook Transcript
            </p>
            <p className="text-sm text-[#F5F5F5] leading-relaxed bg-[#121214] rounded-xl p-4 border border-white/10 font-mono">
              "{clip.hookTranscript || 'We sculpt sunlight through deep eaves, creating an unforgettable visual hook that retains 95% of viewers across short-form platforms...'}"
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              className="btn-accent flex-1 font-bold h-11"
              icon={<Download size={15} />}
            >
              Download 1080p Short
            </Button>
            <Button variant="secondary" className="border-white/10 text-white hover:bg-white/10" icon={<Share2 size={15} />}>
              Share
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default function ResultsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [clips, setClips] = useState([]);
  const [previewClip, setPreviewClip] = useState(null);
  const [deleteClip, setDeleteClip] = useState(null);
  const [renameClip, setRenameClip] = useState(null);
  const [newName, setNewName] = useState("");
  const [filterScore, setFilterScore] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid");

  useEffect(() => {
    const job = aiService.getJob(jobId);
    setJobData(job);
    setClips(job?.clips || []);
  }, [jobId]);

  const videoTitle =
    jobData?.videoDetails?.title || "Alex Hormozi — How to Build a $100M Business in 2026";

  const filteredClips = clips.filter(c =>
    c.score >= filterScore &&
    (searchQuery === "" || c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (clip) => {
    setClips(prev => prev.filter(c => c.id !== clip.id));
    setDeleteClip(null);
  };

  const handleRename = () => {
    if (!newName.trim()) return;
    setClips(prev => prev.map(c => c.id === renameClip.id ? { ...c, title: newName } : c));
    setRenameClip(null);
    setNewName("");
  };

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 pb-16 pt-6 px-4 text-[#F5F5F5]">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-xs text-[#A1A1A6] hover:text-white mb-3 transition-colors font-mono"
          >
            <ArrowLeft size={13} /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-[#1A1E18] border border-[#D4FF3F]/30 text-[#D4FF3F] text-xs font-semibold font-mono flex items-center gap-1.5">
              <Sparkles size={13} /> AI Extraction Complete
            </span>
            {jobData?.isOfflineFallback && (
              <span className="px-2 py-0.5 rounded bg-white/10 text-[#A1A1A6] text-[11px] font-mono">
                Resilient Mode
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">Viral Shorts Ready</h1>
          <p className="text-[#A1A1A6] mt-1 text-sm font-mono">
            {filteredClips.length} of {clips.length} clips · {videoTitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="border-white/10 text-white hover:bg-white/10" icon={<Download size={15} />}>
            Download All (.zip)
          </Button>
          <Button className="btn-accent font-bold" icon={<Share2 size={15} />}>
            Share Results
          </Button>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1A6]" />
          <input
            placeholder="Search clips by headline..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#121214] border border-white/10 text-[#F5F5F5] text-sm placeholder:text-[#A1A1A6] focus:outline-none focus:border-[#D4FF3F]"
            aria-label="Search clips"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#A1A1A6]" />
          {[0, 80, 90].map(score => (
            <button
              key={score}
              onClick={() => setFilterScore(score)}
              className={cn(
                "px-3.5 h-11 rounded-xl text-xs font-bold transition-all border font-mono",
                filterScore === score
                  ? "bg-[#D4FF3F] border-[#D4FF3F] text-[#0A0A0B]"
                  : "bg-[#121214] border-white/10 text-[#A1A1A6] hover:text-[#F5F5F5]"
              )}
            >
              {score === 0 ? "All Scores" : score === 80 ? "Good (80+)" : "Viral Hooks (90+)"}
            </button>
          ))}
        </div>

        <div className="flex rounded-xl border border-white/10 overflow-hidden bg-[#121214]">
          <button
            className={cn("p-3 transition-colors", view === "grid" ? "bg-white/20 text-white" : "text-[#A1A1A6] hover:text-white")}
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <Grid size={15} />
          </button>
          <button
            className={cn("p-3 transition-colors", view === "list" ? "bg-white/20 text-white" : "text-[#A1A1A6] hover:text-white")}
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Stats KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Shorts Generated", value: clips.length, note: "Ready to export" },
          { label: "Average Viral Score", value: `${Math.round(clips.reduce((a, c) => a + (c.score || 90), 0) / (clips.length || 1))}/100`, note: "High audience retention" },
          { label: "Top Hook Score", value: "98/100", note: "Strong opening hook" },
          { label: "Format", value: "9:16 1080p", note: "Optimized for Shorts/Reels" },
        ].map(s => (
          <div key={s.label} className="p-5 rounded-2xl bg-[#121214] border border-white/10 shadow-md">
            <p className="text-xs font-semibold text-[#A1A1A6] uppercase tracking-wider font-mono">{s.label}</p>
            <p className="text-2xl font-bold text-[#F5F5F5] mt-1">{s.value}</p>
            <p className="text-xs text-[#A1A1A6] mt-1">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Clips grid */}
      {filteredClips.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#121214] border border-white/10 text-center space-y-3">
          <p className="text-[#A1A1A6] font-medium">No clips match your current filters</p>
          <Button variant="secondary" className="border-white/10 text-white" onClick={() => { setFilterScore(0); setSearchQuery(""); }}>
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredClips.map((clip, i) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              index={i}
              onPlay={setPreviewClip}
              onDelete={setDeleteClip}
              onRename={(c) => { setRenameClip(c); setNewName(c.title); }}
            />
          ))}
        </div>
      )}

      {/* Video preview modal */}
      <VideoPreviewModal clip={previewClip} onClose={() => setPreviewClip(null)} />

      {/* Delete confirm modal */}
      <ConfirmDialog
        isOpen={!!deleteClip}
        onClose={() => setDeleteClip(null)}
        onConfirm={() => handleDelete(deleteClip)}
        title="Delete Clip"
        description={`Are you sure you want to delete "${deleteClip?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />

      {/* Rename modal */}
      <Modal
        isOpen={!!renameClip}
        onClose={() => { setRenameClip(null); setNewName(""); }}
        title="Rename Clip"
        size="sm"
      >
        <div className="space-y-4 text-[#F5F5F5]">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full h-11 rounded-lg bg-[#0A0A0B] border border-white/10 text-white text-sm px-4 focus:outline-none focus:border-[#D4FF3F]"
            placeholder="Enter clip name..."
            aria-label="Clip name"
            onKeyDown={e => e.key === "Enter" && handleRename()}
          />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1 border-white/10 text-white" onClick={() => { setRenameClip(null); setNewName(""); }}>
              Cancel
            </Button>
            <Button className="btn-accent flex-1 font-bold" onClick={handleRename}>
              Rename
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
