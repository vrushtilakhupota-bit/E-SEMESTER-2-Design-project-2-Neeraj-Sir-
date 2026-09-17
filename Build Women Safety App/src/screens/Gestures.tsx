import type { Screen, GestureMapping, Toast } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  gestures: GestureMapping[];
  onToggle: (g: GestureMapping["gesture"]) => void;
  onSelectGesture: (g: GestureMapping) => void;
  showToast: (message: string, type?: Toast["type"]) => void;
}

const gestureIcons: Record<string, string> = {
  "one-tap": "👆",
  "two-taps": "✌️",
  "long-press": "✋",
};

export default function Gestures({ navigate, gestures, onToggle, onSelectGesture, showToast }: Props) {
  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("device-connected")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Ring Gestures</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 scroll-area px-5 pb-6">
        {/* Banner */}
        <div
          className="w-full rounded-3xl mb-6 flex flex-col items-center justify-center py-8 px-5"
          style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)", minHeight: 130 }}
        >
          <span style={{ fontSize: 36, opacity: 0.5, marginBottom: 8 }}>☝️</span>
          <p className="text-white text-center text-sm font-medium" style={{ opacity: 0.9 }}>
            Customize how your Safe Her Ring responds to your touch.
          </p>
        </div>

        <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#9E9E9E" }}>ACTIVE MAPPINGS</p>

        <div className="flex flex-col gap-3 mb-6">
          {gestures.map((g) => (
            <div key={g.gesture} className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#1C1B1F" }}>
                  <span style={{ fontSize: 18 }}>{gestureIcons[g.gesture]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "#1C1B1F" }}>{g.label}</p>
                  <p className="text-xs" style={{ color: g.enabled ? "#E91E8C" : "#9E9E9E" }}>
                    Current: {g.action}
                  </p>
                  {g.gesture === "long-press" && (
                    <p className="text-xs mt-0.5" style={{ color: "#FF9800" }}>Critical action: Requires 3s hold</p>
                  )}
                </div>
                <div
                  className={`toggle ${g.enabled ? "active" : ""}`}
                  onClick={() => {
                    onToggle(g.gesture);
                    showToast(`${g.label} ${g.enabled ? "disabled" : "enabled"}`, "info");
                  }}
                />
              </div>
              <button
                onClick={() => onSelectGesture(g)}
                className="w-full py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "#F5EEF5", border: "none", cursor: "pointer", color: "#9E9E9E" }}
              >
                Change Action
              </button>
            </div>
          ))}
        </div>

        <button
          className="btn-primary"
          onClick={() => { showToast("Gestures applied to your ring"); navigate("gesture-synced"); }}
        >
          Apply Gesture Changes
        </button>
      </div>
    </div>
  );
}
