"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChartBar, ArrowRight, FileText } from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const REPORTS = [
  { href: "/reports/executive", label: "ESG Summary Report", icon: ChartBar, desc: "Executive overview of E+S+G performance" },
  { href: "/reports/environmental", label: "Environmental Report", icon: FileText, desc: "Carbon footprint, scope breakdown, goals" },
  { href: "/reports/social", label: "Social Report", icon: FileText, desc: "Employee actions, CSR, participation metrics" },
  { href: "/reports/governance", label: "Governance Report", icon: FileText, desc: "Compliance status, audits, policy acknowledgements" },
];

export default function ReportsIndexPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] font-medium text-slate-400">Reports</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Reports & Analytics
          </motion.h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {REPORTS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div key={r.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link href={r.href} className="group flex items-center gap-4 rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{r.label}</p>
                    <p className="text-[11px] text-slate-400">{r.desc}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-slate-500" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
