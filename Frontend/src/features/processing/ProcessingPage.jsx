import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, CheckCircle, AlertCircle, BarChart2, FileText, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/utils";
import { aiService } from "../../services/ai.service";

const PIPELINE_STAGES = [
  { key: "uploading", label: "Uploading Video", detail: "Transferring to Shortify processing server" },
  { key: "transcribing", label: "Generating Transcript", detail: "Whisper AI speech recognition running" },
  { key: "compressing", label: "Compressing Transcript", detail: "Optimizing for retention analysis" },
  { key: "splitting", label: "Splitting Into Chunks", detail: "Dividing content for parallel hook scoring" },
  { key: "analyzing_1", label: "Analyzing Chunk 1/4", detail: "Detecting engaging retention moments" },
  { key: "analyzing_2", label: "Analyzing Chunk 2/4", detail: "Detecting engaging retention moments" },
  { key: "analyzing_3", label: "Analyzing Chunk 3/4", detail: "Detecting engaging retention moments" },
  { key: "analyzing_4", label: "Analyzing Chunk 4/4", detail: "Detecting engaging retention moments" },
  { key: "ranking", label: "Ranking Clips", detail: "Scoring virality potential (0-100)" },
  { key: "generating", label: "Generating Clips", detail: "Rendering 9:16 auto-framed output files" },
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ProcessingPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [clipsFound, setClipsFound] = useState(0);
  const [done, setDone] = useState(false);
  const [speed] = useState("3.2x AI Accelerated");

  useEffect(() => {
    const job = aiService.getJob(jobId);
    setJobData(job);
  }, [jobId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    let stageIdx = 0;
    let progress = 0;

    const advance = () => {
      progress += Math.random() * 18 + 7;
      if (progress >= 100) {
        progress = 100;
        setStageProgress(100);

        if (stageIdx >= 3 && Math.random() > 0.3) {
          setClipsFound(prev => Math.min(prev + 1, jobData?.clips?.length || 6));
        }

        clearInterval(interval);
        setTimeout(() => {
          stageIdx++;
          if (stageIdx >= PIPELINE_STAGES.length) {
            setDone(true);
            setTimeout(() => navigate(`/results/${jobId || "demo-job-id"}`), 1400);
            return;
          }
          setCurrentStage(stageIdx);
          setStageProgress(0);
          progress = 0;
          interval = setInterval(advance, 180);
        }, 350);
      } else {
        setStageProgress(Math.round(progress));
      }
    };

    interval = setInterval(advance, 180);
    return () => clearInterval(interval);
  }, [navigate, jobId, jobData]);

  const estimatedTotal = 50;
  const estimatedRemaining = Math.max(0, estimatedTotal - elapsed);

  const videoTitle =
    jobData?.videoDetails?.title || "Alex Hormozi — How to Build a $100M Business in 2026";

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-[#F5F5F5]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#121214] border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-lg">
            {done ? (
              <CheckCircle size={28} className="text-[#D4FF3F]" />
            ) : (
              <Zap size={28} className="text-[#D4FF3F] animate-pulse" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">
            {done ? "Processing Complete!" : "AI is Analyzing Your Video"}
          </h1>
          <p className="text-sm text-[#A1A1A6] mt-1 font-mono max-w-xl mx-auto">
            {videoTitle}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Clock, label: "Elapsed", value: formatTime(elapsed) },
            { icon: Clock, label: "Remaining", value: done ? "Done" : `~${formatTime(estimatedRemaining)}` },
            { icon: BarChart2, label: "Clips Found", value: clipsFound.toString() },
            { icon: Zap, label: "Speed", value: speed },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl bg-[#121214] border border-white/10 text-center shadow-md">
              <s.icon size={16} className="text-[#D4FF3F] mx-auto mb-1.5" />
              <p className="text-[10px] font-bold text-[#A1A1A6] uppercase tracking-wider font-mono">{s.label}</p>
              <p className="text-lg font-bold text-[#F5F5F5] mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#121214] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-[#F5F5F5] flex items-center gap-2 font-mono">
              <FileText size={15} className="text-[#D4FF3F]" />
              AI Extraction Pipeline
            </h2>
            <span className="text-xs text-[#A1A1A6] font-mono">
              Stage {Math.min(currentStage + 1, PIPELINE_STAGES.length)} / {PIPELINE_STAGES.length}
            </span>
          </div>

          {PIPELINE_STAGES.map((stage, i) => {
            const isDone = i < currentStage || done;
            const isCurrent = i === currentStage && !done;
            const isPending = i > currentStage && !done;

            return (
              <div
                key={stage.key}
                className="space-y-1.5"
              >
                <div className="flex items-center gap-2.5 text-xs font-mono">
                  {isDone ? (
                    <CheckCircle size={15} className="text-[#D4FF3F] flex-shrink-0" />
                  ) : isCurrent ? (
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full bg-[#D4FF3F] flex-shrink-0"
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0" />
                  )}
                  <span className={cn(
                    "font-bold flex-1",
                    isDone ? "text-[#F5F5F5]" : isCurrent ? "text-[#D4FF3F]" : "text-[#A1A1A6]"
                  )}>
                    {stage.label}
                  </span>
                  {isCurrent && (
                    <span className="text-[#D4FF3F] font-bold">{stageProgress}%</span>
                  )}
                  {isDone && (
                    <span className="text-[10px] bg-[#1A1E18] text-[#D4FF3F] px-2 py-0.5 rounded border border-[#D4FF3F]/30">
                      Done
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="ml-6 h-1.5 rounded-full overflow-hidden bg-white/5">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-200",
                      isDone
                        ? "bg-[#D4FF3F]"
                        : isCurrent
                        ? "bg-[#D4FF3F]/80"
                        : "bg-transparent"
                    )}
                    style={{ width: isDone ? "100%" : isCurrent ? `${stageProgress}%` : "0%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Clips counter */}
        <AnimatePresence>
          {clipsFound > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-[#1A1E18] border border-[#D4FF3F]/30 flex items-center gap-4 shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Zap size={20} className="text-[#D4FF3F]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#F5F5F5]">{clipsFound} viral clips detected so far</p>
                <p className="text-xs text-[#A1A1A6] mt-0.5">Scoring audience retention curves & framing</p>
              </div>
              <Button
                size="sm"
                className="btn-accent text-xs font-bold"
                onClick={() => navigate(`/results/${jobId || "demo-job-id"}`)}
              >
                Preview Now <ArrowRight size={13} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <AlertCircle size={16} className="text-[#D4FF3F] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#A1A1A6] leading-relaxed">
            <strong className="text-[#F5F5F5]">Tip:</strong> You don't need to keep this tab open.
            Your extracted shorts are automatically saved to your Shortify projects dashboard.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
