"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Star, ShoppingCart } from "@phosphor-icons/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const REWARDS = [
  { id: "1", name: "EcoSphere T-Shirt", points: 500, stock: 10, icon: "👕" },
  { id: "2", name: "Reusable Water Bottle", points: 200, stock: 25, icon: "🍶" },
  { id: "3", name: "Plant a Tree Certificate", points: 1000, stock: 5, icon: "🌳" },
  { id: "4", name: "Coffee Voucher", points: 150, stock: 50, icon: "☕" },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

export default function RewardsPage() {
  const [balance] = useState(1240);
  const [msg, setMsg] = useState("");

  const redeem = (name: string, points: number) => {
    if (balance >= points) {
      setMsg(`Redeemed ${name}! ${points} XP deducted.`);
    } else {
      setMsg("Not enough XP. Keep earning!");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] font-medium text-slate-400">Rewards</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Reward Catalog
            </motion.h1>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 rounded-2xl border border-slate-200/50 bg-white px-5 py-3 shadow-sm">
            <Star className="h-5 w-5 text-amber-500" weight="fill" />
            <span className="text-sm font-bold text-slate-900">{balance} XP</span>
          </motion.div>
        </div>

        {msg && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-[13px] font-medium text-emerald-700">
            {msg}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REWARDS.map((r, i) => (
            <motion.div
              key={r.id}
              variants={FADE_UP}
              initial="hidden"
              animate="show"
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-[2rem] border border-slate-200/50 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <span className="mb-3 text-3xl">{r.icon}</span>
              <h3 className="mb-1 text-sm font-semibold text-slate-800">{r.name}</h3>
              <p className="mb-1 text-[12px] text-slate-500">
                <Gift className="mr-1 inline h-3.5 w-3.5" />
                {r.points} XP
              </p>
              <p className="mb-4 text-[11px] text-slate-400">Stock: {r.stock}</p>
              <button
                onClick={() => redeem(r.name, r.points)}
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-emerald-700 active:scale-[0.98]"
              >
                <ShoppingCart className="h-4 w-4" />
                Redeem
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
