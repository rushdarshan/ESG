"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle, Plus, Clock } from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const PRIORITY_COLORS: Record<string, string> = {
  high: "text-rose-600 bg-rose-50",
  medium: "text-amber-600 bg-amber-50",
  low: "text-emerald-600 bg-emerald-50",
};

const INITIAL_GOALS = [
  { id: "1", title: "Reduce Scope 1 emissions by 20%", target: "20% reduction", deadline: "2026-12-31", progress: 45, priority: "high", status: "active" },
  { id: "2", title: "Achieve 100% renewable electricity", target: "100% renewables", deadline: "2027-06-30", progress: 62, priority: "high", status: "active" },
  { id: "3", title: "Zero waste to landfill", target: "95% diversion", deadline: "2026-09-30", progress: 74, priority: "medium", status: "active" },
  { id: "4", title: "Employee sustainability training", target: "500 hours", deadline: "2026-08-31", progress: 340, priority: "low", status: "active" },
];

export default function GoalsPage() {
  const [goals] = useState(INITIAL_GOALS);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] font-medium text-slate-400">Management</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Sustainability Goals
            </motion.h1>
          </div>
          <motion.button initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-medium text-white shadow-lg transition-colors hover:bg-emerald-700 active:scale-[0.98]">
            <Plus className="h-4 w-4" /> New Goal
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {goals.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <span className={`rounded-lg px-2 py-1 text-[10px] font-medium ${PRIORITY_COLORS[g.priority]}`}>
                  {g.priority}
                </span>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-slate-800">{g.title}</h3>
              <p className="mb-3 text-[12px] text-slate-500">Target: {g.target}</p>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-900">{g.progress}{typeof g.progress === 'number' && g.target.includes('%') ? '%' : ''}</span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3" /> {g.deadline}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${typeof g.progress === 'number' && g.target.includes('%') ? g.progress : (g.progress / 500) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
