import { useState, useRef, useEffect } from 'react';
import {
  Play, Pause, Download, ArrowLeft, Clock, Eye,
  Sparkles, FileText, ChevronDown, ChevronUp,
  Volume2, VolumeX, BarChart3, Film, Zap, Globe,
  ExternalLink, CheckCircle2
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:3200';

interface ApiData {
  success: boolean;
  data: {
    videoId: string;
    sourceUrl: string;
    videoDetails: {
      id: string;
      title: string;
      description: string;
      channelTitle: string;
      publishedAt: string;
      thumbnail: string;
      duration: string;
    };
    videoUrl: string;
    clips: Array<{
      clip_path: string;
      clip_url: string;
      clip_filename: string;
      start: number;
      end: number;
      score: number;
      index: number;
    }>;
    transcript: string;
    segments: Array<{
      start: number;
      end: number;
      text: string;
    }>;
    language: string;
  };
}

interface StudioResultsProps {
  apiData: ApiData;
  onBack: () => void;
}

function formatSeconds(s: number): string {
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return iso;
  const h = match[1] ? `${match[1]}h ` : '';
  const m = match[2] ? `${match[2]}m ` : '';
  const sec = match[3] ? `${match[3]}s` : '';
  return `${h}${m}${sec}`.trim();
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#8BEAD8';
  if (score >= 60) return '#FBBF24';
  return '#F87171';
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Exceptional';
  if (score >= 80) return 'Very High';
  if (score >= 60) return 'Moderate';
  return 'Low';
}

// ─── Clip Card Component ───
function ClipCard({
  clip,
  isSelected,
  onClick,
}: {
  clip: ApiData['data']['clips'][0];
  isSelected: boolean;
  onClick: () => void;
}) {
  const color = getScoreColor(clip.score);
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group cursor-pointer ${
        isSelected
          ? 'bg-[#0D0D10] border-[#8BEAD8]/50 shadow-[0_0_25px_rgba(139,234,216,0.08)]'
          : 'bg-[#08080A] border-[#1A1A1E] hover:border-[#2A2A30] hover:bg-[#0A0A0D]'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black font-mono border ${
              isSelected
                ? 'bg-[#8BEAD8]/15 border-[#8BEAD8]/40 text-[#8BEAD8]'
                : 'bg-[#111114] border-[#222228] text-zinc-400'
            }`}
          >
            {clip.index}
          </div>
          <span className={`text-sm font-bold font-display ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
            Clip {clip.index}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }}
          />
          <span className="text-xs font-mono font-bold" style={{ color }}>
            {clip.score}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatSeconds(clip.start)} — {formatSeconds(clip.end)}
        </span>
        <span className="text-zinc-600">•</span>
        <span>{formatSeconds(clip.end - clip.start)} long</span>
      </div>
    </button>
  );
}

