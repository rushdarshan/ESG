"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Fire,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const STATUSES = ["draft", "active", "under_review", "completed", "archived"] as const;
type ChallengeStatus = typeof STATUSES[number];

const MOCK_CHALLENGES = [
  { id: "1", title: "30-Day Bike Commute", category: "Transport", xp: 500, difficulty: "hard", status: "active" as ChallengeStatus, deadline: "2026-08-12", participants: 23 },
  { id: "2", title: "Zero Waste Week", category: "Waste", xp: 200, difficulty: "easy", status: "active" as ChallengeStatus, deadline: "2026-07-19", participants: 45 },
  { id: "3", title: "Energy Saving Sprint", category: "Energy", xp: 300, difficulty: "medium", status: "under_review" as ChallengeStatus, deadline: "2026-07-05", participants: 12 },
  { id: "4", title: "Tree Planting Drive", category: "Community", xp: 400, difficulty: "medium", status: "completed" as ChallengeStatus, deadline: "2026-06-30", participants: 67 },
];

const STATUS_COLORS: Record<ChallengeStatus, string> = {
  draft: "bg-slate-100 text-slate-600",
  active: "bg-emerald-100 text-emerald-700",
  under_review: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
  archived: "bg-slate-100 text-slate-400",
};

const FADE_UP = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

export default function ChallengesPage() {
  const [filter, setFilter] = useState<ChallengeStatus | "all">("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = filter === "all" ? MOCK_CHALLENGES : MOCK_CHALLENGES.filter((c) => c.status === filter);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] font-medium text-slate-400">
              Gamification
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              Challenges
            </motion.h1>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-medium text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            New Challenge
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                <p className="mb-4 text-sm font-semibold text-slate-800">Create Challenge</p>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Title" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400" />
                  <select className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400">
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                  </select>
                  <input placeholder="XP Reward" type="number" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400" />
                  <input placeholder="Deadline" type="date" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400" />
                </div>
                <button className="mt-4 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-emerald-700">
                  Save as Draft
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as ChallengeStatus | "all")}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors ${
                filter === s ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s === "all" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Challenge cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              variants={FADE_UP}
              initial="hidden"
              animate="show"
              transition={{ delay: i * 0.06 }}
              className="group rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                  <Fire className="h-5 w-5 text-amber-600" />
                </div>
                <span className={`rounded-lg px-2 py-1 text-[10px] font-medium ${STATUS_COLORS[c.status]}`}>
                  {c.status.replace("_", " ")}
                </span>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-slate-800">{c.title}</h3>
              <p className="mb-4 text-[11px] text-slate-400">{c.category}</p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[12px] text-slate-500">
                <span className="flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-amber-500" />{c.xp} XP</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{c.deadline}</span>
                <span className="flex items-center gap-1">{c.participants} joined</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
