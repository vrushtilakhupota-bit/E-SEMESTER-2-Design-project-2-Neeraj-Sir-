import { useEffect } from "react";
import type { Screen } from "../types";
import Logo from "../components/Logo";

export default function Splash({ navigate }: { navigate: (s: Screen) => void }) {
  useEffect(() => {
    const t = setTimeout(() => navigate("login"), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-pink-grad" style={{ minHeight: "100dvh" }}>
      <div className="slide-up flex flex-col items-center gap-6">
        <Logo size={100} />
        <div className="text-center">
          <h1 className="text-3xl font-bold" style={{ color: "#1C1B1F" }}>
            SAFE <span style={{ color: "#E91E8C" }}>HER</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9E9E9E" }}>Your safety companion, always.</p>
        </div>
      </div>
      <div className="absolute bottom-12 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 0 ? "#E91E8C" : "#FFC0E0" }} />
        ))}
      </div>
    </div>
  );
}
