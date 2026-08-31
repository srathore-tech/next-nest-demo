"use client"

import { useEffect, useState } from "react";
import {
  Users,
  FolderKanban,
  ListChecks,
  ArrowRight,
  Check,
  Clock,
  MessageSquare,
  BarChart3,
  Layers,
  Bell,
  ShieldCheck,
  Zap,
  Menu,
  X,
  Circle,
  CheckCircle2,
} from "lucide-react";
import GridBackground from "./patterns/GridBackgound";
import { FONTS } from "@/shared/utils/fonts";
import Nav from "./Nav";
import HeroBoard from "./HeroBoardSection";
import HowItWorks from "./HowItWorkSection";
import Stats from "./ui/Stats";

// ---------------------------------------------------------------------------
// Design tokens (see plan): white + hairline grid, indigo display type,
// orange action accent, emerald reserved for "done" states only.
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
const Hero = () => (
  <section className="relative px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
    <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
      <span
        className="inline-flex items-center gap-2 text-[12px] font-medium px-3 py-1.5 rounded-full border"
        style={{
          color: "#1E1B4B",
          borderColor: "#E2E8F0",
          background: "#FAFAFB",
          fontFamily: FONTS.mono,
        }}
      >
        <Zap size={12} strokeWidth={2.5} color="#F97316" />
        Built for teams who ship together
      </span>

      <h1
        className="text-[38px] sm:text-[56px] leading-[1.08] md:text-[82px] font-semibold tracking-tight"
        style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
      >
        Create teams.
        <br />
        Manage projects.
        <br />
        <span style={{ color: "#F97316" }}>Assign tasks.</span>
      </h1>

      <p
        className="text-[16px] sm:text-[18px] md:text-[24px] max-w-xl leading-relaxed"
        style={{ color: "#64748B", fontFamily: FONTS.body }}
      >
        One workspace for every team in your company to plan projects, split
        the work into clear tasks, and see exactly who's doing what — without
        the status-update meetings.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-[15px] md:text-[20px] font-semibold px-6 py-3 rounded-xl text-white transition-transform hover:-translate-y-0.5"
          style={{ background: "#F97316", fontFamily: FONTS.body }}
        >
          Start your workspace
          <ArrowRight size={16} />
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-[15px] md:text-[20px] font-semibold px-6 py-3 rounded-xl border transition-colors hover:bg-[#FAFAFB]"
          style={{ color: "#1E1B4B", borderColor: "#E2E8F0", fontFamily: FONTS.body }}
        >
          See how it works
        </a>
      </div>

      <p
        className="text-[12px] mt-1"
        style={{ color: "#94A3B8", fontFamily: FONTS.mono }}
      >
        no credit card · free for teams up to 10
      </p>
    </div>

    <div className="mt-16">
      <HeroBoard />
    </div>
  </section>
);



// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------
const features = [
  {
    icon: Users,
    title: "Multi-team workspaces",
    body: "Keep every department in one account, each with its own boards and permissions.",
  },
  {
    icon: BarChart3,
    title: "Project timelines",
    body: "See milestones and workload across teams on a single shared calendar.",
  },
  {
    icon: MessageSquare,
    title: "Task-level comments",
    body: "Discuss the work right where it lives, so context never gets lost in chat.",
  },
  {
    icon: Bell,
    title: "Smart notifications",
    body: "People hear about what's assigned to them — nothing more, nothing less.",
  },
  {
    icon: Clock,
    title: "Due-date tracking",
    body: "Overdue and at-risk tasks surface automatically, before they become a problem.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    body: "Control who can create projects, assign tasks, or just view progress.",
  },
];

const Features = () => (
  <section className="px-6 py-24">
    <div className="max-w-6xl mx-auto">
      <div className="max-w-xl mb-16">
        <span
          className="text-[12px] font-semibold tracking-wide"
          style={{ color: "#F97316", fontFamily: FONTS.mono }}
        >
          PLATFORM
        </span>
        <h2
          className="text-[30px] sm:text-[38px] font-semibold tracking-tight mt-3"
          style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
        >
          Everything a growing team needs, nothing it doesn't.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="rounded-2xl border p-6 flex flex-col gap-4 transition-shadow hover:shadow-md"
              style={{ borderColor: "#E2E8F0", background: "#fff" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "#EEF2FF", color: "#1E1B4B" }}
              >
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
              >
                {f.title}
              </h3>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: "#64748B", fontFamily: FONTS.body }}
              >
                {f.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);



// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------
const CTA = () => (
  <section className="px-6 py-24">
    <div
      className="max-w-5xl mx-auto rounded-3xl relative overflow-hidden px-8 py-16 sm:py-20 text-center flex flex-col items-center gap-6"
      style={{ background: "#1E1B4B" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <h2
        className="relative text-[28px] sm:text-[38px] font-semibold tracking-tight max-w-xl leading-tight"
        style={{ color: "#fff", fontFamily: FONTS.display }}
      >
        Get your team out of scattered spreadsheets today
      </h2>
      <p
        className="relative text-[15px] max-w-md"
        style={{ color: "#C7C5E0", fontFamily: FONTS.body }}
      >
        Set up your first workspace in under five minutes. Free for teams up
        to 10 people.
      </p>
      <a
        href="#"
        className="relative inline-flex items-center gap-2 text-[15px] font-semibold px-7 py-3.5 rounded-xl text-white transition-transform hover:-translate-y-0.5"
        style={{ background: "#F97316", fontFamily: FONTS.body }}
      >
        Start free — no card required
        <ArrowRight size={16} />
      </a>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
const Footer = () => (
  <footer className="px-6 py-12 border-t" style={{ borderColor: "#E2E8F0" }}>
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center"
          style={{ background: "#1E1B4B" }}
        >
          <Layers size={14} color="#fff" strokeWidth={2.5} />
        </div>
        <span
          className="text-[15px] font-semibold"
          style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
        >
          Basecrew
        </span>
      </div>
      <p
        className="text-[13px]"
        style={{ color: "#94A3B8", fontFamily: FONTS.body }}
      >
        © {new Date().getFullYear()} Basecrew. All rights reserved.
      </p>
      <div className="flex items-center gap-6">
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a
            key={l}
            href="#"
            className="text-[13px] font-medium"
            style={{ color: "#64748B", fontFamily: FONTS.body }}
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ProjectLandingPage() {
  return (
    <div className="relative min-h-screen w-full" style={{ background: "#FFFFFF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
      `}</style>

      <div className="relative">
        <GridBackground />
        <Nav />
        <Hero />
      </div>

      <HowItWorks />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}