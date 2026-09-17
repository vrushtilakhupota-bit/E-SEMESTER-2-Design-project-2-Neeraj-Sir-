import { useState } from "react";
import type { Screen } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  onPaired: () => void;
}

export default function DeviceScanning({ navigate, onPaired }: Props) {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (device: string) => {
    setConnecting(device);
    setTimeout(() => {
      setConnecting(null);
      onPaired();
    }, 2000);
  };

  const devices = [
    { id: "safering", name: "Safe Her Ring", primary: true },
    { id: "unknown", name: "Unknown Device", primary: false },
  ];

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Pair your Device</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 scroll-area px-5 pb-6">
        {/* Bluetooth icon */}
        <div className="flex justify-center my-8">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center bt-pulse"
            style={{ background: "linear-gradient(135deg, #FFE0F0, #FFF0F8)" }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#1C1B1F" }}>Searching…</h2>
        <p className="text-sm text-center mb-8" style={{ color: "#9E9E9E", maxWidth: 260, margin: "0 auto 32px" }}>
          Keep your safety Ring close and ensure Bluetooth is enabled on your phone.
        </p>

        {/* Scanning bar */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest mb-2" style={{ color: "#9E9E9E" }}>SCANNING NEARBY</p>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#FFE0F0" }}>
            <div
              className="h-full rounded-full scan-bar"
              style={{ background: "linear-gradient(90deg, #E91E8C, #FF4DB8)", width: "60%" }}
            />
          </div>
        </div>

        <h3 className="text-base font-bold mb-3" style={{ color: "#1C1B1F" }}>Available Devices</h3>
        <div className="flex flex-col gap-3 mb-6">
          {devices.map((d) => (
            <div key={d.id} className="card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F5EEF5" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{d.name}</p>
                  <p className="text-xs" style={{ color: "#9E9E9E" }}>Bluetooth LE</p>
                </div>
              </div>
              <button
                onClick={() => handleConnect(d.id)}
                disabled={connecting !== null}
                className={d.primary ? "btn-primary" : ""}
                style={
                  d.primary
                    ? { width: "auto", padding: "8px 20px", fontSize: 13, opacity: connecting ? 0.7 : 1 }
                    : { background: "none", border: "none", color: "#E91E8C", fontWeight: 600, cursor: "pointer", fontSize: 14, opacity: connecting ? 0.5 : 1 }
                }
              >
                {connecting === d.id ? "Connecting…" : "Connect"}
              </button>
            </div>
          ))}
        </div>

        <button
          className="btn-dark w-full"
          onClick={() => {
            // Simulate refresh
          }}
          disabled={connecting !== null}
        >
          ↻ Refresh
        </button>
      </div>
    </div>
  );
}
