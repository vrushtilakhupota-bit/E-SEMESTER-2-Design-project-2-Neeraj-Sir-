import type { Screen, SafetyTip } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  tip: SafetyTip | null;
}

export default function SafetyTipDetail({ navigate, tip }: Props) {
  if (!tip) { navigate("safety-tips"); return null; }

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("safety-tips")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-base font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>{tip.category}</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 scroll-area px-5 pb-6">
        {/* Hero */}
        <div className="flex flex-col items-center py-6">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #FFF0F8, #FFE0F0)" }}>
            <span style={{ fontSize: 40 }}>{tip.icon}</span>
          </div>
          <h2 className="text-xl font-bold text-center" style={{ color: "#1C1B1F" }}>{tip.title}</h2>
          <p className="text-sm text-center mt-2" style={{ color: "#9E9E9E" }}>{tip.description}</p>
        </div>

        {/* Tips */}
        <div className="flex flex-col gap-3">
          {tip.tips.map((t, i) => (
            <div key={i} className="card flex items-start gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)" }}>
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#1C1B1F" }}>{t}</p>
            </div>
          ))}
        </div>

        <button className="btn-primary mt-6" onClick={() => navigate("safety-tips")}>
          See More Tips
        </button>
      </div>
    </div>
  );
}