// ─── Video Player Component ───
function VideoPlayer({
  src,
  poster,
  autoPlay = false,
}: {
  src: string;
  poster?: string;
  autoPlay?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setCurrent(v.currentTime);
      setDuration(v.duration || 0);
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    };
    const onEnd = () => setPlaying(false);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnd);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnd);
    };
  }, [src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.load();
    setPlaying(false);
    setProgress(0);
    setCurrent(0);
  }, [src]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause();
    else v.play();
    setPlaying(!playing);
  };

  const seek = (e: React.MouseEvent) => {
    const bar = progressRef.current;
    const v = videoRef.current;
    if (!bar || !v) return;
    const rect = bar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        playsInline
        className="w-full aspect-video object-contain bg-black"
      />
      {/* Overlay controls */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
        <button
          onClick={toggle}
          className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-md border border-[#8BEAD8]/30 flex items-center justify-center text-[#8BEAD8] cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_rgba(139,234,216,0.15)]"
        >
          {playing ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
        </button>
      </div>
      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <div
          ref={progressRef}
          onClick={seek}
          className="w-full h-1.5 bg-zinc-800 rounded-full mb-2 cursor-pointer group/bar hover:h-2.5 transition-all"
        >
          <div
            className="h-full bg-[#8BEAD8] rounded-full relative transition-all"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="hover:text-white transition-colors cursor-pointer">
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => setMuted(!muted)} className="hover:text-white transition-colors cursor-pointer">
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <span>
              {formatSeconds(currentTime)} / {formatSeconds(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───
export const StudioResults = ({ apiData, onBack }: StudioResultsProps) => {
  const { data } = apiData;
  const [selectedClipIdx, setSelectedClipIdx] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showSourceVideo, setShowSourceVideo] = useState(false);
  const [downloadingIdx, setDownloadingIdx] = useState<number | null>(null);

  const selectedClip = data.clips[selectedClipIdx];
  const clipVideoUrl = selectedClip ? `${BACKEND_URL}${selectedClip.clip_url}` : '';
  const sourceVideoUrl = `${BACKEND_URL}${data.videoUrl}`;

  const handleDownload = async (clip: ApiData['data']['clips'][0], idx: number) => {
    setDownloadingIdx(idx);
    try {
      const url = `${BACKEND_URL}${clip.clip_url}`;
      const resp = await fetch(url);
      const blob = await resp.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = clip.clip_filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch (err) {
      console.error('Download failed:', err);
    }
    setTimeout(() => setDownloadingIdx(null), 1500);
  };

  const avgScore = data.clips.length
    ? Math.round(data.clips.reduce((a, c) => a + c.score, 0) / data.clips.length)
    : 0;

  return (
    <section className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto relative">
      {/* Background ambience */}
      <div className="fixed top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#8BEAD8]/[0.03] to-transparent pointer-events-none z-0" />

      {/* ─── Top Bar ─── */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          New Video
        </button>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0A0C] border border-[#1A1A1E] text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-bold">Pipeline Complete</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0A0C] border border-[#1A1A1E] text-xs font-mono text-zinc-400">
            <Globe className="w-3.5 h-3.5 text-[#8BEAD8]" />
            {data.language.toUpperCase()}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0A0C] border border-[#1A1A1E] text-xs font-mono text-zinc-400">
            <Film className="w-3.5 h-3.5 text-[#8BEAD8]" />
            {data.clips.length} Clips Generated
          </div>
        </div>
      </div>

      {/* ─── Source Video Info Banner ─── */}
      <div className="relative z-10 mb-8 p-5 sm:p-6 rounded-2xl bg-[#08080A] border border-[#1A1A1E] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8BEAD8]/[0.02] to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start gap-5 relative z-10">
          {/* Thumbnail */}
          <div
            className="shrink-0 w-full lg:w-52 aspect-video rounded-xl overflow-hidden bg-zinc-900 cursor-pointer relative group/thumb"
            onClick={() => setShowSourceVideo(!showSourceVideo)}
          >
            <img
              src={data.videoDetails.thumbnail}
              alt={data.videoDetails.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold font-display text-white mb-2 leading-tight line-clamp-2">
              {data.videoDetails.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-zinc-500 mb-3">
              <span className="text-zinc-300 font-semibold">{data.videoDetails.channelTitle}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {parseDuration(data.videoDetails.duration)}
              </span>
              <a
                href={data.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#8BEAD8] hover:underline"
              >
                <ExternalLink className="w-3 h-3" /> YouTube
              </a>
            </div>
            {/* Score Summary */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111114] border border-[#222228] text-xs">
                <BarChart3 className="w-3.5 h-3.5 text-[#8BEAD8]" />
                <span className="text-zinc-400">Avg Score:</span>
                <span className="font-bold text-white">{avgScore}/100</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111114] border border-[#222228] text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-zinc-400">Best:</span>
                <span className="font-bold text-white">
                  {data.clips.length ? Math.max(...data.clips.map((c) => c.score)) : 0}/100
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Source Video Player (expandable) */}
        {showSourceVideo && (
          <div className="mt-5 relative z-10">
            <VideoPlayer src={sourceVideoUrl} poster={data.videoDetails.thumbnail} />
          </div>
        )}
      </div>

      {/* ─── Main Content Grid ─── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Clip List */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#8BEAD8]" />
                AI Clips
              </h3>
              <span className="text-[11px] font-mono text-zinc-500 bg-[#111114] px-2.5 py-1 rounded-lg border border-[#1A1A1E]">
                {data.clips.length} total
              </span>
            </div>
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1 scrollbar-thin">
              {data.clips.map((clip, idx) => (
                <ClipCard
                  key={clip.index}
                  clip={clip}
                  isSelected={idx === selectedClipIdx}
                  onClick={() => setSelectedClipIdx(idx)}
                />
              ))}
              {data.clips.length === 0 && (
                <div className="text-center py-12 text-zinc-500 text-sm">
                  No clips were generated. The AI could not find strong viral moments.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Player + Details */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {selectedClip ? (
            <>
              {/* Clip Player */}
              <div className="rounded-2xl bg-[#08080A] border border-[#1A1A1E] p-3 sm:p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8BEAD8]/10 border border-[#8BEAD8]/30 flex items-center justify-center text-[#8BEAD8] text-xs font-black font-mono">
                      {selectedClip.index}
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display text-white">
                        Clip {selectedClip.index}
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-500">
                        {formatSeconds(selectedClip.start)} → {formatSeconds(selectedClip.end)} •{' '}
                        {formatSeconds(selectedClip.end - selectedClip.start)} duration
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Score Badge */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold"
                      style={{
                        borderColor: `${getScoreColor(selectedClip.score)}40`,
                        backgroundColor: `${getScoreColor(selectedClip.score)}10`,
                        color: getScoreColor(selectedClip.score),
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {selectedClip.score}/100 • {getScoreLabel(selectedClip.score)}
                    </div>
                  </div>
                </div>
                <VideoPlayer src={clipVideoUrl} />
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => handleDownload(selectedClip, selectedClipIdx)}
                  disabled={downloadingIdx === selectedClipIdx}
                  className={`flex-1 py-3.5 px-6 rounded-2xl text-sm font-bold font-display uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer transition-all ${
                    downloadingIdx === selectedClipIdx
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white text-black hover:bg-[#8BEAD8] shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(139,234,216,0.3)]'
                  }`}
                >
                  {downloadingIdx === selectedClipIdx ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" /> Downloaded!
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" /> Download Clip {selectedClip.index}
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    // Download all clips sequentially
                    data.clips.forEach((c, i) => setTimeout(() => handleDownload(c, i), i * 500));
                  }}
                  className="py-3.5 px-6 rounded-2xl bg-[#0D0D10] border border-[#1A1A1E] hover:border-[#2A2A30] text-white text-sm font-bold font-display flex items-center justify-center gap-3 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-[#8BEAD8]" />
                  Download All ({data.clips.length})
                </button>
              </div>

              {/* All Clips Quick Preview Grid */}
              {data.clips.length > 1 && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-[#8BEAD8]" />
                    All Generated Clips
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
                    {data.clips.map((clip, idx) => (
                      <button
                        key={clip.index}
                        onClick={() => setSelectedClipIdx(idx)}
                        className={`relative rounded-xl overflow-hidden border transition-all cursor-pointer group/mini aspect-video ${
                          idx === selectedClipIdx
                            ? 'border-[#8BEAD8]/50 shadow-[0_0_15px_rgba(139,234,216,0.1)]'
                            : 'border-[#1A1A1E] hover:border-[#2A2A30]'
                        }`}
                      >
                        <video
                          src={`${BACKEND_URL}${clip.clip_url}`}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/mini:opacity-100 transition-opacity">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between text-[9px] font-mono">
                          <span className="bg-black/70 text-zinc-300 px-1.5 py-0.5 rounded">
                            #{clip.index}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded font-bold"
                            style={{
                              backgroundColor: `${getScoreColor(clip.score)}20`,
                              color: getScoreColor(clip.score),
                            }}
                          >
                            {clip.score}
                          </span>
                        </div>
                        {idx === selectedClipIdx && (
                          <div className="absolute top-1 right-1">
                            <div className="w-2 h-2 rounded-full bg-[#8BEAD8] shadow-[0_0_6px_#8BEAD8]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-64 rounded-2xl bg-[#08080A] border border-[#1A1A1E] text-zinc-500 text-sm font-mono">
              No clips to display
            </div>
          )}

          {/* ─── Transcript Section ─── */}
          {data.transcript && (
            <div className="rounded-2xl bg-[#08080A] border border-[#1A1A1E] overflow-hidden">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-[#0A0A0D] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111114] border border-[#222228] flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#8BEAD8]" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold font-display text-white">Full Transcript</h4>
                    <p className="text-[11px] font-mono text-zinc-500">
                      {data.segments.length} segments • {data.language}
                    </p>
                  </div>
                </div>
                {showTranscript ? (
                  <ChevronUp className="w-4 h-4 text-zinc-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                )}
              </button>
              {showTranscript && (
                <div className="px-5 pb-5 max-h-96 overflow-y-auto">
                  <div className="space-y-1.5">
                    {data.segments.map((seg, i) => {
                      // Highlight segments that fall within any clip
                      const inClip = data.clips.some(
                        (c) => seg.start >= c.start && seg.end <= c.end
                      );
                      return (
                        <div
                          key={i}
                          className={`flex gap-3 py-2 px-3 rounded-xl text-sm transition-colors ${
                            inClip
                              ? 'bg-[#8BEAD8]/[0.05] border border-[#8BEAD8]/10'
                              : 'hover:bg-[#0D0D10]'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-zinc-600 shrink-0 pt-1 w-16 text-right">
                            {formatSeconds(seg.start)}
                          </span>
                          <span className={`${inClip ? 'text-[#8BEAD8]' : 'text-zinc-400'}`}>
                            {seg.text}
                          </span>
                          {inClip && (
                            <Sparkles className="w-3 h-3 text-[#8BEAD8] shrink-0 mt-1" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
