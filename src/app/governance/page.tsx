"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Warning,
  CheckCircle,
  XCircle,
  FileText,
  ArrowRight,
  Hash,
  Clock,
  Download,
  Sparkle,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIInsight } from "@/components/shared/AIInsight";

const GRI_REQUIREMENTS = [
  { id: "GRI 302-1", desc: "Energy consumption within the organization", status: "met" as const, evidence: 12 },
  { id: "GRI 302-3", desc: "Energy intensity", status: "met" as const, evidence: 8 },
  { id: "GRI 305-1", desc: "Direct (Scope 1) GHG emissions", status: "met" as const, evidence: 6 },
  { id: "GRI 305-2", desc: "Energy indirect (Scope 2) GHG emissions", status: "met" as const, evidence: 9 },
  { id: "GRI 305-3", desc: "Other indirect (Scope 3) GHG emissions", status: "partial" as const, evidence: 3 },
  { id: "GRI 305-5", desc: "Emissions reduction from products and services", status: "gap" as const, evidence: 0 },
  { id: "GRI 306-3", desc: "Waste generated", status: "met" as const, evidence: 5 },
  { id: "GRI 306-4", desc: "Waste diverted from disposal", status: "partial" as const, evidence: 2 },
  { id: "GRI 401-1", desc: "New employee hires and employee turnover", status: "met" as const, evidence: 4 },
  { id: "GRI 403-2", desc: "Types of injury and rates", status: "gap" as const, evidence: 0 },
];

const CSRD_REQUIREMENTS = [
  { id: "ESRS E1-1", desc: "Transition plan for climate change mitigation", status: "met" as const, evidence: 7 },
  { id: "ESRS E1-4", desc: "Targets and reduction initiatives", status: "partial" as const, evidence: 3 },
  { id: "ESRS E1-6", desc: "Gross Scope 1, 2, 3 emissions", status: "met" as const, evidence: 15 },
  { id: "ESRS S1-2", desc: "Policies related to own workforce", status: "met" as const, evidence: 5 },
  { id: "ESRS G1-1", desc: "Business ethics and anti-corruption", status: "met" as const, evidence: 8 },
];

const HASH_CHAIN = [
  { hash: "a3f2...8b1c", prev: "0000...0000", source: "Upload", time: "14:32" },
  { hash: "7e1b...4d2a", prev: "a3f2...8b1c", source: "Action", time: "14:28" },
  { hash: "c9d3...6f5e", prev: "7e1b...4d2a", source: "Upload", time: "14:15" },
  { hash: "2a8c...9e7b", prev: "c9d3...6f5e", source: "Report", time: "13:58" },
  { hash: "f4e1...3c8d", prev: "2a8c...9e7b", source: "Action", time: "13:42" },
];

