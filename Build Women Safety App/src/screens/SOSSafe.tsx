import type { Screen } from "../types";

export default function SOSSafe({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col items-center px-6 bg-pink-grad" style={{ minHeight: "100dvh", paddingTop: 60 }}>
      <div className="slide-up flex flex-col items-center">
        {/* Shield icon */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FFE0F0, #FFF0F8)" }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 5v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V5L12 2z" fill="#E91E8C" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#4CAF50" }}>
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#1C1B1F" }}>Glad You're Safe!</h2>
        <p className="text-sm text-center mb-8 leading-relaxed" style={{ color: "#9E9E9E", maxWidth: 280 }}>
          Your emergency contacts have been notified that you are out of danger.
        </p>

        {/* Incident Summary */}
        <div className="card w-full mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold tracking-widest" style={{ color: "#9E9E9E" }}>INCIDENT SUMMARY</p>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#F5F5F5", color: "#9E9E9E" }}>Closed</span>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { icon: "🕐", label: "Duration", value: "12 mins" },
              { icon: "📍", label: "Location", value: "Ahmedabad" },
              { icon: "🔒", label: "Evidence", value: "Audio & GPS Saved" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#FFF0F8" }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#9E9E9E" }}>{label}</p>
                  <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-outline w-full mb-3" onClick={() => navigate("report-incident")}>
          Review Full Incident Log
        </button>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", color: "#E91E8C", fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
          Go to Home Screen
        </button>
      </div>
    </div>
  );
}
