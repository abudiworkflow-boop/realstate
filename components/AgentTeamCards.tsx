"use client";

import type { LeadResult } from "@/app/page";

interface TeamInfo {
  name: string;
  initials: string;
  specialty: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const TEAMS: Record<string, TeamInfo> = {
  "Offplan Team": {
    name: "Offplan Team",
    initials: "OP",
    specialty: "New Developments & Payment Plans",
    color: "text-[var(--accent-blue)]",
    bgColor: "bg-[var(--accent-blue)]",
    borderColor: "border-[var(--accent-blue)]/20",
  },
  "Resale Team": {
    name: "Resale Team",
    initials: "RS",
    specialty: "Ready Properties & Resale Market",
    color: "text-[var(--accent-purple)]",
    bgColor: "bg-[var(--accent-purple)]",
    borderColor: "border-[var(--accent-purple)]/20",
  },
  "Rental Team": {
    name: "Rental Team",
    initials: "RT",
    specialty: "Furnished & Unfurnished Rentals",
    color: "text-[var(--accent-green)]",
    bgColor: "bg-[var(--accent-green)]",
    borderColor: "border-[var(--accent-green)]/20",
  },
  "Senior Closer": {
    name: "Senior Closer",
    initials: "SC",
    specialty: "Premium & High-Value Deals (5M+)",
    color: "text-[var(--gold)]",
    bgColor: "bg-[var(--gold)]",
    borderColor: "border-[var(--gold)]/20",
  },
  "General Inquiries": {
    name: "General Inquiries",
    initials: "GI",
    specialty: "Unqualified & Discovery Leads",
    color: "text-[var(--text-secondary)]",
    bgColor: "bg-[var(--text-secondary)]",
    borderColor: "border-[var(--text-secondary)]/20",
  },
};

export default function AgentTeamCards({
  history,
  activeTeam,
}: {
  history: LeadResult[];
  activeTeam: string | null;
}) {
  // Count leads per team
  const teamCounts: Record<string, number> = {};
  const teamBudgets: Record<string, number> = {};
  history.forEach((h) => {
    const team = h.routing.routed_to;
    teamCounts[team] = (teamCounts[team] || 0) + 1;
    teamBudgets[team] = (teamBudgets[team] || 0) + (h.analysis.budget_aed || 0);
  });

  const allTeams = Object.keys(TEAMS);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow">
      <div className="px-5 py-3 border-b border-[var(--border)] flex items-center gap-3">
        <div className="w-6 h-6 rounded-md bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
        </div>
        <h3 className="text-xs font-semibold text-[var(--gold)] uppercase tracking-wider">
          Team Routing
        </h3>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {allTeams.map((teamKey) => {
          const team = TEAMS[teamKey];
          const count = teamCounts[teamKey] || 0;
          const budget = teamBudgets[teamKey] || 0;
          const isActive = activeTeam === teamKey;

          return (
            <div
              key={teamKey}
              className={`rounded-xl border p-3.5 transition-all ${
                isActive
                  ? `${team.borderColor} bg-[var(--bg-elevated)] ring-1 ring-${team.color}/20`
                  : count > 0
                    ? `border-[var(--border)] bg-[var(--bg-input)]`
                    : `border-[var(--border)] bg-[var(--bg-input)] opacity-50`
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`w-8 h-8 rounded-lg ${team.bgColor}/15 flex items-center justify-center border ${team.borderColor}`}
                >
                  <span className={`text-[10px] font-bold ${team.color}`}>
                    {team.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {team.name}
                  </p>
                  <p className="text-[9px] text-[var(--text-muted)] truncate">
                    {team.specialty}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-lg font-bold ${count > 0 ? team.color : 'text-[var(--text-muted)]'}`}>
                    {count}
                  </span>
                  <span className="text-[9px] text-[var(--text-muted)] ml-1">
                    lead{count !== 1 ? "s" : ""}
                  </span>
                </div>
                {budget > 0 && (
                  <span className="text-[10px] text-[var(--text-muted)] font-medium">
                    {budget >= 1000000
                      ? `${(budget / 1000000).toFixed(1)}M`
                      : `${(budget / 1000).toFixed(0)}K`}
                  </span>
                )}
              </div>

              {isActive && (
                <div className={`mt-2 pt-2 border-t ${team.borderColor}`}>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${team.bgColor} animate-breathe`} />
                    <span className={`text-[9px] ${team.color} font-medium`}>
                      Just assigned
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
