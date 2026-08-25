import { FONTS } from "@/shared/utils/fonts";
import { FolderKanban, Layers, LayoutDashboard, Users, X } from "lucide-react";
import NavKey from "../types/nav.types";
import { navItems } from "../constants/data";
import { useRouter } from "next/navigation";






// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------
const Sidebar = ({
  active,
  onNavigate,
  mobileOpen,
  onCloseMobile,
}: {
  active: NavKey;
  onNavigate: (k: NavKey) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) => {

    const router = useRouter()

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-5 h-16 shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "#1E1B4B" }}
        >
          <Layers size={16} color="#fff" strokeWidth={2.5} />
        </div>
        <span
          className="text-[16px] font-semibold"
          style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
        >
          Basecrew
        </span>
        <button
          className="ml-auto md:hidden p-1.5 rounded-lg"
          style={{ color: "#64748B" }}
          onClick={onCloseMobile}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3 pt-4 flex flex-col gap-1">
        <span
          className="text-[11px] font-semibold tracking-wide px-3 mb-1"
          style={{ color: "#94A3B8", fontFamily: FONTS.mono }}
        >
          MENU
        </span>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() =>{if(item.href){return router.push(item.href)} onNavigate(item.key)}}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
              style={{
                background: isActive ? "#1E1B4B" : "transparent",
                color: isActive ? "#fff" : "#475569",
              }}
            >
              <Icon size={17} strokeWidth={2} />
              <span
                className="text-[14px] font-medium"
                style={{ fontFamily: FONTS.body }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                  style={{ background: "#F97316" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 mt-auto">
        <div
          className="rounded-xl p-3 flex flex-col gap-2 border"
          style={{ borderColor: "#E2E8F0", background: "#FAFAFB" }}
        >
          <p
            className="text-[12.5px] font-medium leading-snug"
            style={{ color: "#1E1B4B", fontFamily: FONTS.body }}
          >
            Free plan · 10 members
          </p>
          <button
            className="text-[12px] font-semibold text-left"
            style={{ color: "#F97316", fontFamily: FONTS.body }}
          >
            Upgrade workspace
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden md:flex md:flex-col w-64 shrink-0 border-r h-screen sticky top-0"
        style={{ borderColor: "#E2E8F0", background: "#fff" }}
      >
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(30,27,75,0.35)" }}
            onClick={onCloseMobile}
          />
          <aside
            className="relative w-64 h-full border-r"
            style={{ borderColor: "#E2E8F0", background: "#fff" }}
          >
            {content}
          </aside>
        </div>
      )}
    </>
  );
};


export default Sidebar;