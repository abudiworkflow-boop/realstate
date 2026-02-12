"use client";

import { useState } from "react";

const SAMPLE_LEADS = [
  {
    label: "Off-plan JVC",
    tag: "PRIMARY",
    source: "whatsapp",
    text: "Hi, I'm looking for an off-plan 2BR apartment in JVC area. My budget is around 1.6M AED and I'd like to know about payment plan options. When can we meet?",
    name: "Ahmed Al Mansouri",
    phone: "+971501234567",
  },
  {
    label: "Marina Rental",
    tag: "SECONDARY",
    source: "website",
    text: "Hello! I need a furnished 1-bedroom in Dubai Marina for rent. Moving next week so it's quite urgent. Budget is around 8,000 AED monthly. Can you help?",
    name: "Sarah Johnson",
    phone: "+971557654321",
  },
  {
    label: "Business Bay",
    tag: "SECONDARY",
    source: "instagram",
    text: "I saw your listing for a 2BR in Business Bay. Is it still available? I'm looking to buy a ready unit and would love to schedule a viewing this week.",
    name: "Raj Patel",
    phone: "+971509876543",
  },
  {
    label: "Budget Buyer",
    tag: "UNKNOWN",
    source: "google_maps",
    text: "Hi there, I'm new to Dubai and looking for something nice to invest in. My budget is around 900k AED. What do you recommend?",
    name: "",
    phone: "+971504443322",
  },
  {
    label: "Arabic Lead",
    tag: "AR",
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

const sourceOptions = [
  {
    value: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    value: "website",
    label: "Website",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    value: "google_maps",
    label: "Google",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

function getTagColor(tag: string) {
  if (tag === "PRIMARY") return "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border-[var(--accent-blue)]/20";
  if (tag === "SECONDARY") return "bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] border-[var(--accent-purple)]/20";
  if (tag === "AR") return "bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border-[var(--accent-emerald)]/20";
  return "bg-[var(--accent-yellow)]/10 text-[var(--accent-yellow)] border-[var(--accent-yellow)]/20";
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

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 border border-[var(--gold)]/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v-2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">New Lead Intake</h2>
            <p className="text-[11px] text-[var(--text-muted)]">
              Simulate an incoming inquiry from any channel
            </p>
          </div>
        </div>
      </div>

      {/* Quick fill */}
      <div className="px-6 pt-4">
        <p className="text-[10px] text-[var(--text-muted)] mb-2 uppercase tracking-[0.15em] font-medium">
          Sample Leads
        </p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_LEADS.map((s) => (
            <button
              key={s.label}
              onClick={() => loadSample(s)}
              className="group flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--gold)]/30 transition-all cursor-pointer"
            >
              <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold border ${getTagColor(s.tag)}`}>
                {s.tag}
              </span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Source selector */}
        <div>
          <label className="block text-xs text-[var(--text-secondary)] mb-2 font-medium">
            Lead Channel
          </label>
          <div className="grid grid-cols-4 gap-2">
            {sourceOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setSource(opt.value)}
                className={`group flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  source === opt.value
                    ? "bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold-light)]"
                    : "bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                }`}
              >
                <span className={source === opt.value ? "text-[var(--gold)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"}>
                  {opt.icon}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lead message */}
        <div>
          <label className="block text-xs text-[var(--text-secondary)] mb-2 font-medium">
            Lead Message <span className="text-[var(--accent-red)]">*</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the client's message here..."
            rows={4}
            className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)]/40 focus:ring-1 focus:ring-[var(--gold)]/10 resize-none transition-all"
            required
            dir="auto"
          />
        </div>

        {/* Contact fields */}
        <div>
          <label className="block text-[10px] text-[var(--text-muted)] mb-2 uppercase tracking-[0.15em] font-medium">
            Contact Information
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Client name"
                className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)]/40 transition-all"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971..."
                className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)]/40 transition-all"
              />
            </div>
          </div>
          <div className="relative mt-3">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@email.com"
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)]/40 transition-all"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-dark)] text-white font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[var(--gold)]/10"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Qualify Lead
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
