import React, { useState } from 'react';

const Url = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setStatus('loading');
    
    try {
      const response = await fetch('/api/v1/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to resolve URL');
      }

      const data = await response.json();
      setStatus('success');
      setResult(data.videoId);
    } catch (error) {
      console.error("Error fetching URL:", error);
      setStatus('idle');
      alert("Error resolving URL. Make sure it's a valid YouTube link.");
    }
  };

  const resetSearch = () => {
    setUrl('');
    setStatus('idle');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-6 sm:p-12 font-sans text-[#111111]">
      
      {/* Header */}
      <div className="mb-12 text-center max-w-xl">
        <h1 className="text-[32px] sm:text-[48px] font-semibold tracking-tight leading-[1.1] mb-4">
          Trace any short link.
        </h1>
        <p className="text-[#6B6B6B] text-[16px] sm:text-[18px] leading-[1.6]">
          Paste a shortened URL to reveal its exact destination before you click. Fast, secure, and clear.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg bg-[#FDFDFD] border border-[#E5E5E3] rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-8">
        
        {status === 'idle' && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="url-input" className="text-[14px] font-medium text-[#111111] uppercase tracking-[0.04em]">
                Short URL
              </label>
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. shortify.com/xyz123"
                className="w-full bg-[#F5F5F4] border border-[#E5E5E3] rounded-lg px-4 py-3 text-[#111111] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3D5AFE]/20 focus:border-[#3D5AFE] transition-colors"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#3D5AFE] text-white font-medium rounded-lg py-3 px-4 hover:bg-[#3D5AFE]/90 transition-colors flex items-center justify-center gap-2"
            >
              Trace link
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </form>
        )}

        {status === 'loading' && (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <div className="w-6 h-6 border-2 border-[#E5E5E3] border-t-[#3D5AFE] rounded-full animate-spin"></div>
            <p className="text-[#6B6B6B] text-[14px] font-medium">Resolving destination...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1FA97A]/10 flex items-center justify-center text-[#1FA97A]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </div>
              <h2 className="text-[18px] font-semibold text-[#111111]">Link resolved successfully</h2>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-medium text-[#111111] uppercase tracking-[0.04em]">Destination</span>
              <div className="w-full bg-[#F5F5F4] border border-[#E5E5E3] rounded-lg p-4 break-all">
                <p className="text-[#111111] font-mono text-[14px]">{result}</p>
              </div>
            </div>

            <button
              onClick={resetSearch}
              className="w-full bg-[#FDFDFD] text-[#111111] border border-[#E5E5E3] font-medium rounded-lg py-3 px-4 hover:bg-[#F5F5F4] transition-colors"
            >
              Trace another link
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Url;
