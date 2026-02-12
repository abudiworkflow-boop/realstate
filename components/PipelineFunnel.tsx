"use client";

import type { LeadResult } from "@/app/page";

interface FunnelStage {
  label: string;
  count: number;
  color: string;
  width: string;
}

export default function PipelineFunnel({
  history,
}: {
  history: LeadResult[];
}) {
  const total = history.length;
  const qualified = history.filter(
    (h) => h.analysis.market !== "UNKNOWN"
  ).length;
  const contacted = history.filter((h) => h.status === "CONTACTED").length;
  const viewingBooked = history.filter(
    (h) => h.booking_slots && h.booking_slots.length > 0
  ).length;
  const hot = history.filter(
    (h) => h.analysis.lead_temperature === "HOT"
  ).length;

  const stages: FunnelStage[] = [
    {
      label: "Incoming Leads",
      count: total,
      color: "from-[var(--accent-blue)] to-[var(--accent-blue)]",
      width: "100%",
    },
    {
      label: "AI Qualified",
      count: qualified,
      color: "from-[var(--accent-purple)] to-[var(--accent-blue)]",
      width: total ? `${Math.max(40, (qualified / total) * 100)}%` : "0%",
    },
    {
      label: "Auto-Contacted",
      count: contacted,
      color: "from-[var(--accent-green)] to-[var(--accent-purple)]",
      width: total ? `${Math.max(30, (contacted / total) * 100)}%` : "0%",
    },
    {
      label: "Viewing Proposed",
      count: viewingBooked,
      color: "from-[var(--gold)] to-[var(--accent-green)]",
      width: total
        ? `${Math.max(25, (viewingBooked / total) * 100)}%`
        : "0%",
    },
    {
      label: "Hot Leads",
      count: hot,
      color: "from-[var(--accent-red)] to-[var(--gold)]",
      width: total ? `${Math.max(20, (hot / total) * 100)}%` : "0%",
    },
  ];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow">
      <div className="px-5 py-3 border-b border-[var(--border)] flex items-center gap-3">
        <div className="w-6 h-6 rounded-md bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/20 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <h3 className="text-xs font-semibold text-[var(--accent-purple)] uppercase tracking-wider">
          Lead Pipeline
        </h3>
      </div>

      <div className="p-5 space-y-2">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-3">
            <div className="w-28 flex-shrink-0 text-right">
              <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                {stage.label}
              </p>
            </div>
            <div className="flex-1 flex items-center">
              <div
                className="h-8 rounded-md bg-gradient-to-r flex items-center justify-center transition-all duration-700 relative overflow-hidden"
                style={{
                  width: total ? stage.width : "0%",
                  backgroundImage: `linear-gradient(to right, var(--accent-blue), ${
                    i === 0
                      ? "var(--accent-blue)"
                      : i === 1
                        ? "var(--accent-purple)"
                        : i === 2
                          ? "var(--accent-green)"
                          : i === 3
                            ? "var(--gold)"
                            : "var(--accent-red)"
                  })`,
                  opacity: 0.8,
                }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)",
                  }}
                />
                <span className="text-[11px] font-bold text-white relative z-10 drop-shadow-sm">
                  {stage.count}
                </span>
              </div>
            </div>
          </div>
        ))}

        {total === 0 && (
          <div className="text-center py-6">
            <p className="text-xs text-[var(--text-muted)]">
              Process leads to see the pipeline funnel
            </p>
          </div>
        )}

        {total > 0 && (
          <div className="mt-3 pt-3 border-t border-[var(--border)] grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-bold text-white">
                {total ? Math.round((qualified / total) * 100) : 0}%
              </p>
              <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
                Qualification Rate
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--gold)]">
                {total ? Math.round((hot / total) * 100) : 0}%
              </p>
              <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
                Hot Lead Rate
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--accent-green)]">
                100%
              </p>
              <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
                Auto-Responded
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
