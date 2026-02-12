"use client";

import { useEffect, useState } from "react";

export default function ResponseTimeComparison({
  aiTime,
}: {
  aiTime: number | null;
}) {
  const [humanMinutes, setHumanMinutes] = useState(0);
  const [aiSeconds, setAiSeconds] = useState(0);
  const [animated, setAnimated] = useState(false);

  const targetHuman = 47; // industry average
  const targetAi = aiTime ? aiTime / 1000 : 1.8;

  useEffect(() => {
    setAnimated(true);
    // Animate human counter
    let h = 0;
    const hInterval = setInterval(() => {
      h += 1;
      setHumanMinutes(Math.min(h, targetHuman));
      if (h >= targetHuman) clearInterval(hInterval);
    }, 30);

    // Animate AI counter
    let a = 0;
    const aInterval = setInterval(() => {
      a += 0.1;
      setAiSeconds(Math.min(parseFloat(a.toFixed(1)), targetAi));
      if (a >= targetAi) clearInterval(aInterval);
    }, 50);

    return () => {
      clearInterval(hInterval);
      clearInterval(aInterval);
    };
  }, [targetAi]);

  const speedup = Math.round((targetHuman * 60) / targetAi);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow">
      <div className="px-5 py-3 border-b border-[var(--border)] flex items-center gap-3">
        <div className="w-6 h-6 rounded-md bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <h3 className="text-xs font-semibold text-[var(--accent-red)] uppercase tracking-wider">
          Response Time
        </h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Human */}
          <div className="rounded-xl bg-[var(--bg-input)] border border-[var(--border)] p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--accent-red)]/3" />
            <div className="relative">
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-3 font-medium">
                Human Agent
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-[var(--accent-red)] tabular-nums">
                  {humanMinutes}
                </span>
                <span className="text-sm text-[var(--text-muted)]">min</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mt-2">
                Industry average
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--accent-red)] transition-all duration-1000"
                  style={{ width: animated ? "100%" : "0%" }}
                />
              </div>
            </div>
          </div>

          {/* AI */}
          <div className="rounded-xl bg-[var(--bg-input)] border border-[var(--gold)]/20 p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--gold)]/3" />
            <div className="relative">
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-3 font-medium">
                PropAI
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-[var(--gold)] tabular-nums">
                  {aiSeconds.toFixed(1)}
                </span>
                <span className="text-sm text-[var(--text-muted)]">sec</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mt-2">
                Instant response
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--gold)] transition-all duration-500"
                  style={{ width: animated ? `${(targetAi / (targetHuman * 60)) * 100 * 50}%` : "0%", maxWidth: "8%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Speedup callout */}
        <div className="mt-4 rounded-lg bg-[var(--gold)]/5 border border-[var(--gold)]/15 p-3 text-center">
          <span className="text-sm text-[var(--text-secondary)]">
            PropAI responds{" "}
            <span className="text-[var(--gold)] font-bold text-lg">{speedup}x</span>{" "}
            faster than a human agent
          </span>
        </div>
      </div>
    </div>
  );
}
