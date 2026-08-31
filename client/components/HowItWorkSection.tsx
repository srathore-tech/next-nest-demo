// ---------------------------------------------------------------------------
// How it works — a genuine 3-step sequence, so numbered markers earn
// their place here (unlike the feature grid below).

import { FONTS } from "@/shared/utils/fonts";
import { FolderKanban, ListChecks, Users } from "lucide-react";

// ---------------------------------------------------------------------------
const steps = [
  {
    n: "01",
    icon: Users,
    title: "Create your team",
    body: "Invite people, group them by department or squad, and set who can see what. Every team gets its own space.",
  },
  {
    n: "02",
    icon: FolderKanban,
    title: "Manage the project",
    body: "Lay out milestones, timelines, and files in one place all teams pull from — no more scattered spreadsheets.",
  },
  {
    n: "03",
    icon: ListChecks,
    title: "Assign the tasks",
    body: "Break work into tasks, assign an owner and a due date, and track progress from queued to done in real time.",
  },
];

const HowItWorks = () => (
  <section className="relative px-6 py-24" style={{ background: "#FAFAFB" }}>
    <div className="max-w-6xl mx-auto">
      <div className="max-w-xl mb-16">
        <span
          className="text-[12px] font-semibold tracking-wide"
          style={{ color: "#F97316", fontFamily: FONTS.mono }}
        >
          HOW IT WORKS
        </span>
        <h2
          className="text-[30px] sm:text-[38px] font-semibold tracking-tight mt-3"
          style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
        >
          Three steps. Every team, on the same page.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.n} className="relative flex flex-col gap-4">
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-6 left-[calc(100%_-_1rem)] w-[calc(100%_-_2rem)] h-px"
                  style={{ background: "#E2E8F0" }}
                />
              )}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#1E1B4B" }}
                >
                  <Icon size={20} color="#fff" strokeWidth={2} />
                </div>
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: "#CBD5E1", fontFamily: FONTS.mono }}
                >
                  {s.n}
                </span>
              </div>
              <h3
                className="text-[19px] font-semibold"
                style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
              >
                {s.title}
              </h3>
              <p
                className="text-[14.5px] leading-relaxed"
                style={{ color: "#64748B", fontFamily: FONTS.body }}
              >
                {s.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);


export default HowItWorks;