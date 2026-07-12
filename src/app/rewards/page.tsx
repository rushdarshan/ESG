"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Lightning,
  Users,
  ArrowRight,
  SealCheck,
  Gift,
} from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIInsight } from "@/components/shared/AIInsight";

const BADGES = [
  { name: "First Action", desc: "Completed your first sustainable action", earned: true, icon: Star, color: "text-amber-500" },
  { name: "Green Commuter", desc: "5 bike-to-work actions logged", earned: true, icon: Trophy, color: "text-emerald-500" },
  { name: "Carbon Saver", desc: "Saved over 100 kg CO2e total", earned: true, icon: Trophy, color: "text-emerald-500" },
  { name: "Recycling Pro", desc: "10 recycling actions validated", earned: true, icon: Trophy, color: "text-blue-500" },
  { name: "Streak Master", desc: "7-day consecutive action streak", earned: false, icon: Lightning, color: "text-amber-500" },
  { name: "Century Club", desc: "100 total actions achieved", earned: false, icon: Trophy, color: "text-violet-500" },
  { name: "Team Leader", desc: "Top contributor in your department", earned: false, icon: Users, color: "text-blue-500" },
  { name: "Impact Pioneer", desc: "Reached 500 kg CO2e saved", earned: false, icon: Gift, color: "text-rose-500" },
];

const LEADERBOARD = [
  { rank: 1, name: "Priya Nair", dept: "Operations", xp: 2840, carbon: 312 },
  { rank: 2, name: "Ravi Teja", dept: "Facilities", xp: 2190, carbon: 247 },
  { rank: 3, name: "Arjun Mehta", dept: "Engineering", xp: 1950, carbon: 223 },
  { rank: 4, name: "Meera Iyer", dept: "HR", xp: 1720, carbon: 198 },
  { rank: 5, name: "Sneha Kapoor", dept: "Marketing", xp: 1480, carbon: 174 },
];

export default function RewardsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">Rewards</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">XP, badges, and department leaderboards</p>
          </div>

          <AIInsight
            title="Earn XP for every action"
            message="Submit evidence for 10 action types. AI validates each submission with confidence scoring. Higher confidence earns more XP."
            type="info"
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="rounded-2xl border border-slate-200/50 bg-white p-6 dark:border-zinc-800/50 dark:bg-zinc-900"
            >
              <h2 className="text-[15px] font-bold text-slate-900 dark:text-zinc-100">Badges</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {BADGES.map((b, i) => (
                  <motion.div
                    key={b.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i, type: "spring", stiffness: 100, damping: 20 }}
                    className={`flex flex-col items-center gap-2 rounded-xl p-3 text-center ${b.earned ? "bg-slate-50 dark:bg-zinc-800" : "bg-slate-50/50 opacity-40 dark:bg-zinc-800/50"}`}
                  >
                    <div className={`${b.earned ? b.color : "text-slate-300 dark:text-zinc-600"}`}>
                      <b.icon className="h-6 w-6" weight={b.earned ? "fill" : "regular"} />
                    </div>
                    <p className="text-[11px] font-medium text-slate-700 dark:text-zinc-300">{b.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
              className="rounded-2xl border border-slate-200/50 bg-white p-6 dark:border-zinc-800/50 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-slate-900 dark:text-zinc-100">Leaderboard</h2>
                <span className="text-[12px] text-slate-400 dark:text-zinc-500">Top contributors</span>
              </div>
              <div className="mt-5 divide-y divide-slate-100 dark:divide-zinc-800">
                {LEADERBOARD.map((p) => (
                  <div key={p.rank} className="flex items-center gap-3 py-2.5">
                    <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                      p.rank <= 3 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" : "bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}>
                      {p.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-slate-800 dark:text-zinc-200">{p.name}</p>
                      <p className="text-[11px] text-slate-400 dark:text-zinc-500">{p.dept}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">{p.xp} XP</p>
                      <p className="text-[11px] text-slate-400 dark:text-zinc-500">{p.carbon} kg CO2e</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
