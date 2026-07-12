"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, X } from "@/lib/icons";

interface AIInsightProps {
  title: string;
  message: string;
  type?: "info" | "warning" | "success";
}

const TYPE_STYLES = {
  info: "border-blue-200 bg-blue-50/50",
  warning: "border-amber-200 bg-amber-50/50",
  success: "border-emerald-200 bg-emerald-50/50",
};

const ICON_STYLES = {
  info: "text-blue-500",
  warning: "text-amber-500",
  success: "text-emerald-500",
};

export function AIInsight({ title, message, type = "info" }: AIInsightProps) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className={`overflow-hidden rounded-2xl border ${TYPE_STYLES[type]}`}
        >
          <div className="flex items-start gap-3 p-4">
            <div className={`mt-0.5 flex-shrink-0 ${ICON_STYLES[type]}`}>
              <Sparkle className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-slate-800">{title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                {message}
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-white/60 hover:text-slate-600 active:scale-[0.9]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
