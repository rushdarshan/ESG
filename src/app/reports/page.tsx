"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  CheckCircle,
  FileArrowDown,
  ShieldCheck,
  ChartLineUp,
  Spinner,
} from "@/lib/icons";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIInsight } from "@/components/shared/AIInsight";

const REPORT_TYPES = [
  {
    id: "executive",
    title: "Executive Summary",
    desc: "Board-ready overview with E/S/G scores, trends, and AI recommendations",
    icon: FileText,
    color: "emerald",
    estimate: "30s",
  },
  {
    id: "gri",
    title: "GRI Compliance Report",
    desc: "Structured against GRI Universal Standards with cited evidence",
    icon: ShieldCheck,
    color: "blue",
    estimate: "45s",
  },
  {
    id: "csrd",
    title: "CSRD Disclosure",
    desc: "Double materiality assessment and ESRS-aligned metric disclosure",
    icon: ChartLineUp,
    color: "violet",
    estimate: "45s",
  },
];

const HISTORY = [
  { id: "RPT-004", type: "Executive Summary", date: "2026-07-12", status: "generated" as const, pages: 12 },
  { id: "RPT-003", type: "GRI Compliance", date: "2026-07-11", status: "generated" as const, pages: 28 },
  { id: "RPT-002", type: "CSRD Disclosure", date: "2026-07-10", status: "generated" as const, pages: 34 },
  { id: "RPT-001", type: "Executive Summary", date: "2026-06-30", status: "generated" as const, pages: 10 },
];

const COLORS: Record<string, string> = {
  emerald: "bg-[#dcebc7] text-[#36511f]",
  blue: "bg-[#dce9f6] text-[#234b74]",
  violet: "bg-[#e8def4] text-[#5a3479]",
};

async function downloadReport(type: string) {
  const response = await fetch("/api/reports", {
    method: "POST",
    body: JSON.stringify({ type }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Report generation failed");

  const url = URL.createObjectURL(await response.blob());
  const link = document.createElement("a");
  link.href = url;
  link.download = `EcoSphere_${type}_Report.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function ReportTypeCard({ r, i }: { r: typeof REPORT_TYPES[0]; i: number }) {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(false);
    try {
      await downloadReport(r.id);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } catch {
      setError(true);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 * i }}
      className={`rounded-2xl border border-slate-200/50 bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] active:scale-[0.99]`}
    >
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${COLORS[r.color]}`}>
        <r.icon className="h-5 w-5" />
      </div>
      <h3 className="text-[15px] font-bold text-slate-900">{r.title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{r.desc}</p>
      <button
        onClick={handleGenerate}
        disabled={generating}
        className={`mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-colors active:scale-[0.97] ${
          done
            ? "bg-emerald-100 text-emerald-700"
            : error
            ? "bg-rose-100 text-rose-700"
            : "bg-slate-900 text-white hover:bg-slate-800"
        }`}
      >
        {generating ? (
          <><Spinner className="h-3.5 w-3.5 animate-spin" /> Generating...</>
        ) : done ? (
          <><CheckCircle className="h-3.5 w-3.5" /> Generated</>
        ) : error ? (
          "Try again"
        ) : (
          <><FileArrowDown className="h-3.5 w-3.5" /> Generate ({r.estimate})</>
        )}
      </button>
    </motion.div>
  );
}

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="app-page-kicker">Reports</p>
              <h1 className="mt-2">Compliance reports</h1>
              <p className="app-page-copy mt-2">Generate and download GRI and CSRD reports backed by live evidence.</p>
            </div>
          </div>

          <AIInsight
            title="AI-powered report generation"
            message="Reports compile live data from the Evidence Registry. Every metric links back to its source document with full provenance."
            type="info"
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {REPORT_TYPES.map((r, i) => (
              <ReportTypeCard key={r.id} r={r} i={i} />
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-[15px] font-bold text-slate-900">Recent Reports</h2>
            <div className="app-panel mt-4 divide-y divide-slate-100">
              {HISTORY.map((h) => (
                <div key={h.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-[13px] font-medium text-slate-800">{h.type}</p>
                      <p className="text-[12px] text-slate-400">{h.id} &middot; {h.pages} pages &middot; {h.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[12px] text-emerald-600">
                      <CheckCircle className="h-3 w-3" />
                      {h.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => void downloadReport(h.type === "Executive Summary" ? "executive" : h.type === "GRI Compliance" ? "gri" : "csrd").catch(() => undefined)}
                      aria-label={`Download ${h.type}`}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
