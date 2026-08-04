import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, GitBranch, Globe } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

function AuthCard({ children }) {
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Logo link */}
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
          <Zap size={16} className="text-white fill-white" />
        </div>
        <span className="text-lg font-bold text-white">Short<span className="text-purple-400">ify</span></span>
      </Link>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="glass-card shadow-2xl shadow-black/50">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-xs text-zinc-500">or continue with</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <AuthCard>
      <div className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-zinc-400 mt-1">Sign in to your Shortify account</p>
        </div>

        {/* OAuth */}
        <div className="grid grid-cols-2 gap-3 mb-1">
          <Button variant="secondary" size="md" icon={<Globe size={16} />} className="w-full justify-center">
            Google
          </Button>
          <Button variant="secondary" size="md" icon={<GitBranch size={16} />} className="w-full justify-center">
            GitHub
          </Button>
        </div>

        <Divider />

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="login-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={16} />}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="text-sm font-medium text-zinc-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="login-password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                className="w-full h-11 rounded-[14px] bg-[#18181B] border border-white/10 text-white placeholder:text-zinc-500 transition-all duration-200 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-sm pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full"
            size="lg"
            loading={loading}
            iconRight={<ArrowRight size={16} />}
          >
            Sign in
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
            Create account
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}

export function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <AuthCard>
      <div className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-sm text-zinc-400 mt-1">Start turning videos into viral shorts</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-1">
          <Button variant="secondary" size="md" icon={<Globe size={16} />} className="w-full justify-center">
            Google
          </Button>
          <Button variant="secondary" size="md" icon={<GitBranch size={16} />} className="w-full justify-center">
            GitHub
          </Button>
        </div>

        <Divider />

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="register-name"
            label="Full Name"
            type="text"
            placeholder="Alex Rivera"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            id="register-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={16} />}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <div className="space-y-1.5">
            <label htmlFor="register-password" className="text-sm font-medium text-zinc-300">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="register-password"
                type={showPass ? "text" : "password"}
                placeholder="Min 8 characters"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                className="w-full h-11 rounded-[14px] bg-[#18181B] border border-white/10 text-white placeholder:text-zinc-500 transition-all duration-200 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-sm pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full"
            size="lg"
            loading={loading}
            iconRight={<ArrowRight size={16} />}
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-zinc-600 mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-zinc-400 hover:text-white">Terms</a> and{" "}
          <a href="#" className="text-zinc-400 hover:text-white">Privacy Policy</a>
        </p>

        <p className="text-center text-sm text-zinc-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}

export function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthCard>
      <div className="p-8">
        {!sent ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Reset password</h1>
              <p className="text-sm text-zinc-400 mt-1">We'll send you a link to reset your password</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="forgot-email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={16} />}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="gradient" className="w-full" size="lg" loading={loading}>
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4 text-green-400 text-2xl">✓</div>
            <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
            <p className="text-sm text-zinc-400 mb-6">We sent a reset link to <strong className="text-white">{email}</strong></p>
            <Link to="/login">
              <Button variant="secondary" className="w-full">Back to login</Button>
            </Link>
          </div>
        )}
        <p className="text-center text-sm text-zinc-500 mt-6">
          <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Back to login
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
