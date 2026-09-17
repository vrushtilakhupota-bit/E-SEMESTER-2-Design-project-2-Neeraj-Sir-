import { useState } from "react";
import type { Screen, AppSettings } from "../types";
import { sampleSafePlaces, sampleAlerts } from "../data";

interface Props {
  navigate: (s: Screen) => void;
  settings: AppSettings;
  onToggleTracking: () => void;
}

const typeConfig = {
  hospital: { icon: "🏥", color: "#F44336", label: "Hospital" },
  police: { icon: "👮", color: "#1565C0", label: "Police" },
  shelter: { icon: "🏠", color: "#E91E8C", label: "Shelter" },
  pharmacy: { icon: "💊", color: "#4CAF50", label: "Pharmacy" },
};

type FilterType = "all" | "hospital" | "police" | "shelter" | "pharmacy";

export default function MapScreen({ navigate, settings, onToggleTracking }: Props) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeView, setActiveView] = useState<"map" | "list">("map");
  const [expandedPlace, setExpandedPlace] = useState<string | null>(null);

  const filtered = filter === "all" ? sampleSafePlaces : sampleSafePlaces.filter((p) => p.type === filter);

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <h1 className="text-lg font-bold" style={{ color: "#1C1B1F" }}>Safety Map</h1>
        <div className="flex-1" />
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#F5EEF5" }}>
          {(["map", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className="px-3 py-1 rounded-lg text-xs font-semibold capitalize"
              style={{
                background: activeView === v ? "#E91E8C" : "transparent",
                color: activeView === v ? "white" : "#9E9E9E",
                border: "none", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Location tracking toggle */}
      <div className="mx-5 mb-3 flex items-center justify-between px-4 py-2 rounded-2xl flex-shrink-0" style={{ background: settings.locationTracking ? "#E8F5E9" : "#F5F5F5" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: settings.locationTracking ? "#4CAF50" : "#9E9E9E" }} />
          <span className="text-xs font-semibold" style={{ color: settings.locationTracking ? "#4CAF50" : "#9E9E9E" }}>
            {settings.locationTracking ? "Live tracking active — Ahmedabad" : "Location tracking paused"}
          </span>
        </div>
        <button
          onClick={onToggleTracking}
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: settings.locationTracking ? "#E91E8C" : "#9E9E9E",
            color: "white", border: "none", cursor: "pointer",
          }}
        >
          {settings.locationTracking ? "Pause" : "Resume"}
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 px-5 pb-3 flex-shrink-0 overflow-x-auto scroll-area" style={{ flexFlow: "row nowrap" }}>
        {(["all", "hospital", "police", "shelter", "pharmacy"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0"
            style={{
              background: filter === f ? "#E91E8C" : "#F5EEF5",
              color: filter === f ? "white" : "#9E9E9E",
              border: "none", cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {f === "all" ? "All Places" : `${typeConfig[f].icon} ${typeConfig[f].label}`}
          </button>
        ))}
      </div>

      {activeView === "map" ? (
        <div className="flex-1 flex flex-col px-5 gap-3 overflow-hidden">
          {/* Map */}
          <div
            className="map-bg rounded-3xl overflow-hidden relative cursor-pointer"
            style={{ flex: "0 0 260px" }}
            onClick={() => navigate("safe-places")}
          >
            <svg width="100%" height="100%" viewBox="0 0 360 260" preserveAspectRatio="xMidYMid slice">
              <line x1="0" y1="130" x2="360" y2="130" stroke="#E8D5B7" strokeWidth="18" />
              <line x1="0" y1="130" x2="360" y2="130" stroke="#F5E8D0" strokeWidth="12" />
              <line x1="180" y1="0" x2="180" y2="260" stroke="#E8D5B7" strokeWidth="12" />
              <line x1="180" y1="0" x2="180" y2="260" stroke="#F5E8D0" strokeWidth="8" />
              <line x1="0" y1="70" x2="360" y2="70" stroke="#E8D5B7" strokeWidth="8" />
              <line x1="0" y1="195" x2="360" y2="195" stroke="#E8D5B7" strokeWidth="8" />
              <line x1="80" y1="0" x2="80" y2="260" stroke="#E8D5B7" strokeWidth="8" />
              <line x1="280" y1="0" x2="280" y2="260" stroke="#E8D5B7" strokeWidth="8" />
              <rect x="90" y="80" width="80" height="45" rx="6" fill="#C8E6C9" opacity="0.7" />
              <rect x="200" y="140" width="70" height="45" rx="6" fill="#DCEDC8" opacity="0.7" />
              <rect x="10" y="140" width="60" height="45" rx="6" fill="#C8E6C9" opacity="0.6" />
              {/* Safe place markers */}
              <circle cx="120" cy="170" r="14" fill="#F44336" opacity="0.85" />
              <text x="120" y="175" textAnchor="middle" fontSize="12">🏥</text>
              <circle cx="280" cy="100" r="14" fill="#1565C0" opacity="0.85" />
              <text x="280" y="105" textAnchor="middle" fontSize="12">👮</text>
              <circle cx="60" cy="80" r="14" fill="#E91E8C" opacity="0.85" />
              <text x="60" y="85" textAnchor="middle" fontSize="12">🏠</text>
              <circle cx="220" cy="215" r="14" fill="#4CAF50" opacity="0.85" />
              <text x="220" y="220" textAnchor="middle" fontSize="12">💊</text>
              {/* Alert markers */}
              <circle cx="145" cy="60" r="10" fill="#FF9800" opacity="0.8" />
              <text x="145" y="65" textAnchor="middle" fontSize="10">⚠️</text>
              {/* User location */}
              <circle cx="180" cy="135" r="14" fill="rgba(233,30,140,0.2)" />
              <circle cx="180" cy="135" r="8" fill="#E91E8C" />
              <circle cx="180" cy="135" r="3" fill="white" />
            </svg>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#E91E8C" strokeWidth="1.5" />
                <path d="M8 2L9.5 7H6.5L8 2Z" fill="#E91E8C" />
                <path d="M8 14L6.5 9H9.5L8 14Z" fill="#B0B0B0" />
              </svg>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); navigate("report-incident"); }}
              className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-2 rounded-full"
              style={{ background: "white", border: "none", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.12)", fontSize: 12, fontWeight: 600, color: "#E91E8C" }}
            >
              ⚠️ Report Incident
            </button>
          </div>

          {/* Quick list - scrollable */}
          <div className="flex-1 scroll-area pb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>Nearby Safe Places</p>
              <button onClick={() => navigate("safe-places")} style={{ background: "none", border: "none", color: "#E91E8C", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View All</button>
            </div>
            <div className="flex flex-col gap-2">
              {filtered.slice(0, 3).map((place) => {
                const cfg = typeConfig[place.type];
                const isExpanded = expandedPlace === place.id;
                return (
                  <div key={place.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <button
                      onClick={() => setExpandedPlace(isExpanded ? null : place.id)}
                      className="flex items-center gap-3 w-full text-left"
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 14px" }}
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${cfg.color}18` }}>
                        <span style={{ fontSize: 16 }}>{cfg.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "#1C1B1F" }}>{place.name}</p>
                        <p className="text-xs" style={{ color: "#9E9E9E" }}>
                          {place.distance} · <span style={{ color: place.isOpen ? "#4CAF50" : "#F44336" }}>{place.isOpen ? "Open" : "Closed"}</span>
                        </p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
                        <path d="M9 18l6-6-6-6" stroke="#C0A0C0" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-3 fade-in border-t" style={{ borderColor: "#F5EEF5" }}>
                        <p className="text-xs mb-2" style={{ color: "#9E9E9E" }}>{place.address}</p>
                        <a
                          href={`tel:${place.phone}`}
                          className="btn-primary text-center block"
                          style={{ padding: "8px", fontSize: 13, textDecoration: "none" }}
                        >
                          📞 {place.phone}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Community alerts section */}
            <div className="flex items-center justify-between mt-4 mb-2">
              <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>Nearby Alerts</p>
              <button onClick={() => navigate("alerts")} style={{ background: "none", border: "none", color: "#E91E8C", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View All</button>
            </div>
            {sampleAlerts.slice(0, 2).map((a) => (
              <button key={a.id} onClick={() => navigate("alerts")} className="card flex items-center gap-2 w-full text-left mb-2" style={{ border: "none", cursor: "pointer", padding: "10px 14px" }}>
                <span style={{ fontSize: 16 }}>{a.type === "warning" ? "⚠️" : a.type === "danger" ? "🚨" : "ℹ️"}</span>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "#1C1B1F" }}>{a.title}</p>
                  <p className="text-xs" style={{ color: "#9E9E9E" }}>{a.distance} · {a.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 scroll-area px-5 pb-4">
          <p className="text-xs mb-3" style={{ color: "#9E9E9E" }}>{filtered.length} places found near your location</p>
          <div className="flex flex-col gap-3">
            {filtered.map((place) => {
              const cfg = typeConfig[place.type];
              return (
                <div key={place.id} className="card">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${cfg.color}18` }}>
                      <span style={{ fontSize: 20 }}>{cfg.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{place.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0" style={{ background: place.isOpen ? "#E8F5E9" : "#FFEBEE", color: place.isOpen ? "#4CAF50" : "#F44336" }}>
                          {place.isOpen ? "Open" : "Closed"}
                        </span>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: "#9E9E9E" }}>{place.address}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold" style={{ color: "#E91E8C" }}>{place.distance}</span>
                        <a href={`tel:${place.phone}`} className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: "#FFF0F8", color: "#E91E8C", textDecoration: "none" }}>
                          📞 Call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
