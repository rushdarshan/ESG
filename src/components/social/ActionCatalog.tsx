"use client";

import { useState } from "react";
import { ACTION_TYPES, EVIDENCE_OPTIONS } from "@/lib/actions";
import type { ActionTypeDef } from "@/lib/actions";

interface Props {
  onSubmit: (actionType: string, evidence: { type: string; data: string }) => void;
}

export function ActionCatalog({ onSubmit }: Props) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [evidenceData, setEvidenceData] = useState("");

  const handleSubmit = () => {
    if (!selectedAction || !selectedEvidence) return;
    onSubmit(selectedAction, { type: selectedEvidence, data: evidenceData });
    setSelectedAction(null);
    setSelectedEvidence(null);
    setEvidenceData("");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sustainability Actions</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {ACTION_TYPES.map((action: ActionTypeDef) => (
          <button
            key={action.id}
            onClick={() => setSelectedAction(action.id)}
            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
              selectedAction === action.id
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <span className="text-3xl mb-2">{action.icon}</span>
            <span className="text-sm font-medium text-center">{action.name}</span>
            <span className="text-xs text-green-600 mt-1">{action.baseCarbon} kg CO\u2082e</span>
            <span className="text-xs text-blue-500">+{action.baseXP} XP</span>
          </button>
        ))}
      </div>

      {selectedAction && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h3 className="font-medium mb-3">Submit Evidence</h3>
          <div className="flex gap-2 mb-3">
            {EVIDENCE_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                onClick={() => setSelectedEvidence(opt.type)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm border ${
                  selectedEvidence === opt.type
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {selectedEvidence && (
            <div className="flex gap-2">
              <input
                type="text"
                value={evidenceData}
                onChange={(e) => setEvidenceData(e.target.value)}
                placeholder="Describe your evidence..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
