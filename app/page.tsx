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
  };
  routing: { routed_to: string; priority_tag: string | null };
  reply: { message: string; language: string };
  booking_slots: string[];
  status: string;
  processed_at: string;
}

export default function Home() {
  const [result, setResult] = useState<LeadResult | null>(null);
  const [history, setHistory] = useState<LeadResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const json: LeadResult = await res.json();
      setResult(json);
      setHistory((prev) => [json, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--border)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              AI
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Lead Automation</h1>
              <p className="text-xs text-[var(--text-secondary)]">
                Dubai Real Estate — AI-Powered
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-[var(--text-secondary)]">
                System Online
              </span>
            </div>
            <div className="text-sm text-[var(--text-secondary)] hidden sm:block">
              {history.length} lead{history.length !== 1 ? "s" : ""} processed
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-5">
            <LeadForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 mb-6 animate-fade-in-up">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            {loading && !result && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center">
                <div className="inline-flex items-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-400"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span className="text-[var(--text-secondary)]">
                    AI is analyzing the lead...
                  </span>
                </div>
              </div>
            )}
            {result && <ResultPanel result={result} />}
            {!result && !loading && !error && (
              <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-card)]/50 p-16 text-center">
                <div className="text-5xl mb-4 opacity-30">&#x1F3E2;</div>
                <p className="text-[var(--text-secondary)] text-lg mb-2">
                  Submit a lead to see AI analysis
                </p>
                <p className="text-[var(--text-secondary)] text-sm">
                  The system will classify, route, and generate an instant reply
                </p>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-12">
            <LeadHistory
              history={history}
              onSelect={(item) => setResult(item)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
