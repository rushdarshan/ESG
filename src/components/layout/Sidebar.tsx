"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  House,
  TreeEvergreen,
  Users,
  ShieldCheck,
  ChartBar,
  Target,
  Trophy,
  GearSix,
  Leaf,
} from "@phosphor-icons/react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/environment", label: "Environment", icon: TreeEvergreen },
  { href: "/social", label: "Social", icon: Users },
  { href: "/governance", label: "Governance", icon: ShieldCheck },
  { divider: true },
  { href: "/reports", label: "Reports", icon: ChartBar },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/rewards", label: "Rewards", icon: Trophy },
  { divider: true },
  { href: "/settings", label: "Settings", icon: GearSix },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-[72px] flex-col items-center border-r border-slate-200/60 bg-white py-6 lg:w-[220px]">
      {/* Logo */}
      <Link href="/dashboard" className="mb-10 flex items-center gap-2.5 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
          <Leaf className="h-5 w-5 text-white" weight="bold" />
        </div>
        <span className="hidden text-[15px] font-semibold tracking-tight text-slate-900 lg:block">
          EcoSphere
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 px-2">
        {NAV_ITEMS.map((item, i) => {
          if ("divider" in item && item.divider) {
            return (
              <div
                key={`div-${i}`}
                className="mx-2 my-2 border-t border-slate-100"
              />
            );
          }

          const Icon = item.icon!;
          const href = item.href!;
          const label = item.label!;
          const isActive =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
               className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                 isActive
                   ? "bg-emerald-50 text-emerald-700"
                   : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
               } active:scale-[0.97]`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-emerald-50"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon
                className={`relative z-10 h-5 w-5 flex-shrink-0 ${
                  isActive ? "text-emerald-600" : ""
                }`}
                weight={isActive ? "fill" : "regular"}
              />
              <span className="relative z-10 hidden lg:block">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User avatar */}
      <div className="mt-auto px-2">
        <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-slate-50">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[13px] font-semibold text-slate-600">
            DS
          </div>
          <div className="hidden flex-col lg:flex">
            <span className="text-[13px] font-medium text-slate-800">
              Darshan
            </span>
            <span className="text-[11px] text-slate-400">Sustainability Mgr</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
