"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Flame,
  Target,
  Users,
  CheckCircle,
} from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIInsight } from "@/components/shared/AIInsight";
import { ACTION_CATALOG, type ActionType } from "@/types";

const ACTION_LIST = Object.entries(ACTION_CATALOG).map(([key, val]) => ({
  id: key as ActionType,
  ...val,
}));

const LEADERBOARD = [
  { rank: 1, name: "Priya Nair", dept: "Engineering", carbon: 42.8, xp: 1240, badge: "Tree Hugger" },
  { rank: 2, name: "Arjun Mehta", dept: "Operations", carbon: 38.2, xp: 1180, badge: "Green Commuter" },
  { rank: 3, name: "Sneha Kapoor", dept: "Marketing", carbon: 31.5, xp: 980, badge: "Recycling Pro" },
  { rank: 4, name: "Ravi Teja", dept: "Finance", carbon: 28.1, xp: 870, badge: null },
  { rank: 5, name: "Meera Iyer", dept: "HR", carbon: 24.6, xp: 760, badge: null },
  { rank: 6, name: "Vikram Rao", dept: "Engineering", carbon: 21.3, xp: 690, badge: null },
  { rank: 7, name: "Ananya Das", dept: "Sales", carbon: 18.9, xp: 580, badge: null },
  { rank: 8, name: "Karthik Menon", dept: "Operations", carbon: 15.4, xp: 470, badge: null },
];

const BADGES = [
  { name: "Green Commuter", icon: "🚲", desc: "50 bike commutes logged", earned: true, progress: 100 },
  { name: "Tree Hugger", icon: "🌳", desc: "Plant 10 trees", earned: true, progress: 100 },
  { name: "Recycling Pro", icon: "♻️", desc: "100 recycling actions", earned: true, progress: 100 },
  { name: "Energy Saver", icon: "💡", desc: "25 energy suggestions", earned: false, progress: 68 },
  { name: "CSR Champion", icon: "🤝", desc: "5 volunteering sessions", earned: false, progress: 40 },
  { name: "Carbon Crusher", icon: "🏔️", desc: "Save 100 kg CO₂e", earned: false, progress: 82 },
];

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

export default function SocialPage() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-8 grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[13px] font-medium text-slate-400"
            >
              Social Module
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              Employee Sustainability Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm text-slate-500"
            >
              Earn XP, climb the leaderboard, and reduce your carbon footprint
            </motion.p>
          </div>

          {/* User XP card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-4 rounded-2xl border border-slate-200/50 bg-white px-5 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-lg font-bold text-emerald-600">
              DS
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-800">Darshan S.</p>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-emerald-600">1,240 XP</span>
                <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600">
                  Level 12
                </span>
              </div>
            </div>
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
            type="success"
            title="Impact Multiplier"
            message="If 500 employees biked to work twice a week, GreenForge would save 270 tCO₂e/year — equivalent to planting 12,000 trees."
          />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {[
            { label: "Total Actions", value: "1,284", icon: Target, color: "text-emerald-500" },
            { label: "Active Participants", value: "487", icon: Users, color: "text-blue-500" },
            { label: "Carbon Saved", value: "142.8 tCO₂e", icon: Flame, color: "text-amber-500" },
            { label: "Badges Earned", value: "892", icon: Trophy, color: "text-violet-500" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={FADE_UP}
                className="rounded-2xl border border-slate-200/50 bg-white p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
              >
                <Icon className={`h-5 w-5 ${stat.color}`} />
                <p className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[12px] text-slate-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main content — 2-column */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
          {/* Left: Action Catalog */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <h2 className="mb-5 text-sm font-semibold text-slate-800">
                Log an Action
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {ACTION_LIST.map((action, i) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.03 }}
                    onClick={() =>
                      setSelectedAction(
                        selectedAction === action.id ? null : action.id
                      )
                    }
                    className={`group flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors active:scale-[0.97] ${
                      selectedAction === action.id
                        ? "border-emerald-300 bg-emerald-50 shadow-md"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{action.icon}</span>
                      <span className="text-[13px] font-semibold text-slate-800">
                        {action.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>+{action.baseXP} XP</span>
                      <span>{action.baseCarbon} kg CO₂e</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Selected action submission */}
              <AnimatePresence>
                {selectedAction && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800">
                            Submit Evidence
                          </p>
                          <p className="mt-1 text-[12px] text-slate-500">
                            Upload photo, receipt, or self-report
                          </p>
                        </div>
                        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-emerald-700 active:scale-[0.98]">
                          Submit Action
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Department Leaderboard
                </h2>
                <span className="text-[11px] text-slate-400">This month</span>
              </div>
              <div className="space-y-1">
                {LEADERBOARD.map((person, i) => (
                  <motion.div
                    key={person.rank}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.04 }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-slate-50 ${
                      person.name === "Priya Nair" ? "bg-emerald-50/50" : ""
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-bold ${
                        person.rank === 1
                          ? "bg-amber-50 text-amber-600"
                          : person.rank === 2
                          ? "bg-slate-100 text-slate-600"
                          : person.rank === 3
                          ? "bg-orange-50 text-orange-600"
                          : "bg-slate-50 text-slate-400"
                      }`}
                    >
                      {person.rank}
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
                      {person.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-slate-800">
                        {person.name}
                      </p>
                      <p className="text-[11px] text-slate-400">{person.dept}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-semibold text-slate-900">
                        {person.carbon} kg
                      </p>
                      <p className="text-[11px] text-slate-400">{person.xp} XP</p>
                    </div>
                    {person.badge && (
                      <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">
                        {person.badge}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Badges + Impact */}
          <div className="space-y-6">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">Badges</h2>
                <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">
                  3 of 6 earned
                </span>
              </div>
              <div className="space-y-3">
                {BADGES.map((badge, i) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                      badge.earned ? "bg-emerald-50/50" : "opacity-60"
                    }`}
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-slate-800">
                        {badge.name}
                      </p>
                      <p className="text-[11px] text-slate-400">{badge.desc}</p>
                      {!badge.earned && (
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-400"
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {badge.earned && (
                      <CheckCircle
                        className="h-4 w-4 flex-shrink-0 text-emerald-500"
                        weight="fill"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Impact summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <h2 className="mb-4 text-sm font-semibold text-slate-800">
                Collective Impact
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Trees equivalent", value: "6,490", icon: "🌳" },
                  { label: "Cars off road", value: "31", icon: "🚗" },
                  { label: "Homes powered", value: "18", icon: "🏠" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-lg font-bold text-slate-900">{item.value}</p>
                      <p className="text-[11px] text-slate-400">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
