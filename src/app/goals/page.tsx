"use client";

import { motion } from "framer-motion";
import {
  Target,
  TreeEvergreen,
  Users,
  ShieldCheck,
  ArrowUpRight,
  TrendUp,
  CalendarBlank,
} from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIInsight } from "@/components/shared/AIInsight";

const GOALS = [
  {
    category: "Environmental",
    icon: TreeEvergreen,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    bar: "bg-emerald-500",
    targets: [
      { label: "Scope 1 Reduction", current: 34, target: 50, unit: "%", deadline: "2027 Q2" },
      { label: "Renewable Energy", current: 22, target: 100, unit: "%", deadline: "2030 Q4" },
      { label: "Waste Diversion", current: 74, target: 90, unit: "%", deadline: "2026 Q4" },
    ],
  },
  {
    category: "Social",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    bar: "bg-blue-500",
    targets: [
      { label: "Employee Participation", current: 47, target: 80, unit: "%", deadline: "2027 Q1" },
      { label: "Actions Per Employee", current: 3.2, target: 8, unit: "/mo", deadline: "2027 Q3" },
      { label: "Departments Active", current: 5, target: 8, unit: "", deadline: "2026 Q4" },
    ],
  },
  {
    category: "Governance",
    icon: ShieldCheck,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/20",
    bar: "bg-violet-500",
    targets: [
      { label: "GRI Compliance", current: 68, target: 100, unit: "%", deadline: "2027 Q2" },
      { label: "CSRD Readiness", current: 41, target: 100, unit: "%", deadline: "2027 Q4" },
      { label: "Evidence Coverage", current: 73, target: 95, unit: "%", deadline: "2027 Q1" },
    ],
  },
];

function GoalProgress({ current, target, unit }: { current: number; target: number; unit: string }) {
  const pct = Math.min(Math.round((current / target) * 100), 100);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[13px]">
        <span className="font-medium text-slate-800 dark:text-zinc-200">{current}{unit}</span>
        <span className="text-slate-400 dark:text-zinc-500">{target}{unit}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 dark:bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.3 }}
          className={`h-full rounded-full ${pct >= 80 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-500" : "bg-slate-300 dark:bg-zinc-600"}`}
        />
      </div>
    </div>
  );
}

export default function GoalsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">Goals</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">SBTi-aligned targets across all three ESG pillars</p>
          </div>

          <AIInsight
            title="SBTi trajectory tracking"
            message="Goals are mapped against Science Based Targets initiative pathways. Progress updates automatically as new data is uploaded."
            type="info"
          />

          <div className="mt-8 grid gap-6">
            {GOALS.map((g, gi) => (
              <motion.div
                key={g.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 * gi }}
                className={`rounded-2xl border border-slate-200/50 p-6 dark:border-zinc-800/50 ${g.bg}`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${g.bg} ${g.color}`}>
                    <g.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-[17px] font-bold text-slate-900 dark:text-zinc-100">{g.category}</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {g.targets.map((t) => (
                    <div key={t.label} className="rounded-xl bg-white/80 p-4 backdrop-blur-sm dark:bg-zinc-900/80">
                      <p className="text-[13px] font-medium text-slate-700 dark:text-zinc-300">{t.label}</p>
                      <div className="mt-2.5">
                        <GoalProgress current={t.current} target={t.target} unit={t.unit} />
                      </div>
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-zinc-500">
                        <CalendarBlank className="h-3 w-3" />
                        Target: {t.deadline}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
