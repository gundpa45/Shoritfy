import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, LayoutDashboard, Upload, Settings,
  User, LogOut, ChevronLeft, ChevronRight, HelpCircle,
  CreditCard, BarChart2, Film
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { useSidebar } from "./SidebarContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Upload", icon: Upload, href: "/upload" },
  { label: "Projects", icon: Film, href: "/projects" },
  { label: "Analytics", icon: BarChart2, href: "/analytics" },
];

const bottomItems = [
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Billing", icon: CreditCard, href: "/billing" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Help", icon: HelpCircle, href: "/help" },
];

export function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href) => location.pathname === href || location.pathname.startsWith(href + "/");

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <motion.aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-30 flex flex-col border-r border-[#E5E5E3] bg-[#FDFDFD] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 h-16 border-b border-[#E5E5E3]">
        <div className="w-8 h-8 min-w-[32px] rounded-xl bg-[#7C3AED] flex items-center justify-center">
          <Zap size={16} className="text-white fill-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              className="text-lg font-bold text-[#111111] tracking-tight whitespace-nowrap overflow-hidden"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              Shortify
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Main nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto hide-scrollbar">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative",
                active
                  ? "bg-[#7C3AED]/10 text-[#7C3AED] font-semibold"
                  : "text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F5F5F4]"
              )}
              title={collapsed ? item.label : undefined}
              aria-label={item.label}
            >
              {active && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#7C3AED] rounded-r-full" />
              )}
              <item.icon
                size={18}
                className={cn(
                  "flex-shrink-0 relative z-10 transition-transform group-hover:scale-105",
                  active ? "text-[#7C3AED]" : "text-[#6B6B6B] group-hover:text-[#111111]"
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="text-sm whitespace-nowrap relative z-10"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.badge && !collapsed && (
                <Badge variant="purple" className="ml-auto relative z-10 text-[10px]">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Credits remaining */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-4 rounded-xl bg-[#F5F5F4] border border-[#E5E5E3]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#6B6B6B] font-semibold uppercase tracking-wider">AI Credits</p>
            <Link to="/billing" className="text-xs font-semibold text-[#7C3AED] hover:underline">Upgrade</Link>
          </div>
          <p className="text-lg font-bold text-[#111111] mt-1">847 <span className="text-xs font-normal text-[#6B6B6B]">/ 1,000</span></p>
          <div className="mt-2 h-1.5 w-full bg-[#E5E5E3] rounded-full overflow-hidden">
            <div className="h-full w-[84%] bg-[#7C3AED] rounded-full" />
          </div>
          <p className="text-[11px] text-[#6B6B6B] mt-1.5 font-medium">Pro Plan · Resets in 14 days</p>
        </div>
      )}

      {/* Bottom items */}
      <div className="p-3 border-t border-[#E5E5E3] space-y-1">
        {bottomItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150",
                active
                  ? "bg-[#7C3AED]/10 text-[#7C3AED] font-semibold"
                  : "text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F5F5F4]"
              )}
              title={collapsed ? item.label : undefined}
              aria-label={item.label}
            >
              <item.icon size={16} className="flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="text-sm whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 text-[#6B6B6B] hover:text-[#ba1a1a] hover:bg-[#F5F5F4] w-full"
          title={collapsed ? "Logout" : undefined}
          aria-label="Logout"
        >
          <LogOut size={16} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="text-sm whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#E5E5E3] flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-all shadow-sm"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
}
