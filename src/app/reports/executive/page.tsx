"use client";

import { motion } from "framer-motion";
import { Download } from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function ExecutiveReportPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[13px] font-medium text-slate-400">Report</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">ESG Summary Report</h1>
            <p className="mt-1 text-sm text-slate-500">Q2 2026 — Generated July 12, 2026</p>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-medium text-white shadow-lg transition-colors hover:bg-emerald-700">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">Executive Summary</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              EcoSphere achieved an overall ESG score of <strong>72/100</strong> this quarter, up 8% from Q1. Environmental performance improved 12% driven by fleet electrification. Social engagement grew 18% with 487 active participants. Governance compliance stands at 70% with 2 open gaps requiring attention.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Environmental", score: 78, color: "bg-emerald-500" },
              { label: "Social", score: 74, color: "bg-blue-500" },
              { label: "Governance", score: 70, color: "bg-violet-500" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="rounded-2xl border border-slate-200/50 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-medium text-slate-400">{s.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{s.score}/100</p>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.score}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
