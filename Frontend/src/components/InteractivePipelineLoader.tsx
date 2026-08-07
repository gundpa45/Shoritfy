import { useEffect, useState } from 'react';
import { Terminal, Cpu, Sparkles, CheckCircle2, Video, Zap, Activity, Eye, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PipelineLoaderProps {
  url: string;
  onComplete: () => void;
}

const STAGES = [
  {
    title: 'Extracting High-Quality Audio Track',
    sub: 'FFmpeg demuxing @ 320kbps WAV output...',
    icon: Volume2,
  },
  {
    title: 'Whisper v3 Multilingual Transcription',
    sub: 'Generating word-level timestamp offsets & speaker diarization...',
    icon: Terminal,
  },
  {
    title: 'GPT-4o Hook & Retention Scoring',
    sub: 'Scanning dialogue for emotional virality spikes...',
    icon: Cpu,
  },
  {
    title: 'Active Speaker Face Tracking & 9:16 Smart Crop',
    sub: 'Dynamically framing dual speakers without letterboxing...',
    icon: Eye,
  },
  {
    title: 'Rendering Hormozi Animated Captions & 4K Export',
    sub: 'Synthesizing kinetic typography & emoji micro-animations...',
    icon: Sparkles,
  }
];

const LOG_MESSAGES = [
  '[00:00.12] ▶ Downloading stream buffer from YouTube CDN...',
  '[00:02.45] 🎵 Demuxing stereo audio channel: 44.1kHz PCM',
  '[00:04.88] 🎙️ OpenAI Whisper Large-v3 loaded on GPU worker node-04',
  '[00:07.12] 📝 Transcript word count: 12,450 words processed',
  '[00:09.67] ⚡ GPT-4o Hook Detector identified 4 viral candidate segments!',
  '[00:12.30] 🎯 Segment #1 Hook Virality Score: 98.4/100 (Extremely High)',
  '[00:14.90] 🎥 OpenCV Active Speaker tracking bounding box centered',
  '[00:16.80] ✨ Hormozi kinetic text style applied: Yellow Pop + Bold Font',
  '[00:19.50] 🚀 Rendering H.264 1080x1920 60FPS vertical output video...',
  '[00:21.00] ✅ Export complete! 4 viral shorts generated successfully.'
];

export const InteractivePipelineLoader = ({ url, onComplete }: PipelineLoaderProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [viralityGauge, setViralityGauge] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setOverallProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 180);

    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 3500);

    const logInterval = setInterval(() => {
      setLogs((prev) => (prev.length < LOG_MESSAGES.length ? [...prev, LOG_MESSAGES[prev.length]] : prev));
    }, 1800);

    const gaugeInterval = setInterval(() => {
      setViralityGauge((prev) => (prev < 98 ? prev + 2 : 98));
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
      clearInterval(logInterval);
      clearInterval(gaugeInterval);
    };
  }, []);

  useEffect(() => {
    if (overallProgress === 100) {
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch {
        // silent
      }
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [overallProgress, onComplete]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-6" id="pipeline-loader">
      <div className="nord-card p-6 sm:p-10 relative overflow-hidden bg-[#09090B] border border-[#27272A]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#18181B]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8BEAD8] uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 animate-pulse" /> Live Pipeline Execution
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Processing Video & Extracting Viral Clips...
            </h2>
            <p className="text-zinc-400 text-xs font-mono mt-1 truncate max-w-xl">
              Source: <span className="text-zinc-200">{url || 'https://youtube.com/watch?v=sample-mrbeast'}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#121215] px-5 py-3 rounded-2xl border border-[#27272A]">
            <div className="text-right">
              <span className="block text-[10px] uppercase font-mono text-zinc-400 font-bold">Virality Score</span>
              <span className="text-2xl font-extrabold font-mono text-[#8BEAD8]">{viralityGauge}/100</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#8BEAD8]">
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>
        </div>

        {/* Master Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-2">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#8BEAD8] animate-pulse" /> Progress
            </span>
            <span className="text-[#8BEAD8] font-bold">{overallProgress}%</span>
          </div>
          <div className="h-2.5 w-full bg-[#18181B] rounded-full overflow-hidden p-0.5 border border-[#27272A]">
            <div
              className="h-full bg-[#8BEAD8] rounded-full transition-all duration-300 shadow-md shadow-[#8BEAD8]/30"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-3">
            {STAGES.map((stage, idx) => {
              const StageIcon = stage.icon;
              const isDone = idx < currentStage || overallProgress === 100;
              const isCurrent = idx === currentStage && overallProgress < 100;

              return (
                <div
                  key={stage.title}
                  className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                    isDone
                      ? 'bg-[#121215]/60 border-[#18181B] opacity-90'
                      : isCurrent
                      ? 'bg-[#121215] border-[#8BEAD8]/50 shadow-md'
                      : 'bg-[#09090B] border-[#18181B] opacity-40'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg border ${
                    isDone 
                      ? 'bg-[#8BEAD8]/15 border-[#8BEAD8]/30 text-[#8BEAD8]' 
                      : isCurrent 
                      ? 'bg-[#18181B] border-[#27272A] text-[#8BEAD8]' 
                      : 'bg-[#121215] border-[#18181B] text-zinc-600'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <StageIcon className="w-5 h-5 animate-pulse" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold text-sm font-display ${isCurrent ? 'text-white' : 'text-zinc-300'}`}>
                        {stage.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#8BEAD8]/20 text-[#8BEAD8]">
                          Processing
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5 font-mono truncate">
                      {stage.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272A] flex flex-col justify-between h-48 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-[#27272A] pb-3">
                <span className="flex items-center gap-1.5 text-[#8BEAD8]">
                  <Video className="w-4 h-4" /> 9:16 Active Speaker Diarization
                </span>
                <span className="text-[#8BEAD8] font-bold">60.0 FPS</span>
              </div>

              <div className="relative w-full h-24 my-auto border border-dashed border-[#8BEAD8]/40 rounded-xl bg-[#8BEAD8]/5 flex items-center justify-center overflow-hidden">
                <div className="w-16 h-16 rounded-full border-2 border-[#8BEAD8] shadow-md flex items-center justify-center bg-[#09090B] animate-pulse">
                  <span className="text-[10px] font-mono text-[#8BEAD8] font-bold">SPEAKER 1</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#050507] border border-[#27272A] font-mono text-[11px] text-zinc-300 h-44 overflow-y-auto flex flex-col justify-end space-y-1">
              <div className="text-zinc-500 pb-1 border-b border-[#18181B] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#8BEAD8]" /> Shortify Execution Console
              </div>
              {logs.map((log, i) => (
                <div key={i} className="text-[#8BEAD8]/90">
                  {log}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
