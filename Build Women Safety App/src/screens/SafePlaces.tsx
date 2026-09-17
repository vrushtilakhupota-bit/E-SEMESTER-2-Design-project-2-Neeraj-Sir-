import type { Screen } from "../types";
import { sampleSafePlaces } from "../data";

const typeConfig = {
  hospital: { icon: "🏥", color: "#F44336", label: "Hospital" },
  police: { icon: "👮", color: "#1565C0", label: "Police" },
  shelter: { icon: "🏠", color: "#E91E8C", label: "Shelter" },
  pharmacy: { icon: "💊", color: "#4CAF50", label: "Pharmacy" },
};

export default function SafePlaces({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("map")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Nearby Safe Places</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 scroll-area px-5 pb-4">
        <p className="text-xs mb-4" style={{ color: "#9E9E9E" }}>5 safe places found near your location</p>
        <div className="flex flex-col gap-3">
          {sampleSafePlaces.map((place) => {
            const cfg = typeConfig[place.type];
            return (
              <div key={place.id} className="card">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${cfg.color}18` }}>
                    <span style={{ fontSize: 20 }}>{cfg.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{place.name}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: place.isOpen ? "#E8F5E9" : "#FFEBEE", color: place.isOpen ? "#4CAF50" : "#F44336" }}>
                        {place.isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#9E9E9E" }}>{place.address}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-semibold" style={{ color: "#E91E8C" }}>{place.distance}</span>
                      <button onClick={() => window.open(`tel:${place.phone}`)} className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: "#FFF0F8", border: "none", cursor: "pointer", color: "#E91E8C" }}>
                        📞 Call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
