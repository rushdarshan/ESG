"use client";

import { useState } from "react";
import { Info, FileText, Clock, ShieldCheck } from "@phosphor-icons/react";

interface EvidenceInfo {
  source: string;
  factor: string;
  confidence: string;
  timestamp: string;
}

interface ProvenancePopoverProps {
  label: string;
  value: string;
  evidence: EvidenceInfo;
  children: React.ReactNode;
}

export function ProvenancePopover({ label, evidence, children }: ProvenancePopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="w-full text-left">
        {children}
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-emerald-500" weight="fill" />
            <p className="text-[13px] font-semibold text-slate-800">Explain: {label}</p>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <FileText className="mt-0.5 h-3.5 w-3.5 text-slate-400" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Source</p>
                <p className="text-[12px] text-slate-700">{evidence.source}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 text-slate-400" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Emission Factor</p>
                <p className="text-[12px] text-slate-700">{evidence.factor}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 text-emerald-500" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Confidence</p>
                <p className="text-[12px] font-semibold text-emerald-600">{evidence.confidence}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-3.5 w-3.5 text-slate-400" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Calculated</p>
                <p className="text-[12px] text-slate-700">{evidence.timestamp}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-lg bg-slate-50 py-1.5 text-[11px] font-medium text-slate-500 transition-colors hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
