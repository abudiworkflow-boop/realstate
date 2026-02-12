"use client";

import type { LeadResult } from "@/app/page";

function MarketDot({ market }: { market: string }) {
  const color =
    market === "PRIMARY"
      ? "bg-[var(--accent-blue)]"
      : market === "SECONDARY"
        ? "bg-[var(--accent-purple)]"
        : "bg-[var(--accent-yellow)]";
  return <div className={`w-2 h-2 rounded-full ${color}`} />;
}

function TempLabel({ temp }: { temp: string }) {
  if (temp === "HOT")
    return (
      <span className="inline-flex items-center gap-1 text-[var(--accent-red)] text-[11px] font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] animate-breathe" />
        HOT
      </span>
    );
  if (temp === "WARM")
    return (
      <span className="inline-flex items-center gap-1 text-[var(--accent-yellow)] text-[11px] font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-yellow)]" />
        WARM
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[var(--accent-cyan)] text-[11px] font-semibold">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
      COLD
    </span>
  );
}

function SourceIcon({ source }: { source: string }) {
  const className = "w-4 h-4 text-[var(--text-muted)]";
  if (source === "whatsapp")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    );
  if (source === "instagram")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  if (source === "website")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    );
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function LeadHistory({
  history,
  onSelect,
}: {
  history: LeadResult[];
  onSelect: (item: LeadResult) => void;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow">
      <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[var(--bg-input)] border border-[var(--border)] flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Lead Pipeline
            </h3>
            <p className="text-[10px] text-[var(--text-muted)]">
              {history.length} lead{history.length !== 1 ? "s" : ""} processed this session
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="px-6 py-3 text-[10px] text-[var(--text-muted)] uppercase tracking-wider text-left font-medium">
                Market
              </th>
              <th className="px-6 py-3 text-[10px] text-[var(--text-muted)] uppercase tracking-wider text-left font-medium">
                Contact
              </th>
              <th className="px-6 py-3 text-[10px] text-[var(--text-muted)] uppercase tracking-wider text-left font-medium">
                Channel
              </th>
              <th className="px-6 py-3 text-[10px] text-[var(--text-muted)] uppercase tracking-wider text-left font-medium">
                Budget
              </th>
              <th className="px-6 py-3 text-[10px] text-[var(--text-muted)] uppercase tracking-wider text-left font-medium">
                Location
              </th>
              <th className="px-6 py-3 text-[10px] text-[var(--text-muted)] uppercase tracking-wider text-left font-medium">
                Temp
              </th>
              <th className="px-6 py-3 text-[10px] text-[var(--text-muted)] uppercase tracking-wider text-left font-medium">
                Assigned To
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr
                key={item.lead_id || idx}
                onClick={() => onSelect(item)}
                className="border-b border-[var(--border)] hover:bg-[var(--bg-input)] transition-colors cursor-pointer group"
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <MarketDot market={item.analysis.market} />
                    <span className="text-xs font-medium text-white">
                      {item.analysis.market === "PRIMARY" ? "Off-Plan" : item.analysis.market === "SECONDARY" ? "Secondary" : "Unknown"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <span className="text-sm text-white font-medium">
                    {item.contact.name || "Unknown"}
                  </span>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <SourceIcon source={item.source} />
                    <span className="text-xs text-[var(--text-secondary)] capitalize">
                      {item.source.replace("_", " ")}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm text-[var(--accent-green)] font-medium">
                  {item.analysis.budget_aed
                    ? item.analysis.budget_aed >= 1000000
                      ? `${(item.analysis.budget_aed / 1000000).toFixed(1)}M`
                      : `${(item.analysis.budget_aed / 1000).toFixed(0)}K`
                    : "-"}
                </td>
                <td className="px-6 py-3.5 text-sm text-white">
                  {item.analysis.location || "-"}
                </td>
                <td className="px-6 py-3.5">
                  <TempLabel temp={item.analysis.lead_temperature} />
                </td>
                <td className="px-6 py-3.5 text-sm text-white font-medium">
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
