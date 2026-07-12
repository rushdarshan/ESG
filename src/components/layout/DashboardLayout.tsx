"use client";

import { Sidebar } from "./Sidebar";
import { ESGSwitcher } from "./ESGSwitcher";
import { Bell, MagnifyingGlass } from "@/lib/icons";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-background">
      <Sidebar />

      {/* Main content area */}
      <div className="min-w-0 pl-[72px] lg:pl-[220px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-2 border-b border-slate-200/60 bg-white/80 px-3 sm:px-6 backdrop-blur-xl">
          <div className="hidden min-w-0 items-center gap-4 sm:flex">
            <ESGSwitcher />
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <button aria-label="Search" className="hidden h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 active:scale-[0.92] md:flex">
              <MagnifyingGlass className="h-4.5 w-4.5" />
            </button>

            {/* Notifications */}
            <button aria-label="Notifications" className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 active:scale-[0.92]">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
            </button>

            {/* Demo selector */}
            <div className="ml-2 hidden items-center gap-2 rounded-xl border border-slate-200/60 bg-white px-3 py-1.5 lg:flex">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <select aria-label="Demo scenario" className="bg-transparent text-[13px] font-medium text-slate-700 outline-none">
                <option>Demo: GreenForge Industries</option>
                <option>Healthy (Score 82)</option>
                <option>Poor (Score 41)</option>
              </select>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
