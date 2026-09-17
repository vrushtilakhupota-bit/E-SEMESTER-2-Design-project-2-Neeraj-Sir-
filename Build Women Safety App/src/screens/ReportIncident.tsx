import { useState } from "react";
import type { Screen, Toast } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  showToast: (message: string, type?: Toast["type"]) => void;
}

const categories = ["Poor Lighting", "Suspicious Activity", "Harassment", "Unsafe Road", "Theft", "Other"];

export default function ReportIncident({ navigate, showToast }: Props) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast("Incident reported. Thank you for keeping us safe!");
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-pink-grad px-6">
        <div className="slide-up flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 className="text-2xl font-bold" style={{ color: "#1C1B1F" }}>Report Submitted!</h2>
          <p className="text-sm text-center" style={{ color: "#9E9E9E", maxWidth: 260 }}>
            Thank you for helping keep the community safe. Your report has been reviewed anonymously.
          </p>
          <div className="card w-full" style={{ background: "#F0FFF4" }}>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 18 }}>🔒</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#4CAF50" }}>Anonymous Report</p>
                <p className="text-xs" style={{ color: "#9E9E9E" }}>Your identity was never shared</p>
              </div>
            </div>
          </div>
          <button className="btn-primary w-full mt-2" onClick={() => navigate("map")}>Back to Map</button>
          <button onClick={() => { setSubmitted(false); setCategory(""); setDescription(""); }} style={{ background: "none", border: "none", color: "#9E9E9E", cursor: "pointer", fontSize: 13 }}>
            Report Another Incident
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("map")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Report Incident</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 scroll-area px-5 pb-6">
        <p className="text-xs mb-5" style={{ color: "#9E9E9E" }}>Help keep the community safe by reporting unsafe situations anonymously.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#1C1B1F" }}>
              Category <span style={{ color: "#F44336" }}>*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className="px-4 py-2 rounded-full text-xs font-semibold"
                  style={{
                    background: category === cat ? "#E91E8C" : "#F5EEF5",
                    color: category === cat ? "white" : "#9E9E9E",
                    border: "none", cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            {!category && (
              <p className="text-xs mt-2" style={{ color: "#9E9E9E" }}>Select a category to continue</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Location</label>
            <div className="flex items-center gap-2" style={{
              background: "#F5EEF5", borderRadius: 50, padding: "14px 20px",
              boxShadow: "inset 2px 2px 6px rgba(200,160,200,0.3), inset -2px -2px 6px rgba(255,255,255,0.8)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#E91E8C" /></svg>
              <span className="text-sm flex-1" style={{ color: "#1C1B1F" }}>Current Location — Ahmedabad</span>
              <span className="text-xs font-semibold" style={{ color: "#4CAF50" }}>Live</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>
              Description <span style={{ color: "#F44336" }}>*</span>
            </label>
            <textarea
              placeholder="Describe what happened, what you saw, or the unsafe condition…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              style={{
                background: "#F5EEF5",
                border: "none",
                borderRadius: 20,
                padding: "14px 20px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
                color: "#1C1B1F",
                width: "100%",
                outline: "none",
                resize: "none",
                boxShadow: "inset 2px 2px 6px rgba(200,160,200,0.3), inset -2px -2px 6px rgba(255,255,255,0.8)",
              }}
            />
            <p className="text-xs mt-1 text-right" style={{ color: "#9E9E9E" }}>{description.length}/300</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Evidence (optional)</label>
            <div
              className="flex flex-col items-center justify-center rounded-2xl py-6 gap-2 cursor-pointer"
              style={{ border: "2px dashed #FFB8DC", background: "#FFF8FC" }}
            >
              <span style={{ fontSize: 28 }}>📷</span>
              <p className="text-sm" style={{ color: "#9E9E9E" }}>Tap to add photo or video</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl flex items-start gap-2" style={{ background: "#FFF0F8" }}>
            <span className="text-xs mt-0.5">🔒</span>
            <p className="text-xs" style={{ color: "#9E9E9E" }}>Your report is anonymous. Your identity will never be shared with the community.</p>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={!category || !description || submitting}
            style={{ opacity: category && description && !submitting ? 1 : 0.6 }}
          >
            {submitting ? "Submitting…" : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}
