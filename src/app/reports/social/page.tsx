"use client";

import { motion } from "framer-motion";
import { Download } from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function SocialReportPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[13px] font-medium text-slate-400">Report</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Social Report</h1>
            <p className="mt-1 text-sm text-slate-500">Q2 2026</p>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-medium text-white shadow-lg transition-colors hover:bg-emerald-700">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Active Participants", value: "487" },
            { label: "Total Actions Logged", value: "1,284" },
            { label: "Carbon Saved", value: "142.8 tCO₂e" },
            { label: "Badges Earned", value: "892" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-slate-200/50 bg-white p-5 shadow-sm">
              <p className="text-[11px] text-slate-400">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{s.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
