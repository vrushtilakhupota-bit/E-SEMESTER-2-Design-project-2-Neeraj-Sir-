import { useState } from "react";
import type { Screen, GestureMapping } from "../types";
import { actionOptions } from "../data";

interface Props {
  navigate: (s: Screen) => void;
  selectedGesture: GestureMapping | null;
  onConfirm: (actionId: string, actionLabel: string) => void;
}

export default function GestureAction({ navigate, selectedGesture, onConfirm }: Props) {
  const [selected, setSelected] = useState<string | null>(selectedGesture?.actionId ?? null);
  const [search, setSearch] = useState("");

  const filtered = actionOptions.map((cat) => ({
    ...cat,
    items: cat.items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())),
  })).filter((cat) => cat.items.length > 0);

  const categoryColors: Record<string, string> = {
    EMERGENCY: "#F44336",
    "CHECK-IN": "#4CAF50",
    ALERTS: "#FF9800",
  };

  const allItems = actionOptions.flatMap((c) => c.items);
  const selectedLabel = allItems.find((i) => i.id === selected)?.label ?? "";

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("gestures")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Change Action</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 scroll-area px-5 pb-6">
        {selectedGesture && (
          <div className="mb-4 p-3 rounded-2xl flex items-center gap-2" style={{ background: "#FFF0F8" }}>
            <span className="text-xs" style={{ color: "#9E9E9E" }}>Changing action for:</span>
            <span className="text-xs font-bold" style={{ color: "#E91E8C" }}>{selectedGesture.label}</span>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-5">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#C0A0C0" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="#C0A0C0" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            className="input-neu"
            placeholder="Search actions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 44 }}
          />
        </div>

        {filtered.map((cat) => (
          <div key={cat.category} className="mb-5">
            <p className="text-xs font-semibold tracking-widest mb-2" style={{ color: categoryColors[cat.category] ?? "#9E9E9E" }}>
              {cat.category}
            </p>
            <div className="flex flex-col gap-2">
              {cat.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  className="card flex items-center gap-3 text-left"
                  style={{
                    border: selected === item.id ? "2px solid #E91E8C" : "2px solid transparent",
                    cursor: "pointer",
                    transition: "border 0.2s",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${categoryColors[cat.category] ?? "#9E9E9E"}18` }}
                  >
                    {cat.category === "EMERGENCY" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 22h20L12 2z" fill={categoryColors[cat.category]} /></svg>
                    ) : cat.category === "CHECK-IN" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={categoryColors[cat.category]} strokeWidth="2" strokeLinecap="round" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={categoryColors[cat.category]} strokeWidth="2" /></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#9E9E9E" }}>{item.description}</p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: selected === item.id ? "#E91E8C" : "#D0D0D0" }}
                  >
                    {selected === item.id && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#E91E8C" }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          className="btn-primary"
          style={{ opacity: selected ? 1 : 0.6 }}
          disabled={!selected}
          onClick={() => { if (selected) onConfirm(selected, selectedLabel); }}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}
