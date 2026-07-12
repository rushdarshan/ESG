"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GearSix,
  Building,
  Bell,
  Key,
  Trash,
  Palette,
  Globe,
  CheckCircle,
} from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIInsight } from "@/components/shared/AIInsight";

function SettingRow({
  icon: Icon,
  label,
  desc,
  children,
}: {
  icon: React.ElementType;
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 px-5 py-4">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 text-slate-400" />
        <div>
          <p className="text-[13px] font-medium text-slate-800 dark:text-zinc-200">{label}</p>
          <p className="text-[12px] text-slate-400 dark:text-zinc-500">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 rounded-full transition-colors ${
        checked ? "bg-emerald-500" : "bg-slate-200 dark:bg-zinc-700"
      }`}
    >
      <motion.div
        layout
        className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [reportNotif, setReportNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">Settings</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Organization configuration and preferences</p>
          </div>

          <AIInsight
            title="Configuration is local"
            message="Settings are stored in this browser session. Connect your database to persist across sessions."
            type="info"
          />

          <div className="mt-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="rounded-2xl border border-slate-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900"
            >
              <div className="border-b border-slate-100 px-5 py-4 dark:border-zinc-800">
                <p className="text-[13px] font-bold text-slate-900 dark:text-zinc-100">Organization</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                <SettingRow icon={Building} label="Organization Name" desc="Shown on reports and dashboards">
                  <input
                    defaultValue="GreenForge Industries"
                    className="w-48 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 outline-none transition-colors focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:focus:border-emerald-400"
                  />
                </SettingRow>
                <SettingRow icon={Globe} label="Industry" desc="Used for benchmark comparisons">
                  <select className="w-48 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 outline-none transition-colors focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:focus:border-emerald-400">
                    <option>Industrial Manufacturing</option>
                    <option>Technology</option>
                    <option>Energy</option>
                    <option>Transportation</option>
                  </select>
                </SettingRow>
                <SettingRow icon={Palette} label="Theme" desc="Light or dark mode">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-slate-500 dark:text-zinc-400">Light</span>
                    <Toggle checked={darkMode} onChange={setDarkMode} />
                    <span className="text-[12px] text-slate-500 dark:text-zinc-400">Dark</span>
                  </div>
                </SettingRow>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
              className="rounded-2xl border border-slate-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900"
            >
              <div className="border-b border-slate-100 px-5 py-4 dark:border-zinc-800">
                <p className="text-[13px] font-bold text-slate-900 dark:text-zinc-100">Notifications</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                <SettingRow icon={Bell} label="Email Reports" desc="Weekly executive summary via email">
                  <Toggle checked={emailNotif} onChange={setEmailNotif} />
                </SettingRow>
                <SettingRow icon={Bell} label="Anomaly Alerts" desc="Notify when spikes exceed 30% MoM">
                  <Toggle checked={reportNotif} onChange={setReportNotif} />
                </SettingRow>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="rounded-2xl border border-slate-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900"
            >
              <div className="border-b border-slate-100 px-5 py-4 dark:border-zinc-800">
                <p className="text-[13px] font-bold text-slate-900 dark:text-zinc-100">Integrations</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                <SettingRow icon={Key} label="Gemini AI Key" desc="For live AI extraction and validation">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-[12px] text-slate-500 dark:text-zinc-400">Not configured</span>
                  </div>
                </SettingRow>
                <SettingRow icon={Key} label="Climatiq API Key" desc="For live emission factor lookups">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-[12px] text-slate-500 dark:text-zinc-400">Not configured</span>
                  </div>
                </SettingRow>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.25 }}
              className="rounded-2xl border border-rose-200/50 bg-white dark:border-rose-900/50 dark:bg-zinc-900"
            >
              <div className="border-b border-rose-100 px-5 py-4 dark:border-rose-900/30">
                <p className="text-[13px] font-bold text-rose-600 dark:text-rose-400">Danger Zone</p>
              </div>
              <div className="px-5 py-4">
                <button className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-[13px] font-medium text-rose-600 transition-all hover:bg-rose-50 active:scale-[0.97] dark:border-rose-900/50 dark:text-rose-400 dark:hover:bg-rose-950/20">
                  <Trash className="h-3.5 w-3.5" />
                  Reset Demo Data
                </button>
              </div>
            </motion.div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.97] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {saved ? (
                  <><CheckCircle className="h-4 w-4" weight="fill" /> Saved</>
                ) : (
                  "Save Preferences"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
