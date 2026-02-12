"use client";

import type { LeadResult } from "@/app/page";

export default function WhatsAppPreview({ result }: { result: LeadResult }) {
  const { reply, contact, raw_text, booking_slots } = result;
  const contactName = contact.name || "Client";
  const firstName = contactName.split(" ")[0];

  // Format time like WhatsApp
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const earlier = new Date(now.getTime() - 2 * 60000);
  const earlierStr = earlier.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow animate-fade-in-up">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[var(--border)] flex items-center gap-3">
        <div className="w-6 h-6 rounded-md bg-[#25D366]/15 border border-[#25D366]/25 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        <h3 className="text-xs font-semibold text-[#25D366] uppercase tracking-wider">
          WhatsApp Preview
        </h3>
        <span className="ml-auto text-[10px] text-[var(--text-muted)] badge-luxury px-2 py-0.5 rounded-full">
          How clients see it
        </span>
      </div>

      {/* Chat area */}
      <div
        className="p-4 min-h-[320px]"
        style={{
          background: `linear-gradient(180deg, #0b141a 0%, #0d1418 100%)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* WhatsApp header bar */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
          <div className="w-9 h-9 rounded-full bg-[#2a3942] flex items-center justify-center text-white text-sm font-semibold">
            {firstName[0]?.toUpperCase() || "C"}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{contactName}</p>
            <p className="text-[10px] text-[#8696a0]">online</p>
          </div>
          <div className="ml-auto flex items-center gap-4 text-[#aebac1]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"/></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7a2 2 0 10-.001-4.001A2 2 0 0012 7zm0 2a2 2 0 10-.001 3.999A2 2 0 0012 9zm0 6a2 2 0 10-.001 3.999A2 2 0 0012 15z"/></svg>
          </div>
        </div>

        <div className="space-y-2">
          {/* Incoming message (client) */}
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-[#1f2c33] rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
              <p className="text-[13px] text-[#e9edef] leading-relaxed" dir="auto">
                {raw_text}
              </p>
              <div className="flex justify-end mt-1">
                <span className="text-[10px] text-[#8696a0]">{earlierStr}</span>
              </div>
            </div>
          </div>

          {/* Outgoing message (AI reply) */}
          <div className="flex justify-end">
            <div className="max-w-[85%] bg-[#005c4b] rounded-lg rounded-tr-none px-3 py-2 shadow-sm">
              {reply.message.split("\n").map((line, i) => (
                <p
                  key={i}
                  className={`text-[13px] leading-relaxed ${
                    line.trim() === "" ? "h-2" : "text-[#e9edef]"
                  }`}
                  dir="auto"
                >
                  {line}
                </p>
              ))}
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] text-[#8696a0]">{timeStr}</span>
                {/* Double blue tick */}
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                  <path d="M11.07 0.65L4.98 6.74L2.93 4.69L2.22 5.4L4.98 8.16L11.78 1.36L11.07 0.65Z" fill="#53bdeb"/>
                  <path d="M14.07 0.65L7.98 6.74L7.27 6.03L6.56 6.74L7.98 8.16L14.78 1.36L14.07 0.65Z" fill="#53bdeb"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 bg-[#1f2c33] rounded-full px-4 py-2.5 flex items-center">
            <span className="text-[13px] text-[#8696a0]">Type a message</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
