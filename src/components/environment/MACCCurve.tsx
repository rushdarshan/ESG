"use client";

import { useState, useEffect } from "react";
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
import { CheckCircle, Plus } from "@/lib/icons";

interface MACCMeasure {
  id: string;
  name: string;
  costPerTonne: number;
  reduction: number;
  source: string;
  selected: boolean;
  annualFinancialSavings: number;
  implementationCost: number;
  paybackPeriod: number;
  category: string;
  assumptions: string;
  cumulativeReduction: number;
}

interface TooltipProps { active?: boolean; payload?: Array<{ payload: MACCMeasure }> }
const CustomTooltip = ({ active, payload }: TooltipProps) => {
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

const FALLBACK_MEASURES: MACCMeasure[] = [
  { id: "led-retrofit", name: "LED Lighting Retrofit", costPerTonne: -45, reduction: 82, source: "IEA", selected: true, annualFinancialSavings: 14200, implementationCost: 35000, paybackPeriod: 2.46, category: "energy-efficiency", assumptions: "", cumulativeReduction: 82 },
  { id: "building-insulation", name: "Building Insulation Upgrade", costPerTonne: -32, reduction: 51, source: "IRENA", selected: true, annualFinancialSavings: 9800, implementationCost: 85000, paybackPeriod: 8.67, category: "energy-efficiency", assumptions: "", cumulativeReduction: 133 },
  { id: "wfh-policy", name: "Work-from-Home Policy Expansion", costPerTonne: -18, reduction: 34, source: "McKinsey", selected: true, annualFinancialSavings: 12500, implementationCost: 8000, paybackPeriod: 0.64, category: "operational", assumptions: "", cumulativeReduction: 167 },
  { id: "enhanced-recycling", name: "Enhanced Recycling Program", costPerTonne: -12, reduction: 28, source: "NREL", selected: true, annualFinancialSavings: 6400, implementationCost: 12000, paybackPeriod: 1.88, category: "waste", assumptions: "", cumulativeReduction: 195 },
  { id: "renewable-procurement", name: "Renewable Energy PPA", costPerTonne: 23, reduction: 180, source: "IRENA", selected: false, annualFinancialSavings: 8500, implementationCost: 42000, paybackPeriod: 4.94, category: "renewable-energy", assumptions: "", cumulativeReduction: 375 },
  { id: "rooftop-solar", name: "Rooftop Solar (200 kW)", costPerTonne: 28, reduction: 220, source: "IEA", selected: false, annualFinancialSavings: 28600, implementationCost: 280000, paybackPeriod: 9.79, category: "renewable-energy", assumptions: "", cumulativeReduction: 595 },
  { id: "ev-fleet", name: "Fleet Electrification (10 vehicles)", costPerTonne: 45, reduction: 153, source: "IRENA", selected: false, annualFinancialSavings: 18900, implementationCost: 450000, paybackPeriod: 23.81, category: "transport", assumptions: "", cumulativeReduction: 748 },
  { id: "hvac-optimization", name: "HVAC Smart Controls", costPerTonne: 62, reduction: 97, source: "NREL", selected: false, annualFinancialSavings: 15800, implementationCost: 62000, paybackPeriod: 3.92, category: "energy-efficiency", assumptions: "", cumulativeReduction: 845 },
  { id: "battery-storage", name: "Battery Energy Storage (500 kWh)", costPerTonne: 85, reduction: 64, source: "IEA", selected: false, annualFinancialSavings: 11200, implementationCost: 320000, paybackPeriod: 28.57, category: "renewable-energy", assumptions: "", cumulativeReduction: 909 },
  { id: "heat-pump", name: "Heat Pump Installation", costPerTonne: 95, reduction: 76, source: "IEA", selected: false, annualFinancialSavings: 12400, implementationCost: 180000, paybackPeriod: 14.52, category: "energy-efficiency", assumptions: "", cumulativeReduction: 985 },
  { id: "green-hydrogen", name: "Green Hydrogen Pilot", costPerTonne: 120, reduction: 42, source: "IRENA", selected: false, annualFinancialSavings: 3200, implementationCost: 250000, paybackPeriod: 78.13, category: "renewable-energy", assumptions: "", cumulativeReduction: 1027 },
  { id: "carbon-capture", name: "Carbon Capture Pilot", costPerTonne: 180, reduction: 120, source: "McKinsey", selected: false, annualFinancialSavings: 1800, implementationCost: 500000, paybackPeriod: 277.78, category: "carbon-removal", assumptions: "", cumulativeReduction: 1147 },
];

export function MACCCurve() {
  const [measures, setMeasures] = useState<MACCMeasure[]>(FALLBACK_MEASURES);

  useEffect(() => {
    fetch("/api/macc")
      .then((res) => res.json())
      .then((data) => {
        if (data.measures) setMeasures(data.measures);
      })
      .catch(() => {});
  }, []);

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
                        : "#047857"
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
      <div className="max-h-[360px] space-y-1.5 overflow-y-auto pr-1">
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
              <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-500" />
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
