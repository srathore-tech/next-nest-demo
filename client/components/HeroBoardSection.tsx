"use client"
// ---------------------------------------------------------------------------
// Signature hero element: a live-feeling 3 column board mirroring the
// tagline itself — Create team / Manage projects / Assign tasks.

import { FONTS } from "@/shared/utils/fonts";
import { CheckCircle2, Circle, FolderKanban, ListChecks, Users } from "lucide-react";
import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
const columns = [
  {
    label: "Create team",
    icon: Users,
    cards: [
      { title: "Design", meta: "6 members", tone: "neutral" },
      { title: "Engineering", meta: "9 members", tone: "neutral" },
    ],
  },
  {
    label: "Manage projects",
    icon: FolderKanban,
    cards: [
      { title: "Q3 Website Revamp", meta: "12 tasks", tone: "active" },
      { title: "Mobile App v2", meta: "8 tasks", tone: "neutral" },
    ],
  },
  {
    label: "Assign tasks",
    icon: ListChecks,
    cards: [
      { title: "Wireframe checkout", meta: "Priya · Due Fri", tone: "done" },
      { title: "API rate limiting", meta: "Sam · In progress", tone: "active" },
    ],
  },
];

const CardTone = ({ tone }: { tone: string }) => {
  if (tone === "done")
    return (
      <span
        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
        style={{ color: "#10B981", background: "#ECFDF5", fontFamily: FONTS.mono }}
      >
        <CheckCircle2 size={12} strokeWidth={2.5} />
        done
      </span>
    );
  if (tone === "active")
    return (
      <span
        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
        style={{ color: "#F97316", background: "#FFF7ED", fontFamily: FONTS.mono }}
      >
        <Circle size={8} fill="#F97316" strokeWidth={0} />
        active
      </span>
    );
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
      style={{ color: "#64748B", background: "#F1F5F9", fontFamily: FONTS.mono }}
    >
      queued
    </span>
  );
};

const HeroBoard = () => {
  const [lift, setLift] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLift(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
      {columns.map((col, ci) => {
        const Icon = col.icon;
        return (
          <div
            key={col.label}
            className="rounded-2xl border bg-white/80 backdrop-blur-sm p-3 flex flex-col gap-3 transition-all duration-700"
            style={{
              borderColor: "#E2E8F0",
              boxShadow: "0 1px 2px rgba(30,27,75,0.04)",
              transitionDelay: `${ci * 120}ms`,
              transform: lift ? "translateY(0)" : "translateY(14px)",
              opacity: lift ? 1 : 0,
            }}
          >
            <div className="flex items-center gap-2 px-1">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                style={{ background: "#EEF2FF", color: "#1E1B4B" }}
              >
                <Icon size={13} strokeWidth={2.25} />
              </div>
              <span
                className="text-[12px] font-semibold tracking-wide"
                style={{ color: "#1E1B4B", fontFamily: FONTS.mono }}
              >
                {col.label}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {col.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border p-3 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
                  style={{ borderColor: "#EDF0F4", background: "#FCFCFD" }}
                >
                  <p
                    className="text-[13px] font-medium leading-snug"
                    style={{ color: "#1E1B4B", fontFamily: FONTS.body }}
                  >
                    {card.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px]"
                      style={{ color: "#64748B", fontFamily: FONTS.mono }}
                    >
                      {card.meta}
                    </span>
                    <CardTone tone={card.tone} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default HeroBoard;