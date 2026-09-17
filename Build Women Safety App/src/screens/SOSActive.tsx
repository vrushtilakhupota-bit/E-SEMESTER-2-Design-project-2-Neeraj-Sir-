import { useState, useEffect, useRef } from "react";
import type { Screen, Contact } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  contacts: Contact[];
}

const TOTAL = 5;

export default function SOSActive({ navigate, contacts }: Props) {
  const [phase, setPhase] = useState<"countdown" | "triggered" | "cancelled">("countdown");
  const [countdown, setCountdown] = useState(TOTAL);
  // Which contacts have been notified (staggered reveal)
  const [notifiedCount, setNotifiedCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown
  useEffect(() => {
    if (phase !== "countdown") return;
    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current!);
          setPhase("triggered");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [phase]);

  // Stagger contact notifications after triggered
  useEffect(() => {
    if (phase !== "triggered") return;
    const displayContacts = contacts.slice(0, 3);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setNotifiedCount(i);
      if (i >= displayContacts.length) clearInterval(t);
    }, 700);
    return () => clearInterval(t);
  }, [phase, contacts]);

  const handleCancel = () => {
    clearInterval(intervalRef.current!);
    setPhase("cancelled");
  };

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress =
    phase === "cancelled" ? 0 :
    phase === "triggered" ? circumference :
    circumference * (1 - countdown / TOTAL);

  const displayContacts = contacts.slice(0, 3);

  return (
    <div className="flex flex-col items-center bg-pink-grad scroll-area" style={{ minHeight: "100dvh", padding: "0 24px 32px" }}>
      <div className="flex items-center w-full pt-5 pb-3">
        <button
          onClick={() => navigate("home")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
          aria-label="Back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>SOS Alert</h1>
        <div className="w-8" />
      </div>

      {/* Status text */}
      <div className="flex flex-col items-center mt-1 mb-1">
        {phase === "countdown" && (
          <>
            <h2 className="text-lg font-bold fade-in" style={{ color: "#E91E8C" }}>SOS Triggered</h2>
            <p className="text-sm" style={{ color: "#9E9E9E" }}>Sending alerts in {countdown} second{countdown !== 1 ? "s" : ""}…</p>
          </>
        )}
        {phase === "triggered" && (
          <>
            <h2 className="text-lg font-bold fade-in" style={{ color: "#E91E8C" }}>Alert Sent!</h2>
            <p className="text-sm" style={{ color: "#9E9E9E" }}>Your contacts have been notified</p>
          </>
        )}
        {phase === "cancelled" && (
          <>
            <h2 className="text-lg font-bold fade-in" style={{ color: "#9E9E9E" }}>Alert Cancelled</h2>
            <p className="text-sm" style={{ color: "#9E9E9E" }}>No alerts were sent</p>
          </>
        )}
      </div>

      {/* Countdown ring */}
      <div className="relative flex items-center justify-center my-5" style={{ width: 148, height: 148 }}>
        <svg width="148" height="148" className="absolute top-0 left-0" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="74" cy="74" r={radius} fill="none" stroke="#FFE0F0" strokeWidth="8" />
          <circle
            cx="74" cy="74" r={radius} fill="none"
            stroke={phase === "triggered" ? "#4CAF50" : phase === "cancelled" ? "#E0E0E0" : "#E91E8C"}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.9s ease, stroke 0.4s" }}
          />
        </svg>
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center"
          style={{
            background:
              phase === "cancelled" ? "#F5F5F5" :
              phase === "triggered" ? "linear-gradient(135deg, #E8F5E9, #F1FBF1)" :
              "linear-gradient(135deg, #FFE0F0, #FFF0F8)",
          }}
        >
          {phase === "triggered" && <span style={{ fontSize: 40 }}>📡</span>}
          {phase === "cancelled" && <span style={{ fontSize: 40 }}>✋</span>}
          {phase === "countdown" && (
            <span className="text-5xl font-bold" style={{ color: "#E91E8C" }}>{countdown}</span>
          )}
        </div>
      </div>

      {/* Audio recording indicator */}
      {phase !== "cancelled" && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: "#F5EEF5" }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "#E91E8C", animation: "bt-pulse 0.8s infinite" }} />
          <span className="text-xs" style={{ color: "#9E9E9E" }}>
            {phase === "triggered" ? "Audio Recording Active" : "Audio Recording Started"}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="w-full flex flex-col gap-3 mb-4">
        {phase === "countdown" && (
          <button className="btn-primary" onClick={handleCancel}>Cancel Alert</button>
        )}

        {phase === "triggered" && (
          <button className="btn-primary" onClick={() => navigate("sos-safe")}>✅ I'm Safe Now</button>
        )}

        {phase === "cancelled" && (
          <button className="btn-primary" onClick={() => navigate("home")}>Back to Home</button>
        )}

        <div className="flex gap-3">
          <a
            href="tel:181"
            className="btn-outline flex-1 text-center"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, textDecoration: "none" }}
          >
            📞 Call 181
          </a>
          {phase !== "cancelled" && (
            <button className="btn-outline flex-1" onClick={() => navigate("sos-safe")}>
              ✅ I'm Safe
            </button>
          )}
        </div>
      </div>

      {/* Emergency contacts status */}
      {displayContacts.length > 0 && (
        <div className="w-full">
          <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#9E9E9E" }}>EMERGENCY CONTACTS</p>
          <div className="flex flex-col gap-2">
            {displayContacts.map((contact, i) => {
              const isNotified = phase === "triggered" && i < notifiedCount;
              const isPending = phase === "triggered" && i >= notifiedCount;
              const avatarColors = ["#E91E8C", "#9C27B0", "#3F51B5"];
              return (
                <div key={contact.id} className="card flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: avatarColors[i % avatarColors.length] }}
                    >
                      {contact.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{contact.name}</p>
                      <p className="text-xs" style={{ color: isNotified ? "#4CAF50" : "#9E9E9E" }}>
                        {phase === "countdown" && "On standby"}
                        {phase === "cancelled" && "Not notified"}
                        {isNotified && "Viewing Live Location"}
                        {isPending && "Notifying…"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all"
                    style={{
                      borderColor: isNotified ? "#4CAF50" : "#D0D0D0",
                      background: isNotified ? "#E8F5E9" : "transparent",
                      transition: "all 0.4s",
                    }}
                  >
                    {isNotified && (
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4L4.5 7.5L11 1" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                    {isPending && (
                      <div className="w-3 h-3 rounded-full border-2 border-t-transparent" style={{ borderColor: "#E91E8C", borderTopColor: "transparent", animation: "spin 0.7s linear infinite" }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {displayContacts.length === 0 && (
        <div className="w-full card" style={{ border: "1px dashed #FFB8DC", background: "#FFF8FC" }}>
          <p className="text-sm text-center" style={{ color: "#E91E8C" }}>⚠️ No emergency contacts set</p>
          <p className="text-xs text-center mt-1" style={{ color: "#9E9E9E" }}>Add contacts so they can be alerted during an emergency.</p>
        </div>
      )}
    </div>
  );
}
