"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import ResultPanel from "@/components/ResultPanel";
import LeadHistory from "@/components/LeadHistory";

export interface LeadResult {
  lead_id: string;
  source: string;
  raw_text: string;
  contact: { name: string; phone: string; email: string };
  analysis: {
    market: string;
    intent: string;
    property_type: string;
    bedrooms: number | null;
    budget_aed: number | null;
    location: string | null;
    timeline: string | null;
    language: string;
    lead_temperature: string;
    urgency_score: number;
    missing_questions: string[];
    purpose: string;
    notes?: string;
  };
  routing: { routed_to: string; priority_tag: string | null };
  reply: { message: string; language: string };
  booking_slots: string[];
  status: string;
  processed_at: string;
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 card-glow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg">{icon}</span>
        <span className={`text-2xl font-bold ${accent}`}>{value}</span>
      </div>
      <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

function ProcessingOverlay() {
  return (
    <div className="rounded-xl border border-[var(--gold)]/20 bg-[var(--bg-card)] p-12 text-center animate-fade-in">
      <div className="relative inline-flex mb-6">
        <div className="w-16 h-16 rounded-full border-2 border-[var(--gold)]/20 flex items-center justify-center animate-pulse-glow">
          <div className="w-10 h-10 rounded-full border-2 border-t-[var(--gold)] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Analyzing Lead
      </h3>
      <div className="space-y-2 max-w-xs mx-auto">
        <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
          <span className="text-[var(--gold)] animate-breathe">&#x25CF;</span>
          Classifying market segment...
        </div>
        <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
          <span className="text-[var(--gold)] animate-breathe" style={{ animationDelay: "0.3s" }}>&#x25CF;</span>
          Extracting property preferences...
        </div>
        <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
          <span className="text-[var(--gold)] animate-breathe" style={{ animationDelay: "0.6s" }}>&#x25CF;</span>
          Generating personalized response...
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [result, setResult] = useState<LeadResult | null>(null);
  const [history, setHistory] = useState<LeadResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState<number | null>(null);

  const handleSubmit = async (data: {
    source: string;
    text: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
  }) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setProcessingTime(null);
    const startTime = Date.now();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const json: LeadResult = await res.json();
      setProcessingTime(Date.now() - startTime);
      setResult(json);
      setHistory((prev) => [json, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const hotLeads = history.filter((h) => h.analysis.lead_temperature === "HOT").length;
  const primaryLeads = history.filter((h) => h.analysis.market === "PRIMARY").length;
  const avgUrgency = history.length
    ? Math.round(history.reduce((sum, h) => sum + h.analysis.urgency_score, 0) / history.length)
    : 0;
  const totalBudget = history.reduce((sum, h) => sum + (h.analysis.budget_aed || 0), 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg-card)]/80 glass sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center shadow-lg shadow-[var(--gold)]/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Prop<span className="text-gold-gradient">AI</span>
                </h1>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em]">
                  Intelligent Lead Automation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-breathe" />
                <span className="text-xs text-[var(--accent-green)] font-medium">
                  Live
                </span>
              </div>
              {processingTime && (
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Last: {(processingTime / 1000).toFixed(1)}s
                </div>
              )}
              <div className="text-xs text-[var(--text-muted)] font-medium">
                {history.length} lead{history.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="gold-line" />
      </header>

      {/* Stats Bar */}
      {history.length > 0 && (
        <div className="border-b border-[var(--border)] bg-[var(--bg-card)]/40">
          <div className="max-w-[1440px] mx-auto px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                icon="&#x1F4CA;"
                label="Total Leads"
                value={history.length}
                accent="text-white"
              />
              <StatCard
                icon="&#x1F525;"
                label="Hot Leads"
                value={hotLeads}
                accent="text-[var(--accent-red)]"
              />
              <StatCard
                icon="&#x1F3D7;&#xFE0F;"
                label="Off-Plan"
                value={primaryLeads}
                accent="text-[var(--accent-blue)]"
              />
              <StatCard
                icon="&#x1F4B0;"
                label="Pipeline Value"
                value={totalBudget >= 1000000
                  ? `${(totalBudget / 1000000).toFixed(1)}M`
                  : totalBudget >= 1000
                    ? `${(totalBudget / 1000).toFixed(0)}K`
                    : totalBudget.toString()
                }
                accent="text-[var(--accent-green)]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-5">
            <LeadForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7">
            {error && (
              <div className="rounded-xl border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/5 p-4 mb-6 animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-red)]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--accent-red)]">Processing Error</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{error}</p>
                  </div>
                </div>
              </div>
            )}
            {loading && !result && <ProcessingOverlay />}
            {result && <ResultPanel result={result} processingTime={processingTime} />}
            {!result && !loading && !error && (
              <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-card)]/30 p-16 text-center">
                <div className="inline-flex w-20 h-20 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] items-center justify-center mb-5">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <p className="text-[var(--text-secondary)] text-lg mb-2 font-medium">
                  Ready to qualify your next lead
                </p>
                <p className="text-[var(--text-muted)] text-sm max-w-sm mx-auto">
                  Submit a lead message and watch the AI classify, route, and craft a personalized response in seconds
                </p>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-12 animate-fade-in-up">
            <LeadHistory
              history={history}
              onSelect={(item) => setResult(item)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-16">
        <div className="max-w-[1440px] mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-xs text-[var(--text-muted)]">
            PropAI Demo &mdash; AI-Powered Real Estate Lead Automation
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Dubai, UAE
          </p>
        </div>
      </footer>
    </div>
  );
}
