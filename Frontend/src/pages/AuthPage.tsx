import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Film, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { ThemeSwitcher } from '../theme/ThemeSwitcher';
import './AuthPage.css';

type Field = 'name' | 'email' | 'password' | 'confirmPassword';
type Values = Record<Field, string>;
const initialValues: Values = { name: '', email: '', password: '', confirmPassword: '' };

export function AuthPage({ mode }: { mode: 'signup' | 'signin' }) {
  const signingUp = mode === 'signup';
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Values>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  function update(field: Field, value: string) {
    setValues(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setValidated(false);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Partial<Values> = {};
    if (signingUp && !values.name.trim()) next.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (!values.password) next.password = 'Enter your password.';
    else if (signingUp && values.password.length < 8) next.password = 'Use at least 8 characters.';
    if (signingUp && values.confirmPassword !== values.password) next.confirmPassword = 'Your passwords do not match.';
    setErrors(next);
    setValidated(false);
    const firstError = Object.keys(next)[0];
    if (firstError) {
      form.current?.querySelector<HTMLInputElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    // Frontend preview only: never send, save, or pretend to authenticate credentials.
    setValidated(true);
  }

  function field(name: Field, label: string, type: string, autoComplete: string, placeholder: string) {
    const passwordField = type === 'password';
    return (
      <div className="auth-field">
        <label htmlFor={`auth-${name}`}>{label}</label>
        <div className="auth-input-wrap">
          {name === 'email' && <Mail size={17} aria-hidden="true" />}
          {passwordField && <LockKeyhole size={17} aria-hidden="true" />}
          <input id={`auth-${name}`} name={name} type={passwordField && showPassword ? 'text' : type} autoComplete={autoComplete} value={values[name]} onChange={event => update(name, event.target.value)} placeholder={placeholder} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `auth-${name}-error` : name === 'password' && signingUp ? 'password-hint' : undefined} />
          {name === 'password' && <button type="button" className="auth-password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide passwords' : 'Show passwords'} aria-pressed={showPassword}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>}
        </div>
        {errors[name] && <p className="auth-error" id={`auth-${name}-error`}>{errors[name]}</p>}
      </div>
    );
  }

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link className="auth-brand" to="/"><span><Sparkles size={20} /></span>SHORITFY<small>CREATOR STUDIO</small></Link>
        <ThemeSwitcher />
      </header>
      <main className="auth-main">
        <section className="auth-story" aria-label="Welcome to Shoritfy">
          <p className="auth-eyebrow">YOUR IDEAS. MORE POSSIBILITIES.</p>
          <h1>Big ideas.<br />Short clips.<br /><em>Your next chapter.</em></h1>
          <p className="auth-story-intro">A creative home for the moments that deserve to be seen.</p>
          <div className="auth-art" aria-hidden="true">
            <div className="auth-art-grid" />
            <div className="auth-source"><Film size={27} /><span>One long video</span><div className="auth-wave">{Array.from({ length: 23 }, (_, i) => <i key={i} style={{ height: `${12 + ((i * 17) % 34)}px` }} />)}</div></div>
            <div className="auth-art-line" />
            <div className="auth-mini-clips"><div><span>01</span><Film size={28} /><small>The opening</small></div><div><span>02</span><Sparkles size={28} /><small>The moment</small></div><div><span>03</span><Film size={28} /><small>The takeaway</small></div></div>
          </div>
          <p className="auth-story-footer"><Sparkles size={15} /> More room to create. Less time searching.</p>
        </section>
        <section className="auth-form-panel" aria-labelledby="auth-title">
          <Link to="/" className="auth-back"><ArrowLeft size={15} /> Back to landing</Link>
          <div className="auth-form-heading"><span className="auth-form-icon"><Sparkles size={23} /></span><p className="auth-eyebrow">{signingUp ? 'START YOUR NEXT CHAPTER' : 'YOUR STUDIO IS WAITING'}</p><h2 id="auth-title">{signingUp ? 'A space for your creativity.' : 'Welcome back.'}</h2><p>{signingUp ? 'Create your Shoritfy account.' : 'Sign in to your Shoritfy account.'}</p></div>
          <div className="auth-preview-note"><span>FRONTEND PREVIEW</span>Account access is not connected yet. You can try the form; your details won’t be sent or saved.</div>
          <form ref={form} onSubmit={submit} noValidate>
            {signingUp && field('name', 'Your name', 'text', 'name', 'What should we call you?')}
            {field('email', 'Email address', 'email', 'email', 'you@example.com')}
            {field('password', 'Password', 'password', signingUp ? 'new-password' : 'current-password', signingUp ? 'Create a password' : 'Enter your password')}
            {signingUp && <p className="auth-password-hint" id="password-hint"><Check size={13} /> At least 8 characters</p>}
            {signingUp && field('confirmPassword', 'Confirm password', 'password', 'new-password', 'Enter your password again')}
            <button type="submit" className="auth-submit">{signingUp ? 'Create account' : 'Sign in'}<ArrowRight size={17} /></button>
            {validated && <p className="auth-validation-note" role="status">Your details pass validation. {signingUp ? 'No account was created' : 'You have not been signed in'}—account access will be available once authentication is connected.</p>}
          </form>
          <p className="auth-switch">{signingUp ? 'Already have an account?' : 'New to Shoritfy?'} <Link to={signingUp ? '/signin' : '/signup'}>{signingUp ? 'Sign in' : 'Create an account'}</Link></p>
          <div className="auth-guest"><span>Just looking around?</span><Link to="/studio">Explore Creator Studio <ArrowRight size={14} /></Link></div>
        </section>
      </main>
      <footer className="auth-footer"><span>SHORITFY · MADE FOR YOUR NEXT IDEA</span><Link to="/">Back to home</Link></footer>
    </div>
  );
}
