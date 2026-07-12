"use client";

import { motion } from "framer-motion";
import { HandsClapping, Users, CheckCircle, Clock } from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const ACTIVITIES = [
  { id: "1", title: "Beach Cleanup Drive", date: "2026-07-15", dept: "Operations", participants: 12, status: "open" },
  { id: "2", title: "Tree Plantation", date: "2026-07-20", dept: "Engineering", participants: 8, status: "open" },
  { id: "3", title: "Food Donation Camp", date: "2026-07-10", dept: "HR", participants: 5, status: "completed" },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

export default function CSRPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] font-medium text-slate-400">Social</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            CSR Activities
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((a, i) => (
            <motion.div
              key={a.id}
              variants={FADE_UP}
              initial="hidden"
              animate="show"
              transition={{ delay: i * 0.08 }}
              className="rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <HandsClapping className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-slate-800">{a.title}</h3>
              <p className="mb-1 text-[11px] text-slate-400">{a.dept}</p>
              <div className="flex items-center gap-4 text-[12px] text-slate-500">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{a.date}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{a.participants}</span>
                {a.status === "completed" && <CheckCircle className="h-4 w-4 text-emerald-500" weight="fill" />}
              </div>
              <button className="mt-4 w-full rounded-xl bg-emerald-600 py-2 text-[12px] font-medium text-white transition-colors hover:bg-emerald-700">
                Participate
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
        >
          <h2 className="mb-4 text-sm font-semibold text-slate-800">My Participation</h2>
          <p className="text-sm text-slate-500">No participations yet. Join an activity above!</p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
