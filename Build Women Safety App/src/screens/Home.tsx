import { useState } from "react";
import type { Screen, Contact, AppSettings } from "../types";
import { sampleAlerts } from "../data";

interface HomeProps {
  navigate: (s: Screen) => void;
  contacts: Contact[];
  settings: AppSettings;
  onToggleTracking: () => void;
}

function MapPlaceholder({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="map-bg w-full rounded-2xl overflow-hidden relative cursor-pointer"
      style={{ height: 180 }}
      onClick={onClick}
    >
      <svg width="100%" height="100%" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice">
        <line x1="0" y1="90" x2="360" y2="90" stroke="#E8D5B7" strokeWidth="14" />
        <line x1="0" y1="90" x2="360" y2="90" stroke="#F5E8D0" strokeWidth="10" />
        <line x1="180" y1="0" x2="180" y2="180" stroke="#E8D5B7" strokeWidth="10" />
        <line x1="180" y1="0" x2="180" y2="180" stroke="#F5E8D0" strokeWidth="6" />
        <line x1="0" y1="50" x2="360" y2="50" stroke="#E8D5B7" strokeWidth="6" />
        <line x1="0" y1="140" x2="360" y2="140" stroke="#E8D5B7" strokeWidth="6" />
        <line x1="80" y1="0" x2="80" y2="180" stroke="#E8D5B7" strokeWidth="6" />
        <line x1="280" y1="0" x2="280" y2="180" stroke="#E8D5B7" strokeWidth="6" />
        <rect x="90" y="55" width="80" height="30" rx="4" fill="#C8E6C9" opacity="0.7" />
        <rect x="200" y="100" width="70" height="35" rx="4" fill="#DCEDC8" opacity="0.7" />
        <rect x="10" y="100" width="60" height="32" rx="4" fill="#C8E6C9" opacity="0.6" />
        <rect x="92" y="10" width="20" height="35" rx="2" fill="#B0BEC5" opacity="0.5" />
        <rect x="118" y="18" width="16" height="27" rx="2" fill="#CFD8DC" opacity="0.5" />
        <rect x="290" y="55" width="24" height="22" rx="2" fill="#B0BEC5" opacity="0.5" />
        <rect x="200" y="15" width="30" height="28" rx="2" fill="#CFD8DC" opacity="0.4" />
        <circle cx="175" cy="95" r="12" fill="rgba(233,30,140,0.15)" />
        <circle cx="175" cy="95" r="7" fill="rgba(233,30,140,0.3)" />
        <circle cx="175" cy="95" r="5" fill="#E91E8C" />
        <circle cx="175" cy="95" r="2" fill="white" />
      </svg>
      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="#E91E8C" strokeWidth="1.5" />
          <path d="M8 2L9.5 7H6.5L8 2Z" fill="#E91E8C" />
          <path d="M8 14L6.5 9H9.5L8 14Z" fill="#B0B0B0" />
        </svg>
      </div>
      <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.9)", color: "#E91E8C" }}>
        Tap to expand map
      </div>
    </div>
  );
}

