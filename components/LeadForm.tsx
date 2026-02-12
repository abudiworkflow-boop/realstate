"use client";

import { useState } from "react";

const SAMPLE_LEADS = [
  {
    label: "Off-plan JVC",
    source: "whatsapp",
    text: "Looking for off-plan 2BR in JVC, budget 1.6M AED, interested in payment plan options",
    name: "Ahmed Al Mansouri",
    phone: "+971501234567",
  },
  {
    label: "Marina Rental",
    source: "website",
    text: "Need furnished 1BR in Marina for rent, moving next week, budget 8k monthly",
    name: "Sarah Johnson",
    phone: "+971557654321",
  },
  {
    label: "Resale Business Bay",
    source: "instagram",
    text: "Interested in buying a resale 2BR in Business Bay, ready unit, want to schedule viewing",
    name: "Raj Patel",
    phone: "+971509876543",
  },
  {
    label: "Vague Lead",
    source: "google_maps",
    text: "Need something good in Dubai, budget 900k AED",
    name: "",
    phone: "+971504443322",
  },
  {
    label: "Arabic Lead",
    source: "whatsapp",
    text: "\u0623\u0628\u062d\u062b \u0639\u0646 \u0634\u0642\u0629 \u063a\u0631\u0641\u062a\u064a\u0646 \u0641\u064a \u062f\u0628\u064a \u0645\u0627\u0631\u064a\u0646\u0627 \u0644\u0644\u0625\u064a\u062c\u0627\u0631\u060c \u0645\u064a\u0632\u0627\u0646\u064a\u062a\u064a 80 \u0623\u0644\u0641 \u0633\u0646\u0648\u064a\u0627\u064b",
    name: "\u0645\u062d\u0645\u062f \u062e\u0627\u0644\u062f",
    phone: "+971502223344",
  },
];

interface LeadFormProps {
  onSubmit: (data: {
    source: string;
    text: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
  }) => void;
  loading: boolean;
}

export default function LeadForm({ onSubmit, loading }: LeadFormProps) {
  const [source, setSource] = useState("whatsapp");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({
      source,
      text: text.trim(),
      contact_name: name.trim(),
      contact_phone: phone.trim(),
      contact_email: email.trim(),
    });
  };

  const loadSample = (sample: (typeof SAMPLE_LEADS)[0]) => {
    setSource(sample.source);
    setText(sample.text);
    setName(sample.name);
    setPhone(sample.phone);
    setEmail("");
  };

  const sourceOptions = [
    { value: "whatsapp", label: "WhatsApp", icon: "\uD83D\uDCAC" },
    { value: "website", label: "Website", icon: "\uD83C\uDF10" },
    { value: "instagram", label: "Instagram", icon: "\uD83D\uDCF7" },
    { value: "google_maps", label: "Google", icon: "\uD83D\uDCCD" },
  ];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)] bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <h2 className="text-lg font-semibold text-white">New Lead</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Simulate an incoming lead from any channel
        </p>
      </div>

      {/* Quick fill buttons */}
      <div className="px-6 pt-4">
        <p className="text-xs text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
          Quick Fill
        </p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_LEADS.map((s) => (
            <button
              key={s.label}
              onClick={() => loadSample(s)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-blue-500/50 transition-all cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Source selector */}
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">
            Lead Source
          </label>
          <div className="grid grid-cols-4 gap-2">
            {sourceOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setSource(opt.value)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  source === opt.value
                    ? "bg-blue-500/20 border-blue-500/50 text-blue-400 border"
                    : "bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                <span className="block text-base mb-0.5">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lead message */}
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">
            Lead Message *
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='e.g. "Looking for off-plan 2BR in JVC, budget 1.6M AED..."'
            rows={4}
            className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-blue-500/50 resize-none"
            required
            dir="auto"
          />
        </div>

        {/* Contact fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[var(--text-secondary)] mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Client name"
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--text-secondary)] mb-1">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971..."
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[var(--text-secondary)] mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@email.com"
            className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-blue-500/50"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </span>
          ) : (
            "Analyze Lead"
          )}
        </button>
      </form>
    </div>
  );
}
