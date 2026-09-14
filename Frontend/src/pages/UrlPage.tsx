import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ProcessingState } from '../components/ProcessingState';
import { StudioResults } from '../components/StudioResults';
import type { ApiData } from '../components/StudioResults';

export const UrlPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get('video') || '';

  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setApiData(null);
    setError('');

    const fetchClips = async () => {
      try {
        const response = await fetch('http://localhost:3200/api/v1/url', {
          method: 'POST',
          signal: controller.signal,
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
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    };

    fetchClips();
    return () => controller.abort();
  }, [url]);

  if (!url) return <div className="min-h-[60vh] grid place-items-center text-center px-4"><div><h1 className="text-2xl font-bold mb-3">Start with a YouTube link</h1><button className="btn-nord-cyan px-5 py-3" onClick={() => navigate('/studio')}>Open Creator Studio</button></div></div>;

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
            onClick={() => navigate('/studio')}
            className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-semibold hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            ← Try Another Video
          </button>
        </div>
      </div>
    );
  }

  if (apiData) {
    return (
      <StudioResults
        apiData={apiData}
        onBack={() => navigate('/studio')}
      />
    );
  }

  return <ProcessingState url={url} />;
};