export default function Home({ navigate, contacts, settings, onToggleTracking }: HomeProps) {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
        <button
          onClick={() => navigate("profile")}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)", border: "none", cursor: "pointer" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="white" />
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <h1 className="text-base font-bold tracking-widest" style={{ color: "#1C1B1F" }}>
          SAFE <span style={{ color: "#E91E8C" }}>HER</span>
        </h1>
        <button
          onClick={() => setShowNotif(!showNotif)}
          className="w-9 h-9 rounded-full flex items-center justify-center relative"
          style={{ background: "linear-gradient(135deg, #FF4DB8, #E91E8C)", border: "none", cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-white flex items-center justify-center" style={{ background: "#FF3D00", fontSize: 8, fontWeight: 700 }}>
            {sampleAlerts.length}
          </span>
        </button>
      </div>

      {/* Notification drawer */}
      {showNotif && (
        <div className="mx-5 mb-3 card fade-in" style={{ zIndex: 10 }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold" style={{ color: "#1C1B1F" }}>Notifications</p>
            <button onClick={() => setShowNotif(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9E9E9E", fontSize: 18, lineHeight: 1 }}>×</button>
          </div>
          {sampleAlerts.slice(0, 3).map((a) => (
            <div key={a.id} className="flex items-start gap-2 py-2 border-t" style={{ borderColor: "#F5EEF5" }}>
              <span style={{ fontSize: 14 }}>{a.type === "warning" ? "⚠️" : a.type === "danger" ? "🚨" : "ℹ️"}</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#1C1B1F" }}>{a.title}</p>
                <p className="text-xs" style={{ color: "#9E9E9E" }}>{a.distance} · {a.time}</p>
              </div>
            </div>
          ))}
          <button onClick={() => { setShowNotif(false); navigate("alerts"); }} className="text-xs font-semibold mt-2 w-full text-center" style={{ background: "none", border: "none", cursor: "pointer", color: "#E91E8C" }}>
            View all alerts →
          </button>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 scroll-area px-5 pb-2 flex flex-col gap-4">
        {/* Map */}
        <MapPlaceholder onClick={() => navigate("map")} />

        {/* Live Location card */}
        <div className="card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: settings.locationTracking ? "#E8F5E9" : "#F5F5F5" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={settings.locationTracking ? "#4CAF50" : "#9E9E9E"} />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>Live Location</p>
              <p className="text-xs" style={{ color: settings.locationTracking ? "#4CAF50" : "#9E9E9E" }}>
                {settings.locationTracking ? "+Tracking Active" : "Tracking Paused"}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("map")}
            className="btn-primary"
            style={{ width: "auto", padding: "8px 20px", fontSize: 13 }}
          >
            View Map
          </button>
        </div>

        {/* Device Health */}
        <button
          className="card flex items-center justify-between w-full text-left"
          style={{ border: "none", cursor: "pointer" }}
          onClick={() => navigate("device-connected")}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#E8F5E9" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="7" y="2" width="10" height="20" rx="2" fill="#4CAF50" />
                <rect x="9" y="4" width="6" height="2" rx="1" fill="white" opacity="0.6" />
                <rect x="9" y="18" width="6" height="1" rx="0.5" fill="white" opacity="0.8" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>Device Health</p>
              <p className="text-xs" style={{ color: "#9E9E9E" }}>Safe Her Ring · 82% battery</p>
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#C0A0C0" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Emergency contacts quick row */}
        {contacts.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>Emergency Contacts</p>
              <button onClick={() => navigate("contacts")} style={{ background: "none", border: "none", color: "#E91E8C", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Manage
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {contacts.slice(0, 4).map((c, i) => {
                const colors = ["#E91E8C", "#9C27B0", "#3F51B5", "#00BCD4"];
                return (
                  <div key={c.id} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: colors[i % colors.length] }}>
                      {c.avatar}
                    </div>
                    <p className="text-xs" style={{ color: "#9E9E9E", maxWidth: 40, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</p>
                  </div>
                );
              })}
              {contacts.length < 3 && (
                <button onClick={() => navigate("add-contact")} className="flex flex-col items-center gap-1" style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: "2px dashed #FFB8DC", background: "#FFF8FC" }}>
                    <span style={{ color: "#E91E8C", fontSize: 20, lineHeight: 1 }}>+</span>
                  </div>
                  <p className="text-xs" style={{ color: "#9E9E9E" }}>Add</p>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Community Alerts */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold" style={{ color: "#1C1B1F" }}>Community Alerts</h2>
          <button
            onClick={() => navigate("alerts")}
            style={{ background: "none", border: "none", color: "#E91E8C", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            View All
          </button>
        </div>

        {sampleAlerts.slice(0, 2).map((alert) => (
          <button
            key={alert.id}
            className="card text-left w-full"
            style={{ border: "none", cursor: "pointer" }}
            onClick={() => navigate("alerts")}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: alert.type === "warning" ? "#FFF8E1" : alert.type === "danger" ? "#FFEBEE" : "#E3F2FD" }}
              >
                {alert.type === "warning" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 22h20L12 2z" fill="#FF9800" /><path d="M12 8v6M12 17v1" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                ) : alert.type === "danger" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#F44336" /><path d="M12 7v6M12 16v1" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2196F3" /><path d="M12 8v1M12 12v4" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{alert.title}</p>
                  <span className="text-xs" style={{ color: "#9E9E9E" }}>{alert.distance} · {alert.time}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#666" }}>{alert.description}</p>
                <p className="text-xs mt-1" style={{ color: "#9E9E9E" }}>Reported by {alert.reportedBy}</p>
              </div>
            </div>
          </button>
        ))}

        {/* SOS Button */}
        <button
          onClick={() => navigate("sos-active")}
          className="btn-primary sos-pulse mt-2"
          style={{ fontSize: 18, padding: "18px", letterSpacing: "0.05em" }}
        >
          🆘 SOS Emergency
        </button>

        <div className="h-4" />
      </div>
    </div>
  );
}
