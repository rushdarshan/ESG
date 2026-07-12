"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Flame,
  Target,
  Users,
  CheckCircle,
} from "@/lib/icons";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIInsight } from "@/components/shared/AIInsight";
import { ACTION_TYPES, EVIDENCE_OPTIONS } from "@/lib/actions";

const ACTION_LIST = ACTION_TYPES;

const FALLBACK_LEADERBOARD = [
  { rank: 1, name: "Priya Nair", dept: "Engineering", carbon: 42.8, xp: 1240, badge: "Tree Hugger" },
  { rank: 2, name: "Arjun Mehta", dept: "Operations", carbon: 38.2, xp: 1180, badge: "Green Commuter" },
  { rank: 3, name: "Sneha Kapoor", dept: "Marketing", carbon: 31.5, xp: 980, badge: "Recycling Pro" },
  { rank: 4, name: "Ravi Teja", dept: "Finance", carbon: 28.1, xp: 870, badge: null },
  { rank: 5, name: "Meera Iyer", dept: "HR", carbon: 24.6, xp: 760, badge: null },
  { rank: 6, name: "Vikram Rao", dept: "Engineering", carbon: 21.3, xp: 690, badge: null },
  { rank: 7, name: "Ananya Das", dept: "Sales", carbon: 18.9, xp: 580, badge: null },
  { rank: 8, name: "Karthik Menon", dept: "Operations", carbon: 15.4, xp: 470, badge: null },
];

const FALLBACK_BADGES = [
  { name: "Green Commuter", icon: "🚲", desc: "50 bike commutes logged", earned: true, progress: 100 },
  { name: "Tree Hugger", icon: "🌳", desc: "Plant 10 trees", earned: true, progress: 100 },
  { name: "Recycling Pro", icon: "♻️", desc: "100 recycling actions", earned: true, progress: 100 },
  { name: "Energy Saver", icon: "💡", desc: "25 energy suggestions", earned: false, progress: 68 },
  { name: "CSR Champion", icon: "🤝", desc: "5 volunteering sessions", earned: false, progress: 40 },
  { name: "Carbon Crusher", icon: "🏔️", desc: "Save 100 kg CO₂e", earned: false, progress: 82 },
];

const FALLBACK_STATS = [
  { label: "Total Actions", value: "1,284", icon: Target, color: "text-emerald-500" },
  { label: "Active Participants", value: "487", icon: Users, color: "text-blue-500" },
  { label: "Carbon Saved", value: "142.8 tCO₂e", icon: Flame, color: "text-amber-500" },
  { label: "Badges Earned", value: "892", icon: Trophy, color: "text-violet-500" },
];

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

interface LeaderboardEntry {
  rank: number; name: string; dept: string; carbon: number; xp: number; badge: string | null;
}

