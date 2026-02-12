"use client";

import type { LeadResult } from "@/app/page";

function MarketDot({ market }: { market: string }) {
  const color =
    market === "PRIMARY"
      ? "bg-blue-400"
      : market === "SECONDARY"
        ? "bg-purple-400"
        : "bg-yellow-400";
  return <div className={`w-2.5 h-2.5 rounded-full ${color}`} />;
}

function TempLabel({ temp }: { temp: string }) {
  if (temp === "HOT")
    return <span className="text-red-400 text-xs font-medium">HOT</span>;
  if (temp === "WARM")
    return <span className="text-yellow-400 text-xs font-medium">WARM</span>;
  return <span className="text-cyan-400 text-xs font-medium">COLD</span>;
}

export default function LeadHistory({
  history,
  onSelect,
}: {
  history: LeadResult[];
  onSelect: (item: LeadResult) => void;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <h3 className="text-lg font-semibold text-white">
          Lead History ({history.length})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)] text-left">
              <th className="px-6 py-3 text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Market
              </th>
              <th className="px-6 py-3 text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Temp
              </th>
              <th className="px-6 py-3 text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Routed To
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr
                key={item.lead_id || idx}
                onClick={() => onSelect(item)}
                className="border-b border-[var(--border)] hover:bg-[var(--bg-input)] transition-colors cursor-pointer"
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <MarketDot market={item.analysis.market} />
                    <span className="text-sm text-white">
                      {item.analysis.market}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-white">
                  {item.contact.name || "Unknown"}
                </td>
                <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">
                  {item.source}
                </td>
                <td className="px-6 py-3 text-sm text-green-400">
                  {item.analysis.budget_aed
                    ? item.analysis.budget_aed >= 1000000
                      ? `${(item.analysis.budget_aed / 1000000).toFixed(1)}M`
                      : `${(item.analysis.budget_aed / 1000).toFixed(0)}K`
                    : "-"}
                </td>
                <td className="px-6 py-3 text-sm text-white">
                  {item.analysis.location || "-"}
                </td>
                <td className="px-6 py-3">
                  <TempLabel temp={item.analysis.lead_temperature} />
                </td>
                <td className="px-6 py-3 text-sm text-white">
                  {item.routing.routed_to}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
