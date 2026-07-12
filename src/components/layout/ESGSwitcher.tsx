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
    activeBg: "bg-[#dcebc7]",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    activeBg: "bg-[#dce9f6]",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    activeBg: "bg-[#e8def4]",
  },
};

export function ESGSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const activePillar = PILLARS.find((p) =>
    pathname.startsWith(`/${p.key}`)
  );

  return (
    <div className="flex items-center gap-1 rounded-full border border-[#d8dfd3] bg-[#edf1e9] p-1">
      {PILLARS.map((pillar) => {
        const isActive = activePillar?.key === pillar.key;
        const colors = COLOR_MAP[pillar.color];

        return (
          <button
            key={pillar.key}
            onClick={() => router.push(`/${pillar.key}`)}
            aria-current={isActive ? "page" : undefined}
            className={`relative min-h-9 rounded-full px-4 text-[13px] font-semibold transition-colors duration-200 ${
              isActive
                ? pillar.color === "emerald" ? "text-[#17341f]" : pillar.color === "blue" ? "text-[#173044]" : "text-[#392451]"
                : "text-[#6a786f] hover:text-[#17341f]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="esg-pillar"
                className={`absolute inset-0 rounded-full ${colors.activeBg}`}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className="relative z-10">{pillar.label}</span>
          </button>
        );
      })}
    </div>
  );
}
