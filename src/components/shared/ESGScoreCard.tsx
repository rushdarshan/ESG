"use client";

import { motion } from "framer-motion";

interface ESGScoreCardProps {
  label: string;
  score: number;
  change?: number;
  color: "emerald" | "blue" | "violet" | "amber";
  delay?: number;
}

const COLOR_CLASSES: Record<string, { ring: string; text: string; bg: string; changePositive: string; changeNegative: string }> = {
  emerald: {
    ring: "stroke-emerald-500",
    text: "text-emerald-600",
    bg: "bg-emerald-50",
    changePositive: "text-emerald-600",
    changeNegative: "text-rose-600",
  },
  blue: {
    ring: "stroke-blue-500",
    text: "text-blue-600",
    bg: "bg-blue-50",
    changePositive: "text-blue-600",
    changeNegative: "text-rose-600",
  },
  violet: {
    ring: "stroke-violet-500",
    text: "text-violet-600",
    bg: "bg-violet-50",
    changePositive: "text-violet-600",
    changeNegative: "text-rose-600",
  },
  amber: {
    ring: "stroke-amber-500",
    text: "text-amber-600",
    bg: "bg-amber-50",
    changePositive: "text-amber-600",
    changeNegative: "text-rose-600",
  },
};

export function ESGScoreCard({ label, score, change, color, delay = 0 }: ESGScoreCardProps) {
  const classes = COLOR_CLASSES[color];
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className="flex flex-col gap-4"
    >
      <span className="text-[13px] font-medium text-slate-500">{label}</span>

      <div className="flex items-center gap-5">
        {/* Score ring */}
        <div className="relative h-20 w-20 flex-shrink-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="5"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              className={classes.ring}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: "easeOut", delay: delay + 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-bold tracking-tight ${classes.text}`}>
              {score}
            </span>
          </div>
        </div>

        {/* Change indicator */}
        {change !== undefined && (
          <div className="flex flex-col">
            <span
              className={`text-sm font-semibold ${
                change >= 0 ? classes.changePositive : classes.changeNegative
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-[11px] text-slate-400">vs last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
