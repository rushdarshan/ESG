"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GearSix, Users, Folder, Sliders, Bell } from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const TABS = [
  { id: "departments", label: "Departments", icon: Users },
  { id: "categories", label: "Categories", icon: Folder },
  { id: "config", label: "ESG Configuration", icon: Sliders },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const DEPARTMENTS = [
  { name: "Engineering", code: "ENG", head: "Priya Nair", count: 45, status: "active" },
  { name: "Operations", code: "OPS", head: "Arjun Mehta", count: 32, status: "active" },
  { name: "Marketing", code: "MKT", head: "Sneha Kapoor", count: 18, status: "active" },
  { name: "Finance", code: "FIN", head: "Ravi Teja", count: 12, status: "active" },
  { name: "HR", code: "HR", head: "Meera Iyer", count: 8, status: "active" },
];

const CATEGORIES = [
  { name: "Tree Planting", type: "CSR Activity", status: "active" },
  { name: "Beach Cleanup", type: "CSR Activity", status: "active" },
  { name: "Transport Challenge", type: "Challenge", status: "active" },
  { name: "Energy Challenge", type: "Challenge", status: "active" },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("departments");

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1200px]">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] font-medium text-slate-400">Administration</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-2 mb-8 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Settings
        </motion.h1>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-colors ${
                  tab === t.id ? "bg-emerald-600 text-white shadow-lg" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Departments */}
        {tab === "departments" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[2rem] border border-slate-200/50 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Code</th>
                    <th className="px-6 py-4">Head</th>
                    <th className="px-6 py-4">Employees</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {DEPARTMENTS.map((d, i) => (
                    <tr key={d.name} className="border-b border-slate-50 text-[13px] text-slate-700 last:border-0 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">{d.name}</td>
                      <td className="px-6 py-4 text-slate-400">{d.code}</td>
                      <td className="px-6 py-4">{d.head}</td>
                      <td className="px-6 py-4">{d.count}</td>
                      <td className="px-6 py-4"><span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">{d.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Categories */}
        {tab === "categories" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[2rem] border border-slate-200/50 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {CATEGORIES.map((c) => (
                    <tr key={c.name} className="border-b border-slate-50 text-[13px] text-slate-700 last:border-0 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">{c.name}</td>
                      <td className="px-6 py-4 text-slate-400">{c.type}</td>
                      <td className="px-6 py-4"><span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ESG Config */}
        {tab === "config" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {[
              { label: "Auto Emission Calculation", desc: "Calculate carbon transactions from linked Purchase/Manufacturing/Expense/Fleet records", enabled: true },
              { label: "Evidence Requirement", desc: "Require proof file for CSR Activity approval", enabled: false },
              { label: "Badge Auto-Award", desc: "Auto-assign badges when unlock conditions met", enabled: true },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center justify-between rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{s.label}</p>
                  <p className="text-[11px] text-slate-400">{s.desc}</p>
                </div>
                <div className={`h-6 w-11 rounded-full p-0.5 transition-colors ${s.enabled ? "bg-emerald-500" : "bg-slate-200"}`}>
                  <div className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${s.enabled ? "translate-x-5" : ""}`} />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Notifications */}
        {tab === "notifications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {[
              { label: "New Compliance Issue", desc: "When a compliance issue is raised", enabled: true },
              { label: "CSR/Challenge Approval", desc: "When participation is approved or rejected", enabled: true },
              { label: "Policy Reminders", desc: "Reminders to acknowledge policies", enabled: false },
              { label: "Badge Unlocks", desc: "When a new badge is earned", enabled: true },
            ].map((n, i) => (
              <div key={n.label} className="flex items-center justify-between rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{n.label}</p>
                  <p className="text-[11px] text-slate-400">{n.desc}</p>
                </div>
                <div className={`h-6 w-11 rounded-full p-0.5 transition-colors ${n.enabled ? "bg-emerald-500" : "bg-slate-200"}`}>
                  <div className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${n.enabled ? "translate-x-5" : ""}`} />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
