"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Target } from "@phosphor-icons/react";

export default function GoalsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div className="flex h-[60vh] flex-col items-center justify-center text-center">
          <Target className="mb-4 h-12 w-12 text-slate-300" />
          <h1 className="text-2xl font-bold text-slate-900">Goals</h1>
          <p className="mt-2 text-sm text-slate-500">Coming soon</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
