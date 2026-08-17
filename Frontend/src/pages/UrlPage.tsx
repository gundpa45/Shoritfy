import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { InteractivePipelineLoader } from '../components/InteractivePipelineLoader';
import { StudioResults } from '../components/StudioResults';

interface UrlPageProps {
  onOpenPricing: () => void;
}

export const UrlPage = ({ onOpenPricing }: UrlPageProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get('video') || '';

  const [pipelineFinished, setPipelineFinished] = useState(false);
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;

    const fetchClips = async () => {
      try {
        const response = await fetch('http://localhost:3200/api/v1/url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          // Try to read the backend's error message
          const errBody = await response.json().catch(() => null);
          throw new Error(errBody?.error || `Server error (${response.status})`);
        }

        const data = await response.json();
        setApiData(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      }
    };

    fetchClips();
  }, [url]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center bg-red-900/10 p-10 rounded-3xl border border-red-500/20 max-w-md">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl text-red-400 font-bold font-display mb-2">Processing Failed</h2>
          <p className="text-red-200/70 text-sm mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-semibold hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            ← Try Another Video
          </button>
        </div>
      </div>
    );
  }

  // Show the results page when BOTH the pipeline animation and API call are done
  const isReady = pipelineFinished && apiData;

  if (isReady) {
    return (
      <StudioResults
        apiData={apiData}
        onBack={() => navigate('/')}
      />
    );
  }

  // Show the pipeline loader while processing
  return (
    <div className="relative">
      <InteractivePipelineLoader
        url={url}
        onComplete={() => setPipelineFinished(true)}
      />
      {pipelineFinished && !apiData && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-[#8BEAD8] font-mono text-sm font-bold uppercase tracking-widest animate-pulse pb-10 flex items-center gap-3 bg-[#000000]/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#8BEAD8]/30 shadow-[0_0_20px_rgba(139,234,216,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#8BEAD8]"></span>
          Awaiting AI models — this may take a few minutes...
          <span className="w-2 h-2 rounded-full bg-[#8BEAD8]"></span>
        </div>
      )}
    </div>
  );
};
