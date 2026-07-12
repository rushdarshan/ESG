"use client";

import { motion } from "framer-motion";
import {
  TreeEvergreen,
  Users,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Warning,
  CheckCircle,
  Clock,
} from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ESGScoreCard } from "@/components/shared/ESGScoreCard";
import { AIInsight } from "@/components/shared/AIInsight";

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

const RECENT_ACTIONS = [
  { name: "Priya Nair", action: "Bike Commute", xp: "+10 XP", time: "2h ago", carbon: "2.6 kg" },
  { name: "Arjun Mehta", action: "Tree Planting", xp: "+20 XP", time: "4h ago", carbon: "21.0 kg" },
  { name: "Sneha Kapoor", action: "Recycling", xp: "+6 XP", time: "5h ago", carbon: "1.2 kg" },
  { name: "Ravi Teja", action: "Public Transport", xp: "+8 XP", time: "6h ago", carbon: "1.8 kg" },
  { name: "Meera Iyer", action: "Work From Home", xp: "+5 XP", time: "8h ago", carbon: "1.5 kg" },
];

const ALERTS = [
  { type: "warning" as const, message: "Fleet diesel consumption spiked 512% MoM — investigate fuel records", time: "1h ago" },
  { type: "success" as const, message: "Monthly waste diversion rate hit 74% — on track for Q3 target", time: "3h ago" },
  { type: "info" as const, message: "3 new CSRD disclosure gaps identified in Governance module", time: "5h ago" },
];

export default function ExecutiveDashboard() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        {/* Header — asymmetric layout */}
        <div className="mb-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[13px] font-medium text-slate-400"
            >
              Executive Overview
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              GreenForge Industries
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm text-slate-500"
            >
              Sustainability snapshot — July 2026
            </motion.p>
          </div>

          {/* Period selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex gap-1 rounded-xl bg-slate-100/80 p-1"
          >
            {["Week", "Month", "Quarter", "Year"].map((p, i) => (
              <button
                key={p}
                className={`rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  i === 1
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {p}
              </button>
            ))}
          </motion.div>
        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <AIInsight
            type="info"
            title="AI Recommendation"
            message="Switching to solar panels would reduce your Scope 2 emissions by 22% and save $48,200 annually. The payback period is 3.2 years based on your current electricity spend."
          />
        </motion.div>

        {/* Overall score — large hero card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]"
        >
          {/* Main score */}
          <div className="rounded-[2rem] border border-slate-200/50 bg-white p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-medium text-slate-400">Overall ESG Score</p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-6xl font-bold tracking-tighter text-slate-900">
                    82
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" weight="bold" />
                    +4.2%
                  </span>
                </div>
                <p className="mt-2 text-[13px] text-slate-400">
                  Last updated 12 minutes ago
                </p>
              </div>

              {/* Mini sparkline placeholder */}
              <div className="flex h-16 w-32 items-end gap-1">
                {[40, 55, 45, 60, 58, 72, 68, 78, 75, 82].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 120 }}
                    className="flex-1 rounded-sm bg-emerald-200/60"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-col gap-4">
            {[
              { label: "Total Carbon Saved", value: "142.8 tCO₂e", change: "+12%", positive: true },
              { label: "Active Employees", value: "487", change: "+23", positive: true },
              { label: "Actions This Month", value: "1,284", change: "+18%", positive: true },
              { label: "Compliance Score", value: "78%", change: "-2%", positive: false },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center justify-between rounded-2xl border border-slate-200/50 bg-white px-5 py-3.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
              >
                <div>
                  <p className="text-[11px] font-medium text-slate-400">{stat.label}</p>
                  <p className="mt-0.5 text-lg font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    stat.positive ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" weight="bold" />
                  )}
                  {stat.change}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pillar scores */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div
            variants={FADE_UP}
            className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <TreeEvergreen className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Environmental</p>
                <p className="text-[11px] text-slate-400">Scope 1 + 2 + 3</p>
              </div>
            </div>
            <ESGScoreCard label="Score" score={79} change={5.3} color="emerald" />
          </motion.div>

          <motion.div
            variants={FADE_UP}
            className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Social</p>
                <p className="text-[11px] text-slate-400">Employee engagement</p>
              </div>
            </div>
            <ESGScoreCard label="Score" score={88} change={3.1} color="blue" />
          </motion.div>

          <motion.div
            variants={FADE_UP}
            className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                <ShieldCheck className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Governance</p>
                <p className="text-[11px] text-slate-400">Compliance & evidence</p>
              </div>
            </div>
            <ESGScoreCard label="Score" score={78} change={-1.8} color="violet" />
          </motion.div>
        </motion.div>

        {/* Bottom section — asymmetric 2-col */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[5fr_3fr]">
          {/* Recent actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">Recent Actions</h2>
              <span className="text-[11px] text-slate-400">Last 24h</span>
            </div>
            <div className="space-y-3">
              {RECENT_ACTIONS.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.06 }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[12px] font-semibold text-slate-600">
                      {a.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-slate-800">{a.name}</p>
                      <p className="text-[11px] text-slate-400">{a.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-[13px] font-semibold text-emerald-600">{a.xp}</p>
                      <p className="text-[11px] text-slate-400">{a.carbon} CO₂e</p>
                    </div>
                    <span className="text-[11px] text-slate-300">{a.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">Alerts</h2>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-50 text-[11px] font-semibold text-rose-600">
                {ALERTS.length}
              </span>
            </div>
            <div className="space-y-3">
              {ALERTS.map((alert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.06 }}
                  className="flex gap-3 rounded-xl px-4 py-3"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {alert.type === "warning" && (
                      <Warning className="h-4 w-4 text-amber-500" weight="fill" />
                    )}
                    {alert.type === "success" && (
                      <CheckCircle className="h-4 w-4 text-emerald-500" weight="fill" />
                    )}
                    {alert.type === "info" && (
                      <Clock className="h-4 w-4 text-blue-500" weight="fill" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] leading-relaxed text-slate-700">
                      {alert.message}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">{alert.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
