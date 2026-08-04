import { Outlet } from "react-router";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { SidebarProvider, useSidebar } from "./SidebarContext";

function MainContent() {
  const { collapsed } = useSidebar();
  return (
    <motion.main
      className="min-h-screen flex-1 transition-all duration-300 overflow-x-hidden relative z-10"
      style={{ marginLeft: collapsed ? 64 : 256 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="p-8 md:p-12 max-w-[1280px] mx-auto w-full">
        <Outlet />
      </div>
    </motion.main>
  );
}

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#FDFDFD] flex text-[#111111] overflow-x-hidden relative">
        <Sidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  );
}
