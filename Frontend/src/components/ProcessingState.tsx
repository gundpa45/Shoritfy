import { useEffect, useState } from 'react';
import { Check, CircleDashed, Sparkles } from 'lucide-react';
import './ProcessingState.css';

const messages = ['Preparing your video…', 'Looking for promising moments…', 'Putting your clips together…'];

export function ProcessingState({ url }: { url: string }) {
  const [message, setMessage] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setMessage(previous => (previous + 1) % messages.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  return <section className="processing-wrap" aria-live="polite" aria-label="Video processing">
    <div className="processing-card">
      <span className="processing-icon"><Sparkles size={26}/></span>
      <p className="processing-kicker">SHORITFY IS WORKING</p>
      <h1>Finding the good parts.</h1>
      <p className="processing-message">{messages[message]}</p>
      <div className="processing-track" role="progressbar" aria-label="Processing video" aria-valuetext="Processing in progress"><span/></div>
      <div className="processing-steps"><span><Check size={16}/> Link received</span><span><CircleDashed size={16}/> Processing video</span><span className="pending"><CircleDashed size={16}/> Clips ready</span></div>
      <p className="processing-note">This can take a few minutes. Results will open here when the server finishes.</p>
      <p className="processing-source">Source: {url}</p>
    </div>
  </section>;
}
