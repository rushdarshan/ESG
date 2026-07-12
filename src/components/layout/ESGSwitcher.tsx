"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PILLARS = [
  { key: "environment", label: "Environment", color: "emerald" },
  { key: "social", label: "Social", color: "blue" },
  { key: "governance", label: "Governance", color: "violet" },
] as const;

const COLOR_MAP: Record<string, { bg: string; text: string; activeBg: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    activeBg: "bg-emerald-600",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    activeBg: "bg-blue-600",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    activeBg: "bg-violet-600",
  },
};

export function ESGSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const activePillar = PILLARS.find((p) =>
    pathname.startsWith(`/${p.key}`)
  );

  return (
    <div className="flex items-center gap-1 rounded-2xl bg-slate-100/80 p-1">
      {PILLARS.map((pillar) => {
        const isActive = activePillar?.key === pillar.key;
        const colors = COLOR_MAP[pillar.color];

        return (
          <button
            key={pillar.key}
            onClick={() => router.push(`/${pillar.key}`)}
            aria-current={isActive ? "page" : undefined}
            className={`relative rounded-xl px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
              isActive
                ? "text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="esg-pillar"
                className={`absolute inset-0 rounded-xl ${colors.activeBg}`}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{pillar.label}</span>
          </button>
        );
      })}
    </div>
  );
}
