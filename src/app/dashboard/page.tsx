"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TreeEvergreen,
  Users,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Lightning,
  Drop,
  Trophy,
  Target,
  Warning,
} from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIInsight } from "@/components/shared/AIInsight";

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

const MODULES = [
  {
    title: "Environment",
    href: "/environment",
    icon: TreeEvergreen,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    stats: [
      { label: "Electricity", value: "128,450 kWh", change: "+4.2%" },
      { label: "Fleet Fuel", value: "8,500 L", change: "-8.1%" },
      { label: "Waste Diverted", value: "74%", change: "+12%" },
    ],
  },
  {
    title: "Social",
    href: "/social",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
    stats: [
      { label: "Actions Logged", value: "1,284", change: "+18%" },
      { label: "Active Members", value: "487", change: "+5%" },
      { label: "Carbon Saved", value: "142.8 tCO₂e", change: "+22%" },
    ],
  },
  {
    title: "Governance",
    href: "/governance",
    icon: ShieldCheck,
    color: "text-violet-600",
    bg: "bg-violet-50",
    stats: [
      { label: "GRI Score", value: "70%", change: "" },
      { label: "CSRD Score", value: "72%", change: "" },
      { label: "Open Gaps", value: "2", change: "" },
    ],
  },
];

const RECENT_ACTIONS = [
  { user: "Priya Nair", action: "Biked to work", xp: "+15 XP", time: "2h ago" },
  { user: "Arjun Mehta", action: "Recycled electronics", xp: "+25 XP", time: "3h ago" },
  { user: "Sneha Kapoor", action: "LED replacement", xp: "+20 XP", time: "5h ago" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-8">
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
            ESG Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-sm text-slate-500"
          >
            Your organization&apos;s environmental, social, and governance performance at a glance
          </motion.p>
        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <AIInsight
            type="success"
            title="Overall Progress"
            message="Your ESG score improved 8% this quarter. Environmental metrics lead with strong waste diversion, while governance compliance needs attention on 2 GRI disclosures."
          />
        </motion.div>

        {/* Summary stats */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {[
            { label: "Carbon Footprint", value: "342 tCO₂e", icon: Lightning, color: "text-amber-500", change: "-6.2%" },
            { label: "Water Usage", value: "45,000 L", icon: Drop, color: "text-blue-500", change: "+1.3%" },
            { label: "Employee Actions", value: "1,284", icon: Target, color: "text-emerald-500", change: "+18%" },
            { label: "Badges Earned", value: "892", icon: Trophy, color: "text-violet-500", change: "+12%" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={FADE_UP}
                className="rounded-2xl border border-slate-200/50 bg-white p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" weight="bold" />
                    {stat.change}
                  </span>
                </div>
                <p className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[12px] text-slate-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Module cards */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <motion.div key={mod.title} variants={FADE_UP}>
                <Link
                  href={mod.href}
                  className="group block rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${mod.bg}`}>
                        <Icon className={`h-5 w-5 ${mod.color}`} />
                      </div>
                      <h2 className="text-sm font-semibold text-slate-800">
                        {mod.title}
                      </h2>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-slate-500" />
                  </div>
                  <div className="space-y-3">
                    {mod.stats.map((s) => (
                      <div key={s.label} className="flex items-center justify-between">
                        <span className="text-[12px] text-slate-500">{s.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold text-slate-900">{s.value}</span>
                          {s.change && (
                            <span className="text-[10px] font-medium text-emerald-600">{s.change}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom row — Recent activity + Compliance summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
          {/* Recent social actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">
                Recent Activity
              </h2>
              <Link
                href="/social"
                className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 hover:text-emerald-700"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-1">
              {RECENT_ACTIONS.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
                    {a.user.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-slate-800">
                      {a.user}
                    </p>
                    <p className="text-[11px] text-slate-400">{a.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-semibold text-emerald-600">{a.xp}</p>
                    <p className="text-[10px] text-slate-400">{a.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Compliance summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">
                Compliance Status
              </h2>
              <Link
                href="/governance"
                className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 hover:text-emerald-700"
              >
                Details <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { label: "GRI Standards", score: 70, color: "bg-emerald-500" },
                { label: "CSRD / ESRS", score: 72, color: "bg-blue-500" },
              ].map((fw, i) => (
                <motion.div
                  key={fw.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 + i * 0.1 }}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[13px] font-medium text-slate-700">{fw.label}</span>
                    <span className="text-[13px] font-bold text-slate-900">{fw.score}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fw.score}%` }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${fw.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 space-y-2">
              {[
                { label: "GRI 305-5 — Emissions reduction", status: "gap" },
                { label: "GRI 403-2 — Workplace injury rates", status: "gap" },
              ].map((gap, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2">
                  <Warning className="h-3.5 w-3.5 text-rose-500" weight="fill" />
                  <span className="text-[11px] text-rose-700">{gap.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
