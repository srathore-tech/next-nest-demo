// ---------------------------------------------------------------------------
// Stats strip

import { FONTS } from "@/shared/utils/fonts";

// ---------------------------------------------------------------------------
const stats = [
  { value: "12,400+", label: "teams onboarded" },
  { value: "2.3M", label: "tasks completed" },
  { value: "98%", label: "on-time delivery rate" },
  { value: "40%", label: "fewer status meetings" },
];

const Stats = () => (
  <section className="px-6 py-16 border-y" style={{ borderColor: "#E2E8F0", background: "#FAFAFB" }}>
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((s) => (
        <div key={s.label} className="text-center md:text-left">
          <p
            className="text-[28px] sm:text-[32px] font-semibold"
            style={{ color: "#1E1B4B", fontFamily: FONTS.display }}
          >
            {s.value}
          </p>
          <p
            className="text-[13px] mt-1"
            style={{ color: "#64748B", fontFamily: FONTS.body }}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>
  </section>
);


export default Stats