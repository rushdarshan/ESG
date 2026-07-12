"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building,
  Bell,
  Key,
  Trash,
  Palette,
  Globe,
  CheckCircle,
} from "@/lib/icons";
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
          <p className="text-[13px] font-medium text-slate-800">{label}</p>
          <p className="text-[12px] text-slate-400">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, label, onChange }: { checked: boolean; label: string; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 rounded-full transition-colors ${
        checked ? "bg-emerald-500" : "bg-slate-200"
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
  const [organizationName, setOrganizationName] = useState("GreenForge Industries");
  const [industry, setIndustry] = useState("Industrial Manufacturing");
  const [emailNotif, setEmailNotif] = useState(true);
  const [reportNotif, setReportNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const savedName = localStorage.getItem("ecosphere_org_name");
      const savedInd = localStorage.getItem("ecosphere_industry");
      if (savedName) setOrganizationName(savedName);
      if (savedInd) setIndustry(savedInd);

      const isDark = localStorage.getItem("theme") === "dark";
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleThemeChange = (val: boolean) => {
    setDarkMode(val);
    if (val) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleSave = () => {
    localStorage.setItem("ecosphere_org_name", organizationName);
    localStorage.setItem("ecosphere_industry", industry);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetPreferences = () => {
    localStorage.removeItem("ecosphere_org_name");
    localStorage.removeItem("ecosphere_industry");
    localStorage.removeItem("theme");
    setOrganizationName("GreenForge Industries");
    setIndustry("Industrial Manufacturing");
    handleThemeChange(false);
    setSaved(false);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="mb-8">
            <p className="app-page-kicker">Settings</p>
            <h1 className="mt-2">Organization configuration</h1>
            <p className="app-page-copy mt-2">Manage local preferences, notifications, and integrations.</p>
          </div>

          <AIInsight
            title="Configuration is local"
            message="Settings are stored in this browser session. Connect your database to persist across sessions."
            type="info"
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="app-panel"
            >
              <div className="border-b border-slate-100 px-5 py-4">
                <p className="text-[13px] font-bold text-slate-900">Organization</p>
              </div>
              <div className="divide-y divide-slate-100">
                <SettingRow icon={Building} label="Organization Name" desc="Shown on reports and dashboards">
                  <input
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-48 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 outline-none transition-colors focus:border-emerald-500"
                  />
                </SettingRow>
                <SettingRow icon={Globe} label="Industry" desc="Used for benchmark comparisons">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-48 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 outline-none transition-colors focus:border-emerald-500"
                  >
                    <option value="Industrial Manufacturing">Industrial Manufacturing</option>
                    <option value="Technology">Technology</option>
                    <option value="Energy">Energy</option>
                    <option value="Transportation">Transportation</option>
                  </select>
                </SettingRow>
                <SettingRow icon={Palette} label="Theme" desc="Preview dark color scheme">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-slate-500">Off</span>
                    <Toggle checked={darkMode} label="Dark mode" onChange={handleThemeChange} />
                    <span className="text-[12px] text-slate-500">On</span>
                  </div>
                </SettingRow>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
              className="app-panel"
            >
              <div className="border-b border-slate-100 px-5 py-4">
                <p className="text-[13px] font-bold text-slate-900">Notifications</p>
              </div>
              <div className="divide-y divide-slate-100">
                <SettingRow icon={Bell} label="Email Reports" desc="Weekly executive summary via email">
                  <Toggle checked={emailNotif} label="Email reports" onChange={setEmailNotif} />
                </SettingRow>
                <SettingRow icon={Bell} label="Anomaly Alerts" desc="Notify when spikes exceed 30% MoM">
                  <Toggle checked={reportNotif} label="Anomaly alerts" onChange={setReportNotif} />
                </SettingRow>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="app-panel"
            >
              <div className="border-b border-slate-100 px-5 py-4">
                <p className="text-[13px] font-bold text-slate-900">Integrations</p>
              </div>
              <div className="divide-y divide-slate-100">
                <SettingRow icon={Key} label="Gemini AI Key" desc="For live AI extraction and validation">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-[12px] text-slate-500">Not configured</span>
                  </div>
                </SettingRow>
                <SettingRow icon={Key} label="Climatiq API Key" desc="For live emission factor lookups">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-[12px] text-slate-500">Not configured</span>
                  </div>
                </SettingRow>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.25 }}
              className="app-panel border-rose-200 bg-rose-50/60"
            >
              <div className="border-b border-rose-100 px-5 py-4">
                <p className="text-[13px] font-bold text-rose-600">Danger Zone</p>
              </div>
              <div className="px-5 py-4">
                <button
                  type="button"
                  onClick={handleResetPreferences}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-[13px] font-medium text-rose-600 transition-colors hover:bg-rose-50 active:scale-[0.97]"
                >
                  <Trash className="h-3.5 w-3.5" />
                  Reset Local Preferences
                </button>
              </div>
            </motion.div>

            <div className="lg:col-span-2 flex justify-end">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.97]"
              >
                {saved ? (
                  <><CheckCircle className="h-4 w-4" /> Saved</>
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
