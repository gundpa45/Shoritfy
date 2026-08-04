import { useState } from "react";
import { motion } from "framer-motion";
import { User, CreditCard, Key, Shield, Camera } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { ProgressBar } from "../../components/ui/Progress";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "api", label: "API Keys", icon: Key },
  { id: "security", label: "Security", icon: Shield },
];

function ProfileTab() {
  const [form, setForm] = useState({ name: "Alex Rivera", email: "alex@example.com", bio: "Content creator & tech enthusiast" });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-[#7C3AED] flex items-center justify-center text-2xl font-bold text-white">
            AR
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#FFFFFF] border border-[#E5E5E3] flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-colors shadow-sm">
            <Camera size={12} />
          </button>
        </div>
        <div>
          <p className="text-lg font-bold text-[#111111]">{form.name}</p>
          <p className="text-sm text-[#6B6B6B]">{form.email}</p>
          <Badge variant="purple" className="mt-1">Pro Plan</Badge>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <Input
          id="profile-name"
          label="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <Input
          id="profile-email"
          label="Email Address"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#111111]">Bio</label>
          <textarea
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
            rows={3}
            className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E5E3] text-[#111111] placeholder:text-[#6B6B6B] transition-all duration-150 focus:outline-none focus:border-[#7C3AED] text-sm p-4 resize-none"
          />
        </div>
      </div>

      <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold" loading={saving} onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
}

function SubscriptionTab() {
  return (
    <div className="space-y-6">
      {/* Current plan */}
      <div className="relative p-6 rounded-2xl bg-[#F5F5F4] border border-[#E5E5E3]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[#6B6B6B] uppercase tracking-wider font-bold mb-1">Current Plan</p>
            <h2 className="text-2xl font-bold text-[#111111]">Pro</h2>
            <p className="text-[#6B6B6B] text-sm mt-1">$29/month · Renews on Sep 4, 2026</p>
          </div>
          <Badge variant="purple">Active</Badge>
        </div>
      </div>

      {/* Usage */}
      <div className="saas-card p-5 space-y-4">
        <h3 className="text-sm font-bold text-[#111111]">Monthly Usage</h3>
        {[
          { label: "Videos Processed", used: 42, max: 50 },
          { label: "Credits Used", used: 153, max: 1000 },
          { label: "API Calls", used: 847, max: 10000 },
        ].map(u => (
          <div key={u.label} className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#6B6B6B]">{u.label}</span>
              <span className="text-[#111111]">{u.used.toLocaleString()} / {u.max.toLocaleString()}</span>
            </div>
            <ProgressBar value={u.used} max={u.max} color={u.used / u.max > 0.8 ? "amber" : "gradient"} />
          </div>
        ))}
      </div>

      {/* Billing */}
      <div className="saas-card p-5 space-y-3">
        <h3 className="text-sm font-bold text-[#111111]">Billing History</h3>
        {[
          { date: "Aug 4, 2026", amount: "$29.00", status: "Paid" },
          { date: "Jul 4, 2026", amount: "$29.00", status: "Paid" },
          { date: "Jun 4, 2026", amount: "$29.00", status: "Paid" },
        ].map((inv, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#E5E5E3] last:border-0">
            <div>
              <p className="text-sm font-bold text-[#111111]">{inv.date}</p>
              <p className="text-xs text-[#6B6B6B]">Pro Plan</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#111111]">{inv.amount}</span>
              <Badge variant="green">{inv.status}</Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold">Upgrade to Business</Button>
        <Button variant="danger">Cancel Plan</Button>
      </div>
    </div>
  );
}

function ApiKeysTab() {
  const [keys] = useState([
    { name: "Production", key: "sk-live-••••••••••••••••••••", created: "Aug 1, 2026", lastUsed: "Today" },
    { name: "Development", key: "sk-test-••••••••••••••••••••", created: "Jul 20, 2026", lastUsed: "Yesterday" },
  ]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#111111]">API Keys</h3>
          <p className="text-xs text-[#6B6B6B] mt-0.5">Use these keys to access the Shortify API</p>
        </div>
        <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold" size="sm">Generate New Key</Button>
      </div>

      <div className="space-y-3">
        {keys.map((key, i) => (
          <div key={i} className="saas-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-[#111111]">{key.name}</p>
              <Button variant="danger" size="sm">Revoke</Button>
            </div>
            <code className="text-xs text-[#111111] font-mono bg-[#F5F5F4] border border-[#E5E5E3] px-3 py-1.5 rounded-lg block mb-2">
              {key.key}
            </code>
            <div className="flex gap-4 text-xs text-[#6B6B6B]">
              <span>Created: {key.created}</span>
              <span>Last used: {key.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
        <p className="text-xs text-amber-800">
          <strong>Keep your API keys secure.</strong> Never share them in public repositories or client-side code.
        </p>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-5">
      <div className="saas-card p-5 space-y-4">
        <h3 className="text-sm font-bold text-[#111111]">Change Password</h3>
        <Input id="current-pass" label="Current Password" type="password" placeholder="••••••••" />
        <Input id="new-pass" label="New Password" type="password" placeholder="••••••••" />
        <Input id="confirm-pass" label="Confirm Password" type="password" placeholder="••••••••" />
        <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold">Update Password</Button>
      </div>

      <div className="saas-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#111111]">Two-Factor Authentication</h3>
            <p className="text-xs text-[#6B6B6B] mt-0.5">Add an extra layer of security</p>
          </div>
          <Button variant="secondary" className="border-[#E5E5E3]" size="sm">Enable 2FA</Button>
        </div>
      </div>

      <div className="saas-card p-5 border-red-200">
        <h3 className="text-sm font-bold text-red-600 mb-3">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#111111]">Delete Account</p>
            <p className="text-xs text-[#6B6B6B]">Permanently delete your account and all data</p>
          </div>
          <Button variant="danger" size="sm">Delete Account</Button>
        </div>
      </div>
    </div>
  );
}

const TAB_COMPONENTS = {
  profile: ProfileTab,
  subscription: SubscriptionTab,
  api: ApiKeysTab,
  security: SecurityTab,
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      <div>
        <h1 className="text-3xl font-bold text-[#111111]">Account</h1>
        <p className="text-[#6B6B6B] mt-1 text-sm">Manage your profile, subscription, and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F5F5F4] p-1 rounded-xl border border-[#E5E5E3]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-150 ${
              activeTab === tab.id
                ? "bg-[#FFFFFF] text-[#111111] shadow-sm border border-[#E5E5E3]"
                : "text-[#6B6B6B] hover:text-[#111111]"
            }`}
            id={`tab-${tab.id}`}
          >
            <tab.icon size={13} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="saas-card p-6"
      >
        <ActiveComponent />
      </motion.div>
    </div>
  );
}
