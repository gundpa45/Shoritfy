import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Film, Home, Link2, Plus, Sparkles, X } from 'lucide-react';
import './CreatorStudio.css';

export function CreatorStudio() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const create = (event: React.FormEvent) => {
    event.preventDefault();
    const value = url.trim();
    try {
      const parsed = new URL(value);
      if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(parsed.hostname)) throw new Error();
      if (!parsed.pathname || parsed.pathname === '/') throw new Error();
      setError('');
      navigate(`/url?video=${encodeURIComponent(value)}`);
    } catch {
      setError('Paste a valid YouTube video link to continue.');
    }
  };

  return <div className="creator-shell">
    <button className="creator-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="creator-nav">{menuOpen ? <X size={19}/> : <Film size={19}/>}<span>Creator Studio</span></button>
    <aside className={`creator-sidebar ${menuOpen ? 'is-open' : ''}`} id="creator-nav">
      <Link to="/" className="creator-brand"><span className="creator-brand-mark"><Sparkles size={19}/></span><span>SHORITFY<small>CREATOR STUDIO</small></span></Link>
      <nav aria-label="Creator Studio"><Link to="/studio" className="creator-nav-link active" onClick={() => setMenuOpen(false)}><Home size={18}/> Home</Link><a href="#create" className="creator-nav-link" onClick={() => setMenuOpen(false)}><Plus size={18}/> Create</a><a href="#clips" className="creator-nav-link" onClick={() => setMenuOpen(false)}><Film size={18}/> Clips</a></nav>
      <div className="creator-sidebar-note">Your generated clips appear after processing a YouTube video.</div>
      <Link className="creator-back" to="/">← Back to Shoritfy</Link>
    </aside>
    <main className="creator-main">
      <div className="creator-topline"><span>YOUR WORKSPACE</span><span className="creator-status"><span/> READY TO CREATE</span></div>
      <header className="creator-hero"><div><p className="creator-eyebrow">MAKE SOMETHING WORTH WATCHING</p><h1>Find the good parts<br/><em>in every video.</em></h1><p>Turn a long YouTube video into short clips you can preview and download. Start with a link and let Shoritfy find the moments.</p></div><a href="#create" className="creator-button creator-button-primary"><Plus size={18}/> Create a video</a></header>
      <section className="creator-create" id="create" aria-labelledby="creator-create-title"><div className="creator-create-icon"><Link2 size={22}/></div><div className="creator-create-content"><p className="creator-eyebrow">01 / START HERE</p><h2 id="creator-create-title">Start with a YouTube video</h2><p>Paste a public YouTube video link. Shoritfy will process it, find potential highlights, and prepare clips for you to review.</p><form onSubmit={create} noValidate><label htmlFor="creator-url">YouTube video URL</label><div className="creator-input-row"><input id="creator-url" type="url" inputMode="url" value={url} onChange={e => {setUrl(e.target.value); if(error) setError('');}} placeholder="https://www.youtube.com/watch?v=..." aria-invalid={Boolean(error)} aria-describedby={error ? 'creator-error' : 'creator-hint'}/><button className="creator-button creator-button-primary" type="submit">Find clips <ArrowRight size={18}/></button></div><p className={error ? 'creator-error' : 'creator-hint'} id={error ? 'creator-error' : 'creator-hint'} role={error ? 'alert' : undefined}>{error || 'YouTube links are supported. Video file upload is not available yet.'}</p></form></div></section>
      <section className="creator-clips" id="clips" aria-labelledby="creator-clips-title"><div className="creator-section-heading"><div><p className="creator-eyebrow">02 / AFTER CREATION</p><h2 id="creator-clips-title">Your clips</h2></div></div><div className="creator-empty"><Film size={28}/><h3>Nothing here yet.</h3><p>Once a video is processed, its clips will open in a workspace where you can preview and download them.</p><a href="#create" className="creator-text-link">Create your first clips <ArrowRight size={16}/></a><p className="creator-demo-link"><Link to="/studio/demo">Explore the sample editor</Link> — preview only, with example clips.</p></div></section>
    </main>
  </div>;
}
