import { useState } from "react";
import type { Screen } from "../types";
import { sampleAlerts } from "../data";

const filterLabels = { all: "All", warning: "⚠️ Warning", danger: "🚨 Danger", info: "ℹ️ Info" };

export default function AlertsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [filter, setFilter] = useState<"all" | "warning" | "danger" | "info">("all");

  const filtered = filter === "all" ? sampleAlerts : sampleAlerts.filter((a) => a.type === filter);

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Community Alerts</h1>
        <div className="w-8" />
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 px-5 pb-3 flex-shrink-0 overflow-x-auto scroll-area" style={{ flexFlow: "row nowrap" }}>
        {(Object.entries(filterLabels) as [typeof filter, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0"
            style={{
              background: filter === key ? "#E91E8C" : "#F5EEF5",
              color: filter === key ? "white" : "#9E9E9E",
              border: "none", cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 scroll-area px-5 pb-4">
        <p className="text-xs mb-4" style={{ color: "#9E9E9E" }}>
          {filtered.length} alert{filtered.length !== 1 ? "s" : ""} in your area
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span style={{ fontSize: 40 }}>✅</span>
            <p className="text-sm font-semibold" style={{ color: "#9E9E9E" }}>No alerts of this type</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((alert) => (
              <div key={alert.id} className="card">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: alert.type === "warning" ? "#FFF8E1" : alert.type === "danger" ? "#FFEBEE" : "#E3F2FD" }}
                  >
                    {alert.type === "warning" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 22h20L12 2z" fill="#FF9800" /><path d="M12 8v6M12 17v1" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                    ) : alert.type === "danger" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#F44336" /><path d="M12 7v6M12 16v1" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2196F3" /><path d="M12 8v1M12 12v4" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-bold" style={{ color: "#1C1B1F" }}>{alert.title}</p>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                        style={{
                          background: alert.type === "warning" ? "#FFF8E1" : alert.type === "danger" ? "#FFEBEE" : "#E3F2FD",
                          color: alert.type === "warning" ? "#FF9800" : alert.type === "danger" ? "#F44336" : "#2196F3",
                        }}
                      >
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: "#666" }}>{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs" style={{ color: "#9E9E9E" }}>{alert.distance} · {alert.time} · by {alert.reportedBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          className="btn-outline w-full mt-5"
          onClick={() => navigate("report-incident")}
        >
          ⚠️ Report an Incident
        </button>
      </div>
    </div>
  );
}
