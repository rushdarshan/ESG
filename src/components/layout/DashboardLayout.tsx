"use client";

import { Sidebar } from "./Sidebar";
import { ESGSwitcher } from "./ESGSwitcher";
import { Bell, MagnifyingGlass } from "@/lib/icons";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ecosphere-app min-h-[100dvh] bg-[#eef1ea] text-[#17341f]">
      <Sidebar />

      {/* Main content area */}
      <div className="min-w-0 pl-[68px] lg:pl-[232px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-2 border-b border-[#d8dfd3] bg-[#f6f8f2]/95 px-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="hidden min-w-0 items-center gap-4 sm:flex">
            <ESGSwitcher />
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <button aria-label="Search" className="hidden h-10 w-10 items-center justify-center rounded-full text-[#6d7b72] transition-colors hover:bg-[#e4e9df] hover:text-[#17341f] active:scale-[0.96] md:flex">
              <MagnifyingGlass className="h-4.5 w-4.5" />
            </button>

            {/* Notifications */}
            <button aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#6d7b72] transition-colors hover:bg-[#e4e9df] hover:text-[#17341f] active:scale-[0.96]">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-[#f6f8f2] bg-[#2e6b46]" />
            </button>

            {/* Demo selector */}
            <div className="ml-1 hidden min-h-10 items-center gap-2 rounded-full border border-[#d3dbcf] bg-[#fbfcf8] px-3 lg:flex">
              <div className="h-2 w-2 rounded-full bg-[#2e6b46]" />
              <select aria-label="Demo scenario" className="bg-transparent text-[13px] font-semibold text-[#35473b] outline-none">
                <option>Demo: GreenForge Industries</option>
                <option>Healthy (Score 82)</option>
                <option>Poor (Score 41)</option>
              </select>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main id="main-content" className="app-content min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10">{children}</main>
      </div>
    </div>
  );
}
