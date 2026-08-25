"use client"
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Search,
  Bell,
  Menu,
  X,
  Layers,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import { FONTS } from "@/shared/utils/fonts";
import Sidebar from "@/features/dashboard/components/SideBar";
import { pageTitles } from "@/features/dashboard/constants/data";
import Header from "@/features/dashboard/components/Header";



type NavKey = "dashboard" | "teams" | "projects";





// ---------------------------------------------------------------------------
// Main — renders whatever page content is passed as children
// ---------------------------------------------------------------------------
const Main = ({ children }: { children: ReactNode }) => (
  <main
    className="flex-1 min-h-[calc(100vh-4rem)] relative px-4 sm:px-6 py-6"
    style={{ background: "#FAFAFB" }}
  >
    <div
      className="absolute inset-0 pointer-events-none opacity-60"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(30,27,75,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,27,75,0.04) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />
    <div className="relative max-w-6xl mx-auto">{children}</div>
  </main>
);

// ---------------------------------------------------------------------------
// Default placeholder content — shown only if no children are passed in,
// so the layout is inspectable on its own.
// ---------------------------------------------------------------------------
const placeholderCards = [
  { label: "Active projects", value: "8" },
  { label: "Open tasks", value: "34" },
  { label: "Team members", value: "27" },
  { label: "Due this week", value: "6" },
];

const DefaultContent = ({ active }: { active: NavKey }) => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {placeholderCards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border p-5 flex flex-col gap-1"
          style={{ borderColor: "#E2E8F0", background: "#fff" }}
        >
          <p
            className="text-[26px] font-semibold"
            style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
          >
            {c.value}
          </p>
          <p className="text-[13px]" style={{ color: "#64748B", fontFamily: FONTS.body }}>
            {c.label}
          </p>
        </div>
      ))}
    </div>

    <div
      className="rounded-2xl border p-8 flex items-center justify-center text-center min-h-[240px]"
      style={{ borderColor: "#E2E8F0", background: "#fff" }}
    >
      <p className="text-[14px]" style={{ color: "#94A3B8", fontFamily: FONTS.body }}>
        This is the "{pageTitles[active]}" page — pass your own content as
        children of &lt;DashLayout&gt; to replace this placeholder.
      </p>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// DashLayout — Sidebar + Header wrap whatever is passed as children.
// If no children are given, a placeholder view is shown per nav section.
// ---------------------------------------------------------------------------
export default function DashLayout({ children }: { children?: ReactNode }) {
  const [active, setActive] = useState<NavKey>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen" style={{ background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
      `}</style>

      <Sidebar
        active={active}
        onNavigate={(k) => {
          setActive(k);
          setMobileOpen(false);
          
        }}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Header active={active} onOpenMobile={() => setMobileOpen(true)} />
        <Main>{children ?? <DefaultContent active={active} />}</Main>
      </div>
    </div>
  );
}