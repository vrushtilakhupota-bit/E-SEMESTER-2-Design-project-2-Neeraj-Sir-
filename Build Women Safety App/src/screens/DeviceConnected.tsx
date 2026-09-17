import { useState } from "react";
import type { Screen, Toast } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  showToast: (message: string, type?: Toast["type"]) => void;
}

export default function DeviceConnected({ navigate, showToast }: Props) {
  const [ringing, setRinging] = useState(false);

  const handleRing = () => {
    if (ringing) return;
    setRinging(true);
    showToast("Ring signal sent to device 🔔", "info");
    setTimeout(() => setRinging(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Device Connection</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pb-6">
        {/* Watch icon */}
        <div className="flex justify-center my-8">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FFE0F0, #FFF0F8)" }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <rect x="7" y="4" width="10" height="16" rx="3" fill="#E91E8C" />
              <rect x="9" y="8" width="6" height="5" rx="1" fill="white" opacity="0.8" />
              <rect x="5" y="7" width="2" height="3" rx="1" fill="#E91E8C" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1" style={{ color: "#1C1B1F" }}>Safe Her Ring</h2>
        <div className="flex items-center gap-1.5 mb-8">
          <div className="w-2 h-2 rounded-full" style={{ background: "#4CAF50" }} />
          <span className="text-sm font-semibold" style={{ color: "#4CAF50" }}>Connected</span>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-8">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#FFF0F8" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="7" y="2" width="10" height="20" rx="2" fill="#E91E8C" />
                <rect x="9" y="4" width="6" height="10" rx="1" fill="white" opacity="0.7" />
              </svg>
            </div>
            <p className="text-xs" style={{ color: "#9E9E9E" }}>Battery</p>
            <p className="text-base font-bold" style={{ color: "#1C1B1F" }}>82%</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#FFF0F8" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#E91E8C" />
              </svg>
            </div>
            <p className="text-xs" style={{ color: "#9E9E9E" }}>Last Seen</p>
            <p className="text-base font-bold" style={{ color: "#1C1B1F" }}>Home</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#FFF0F8" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xs" style={{ color: "#9E9E9E" }}>Signal</p>
            <p className="text-base font-bold" style={{ color: "#4CAF50" }}>Strong</p>
          </div>
        </div>

        <button
          onClick={handleRing}
          className="btn-primary w-full mb-2"
          style={{ opacity: ringing ? 0.8 : 1 }}
        >
          {ringing ? "🔔 Ringing…" : "Ring Device"}
        </button>
        <p className="text-xs text-center mb-6" style={{ color: "#9E9E9E" }}>Device will play a loud sound to help you find it</p>

        <div className="flex gap-3 w-full">
          <button className="btn-outline flex-1" onClick={() => navigate("gestures")}>
            Gestures
          </button>
          <button className="btn-outline flex-1" onClick={() => navigate("device-scanning")}>
            Re-pair
          </button>
        </div>
      </div>
    </div>
  );
}
