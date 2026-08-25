"use client"
import { FONTS } from "@/shared/utils/fonts";
import { Layers, Menu, X } from "lucide-react";
import { useState } from "react";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const links = ["Product", "How it works", "Teams", "Pricing"];
  return (
    <header className="relative z-20">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#1E1B4B" }}
          >
            <Layers size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            className="text-[17px] font-semibold"
            style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
          >
            Basecrew
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-[14px] md:text-[20px] font-medium transition-colors hover:text-[#1E1B4B]"
              style={{ color: "#64748B", fontFamily: FONTS.body }}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-[14px] font-medium px-4 py-2"
            style={{ color: "#1E1B4B", fontFamily: FONTS.body }}
          >
            Sign in
          </a>
          <a
            href="/register"
            className="text-[14px] font-semibold px-4 py-2 rounded-lg text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "#F97316", fontFamily: FONTS.body }}
          >
            Start free
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "#1E1B4B" }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden px-6 pb-5 flex flex-col gap-4 border-b"
          style={{ borderColor: "#E2E8F0", fontFamily: FONTS.body }}
        >
          {links.map((l) => (
            <a key={l} href="#" className="text-[14px] font-medium" style={{ color: "#334155" }}>
              {l}
            </a>
          ))}
          <a
            href="#"
            className="text-[14px] font-semibold px-4 py-2.5 rounded-lg text-white text-center"
            style={{ background: "#F97316" }}
          >
            Start free
          </a>
        </div>
      )}
    </header>
  );
};


export default Nav;