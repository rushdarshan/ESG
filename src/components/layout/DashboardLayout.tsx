"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ESGSwitcher } from "./ESGSwitcher";
import { Bell, MagnifyingGlass, SunDim, Moon } from "@phosphor-icons/react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
    <div className="min-h-[100dvh] bg-background dark:bg-slate-950">
      <Sidebar />

      <div className="lg:pl-[72px] xl:pl-[220px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
          <div className="flex items-center gap-4">
            <ESGSwitcher />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            >
              {dark ? <SunDim className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800">
              <MagnifyingGlass className="h-4.5 w-4.5" />
            </button>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
            </button>

            <div className="ml-2 flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <select className="bg-transparent text-[13px] font-medium text-slate-700 outline-none dark:text-slate-300">
                <option>Demo: GreenForge Industries</option>
                <option>Healthy (Score 82)</option>
                <option>Poor (Score 41)</option>
              </select>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>

        <footer className="border-t border-slate-100 px-8 py-3 dark:border-slate-800">
          <p className="text-center text-[11px] text-slate-400">
            EcoSphere&apos;s own estimated carbon: ~0.04 tCO₂e (compute) · Self-measuring · Open-source
          </p>
        </footer>
      </div>
    </div>
    </div>
  );
}
