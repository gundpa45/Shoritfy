import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Film, Home, LayoutDashboard, Link2, Menu, Play, Sparkles, Upload, X } from 'lucide-react';
import { MOCK_CLIPS } from '../mockData';
import './CreatorStudio.css';
import { ThemeSwitcher } from '../theme/ThemeSwitcher';

const samples = [
  { clip: MOCK_CLIPS[0], title: 'Make your opening count', category: 'Creator tips', tone: 'mint' },
  { clip: MOCK_CLIPS[1], title: 'One idea. A new perspective.', category: 'Education', tone: 'violet' },
  { clip: MOCK_CLIPS[2], title: 'Give your story a voice', category: 'Storytelling', tone: 'amber' },
];

export function CreatorStudio() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  function create(event: FormEvent) {
    event.preventDefault();
    try {
      const parsed = new URL(url.trim());
      const host = parsed.hostname;
      const isYouTube = ['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host);
      const id = host === 'youtu.be' ? parsed.pathname.slice(1) : isYouTube
        ? (parsed.pathname === '/watch' ? parsed.searchParams.get('v') : /^\/(?:shorts|embed|live)\/([^/]+)$/.exec(parsed.pathname)?.[1]) : null;
      if (!['http:', 'https:'].includes(parsed.protocol) || !id || !/^[\w-]{11}$/.test(id)) throw new Error();
      navigate(`/url?video=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`);
    } catch {
      setError('Paste a valid YouTube video link to continue.');
    }
  }

  return (
    <div className="creator-shell">
      <a className="creator-skip" href="#studio-content">Skip to workspace</a>
      <button className="creator-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="creator-nav">
        {menuOpen ? <X size={19} /> : <Menu size={19} />} Creator Studio
      </button>
      <aside className={`creator-sidebar ${menuOpen ? 'is-open' : ''}`} id="creator-nav">
        <Link to="/" className="creator-brand"><span className="creator-brand-mark"><Sparkles size={19} /></span><span>SHORITFY<small>CREATOR STUDIO</small></span></Link>
        <div className="creator-workspace"><span className="creator-avatar">S</span><div>Your workspace<small>Make something worth watching</small></div></div>
        <p className="creator-nav-label">WORKSPACE</p>
        <nav aria-label="Creator Studio">
          <Link to="/studio" className="creator-nav-link active" aria-current="page" onClick={() => setMenuOpen(false)}><Home size={18} /> Home</Link>
          <a href="#create" className="creator-nav-link" onClick={() => setMenuOpen(false)}><Sparkles size={18} /> Create clips</a>
          <a href="#samples" className="creator-nav-link" onClick={() => setMenuOpen(false)}><Film size={18} /> Sample projects</a>
        </nav>
        <div className="creator-sidebar-note"><Sparkles size={19} /><strong>A little inspiration.<br />A lot of possibility.</strong><p>Start with a video. Find a moment worth sharing.</p></div>
        <Link className="creator-back" to="/">← Back to Shoritfy</Link>
      </aside>
      <main className="creator-main" id="studio-content">
        <div className="creator-topline">
          <span>HOME / CREATOR STUDIO</span>
          <div className="theme-top-actions">
          <nav className="creator-view-switch" aria-label="Switch workspace view">
            <Link to="/"><Compass size={16} /> Landing</Link>
            <Link to="/studio" aria-current="page"><LayoutDashboard size={16} /> Creator Studio</Link>
          </nav>
          <ThemeSwitcher />
          <Link to="/signin" className="theme-auth-link">Sign in</Link>
          </div>
        </div>
        <section className="creator-launch" id="create" aria-labelledby="creator-title">
          <div className="creator-watermark" aria-hidden="true">CREATE.</div>
          <p className="creator-eyebrow"><Sparkles size={14} /> LONG VIDEO. NEW POSSIBILITIES.</p>
          <h1 id="creator-title">Your next great clip<br />is <em>already in there.</em></h1>
          <p className="creator-intro">Give your long videos a new life. Find the moments worth sharing.</p>
          <form className="creator-input-card" onSubmit={create} noValidate>
            <label htmlFor="creator-url">Start with a YouTube video</label>
            <div className="creator-url-field"><Link2 size={19} aria-hidden="true" /><input id="creator-url" type="url" inputMode="url" value={url} onChange={event => { setUrl(event.target.value); setError(''); }} placeholder="Paste your YouTube video link" aria-invalid={Boolean(error)} aria-describedby={error ? 'creator-error' : 'creator-hint'} /></div>
            {error && <p className="creator-error" id="creator-error" role="alert">{error}</p>}
            <div className="creator-input-meta"><span><Film size={14} /> YouTube supported</span><span><Upload size={14} /> File upload <small>Coming later</small></span></div>
            <button className="creator-button creator-button-primary" type="submit"><Sparkles size={17} /> Find my clips <ArrowRight size={18} /></button>
            <p id="creator-hint" className="creator-hint">Public video links • Processing may take a few minutes</p>
          </form>
          <Link className="creator-sample-link" to="/studio/demo"><Play size={13} /> Just exploring? Open the sample editor <ArrowRight size={14} /></Link>
        </section>
        <ol className="creator-workflow" aria-label="How it works">
          <li><span>01</span><div><strong>Bring your video</strong><p>Start with a YouTube link.</p></div></li>
          <li><span>02</span><div><strong>Find your moments</strong><p>Let AI surface potential highlights.</p></div></li>
          <li><span>03</span><div><strong>Make your pick</strong><p>Preview and download your clips.</p></div></li>
        </ol>
        <section id="samples" className="creator-samples" aria-labelledby="samples-title">
          <div className="creator-section-heading"><div><p className="creator-eyebrow">A PLACE TO START</p><h2 id="samples-title">Take the studio for a spin.</h2></div><span className="creator-demo-badge">SAMPLE PROJECTS</span></div>
          <p className="creator-section-description">Explore the editor with example footage and caption styles. These are demos, not your generated clips.</p>
          <div className="creator-sample-grid">{samples.map(({ clip, title, category, tone }) => (
            <Link className={`creator-sample-card ${tone}`} to={`/studio/demo?clip=${clip.id}`} key={clip.id}>
              <img src={clip.thumbnailUrl} alt="" loading="lazy" />
              <div className="creator-sample-overlay" />
              <span className="creator-sample-category">{category}</span>
              <span className="creator-sample-play"><Play size={19} fill="currentColor" /></span>
              <div className="creator-sample-caption"><h3>{title}</h3><div><span>Example footage · {clip.duration}</span><span>Explore <ArrowRight size={15} /></span></div></div>
            </Link>
          ))}</div>
        </section>
      </main>
    </div>
  );
}
