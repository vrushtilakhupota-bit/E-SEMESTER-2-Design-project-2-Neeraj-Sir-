import type { Screen } from "../types";

export default function GestureSynced({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col items-center px-6 bg-pink-grad" style={{ minHeight: "100dvh", paddingTop: 60 }}>
      <div className="flex items-center w-full mb-8">
        <button onClick={() => navigate("gestures")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Settings Updated</h1>
        <div className="w-8" />
      </div>

      <div className="slide-up flex flex-col items-center w-full">
        <div className="w-28 h-28 rounded-full flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)" }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#1C1B1F" }}>Gestures Synced!</h2>
        <p className="text-sm text-center mb-10" style={{ color: "#9E9E9E", maxWidth: 260 }}>
          Your smart ring has been updated with your new safety shortcuts.
        </p>

        <button className="btn-primary w-full mb-3" onClick={() => navigate("gestures")}>Test Gestures</button>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", color: "#E91E8C", fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
          Go to Home Screen
        </button>
      </div>
    </div>
  );
}