const STATUS_CONFIG = {
  met: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50", label: "Met" },
  partial: { icon: Warning, color: "text-amber-500", bg: "bg-amber-50", label: "Partial" },
  gap: { icon: XCircle, color: "text-rose-500", bg: "bg-rose-50", label: "Gap" },
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

export default function GovernancePage() {
  const [expandedFramework, setExpandedFramework] = useState<"GRI" | "CSRD">("GRI");

  const griMet = GRI_REQUIREMENTS.filter((r) => r.status === "met").length;
  const griPartial = GRI_REQUIREMENTS.filter((r) => r.status === "partial").length;
  const griGap = GRI_REQUIREMENTS.filter((r) => r.status === "gap").length;
  const griScore = Math.round((griMet / GRI_REQUIREMENTS.length) * 100);

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
              Governance Module
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              Compliance & Evidence
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm text-slate-500"
            >
              GRI & CSRD compliance tracking with tamper-proof evidence chain
            </motion.p>
          </div>

          {/* Generate report button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-medium text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700 active:scale-[0.98]"
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </motion.button>
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
            title="Compliance Gaps Found"
            message="2 GRI disclosures are missing evidence: GRI 305-5 (emissions reduction) and GRI 403-2 (workplace injury rates). Upload relevant documents to close these gaps."
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
            { label: "GRI Score", value: `${griScore}%`, color: "text-emerald-600" },
            { label: "CSRD Score", value: "72%", color: "text-blue-600" },
            { label: "Evidence Records", value: "142", color: "text-slate-900" },
            { label: "Open Gaps", value: `${griGap}`, color: "text-rose-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={FADE_UP}
              className="rounded-2xl border border-slate-200/50 bg-white p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <p className={`text-2xl font-bold tracking-tight ${stat.color}`}>
                {stat.value}
              </p>
              <p className="mt-0.5 text-[12px] text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main content — 2-column */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
          {/* Left: Compliance frameworks */}
          <div className="space-y-6">
            {/* GRI */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <button
                onClick={() =>
                  setExpandedFramework(expandedFramework === "GRI" ? "CSRD" : "GRI")
                }
                className="flex w-full items-center justify-between p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800">
                      GRI Standards
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {griMet} met, {griPartial} partial, {griGap} gaps
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${griScore}%` }}
                    />
                  </div>
                  <span className="text-[13px] font-bold text-slate-900">
                    {griScore}%
                  </span>
                  {expandedFramework === "GRI" ? (
                    <CaretUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <CaretDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {expandedFramework === "GRI" && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-100 px-6 pb-4">
                      {GRI_REQUIREMENTS.map((req, i) => {
                        const cfg = STATUS_CONFIG[req.status];
                        const Icon = cfg.icon;
                        return (
                          <motion.div
                            key={req.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.05 * i }}
                            className="flex items-center gap-3 border-b border-slate-50 py-3 last:border-0"
                          >
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-lg ${cfg.bg}`}
                            >
                              <Icon
                                className={`h-3.5 w-3.5 ${cfg.color}`}
                                weight="fill"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-medium text-slate-700">
                                {req.id}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">
                                {req.desc}
                              </p>
                            </div>
                            <span className="text-[11px] text-slate-400">
                              {req.evidence} records
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CSRD */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <button
                onClick={() =>
                  setExpandedFramework(expandedFramework === "CSRD" ? "GRI" : "CSRD")
                }
                className="flex w-full items-center justify-between p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800">
                      CSRD / ESRS
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {CSRD_REQUIREMENTS.filter((r) => r.status === "met").length} met,{' '}
                      {CSRD_REQUIREMENTS.filter((r) => r.status === "partial").length} partial
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${
                          (CSRD_REQUIREMENTS.filter((r) => r.status === "met").length /
                            CSRD_REQUIREMENTS.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-[13px] font-bold text-slate-900">72%</span>
                  {expandedFramework === "CSRD" ? (
                    <CaretUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <CaretDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {expandedFramework === "CSRD" && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-100 px-6 pb-4">
                      {CSRD_REQUIREMENTS.map((req, i) => {
                        const cfg = STATUS_CONFIG[req.status];
                        const Icon = cfg.icon;
                        return (
                          <motion.div
                            key={req.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.05 * i }}
                            className="flex items-center gap-3 border-b border-slate-50 py-3 last:border-0"
                          >
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-lg ${cfg.bg}`}
                            >
                              <Icon
                                className={`h-3.5 w-3.5 ${cfg.color}`}
                                weight="fill"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-medium text-slate-700">
                                {req.id}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">
                                {req.desc}
                              </p>
                            </div>
                            <span className="text-[11px] text-slate-400">
                              {req.evidence} records
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right: Evidence chain + Report preview */}
          <div className="space-y-6">
            {/* Evidence Chain */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Evidence Chain
                </h2>
                <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1">
                  <CheckCircle
                    className="h-3 w-3 text-emerald-500"
                    weight="fill"
                  />
                  <span className="text-[10px] font-medium text-emerald-600">
                    Verified
                  </span>
                </div>
              </div>
              <div className="space-y-0">
                {HASH_CHAIN.map((record, i) => (
                  <motion.div
                    key={record.hash}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.06 }}
                    className="relative flex items-start gap-3 pb-4 last:pb-0"
                  >
                    {/* Connector line */}
                    {i < HASH_CHAIN.length - 1 && (
                      <div className="absolute left-3 top-6 h-full w-px bg-slate-200" />
                    )}
                    <div className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <Hash className="h-3 w-3 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[12px] text-slate-700">
                          {record.hash}
                        </span>
                        <ArrowRight className="h-3 w-3 text-slate-300" />
                        <span className="font-mono text-[11px] text-slate-400">
                          {record.prev}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{record.source}</span>
                        <span>-</span>
                        <Clock className="h-3 w-3" />
                        <span>{record.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Report Preview */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Latest Report
                </h2>
                <span className="text-[11px] text-slate-400">
                  Generated 2h ago
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { section: "Executive Summary", pages: 2 },
                  { section: "Environmental Metrics", pages: 4 },
                  { section: "Social Impact", pages: 3 },
                  { section: "Governance & Compliance", pages: 5 },
                  { section: "Recommendations", pages: 2 },
                ].map((s, i) => (
                  <div
                    key={s.section}
                    className="flex items-center justify-between rounded-xl px-4 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span className="text-[13px] text-slate-700">
                        {s.section}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {s.pages} pages
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50 active:scale-[0.98]">
                <Download className="h-4 w-4" />
                Download PDF (16 pages)
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
