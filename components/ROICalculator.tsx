"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [monthlyLeads, setMonthlyLeads] = useState(200);
  const [avgDealValue, setAvgDealValue] = useState(2000000);
  const [currentConversion, setCurrentConversion] = useState(3);

  // Calculations
  const lostFromSlowResponse = 0.6; // 60% leads go cold from slow response (industry stat)
  const aiConversionBoost = 1.8; // AI improves conversion by 1.8x
  const agentHourlyCost = 50; // AED per hour
  const hoursPerLeadManual = 0.75; // 45 min manual processing

  const currentDeals = Math.round(monthlyLeads * (currentConversion / 100));
  const currentRevenue = currentDeals * avgDealValue;

  const aiConversion = Math.min(currentConversion * aiConversionBoost, 12);
  const aiDeals = Math.round(monthlyLeads * (aiConversion / 100));
  const aiRevenue = aiDeals * avgDealValue;

  const revenueGain = aiRevenue - currentRevenue;
  const timeSaved = monthlyLeads * hoursPerLeadManual; // hours saved
  const costSaved = timeSaved * agentHourlyCost;

  const formatAED = (v: number) => {
    if (v >= 1000000) return `AED ${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `AED ${(v / 1000).toFixed(0)}K`;
    return `AED ${v.toLocaleString()}`;
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow">
      <div className="px-5 py-3 border-b border-[var(--border)] flex items-center gap-3">
        <div className="w-6 h-6 rounded-md bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        </div>
        <h3 className="text-xs font-semibold text-[var(--accent-green)] uppercase tracking-wider">
          ROI Calculator
        </h3>
        <span className="ml-auto text-[10px] text-[var(--text-muted)] badge-luxury px-2 py-0.5 rounded-full">
          Estimated impact
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Inputs */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-medium">
              Monthly Leads
            </label>
            <input
              type="number"
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white text-center font-semibold focus:outline-none focus:border-[var(--gold)]/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-medium">
              Avg Deal (AED)
            </label>
            <input
              type="number"
              value={avgDealValue}
              onChange={(e) => setAvgDealValue(Math.max(0, parseInt(e.target.value) || 0))}
              step={100000}
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white text-center font-semibold focus:outline-none focus:border-[var(--gold)]/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-medium">
              Conv. Rate %
            </label>
            <input
              type="number"
              value={currentConversion}
              onChange={(e) => setCurrentConversion(Math.max(0.1, Math.min(50, parseFloat(e.target.value) || 0)))}
              step={0.5}
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white text-center font-semibold focus:outline-none focus:border-[var(--gold)]/40 transition-all"
            />
          </div>
        </div>

        {/* Before vs After */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[var(--bg-input)] border border-[var(--border)] p-4">
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-3 font-medium">
              Without PropAI
            </p>
            <div className="space-y-2.5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[var(--text-secondary)]">Conversion</span>
                <span className="text-sm font-bold text-white">{currentConversion}%</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[var(--text-secondary)]">Monthly Deals</span>
                <span className="text-sm font-bold text-white">{currentDeals}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[var(--text-secondary)]">Revenue</span>
                <span className="text-sm font-bold text-white">{formatAED(currentRevenue)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[var(--gold)]/5 border border-[var(--gold)]/20 p-4">
            <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider mb-3 font-medium">
              With PropAI
            </p>
            <div className="space-y-2.5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[var(--text-secondary)]">Conversion</span>
                <span className="text-sm font-bold text-[var(--gold)]">{aiConversion.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[var(--text-secondary)]">Monthly Deals</span>
                <span className="text-sm font-bold text-[var(--gold)]">{aiDeals}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[var(--text-secondary)]">Revenue</span>
                <span className="text-sm font-bold text-[var(--gold)]">{formatAED(aiRevenue)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="rounded-xl bg-gradient-to-r from-[var(--gold)]/8 to-[var(--accent-green)]/8 border border-[var(--gold)]/15 p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[var(--accent-green)]">
                +{formatAED(revenueGain)}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Revenue Uplift/mo
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--gold)]">
                {timeSaved.toFixed(0)}h
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Hours Saved/mo
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--accent-blue)]">
                {formatAED(costSaved)}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Cost Saved/mo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
