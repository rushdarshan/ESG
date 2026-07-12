"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TreeEvergreen,
  Lightning,
  Drop,
  Trash,
} from "@/lib/icons";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UploadZone } from "@/components/environment/UploadZone";
import { ScopeBreakdown } from "@/components/environment/ScopeBreakdown";
import { MACCCurve } from "@/components/environment/MACCCurve";
import { ProvenancePanel } from "@/components/environment/ProvenancePanel";
import { AIInsight } from "@/components/shared/AIInsight";

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

const QUICK_STATS = [
  { label: "Electricity", value: "128,450 kWh", change: "+4.2%", icon: Lightning, color: "text-emerald-500" },
  { label: "Fleet Fuel", value: "8,500 L", change: "-8.1%", icon: TreeEvergreen, color: "text-emerald-500" },
  { label: "Water", value: "45,000 L", change: "+1.3%", icon: Drop, color: "text-emerald-500" },
  { label: "Waste Diverted", value: "74%", change: "+12%", icon: Trash, color: "text-emerald-500" },
];

export default function EnvironmentPage() {
  const [organizationId, setOrganizationId] = useState<string>();

  useEffect(() => {
    fetch("/api/scenarios")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setOrganizationId(data?.scenarios?.[0]?.id))
      .catch(() => undefined);
  }, []);

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
              Environmental Module
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2"
            >
              Carbon Footprint
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="app-page-copy"
            >
              Measure Scope 1, 2, and 3 emissions with AI-extracted data
            </motion.p>
          </div>
        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <AIInsight
            type="warning"
            title="Anomaly Detected"
            message="Fleet diesel consumption spiked 512% from 8,500L to 52,000L in January. This is likely a data entry error — please verify with fleet management."
          />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="app-stat-grid mb-8"
        >
          {QUICK_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={FADE_UP}
                className="app-stat"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" />
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

        {/* Main content — asymmetric layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_.85fr]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Upload Zone */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="app-panel border-[#c7dcb5] bg-[#e5efd8] p-6"
            >
              <h2 className="mb-4 text-sm font-semibold text-slate-800">
                Upload Documents
              </h2>
              <UploadZone organizationId={organizationId} />
            </motion.div>

            {/* Scope Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="app-panel p-6"
            >
              <h2 className="mb-5 text-sm font-semibold text-slate-800">
                Scope Breakdown
              </h2>
              <ScopeBreakdown />
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* MACC Curve */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="app-panel p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Abatement Cost Curve
                </h2>
                <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">
                  IEA / IRENA / NREL
                </span>
              </div>
              <MACCCurve />
            </motion.div>

            {/* Provenance Panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="app-panel p-6"
            >
              <h2 className="mb-4 text-sm font-semibold text-slate-800">
                Data Provenance
              </h2>
              <ProvenancePanel />
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
