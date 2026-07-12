"use client";

import { motion } from "framer-motion";
import { Download } from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function EnvironmentalReportPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[13px] font-medium text-slate-400">Report</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Environmental Report</h1>
            <p className="mt-1 text-sm text-slate-500">Q2 2026</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-medium text-white shadow-lg transition-colors hover:bg-emerald-700">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>

        <div className="space-y-6">
          {[
            { scope: "Scope 1 — Direct Emissions", value: "128 tCO₂e", sources: "Fleet fuel, onsite generators" },
            { scope: "Scope 2 — Energy", value: "94 tCO₂e", sources: "Purchased electricity, heating" },
            { scope: "Scope 3 — Value Chain", value: "120 tCO₂e", sources: "Employee commute, waste, suppliers" },
          ].map((s, i) => (
            <motion.div key={s.scope} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800">{s.scope}</h3>
              <p className="mt-1 text-2xl font-bold text-emerald-600">{s.value}</p>
              <p className="mt-1 text-[12px] text-slate-400">{s.sources}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
