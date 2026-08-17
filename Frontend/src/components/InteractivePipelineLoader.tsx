import { useEffect, useState } from 'react';
import { Terminal, Cpu, Sparkles, CheckCircle2, Video, Activity, Eye, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PipelineLoaderProps {
  url: string;
  onComplete: () => void;
}

const STAGES = [
  {
    title: 'Extracting High-Quality Audio',
    sub: 'FFmpeg demuxing @ 320kbps WAV...',
    icon: Volume2,
  },
  {
    title: 'Whisper Multilingual Transcribe',
    sub: 'Generating word-level offsets & diarization...',
    icon: Terminal,
  },
  {
    title: 'GPT-4o Hook & Retention Scan',
    sub: 'Detecting emotional virality spikes...',
    icon: Cpu,
  },
  {
    title: 'Active Speaker 9:16 Smart Crop',
    sub: 'Dynamically framing dual speakers...',
    icon: Eye,
  },
  {
    title: 'Hormozi Kinetic Export (4K)',
    sub: 'Synthesizing animations & emojis...',
    icon: Sparkles,
  }
];

const LOG_MESSAGES = [
  '[00:00.12] ▶ Initiating direct stream buffer from CDN...',
  '[00:02.45] 🎵 Demuxing stereo audio channel: 44.1kHz PCM',
  '[00:04.88] 🎙️ GPU worker node-04 initialized Whisper Large-v3',
  '[00:07.12] 📝 Transcript word count: 12,450 words processed',
  '[00:09.67] ⚡ Neural network identified 4 viral candidate segments!',
  '[00:12.30] 🎯 Segment #1 Hook Score: 98.4/100 (Exceptional)',
  '[00:14.90] 🎥 OpenCV Active Speaker tracking bounding box centered',
  '[00:16.80] ✨ Applying dynamic kinetic text style (Yellow/Bold)',
  '[00:19.50] 🚀 Rendering H.264 1080x1920 60FPS vertical buffer...',
  '[00:21.00] ✅ Pipeline sequence completed.'
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[80vh] flex items-center relative" id="pipeline-loader">
      
      {/* Intense Glowing Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8BEAD8]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="w-full rounded-[2.5rem] p-2 relative overflow-hidden bg-gradient-to-b from-[#18181B] to-[#000000] shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10 border border-[#27272A] max-w-5xl mx-auto">
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8BEAD8]/50 to-transparent"></div>

        <div className="rounded-[2.25rem] bg-[#000000] p-8 sm:p-12 relative overflow-hidden h-full">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 mb-10 border-b border-[#18181B]">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#8BEAD8] uppercase tracking-widest mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8BEAD8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8BEAD8]"></span>
                </span>
                Live Pipeline Execution
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-2">
                Extracting Viral Clips
              </h2>
              <p className="text-zinc-500 text-sm font-mono truncate max-w-xl">
                Source: <span className="text-zinc-300 ml-1">{url || 'https://youtube.com/watch?v=sample-mrbeast'}</span>
              </p>
            </div>

            <div className="flex items-center gap-6 bg-[#09090B] px-6 py-4 rounded-3xl border border-[#18181B] shadow-inner">
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500 font-bold mb-1">Peak Virality</span>
                <span className="text-3xl font-black font-display tracking-tight text-[#8BEAD8] drop-shadow-[0_0_10px_rgba(139,234,216,0.3)]">{viralityGauge}</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#000000] border border-[#27272A] flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[#8BEAD8]/10 animate-pulse"></div>
                <Sparkles className="w-6 h-6 text-[#8BEAD8] animate-spin z-10" style={{ animationDuration: '4s' }} />
              </div>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div className="mb-14">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#8BEAD8]" /> Master Process
              </span>
              <span className="text-[#8BEAD8] text-sm">{overallProgress}%</span>
            </div>
            <div className="h-4 w-full bg-[#050505] rounded-full overflow-hidden p-1 border border-[#18181B] shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-white via-[#8BEAD8] to-white rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(139,234,216,0.5)] relative overflow-hidden"
                style={{ width: `${overallProgress}%` }}
              >
                {/* Shine effect on progress bar */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Stages Left Column */}
            <div className="lg:col-span-7 space-y-4">
              {STAGES.map((stage, idx) => {
                const StageIcon = stage.icon;
                const isDone = idx < currentStage || overallProgress === 100;
                const isCurrent = idx === currentStage && overallProgress < 100;

                return (
                  <div
                    key={stage.title}
                    className={`p-5 rounded-2xl border transition-all duration-500 flex items-center gap-5 relative overflow-hidden ${
                      isDone
                        ? 'bg-[#09090B]/60 border-[#18181B]'
                        : isCurrent
                        ? 'bg-[#09090B] border-[#8BEAD8]/40 shadow-[0_0_25px_rgba(139,234,216,0.1)]'
                        : 'bg-[#050505] border-[#18181B] opacity-50'
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8BEAD8] shadow-[0_0_10px_rgba(139,234,216,0.8)]"></div>
                    )}
                    
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      isDone 
                        ? 'bg-[#8BEAD8]/10 border-[#8BEAD8]/20 text-[#8BEAD8]' 
                        : isCurrent 
                        ? 'bg-[#000000] border-[#8BEAD8]/50 text-[#8BEAD8] shadow-inner' 
                        : 'bg-[#000000] border-[#18181B] text-zinc-600'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-5 h-5" /> : <StageIcon className={`w-5 h-5 ${isCurrent ? 'animate-pulse' : ''}`} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-bold text-sm lg:text-base font-display tracking-wide ${isCurrent ? 'text-white drop-shadow-md' : 'text-zinc-400'}`}>
                          {stage.title}
                        </h4>
                        {isCurrent && (
                          <span className="text-[9px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 rounded-md bg-[#8BEAD8]/10 border border-[#8BEAD8]/30 text-[#8BEAD8]">
                            Processing
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 font-mono truncate">
                        {stage.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visuals Right Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Fake AI Visualizer */}
              <div className="p-1 rounded-[2rem] bg-gradient-to-br from-[#18181B] to-[#0A0A0C] border border-[#27272A] relative overflow-hidden group">
                <div className="bg-[#050505] rounded-[1.8rem] p-6 h-56 flex flex-col justify-between relative overflow-hidden">
                  
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-[#18181B] pb-4 relative z-10">
                    <span className="flex items-center gap-2 text-[#8BEAD8] uppercase font-bold tracking-widest">
                      <Video className="w-4 h-4" /> AI Face Tracker
                    </span>
                    <span className="text-white bg-[#18181B] px-2 py-1 rounded border border-[#27272A]">60 FPS</span>
                  </div>

                  <div className="relative w-full h-28 my-auto rounded-2xl bg-[#09090B] border border-[#18181B] flex items-center justify-center overflow-hidden z-10 mt-4 shadow-inner">
                    {/* Fake radar/scanline */}
                    <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#8BEAD8]/10 to-transparent animate-[scan_3s_linear_infinite]"></div>
                    
                    {/* Fake face bounding box */}
                    <div className="w-20 h-20 border border-[#8BEAD8] relative flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform duration-700">
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#8BEAD8]"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#8BEAD8]"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#8BEAD8]"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#8BEAD8]"></div>
                      
                      <div className="w-16 h-16 rounded-full border border-dashed border-[#8BEAD8]/40 shadow-inner flex items-center justify-center bg-[#050505]">
                        <span className="text-[9px] uppercase tracking-widest font-mono text-[#8BEAD8] font-bold">Target</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Console Logs */}
              <div className="p-6 rounded-[2rem] bg-[#000000] border border-[#18181B] shadow-inner font-mono text-[10px] sm:text-xs text-zinc-400 h-56 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#000000] to-transparent z-10 pointer-events-none"></div>
                
                <div className="text-zinc-600 pb-3 border-b border-[#18181B] font-bold uppercase tracking-widest flex items-center gap-2 mb-3 relative z-20">
                  <Terminal className="w-4 h-4 text-white" /> Terminal Output
                </div>
                
                <div className="flex-1 overflow-hidden relative">
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end space-y-2 pb-2">
                    {logs.map((log, i) => (
                      <div key={i} className={`${i === logs.length - 1 ? 'text-white font-bold drop-shadow-md' : 'text-[#8BEAD8]/60'} animate-fade-in`}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