export default function SocialPage() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(FALLBACK_LEADERBOARD);
  const [badges] = useState(FALLBACK_BADGES);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [evidenceType, setEvidenceType] = useState("self_report");
  const [evidenceData, setEvidenceData] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/actions?leaderboard=true")
      .then((r) => r.json())
      .then((data: { departmentName: string; totalCarbonSaved: number; totalXP: number; actionCount: number }[]) => {
        setLeaderboard(
          data.map((d, i) => ({
            rank: i + 1,
            name: d.departmentName,
            dept: d.departmentName,
            carbon: d.totalCarbonSaved,
            xp: d.totalXP,
            badge: null,
          }))
        );
        const totalCarbon = data.reduce((s, d) => s + d.totalCarbonSaved, 0);
        const totalActions = data.reduce((s, d) => s + d.actionCount, 0);
        setStats([
          { label: "Total Actions", value: totalActions.toLocaleString(), icon: Target, color: "text-emerald-500" },
          { label: "Active Participants", value: `${data.length} depts`, icon: Users, color: "text-blue-500" },
          { label: "Carbon Saved", value: totalCarbon >= 1000 ? `${(totalCarbon / 1000).toFixed(1)} tCO₂e` : `${totalCarbon.toFixed(1)} kg CO₂e`, icon: Flame, color: "text-amber-500" },
          { label: "Badges Earned", value: "892", icon: Trophy, color: "text-violet-500" },
        ]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch("/api/scenarios")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => data?.scenarios?.[0]?.id
        ? fetch(`/api/scenarios?organizationId=${data.scenarios[0].id}`)
        : null)
      .then((response) => response?.ok ? response.json() : null)
      .then((data) => setEmployeeId(data?.employees?.[0]?.id ?? null))
      .catch(() => undefined);
  }, []);

  const handleSubmit = async () => {
    if (!selectedAction || !employeeId || !evidenceData.trim()) {
      setSubmissionMessage("Add a short evidence description before submitting.");
      return;
    }

    setSubmitting(true);
    setSubmissionMessage(null);
    try {
      const response = await fetch("/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actionType: selectedAction,
          employeeId,
          evidence: { type: evidenceType, data: evidenceData.trim() },
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not submit the action.");

      setSubmissionMessage(
        result.status === "approved"
          ? `Action approved: +${result.xp} XP and ${result.carbonSaved} kg CO₂e.`
          : "Action submitted for review."
      );
      setSelectedAction(null);
      setEvidenceData("");
    } catch (error) {
      setSubmissionMessage(error instanceof Error ? error.message : "Could not submit the action.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-8 grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            className="app-page-kicker"
            >
              Social Module
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2"
            >
              Employee Sustainability Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="app-page-copy"
            >
              Earn XP, climb the leaderboard, and reduce your carbon footprint
            </motion.p>
          </div>

          {/* User XP card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-4 rounded-2xl border border-[#c9daea] bg-[#dce9f6] px-5 py-3 shadow-none"
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
          className="app-stat-grid mb-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={FADE_UP}
                className="app-stat p-5"
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
              className="app-panel p-6"
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
                    onClick={() => {
                      setSelectedAction(selectedAction === action.id ? null : action.id);
                      setSubmissionMessage(null);
                    }}
                    className={`group flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors active:scale-[0.97] ${
                      selectedAction === action.id
                        ? "border-emerald-300 bg-emerald-50 shadow-md"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{action.icon}</span>
                      <span className="text-[13px] font-semibold text-slate-800">
                        {action.name}
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
                          <p className="mt-1 text-[12px] text-slate-500">Choose evidence and briefly describe it.</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <select
                          value={evidenceType}
                          onChange={(event) => setEvidenceType(event.target.value)}
                          aria-label="Evidence type"
                          className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-emerald-500"
                        >
                          {EVIDENCE_OPTIONS.map((option) => (
                            <option key={option.type} value={option.type}>{option.label}</option>
                          ))}
                        </select>
                        <input
                          value={evidenceData}
                          onChange={(event) => setEvidenceData(event.target.value)}
                          placeholder="For example: Cycled 4 km to the office"
                          className="min-w-0 flex-1 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={submitting || !employeeId}
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {submitting ? "Submitting..." : "Submit Action"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {submissionMessage && (
              <p
                role="status"
                className={`rounded-xl px-4 py-3 text-[13px] ${submissionMessage.startsWith("Action approved") || submissionMessage.startsWith("Action submitted") ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
              >
                {submissionMessage}
              </p>
            )}

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="app-panel p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Department Leaderboard
                </h2>
                <span className="text-[11px] text-slate-400">This month</span>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-10 text-sm text-slate-400">Loading leaderboard…</div>
              ) : (
              <div className="space-y-1">
                {leaderboard.map((person, i) => (
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
            )}
            </motion.div>
          </div>

          {/* Right: Badges + Impact */}
          <div className="space-y-6">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="app-panel p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">Badges</h2>
                <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">
                  {badges.filter((b) => b.earned).length} of {badges.length} earned
                </span>
              </div>
              <div className="space-y-3">
                {badges.map((badge, i) => (
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
              className="app-panel p-6"
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
