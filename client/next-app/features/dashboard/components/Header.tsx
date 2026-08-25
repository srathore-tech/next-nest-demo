"use client"
import { FONTS } from "@/shared/utils/fonts";
import { Bell, ChevronDown, LogOut, Menu, Search, Settings } from "lucide-react";
import { useState } from "react";
import NavKey from "../types/nav.types";
import { pageTitles } from "../constants/data";



const Header = ({
  active,
  onOpenMobile,
}: {
  active: NavKey;
  onOpenMobile: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 sm:px-6 border-b backdrop-blur-sm"
      style={{ borderColor: "#E2E8F0", background: "rgba(255,255,255,0.85)" }}
    >
      <button
        className="md:hidden p-1.5 rounded-lg"
        style={{ color: "#1E1B4B" }}
        onClick={onOpenMobile}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <h1
        className="text-[17px] font-semibold shrink-0"
        style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
      >
        {pageTitles[active]}
      </h1>

      <div className="hidden sm:flex items-center flex-1 max-w-sm ml-4">
        <div
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border"
          style={{ borderColor: "#E2E8F0", background: "#FAFAFB" }}
        >
          <Search size={15} style={{ color: "#94A3B8" }} />
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="bg-transparent outline-none text-[13.5px] w-full"
            style={{ color: "#1E1B4B", fontFamily: FONTS.body }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button
          className="relative p-2 rounded-lg transition-colors hover:bg-[#F1F5F9]"
          style={{ color: "#475569" }}
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "#F97316" }}
          />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg transition-colors hover:bg-[#F1F5F9]"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-semibold"
              style={{ background: "#1E1B4B", fontFamily: FONTS.display }}
            >
              PR
            </div>
            <span
              className="hidden sm:block text-[13.5px] font-medium"
              style={{ color: "#1E1B4B", fontFamily: FONTS.body }}
            >
              Priya Rao
            </span>
            <ChevronDown size={14} style={{ color: "#94A3B8" }} />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-44 rounded-xl border py-1.5 shadow-lg"
              style={{ borderColor: "#E2E8F0", background: "#fff" }}
            >
              <button
                className="w-full flex items-center gap-2 px-3.5 py-2 text-[13.5px] text-left transition-colors hover:bg-[#FAFAFB]"
                style={{ color: "#334155", fontFamily: FONTS.body }}
              >
                <Settings size={15} />
                Settings
              </button>
              <button
                className="w-full flex items-center gap-2 px-3.5 py-2 text-[13.5px] text-left transition-colors hover:bg-[#FAFAFB]"
                style={{ color: "#EF4444", fontFamily: FONTS.body }}
              >
                <LogOut size={15} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


export default Header;