"use client";

import { BADGE_THRESHOLDS } from "@/lib/actions";

interface Badge {
  type: string;
  earned: boolean;
  awardedAt?: string;
}

interface Props {
  badges: Badge[];
  xp: number;
  level: number;
}

export function BadgeDisplay({ badges, xp, level }: Props) {
  const xpInCurrentLevel = xp % 100;
  const progressPercent = xpInCurrentLevel; // 0-99 maps to 0-99%

  return (
    <div>
      {/* XP & Level */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-sm text-gray-500">Level</span>
            <span className="ml-2 text-2xl font-bold text-blue-600">{level}</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">XP</span>
            <span className="ml-2 font-mono font-semibold">{xp}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {100 - xpInCurrentLevel} XP to Level {level + 1}
        </p>
      </div>

      {/* Badge Wall */}
      <h3 className="text-sm font-medium text-gray-500 mb-3">Badges</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {BADGE_THRESHOLDS.map((threshold) => {
          const badge = badges.find((b) => b.type === threshold.type);
          const earned = !!badge;

          return (
            <div
              key={threshold.type}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                earned
                  ? "border-yellow-400 bg-yellow-50 shadow-sm"
                  : "border-gray-100 bg-gray-50 opacity-50"
              }`}
            >
              <span className="text-3xl mb-1">{threshold.icon}</span>
              <span className="text-xs font-medium text-center">{threshold.name}</span>
              <span className="text-[10px] text-gray-400 text-center mt-1">{threshold.description}</span>
              {earned && badge?.awardedAt && (
                <span className="text-[10px] text-green-600 mt-1">
                  Earned {new Date(badge.awardedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
