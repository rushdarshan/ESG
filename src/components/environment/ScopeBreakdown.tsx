"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const SCOPE_DATA = [
  { name: "Scope 1 — Direct", value: 22.7, color: "#059669", confidence: 0.92 },
  { name: "Scope 2 — Electricity", value: 61.4, color: "#3b82f6", confidence: 0.88 },
  { name: "Scope 3 — Indirect", value: 58.7, color: "#8b5cf6", confidence: 0.74 },
];

const TOTAL = SCOPE_DATA.reduce((sum, s) => sum + s.value, 0);

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-[13px] font-semibold text-slate-800">{d.name}</p>
      <p className="mt-1 text-sm text-slate-600">
        {d.value} tCO₂e
      </p>
      <p className="text-[11px] text-slate-400">
        Confidence: {(d.confidence * 100).toFixed(0)}%
      </p>
    </div>
  );
};

export function ScopeBreakdown() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
      {/* Donut chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative h-48 w-48 flex-shrink-0"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={SCOPE_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {SCOPE_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {TOTAL.toFixed(1)}
          </span>
          <span className="text-[11px] text-slate-400">tCO₂e total</span>
        </div>
      </motion.div>

      {/* Scope bars */}
      <div className="flex-1 space-y-4">
        {SCOPE_DATA.map((scope, i) => (
          <motion.div
            key={scope.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[13px] font-medium text-slate-700">
                {scope.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-slate-900">
                  {scope.value} tCO₂e
                </span>
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                  {(scope.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(scope.value / TOTAL) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + i * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: scope.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
