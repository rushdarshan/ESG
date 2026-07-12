"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CheckCircle, Plus } from "@phosphor-icons/react";

const MACC_MEASURES = [
  { id: "led", name: "LED Retrofit", costPerTonne: -45, reduction: 8.2, source: "IEA", selected: false },
  { id: "insulation", name: "Building Insulation", costPerTonne: -32, reduction: 5.1, source: "IRENA", selected: false },
  { id: "wfh", name: "WFH Policy Expansion", costPerTonne: -18, reduction: 3.4, source: "McKinsey", selected: false },
  { id: "recycling", name: "Enhanced Recycling", costPerTonne: -12, reduction: 2.8, source: "NREL", selected: false },
  { id: "solar", name: "Rooftop Solar (200kW)", costPerTonne: 28, reduction: 22.0, source: "IEA", selected: true },
  { id: "ev", name: "EV Fleet Transition", costPerTonne: 45, reduction: 15.3, source: "IRENA", selected: false },
  { id: "heatpump", name: "Heat Pump Install", costPerTonne: 62, reduction: 9.7, source: "NREL", selected: false },
  { id: "bess", name: "Battery Storage", costPerTonne: 85, reduction: 6.4, source: "IEA", selected: false },
  { id: "hydrogen", name: "Green Hydrogen Pilot", costPerTonne: 120, reduction: 4.2, source: "IRENA", selected: false },
  { id: "ccs", name: "Carbon Capture (Pilot)", costPerTonne: 180, reduction: 12.0, source: "McKinsey", selected: false },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-[13px] font-semibold text-slate-800">{d.name}</p>
      <p className="mt-1 text-sm text-slate-600">
        ${d.costPerTonne}/tCO₂e — {d.reduction} tCO₂e/year
      </p>
      <p className="text-[11px] text-slate-400">Source: {d.source}</p>
    </div>
  );
};

export function MACCCurve() {
  const [measures, setMeasures] = useState(MACC_MEASURES);

  const toggleMeasure = (id: string) => {
    setMeasures((prev) =>
      prev.map((m) => (m.id === id ? { ...m, selected: !m.selected } : m))
    );
  };

  const totalReduction = measures
    .filter((m) => m.selected)
    .reduce((sum, m) => sum + m.reduction, 0);

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-medium text-slate-500">
            Selected Measures
          </p>
          <p className="mt-0.5 text-lg font-bold text-slate-900">
            {measures.filter((m) => m.selected).length} of {measures.length}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[13px] font-medium text-slate-500">
            Total Reduction
          </p>
          <p className="mt-0.5 text-lg font-bold text-emerald-600">
            {totalReduction.toFixed(1)} tCO₂e/year
          </p>
        </div>
      </div>

      {/* Horizontal bar chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="h-[320px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={measures}
            layout="vertical"
            margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
          >
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={160}
              tick={{ fontSize: 12, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
            <Bar dataKey="costPerTonne" radius={[0, 6, 6, 0]} barSize={20}>
              {measures.map((m) => (
                <Cell
                  key={m.id}
                  fill={
                    m.selected
                      ? m.costPerTonne < 0
                        ? "#059669"
                        : "#3b82f6"
                      : "#e2e8f0"
                  }
                  cursor="pointer"
                  onClick={() => toggleMeasure(m.id)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Measure list */}
      <div className="space-y-1.5">
        {measures.map((m, i) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.03 }}
            onClick={() => toggleMeasure(m.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors ${
              m.selected
                ? "bg-emerald-50 hover:bg-emerald-100/80"
                : "hover:bg-slate-50"
            }`}
          >
            {m.selected ? (
              <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-500" weight="fill" />
            ) : (
              <Plus className="h-4 w-4 flex-shrink-0 text-slate-300" />
            )}
            <span className="flex-1 text-[13px] font-medium text-slate-700">
              {m.name}
            </span>
            <span
              className={`text-[12px] font-semibold ${
                m.costPerTonne < 0 ? "text-emerald-600" : "text-slate-500"
              }`}
            >
              {m.costPerTonne < 0 ? "-" : ""}${Math.abs(m.costPerTonne)}/tCO₂e
            </span>
            <span className="text-[12px] text-slate-400">
              {m.reduction} tCO₂e
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
