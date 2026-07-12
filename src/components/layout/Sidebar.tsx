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
} from "@/lib/icons";

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
    <aside className="fixed left-0 top-0 z-40 flex h-full w-[68px] flex-col items-center bg-[#153c2a] py-5 text-[#dce8d9] lg:w-[232px] lg:items-stretch">
      {/* Logo */}
      <Link href="/dashboard" aria-label="EcoSphere dashboard" className="mb-8 flex items-center gap-3 px-3 lg:px-5">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#b7dc85]">
          <Leaf className="h-4.5 w-4.5 text-[#17341f]" />
        </div>
        <span className="hidden text-[15px] font-semibold tracking-[-0.03em] text-[#f1f6ed] lg:block">
          EcoSphere
        </span>
      </Link>

      {/* Nav */}
      <nav aria-label="Primary navigation" className="flex flex-1 flex-col gap-1 px-2 lg:px-3">
        {NAV_ITEMS.map((item, i) => {
          if ("divider" in item && item.divider) {
            return (
              <div
                key={`div-${i}`}
                className="mx-2 my-2 border-t border-[#315a40]"
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
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                 isActive
                   ? "text-[#17341f]"
                   : "text-[#b9cbbd] hover:bg-[#214c35] hover:text-[#f2f7ef]"
               } active:scale-[0.97]`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-[#b7dc85]"
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <Icon
                className={`relative z-10 h-5 w-5 flex-shrink-0 ${
                  isActive ? "text-[#17341f]" : ""
                }`}
              />
              <span className="relative z-10 hidden lg:block">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User avatar */}
      <div className="mt-auto px-2 lg:px-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#214c35]">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#2c5a40] text-[12px] font-semibold text-[#edf5e9]">
            DS
          </div>
          <div className="hidden flex-col lg:flex">
            <span className="text-[13px] font-semibold text-[#edf5e9]">
              Darshan
            </span>
            <span className="text-[11px] text-[#8faf97]">Sustainability manager</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
