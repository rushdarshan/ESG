"use client";

interface LeaderboardEntry {
  rank: number;
  departmentName: string;
  totalCarbonSaved: number;
  actionCount: number;
  topEmployee?: string;
}

interface Props {
  entries: LeaderboardEntry[];
}

const MEDALS = ["\ud83e\udd47", "\ud83e\udd48", "\ud83e\udd49"];

export function Leaderboard({ entries }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Department Leaderboard</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {entries.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No actions logged yet. Be the first!
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Rank</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Department</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">CO\u2082e Saved</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Top Performer</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-gray-100 ${entry.rank <= 3 ? "bg-green-50/50" : ""}`}
                >
                  <td className="px-4 py-3 text-sm">
                    {entry.rank <= 3 ? (
                      <span className="text-xl">{MEDALS[entry.rank - 1]}</span>
                    ) : (
                      <span className="text-gray-400 font-medium">{entry.rank}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{entry.departmentName}</td>
                  <td className="px-4 py-3 text-sm text-right font-mono text-green-600">
                    {entry.totalCarbonSaved.toFixed(1)} kg
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-600">
                    {entry.actionCount}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                    {entry.topEmployee || "\u2014"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
