import { useState } from "react";
import type { Screen } from "../types";
import type { SafetyTip } from "../types";
import { safetyTips } from "../data";

interface Props {
  navigate: (s: Screen) => void;
  onSelectTip: (tip: SafetyTip) => void;
}

export default function SafetyTips({ navigate, onSelectTip }: Props) {
  const [search, setSearch] = useState("");
  const filtered = safetyTips.filter(
    (t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="px-5 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate("profile")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Safety Tips</h1>
          <div className="w-8" />
        </div>
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#C0A0C0" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="#C0A0C0" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input className="input-neu" placeholder="Search tips…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 44 }} />
        </div>
      </div>

      <div className="flex-1 scroll-area px-5 pb-4">
        {/* Featured */}
        {!search && (
          <div className="mb-5 p-5 rounded-3xl" style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)" }}>
            <p className="text-xs font-semibold text-white/70 mb-1 uppercase tracking-widest">Tip of the Day</p>
            <p className="text-base font-bold text-white leading-snug">Trust your instincts. If something feels wrong, leave immediately.</p>
            <p className="text-xs text-white/70 mt-2">Personal Safety</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {filtered.map((tip) => (
            <button
              key={tip.id}
              onClick={() => { onSelectTip(tip); navigate("safety-tip-detail"); }}
              className="card text-left"
              style={{ border: "none", cursor: "pointer" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#FFF0F8" }}>
                  <span style={{ fontSize: 22 }}>{tip.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{tip.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9E9E9E" }}>{tip.category} · {tip.tips.length} tips</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#C0A0C0" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
            </button>
          ))}
        </div>

        {/* Emergency numbers */}
        <div className="mt-5 card" style={{ border: "2px solid #FFE0F0" }}>
          <p className="text-sm font-bold mb-3" style={{ color: "#E91E8C" }}>🆘 Emergency Numbers</p>
          <div className="flex flex-col gap-2">
            {[
              { name: "Police", number: "100" },
              { name: "Ambulance", number: "108" },
              { name: "Women Helpline", number: "1091" },
              { name: "Fire", number: "101" },
              { name: "National Emergency", number: "112" },
            ].map(({ name, number }) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#1C1B1F" }}>{name}</span>
                <button onClick={() => window.open(`tel:${number}`)} className="font-bold" style={{ background: "none", border: "none", color: "#E91E8C", cursor: "pointer", fontSize: 14 }}>{number}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
