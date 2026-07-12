"use client";

import { motion } from "framer-motion";
import {
  FilePdf,
  ShieldCheck,
  Clock,
  Database,
  ArrowRight,
  Hash,
} from "@phosphor-icons/react";

interface ProvenanceItem {
  label: string;
  value: string;
  icon: React.ElementType;
}

const PROVENANCE: ProvenanceItem[] = [
  { label: "Source File", value: "utility-bill-jan-2026.pdf", icon: FilePdf },
  { label: "Extracted By", value: "Gemini AI v2.0", icon: Database },
  { label: "Emission Factor", value: "EPA eGRID 2025", icon: ShieldCheck },
  { label: "Confidence", value: "88%", icon: ShieldCheck },
  { label: "Recorded At", value: "2026-07-12 14:32 UTC", icon: Clock },
  { label: "Hash", value: "a3f2...8b1c", icon: Hash },
];

export function ProvenancePanel() {
  return (
    <div className="space-y-4">
      {/* Provenance chain */}
      <div className="space-y-2">
        {PROVENANCE.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100">
                <Icon className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-slate-400">{item.label}</p>
                <p className="truncate text-[13px] font-medium text-slate-700">
                  {item.value}
                </p>
              </div>
              {i < PROVENANCE.length - 1 && (
                <ArrowRight className="h-3 w-3 text-slate-200" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Hash chain verification */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" weight="fill" />
          <span className="text-[12px] font-medium text-emerald-700">
            Chain Integrity Verified
          </span>
        </div>
        <p className="mt-1 text-[11px] text-emerald-600/70">
          SHA-256 hash chain intact — 142 records, 0 tampered
        </p>
      </div>
    </div>
  );
}
