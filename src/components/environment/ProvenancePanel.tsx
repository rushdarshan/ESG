"use client";

import { motion } from "framer-motion";
import {
  FilePdf,
  ShieldCheck,
  Clock,
  Database,
  ArrowRight,
  Hash,
} from "@/lib/icons";

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
      <div className="grid grid-cols-2 gap-2.5">
        {PROVENANCE.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/40 p-2"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                <Icon className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-slate-400 leading-tight">{item.label}</p>
                <p className="truncate text-[12px] font-semibold text-slate-700 mt-0.5">
                  {item.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hash chain verification */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
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
