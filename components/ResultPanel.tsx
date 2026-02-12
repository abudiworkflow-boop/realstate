"use client";

import type { LeadResult } from "@/app/page";

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "blue" | "purple" | "green" | "red" | "yellow" | "cyan" | "gray";
}) {
  const colors = {
    blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    purple: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    green: "bg-green-500/15 text-green-400 border-green-500/30",
    red: "bg-red-500/15 text-red-400 border-red-500/30",
    yellow: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    gray: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${colors[variant]}`}
    >
      {children}
    </span>
  );
}

function getMarketBadge(market: string) {
  if (market === "PRIMARY")
    return <Badge variant="blue">PRIMARY</Badge>;
  if (market === "SECONDARY")
    return <Badge variant="purple">SECONDARY</Badge>;
  return <Badge variant="yellow">UNKNOWN</Badge>;
}

function getTempBadge(temp: string) {
  if (temp === "HOT") return <Badge variant="red">HOT</Badge>;
  if (temp === "WARM") return <Badge variant="yellow">WARM</Badge>;
  return <Badge variant="cyan">COLD</Badge>;
}

function getPriorityBadge(tag: string | null) {
  if (tag === "PRIORITY") return <Badge variant="red">PRIORITY</Badge>;
  if (tag === "HIGH") return <Badge variant="yellow">HIGH</Badge>;
  if (tag === "VIP") return <Badge variant="cyan">VIP</Badge>;
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
      ? "bg-red-500"
      : score >= 40
        ? "bg-yellow-500"
        : "bg-blue-500";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-[var(--bg-input)] overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-mono text-[var(--text-secondary)]">
        {score}/100
      </span>
    </div>
  );
}

export default function ResultPanel({ result }: { result: LeadResult }) {
  const { analysis, routing, reply, booking_slots } = result;

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Classification Header */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">
              AI Classification
            </h3>
            {getMarketBadge(analysis.market)}
            <Badge variant="green">{analysis.intent}</Badge>
          </div>
          {getTempBadge(analysis.lead_temperature)}
        </div>

        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-[var(--text-secondary)] mb-1">
              Property Type
            </p>
            <p className="text-sm font-medium text-white">
              {analysis.property_type}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] mb-1">
              Bedrooms
            </p>
            <p className="text-sm font-medium text-white">
              {analysis.bedrooms !== null
                ? analysis.bedrooms === 0
                  ? "Studio"
                  : `${analysis.bedrooms} BR`
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] mb-1">Budget</p>
            <p className="text-sm font-medium text-green-400">
              {formatBudget(analysis.budget_aed)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] mb-1">
              Location
            </p>
            <p className="text-sm font-medium text-white">
              {analysis.location || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] mb-1">
              Timeline
            </p>
            <p className="text-sm font-medium text-white">
              {analysis.timeline || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] mb-1">
              Language
            </p>
            <p className="text-sm font-medium text-white">
              {analysis.language}
            </p>
          </div>
        </div>

        <div className="px-6 pb-4">
          <p className="text-xs text-[var(--text-secondary)] mb-2">
            Urgency Score
          </p>
          <UrgencyBar score={analysis.urgency_score} />
        </div>
      </div>

      {/* Routing */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-secondary)] mb-1">
              Routed To
            </p>
            <p className="text-lg font-bold text-white">
              {routing.routed_to}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--text-secondary)] mb-1">
              Priority
            </p>
            {getPriorityBadge(routing.priority_tag)}
          </div>
        </div>
      </div>

      {/* AI Reply */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
        <div className="px-6 py-3 border-b border-[var(--border)] bg-green-500/5">
          <h3 className="text-sm font-semibold text-green-400">
            AI-Generated Reply
          </h3>
        </div>
        <div className="p-6">
          <div
            className="bg-[var(--bg-input)] rounded-xl p-4 border border-[var(--border)]"
            dir="auto"
          >
            {reply.message.split("\n").map((line, i) => (
              <p
                key={i}
                className={`text-sm ${line.trim() === "" ? "h-3" : "text-[var(--text-primary)]"}`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
        <div className="px-6 py-3 border-b border-[var(--border)]">
          <h3 className="text-sm font-semibold text-white">
            Proposed Booking Slots
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {booking_slots.map((slot, i) => (
            <div
              key={i}
              className="rounded-lg bg-[var(--bg-input)] border border-[var(--border)] p-3 text-center hover:border-blue-500/50 transition-all cursor-pointer"
            >
              <span className="text-blue-400 font-bold text-lg block">
                ({i + 1})
              </span>
              <span className="text-sm text-white">{slot}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Questions */}
      {analysis.missing_questions.length > 0 && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
          <h4 className="text-sm font-semibold text-yellow-400 mb-2">
            Missing Information
          </h4>
          <ul className="space-y-1">
            {analysis.missing_questions.map((q, i) => (
              <li
                key={i}
                className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
              >
                <span className="text-yellow-500 mt-0.5">&#x2022;</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
