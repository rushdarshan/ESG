"use client";

import { motion } from "framer-motion";
import { Download, ShieldCheck, Warning } from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function GovernanceReportPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[13px] font-medium text-slate-400">Report</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Governance Report</h1>
            <p className="mt-1 text-sm text-slate-500">Q2 2026</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-medium text-white shadow-lg transition-colors hover:bg-emerald-700">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-600" /><h2 className="text-sm font-semibold text-slate-800">GRI Compliance</h2></div>
            <p className="text-2xl font-bold text-slate-900">70%</p>
            <p className="text-[12px] text-slate-400">7 of 10 GRI disclosures met</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Open Issues</h3>
            {[{ issue: "GRI 305-5 — Emissions reduction evidence missing", severity: "High" }, { issue: "GRI 403-2 — Workplace injury rates not tracked", severity: "Medium" }].map((issue, i) => (
              <div key={i} className="flex items-center gap-2 border-b border-slate-50 py-2 last:border-0">
                <Warning className="h-4 w-4 text-amber-500" weight="fill" />
                <span className="flex-1 text-[13px] text-slate-700">{issue.issue}</span>
                <span className="rounded-lg bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600">{issue.severity}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
