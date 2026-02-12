"use client";

import type { LeadResult } from "@/app/page";

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "blue" | "purple" | "green" | "red" | "yellow" | "cyan" | "gray" | "gold" | "emerald";
}) {
  const colors: Record<string, string> = {
    blue: "bg-[var(--accent-blue)]/12 text-[var(--accent-blue)] border-[var(--accent-blue)]/25",
    purple: "bg-[var(--accent-purple)]/12 text-[var(--accent-purple)] border-[var(--accent-purple)]/25",
    green: "bg-[var(--accent-green)]/12 text-[var(--accent-green)] border-[var(--accent-green)]/25",
    red: "bg-[var(--accent-red)]/12 text-[var(--accent-red)] border-[var(--accent-red)]/25",
    yellow: "bg-[var(--accent-yellow)]/12 text-[var(--accent-yellow)] border-[var(--accent-yellow)]/25",
    cyan: "bg-[var(--accent-cyan)]/12 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/25",
    gray: "bg-white/5 text-[var(--text-secondary)] border-white/10",
    gold: "badge-luxury",
    emerald: "bg-[var(--accent-emerald)]/12 text-[var(--accent-emerald)] border-[var(--accent-emerald)]/25",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border tracking-wide ${colors[variant]}`}
    >
      {children}
    </span>
  );
}

function getMarketBadge(market: string) {
  if (market === "PRIMARY") return <Badge variant="blue">OFF-PLAN</Badge>;
  if (market === "SECONDARY") return <Badge variant="purple">SECONDARY</Badge>;
  return <Badge variant="yellow">UNCLASSIFIED</Badge>;
}

function getTempBadge(temp: string) {
  if (temp === "HOT") return <Badge variant="red">HOT LEAD</Badge>;
  if (temp === "WARM") return <Badge variant="yellow">WARM</Badge>;
  return <Badge variant="cyan">COLD</Badge>;
}

function getPriorityBadge(tag: string | null) {
  if (tag === "PRIORITY") return <Badge variant="red">PRIORITY</Badge>;
  if (tag === "HIGH") return <Badge variant="yellow">HIGH</Badge>;
  if (tag === "VIP") return <Badge variant="gold">VIP</Badge>;
  return <Badge variant="gray">Standard</Badge>;
}

function formatBudget(aed: number | null) {
  if (!aed) return "Not specified";
  if (aed >= 1000000) return `AED ${(aed / 1000000).toFixed(1)}M`;
  if (aed >= 1000) return `AED ${(aed / 1000).toFixed(0)}K`;
  return `AED ${aed.toLocaleString()}`;
}

function UrgencyBar({ score }: { score: number }) {
  const color =
    score >= 70
      ? "from-[var(--accent-red)] to-red-400"
      : score >= 40
        ? "from-[var(--accent-yellow)] to-yellow-400"
        : "from-[var(--accent-blue)] to-blue-400";
  const label = score >= 70 ? "High" : score >= 40 ? "Medium" : "Low";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-[var(--text-muted)]">Urgency Level</span>
        <span className="text-xs font-semibold text-[var(--text-secondary)]">
          {label} ({score}/100)
        </span>
      </div>
      <div className="h-2 rounded-full bg-[var(--bg-input)] overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} animate-progress-fill`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function DataField({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div>
      <p className="text-[10px] text-[var(--text-muted)] mb-1 uppercase tracking-wider">{label}</p>
      <p className={`text-sm font-medium ${accent || "text-white"}`}>{value}</p>
    </div>
  );
}

function ConfidenceRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "var(--accent-green)" : score >= 40 ? "var(--accent-yellow)" : "var(--accent-red)";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="88" height="88" className="-rotate-90">
        <circle cx="44" cy="44" r="36" stroke="var(--bg-input)" strokeWidth="6" fill="none" />
        <circle
          cx="44"
          cy="44"
          r="36"
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-white">{score}</span>
        <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Score</span>
      </div>
    </div>
  );
}

export default function ResultPanel({
  result,
  processingTime,
}: {
  result: LeadResult;
  processingTime?: number | null;
}) {
  const { analysis, routing, reply, booking_slots } = result;

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Classification Header */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow">
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--accent-purple)]/10 border border-[var(--accent-blue)]/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              AI Classification
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {getMarketBadge(analysis.market)}
            {getTempBadge(analysis.lead_temperature)}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-6">
            {/* Confidence Ring */}
            <div className="flex-shrink-0 hidden sm:block">
              <ConfidenceRing score={analysis.urgency_score} />
            </div>

            {/* Data Grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
              <DataField label="Intent" value={analysis.intent} accent="text-[var(--accent-green)]" />
              <DataField label="Property Type" value={analysis.property_type} />
              <DataField
                label="Bedrooms"
                value={
                  analysis.bedrooms !== null
                    ? analysis.bedrooms === 0
                      ? "Studio"
                      : `${analysis.bedrooms} Bedroom`
                    : "Not specified"
                }
              />
              <DataField
                label="Budget"
                value={formatBudget(analysis.budget_aed)}
                accent="text-[var(--accent-green)]"
              />
              <DataField label="Location" value={analysis.location || "Not specified"} />
              <DataField label="Timeline" value={analysis.timeline || "Not specified"} />
              <DataField label="Language" value={analysis.language === "AR" ? "Arabic" : analysis.language === "EN" ? "English" : analysis.language} />
              <DataField label="Purpose" value={analysis.purpose || "Not specified"} />
              {processingTime && (
                <DataField
                  label="Response Time"
                  value={`${(processingTime / 1000).toFixed(1)}s`}
                  accent="text-[var(--gold)]"
                />
              )}
            </div>
          </div>

          {/* Urgency bar - mobile */}
          <div className="mt-5 sm:hidden">
            <UrgencyBar score={analysis.urgency_score} />
          </div>

          {/* Urgency bar - desktop */}
          <div className="mt-5 hidden sm:block">
            <UrgencyBar score={analysis.urgency_score} />
          </div>
        </div>
      </div>

      {/* Routing Card */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow animate-fade-in-up stagger-1" style={{ opacity: 0 }}>
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold)]/15 to-[var(--gold)]/5 border border-[var(--gold)]/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                Assigned Team
              </p>
              <p className="text-base font-bold text-white">
                {routing.routed_to}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
              Priority
            </p>
            {getPriorityBadge(routing.priority_tag)}
          </div>
        </div>
      </div>

      {/* AI Reply */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow animate-fade-in-up stagger-2" style={{ opacity: 0 }}>
        <div className="px-5 py-3 border-b border-[var(--border)] flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <h3 className="text-xs font-semibold text-[var(--accent-green)] uppercase tracking-wider">
            Instant AI Response
          </h3>
          <span className="ml-auto text-[10px] text-[var(--text-muted)] badge-luxury px-2 py-0.5 rounded-full">
            Auto-generated
          </span>
        </div>
        <div className="p-5">
          <div
            className="bg-[var(--bg-input)] rounded-xl p-5 border border-[var(--border)] relative"
            dir="auto"
          >
            <div className="absolute top-3 right-3">
              <button
                onClick={() => navigator.clipboard.writeText(reply.message)}
                className="p-1.5 rounded-md hover:bg-white/5 text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
                title="Copy reply"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </button>
            </div>
            {reply.message.split("\n").map((line, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed ${line.trim() === "" ? "h-4" : "text-[var(--text-primary)]"}`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow animate-fade-in-up stagger-3" style={{ opacity: 0 }}>
        <div className="px-5 py-3 border-b border-[var(--border)] flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h3 className="text-xs font-semibold text-[var(--accent-blue)] uppercase tracking-wider">
            Proposed Meeting Times
          </h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {booking_slots.map((slot, i) => (
            <div
              key={i}
              className="group rounded-lg bg-[var(--bg-input)] border border-[var(--border)] p-4 text-center hover:border-[var(--gold)]/30 hover:bg-[var(--bg-elevated)] transition-all cursor-pointer"
            >
              <span className="text-[var(--gold)] font-bold text-xs block mb-1.5 opacity-60">
                Option {i + 1}
              </span>
              <span className="text-sm text-white font-medium">{slot}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Information */}
      {analysis.missing_questions.length > 0 && (
        <div className="rounded-xl border border-[var(--accent-yellow)]/15 bg-[var(--accent-yellow)]/5 p-5 animate-fade-in-up stagger-4" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h4 className="text-xs font-semibold text-[var(--accent-yellow)] uppercase tracking-wider">
              Follow-up Questions
            </h4>
          </div>
          <ul className="space-y-2">
            {analysis.missing_questions.map((q, i) => (
              <li
                key={i}
                className="text-sm text-[var(--text-secondary)] flex items-start gap-2.5"
              >
                <span className="text-[var(--accent-yellow)]/60 mt-1 text-xs">{i + 1}.</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
