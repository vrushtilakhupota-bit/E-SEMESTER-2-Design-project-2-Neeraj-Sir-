import type { Tab } from "../types";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onSOS: () => void;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" fill={active ? "#E91E8C" : "#C0A0C0"} />
    </svg>
  );
}

function MapIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={active ? "#E91E8C" : "#C0A0C0"} />
    </svg>
  );
}

function DeviceIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill={active ? "#E91E8C" : "#C0A0C0"} />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke={active ? "#E91E8C" : "#C0A0C0"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill={active ? "#E91E8C" : "#C0A0C0"} />
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={active ? "#E91E8C" : "#C0A0C0"} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const tabs: { id: Tab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "device", label: "Device" },
  { id: "map", label: "Map" },
  { id: "profile", label: "Profile" },
];

export default function BottomNav({ activeTab, onTabChange, onSOS }: BottomNavProps) {
  return (
    <div className="bottom-nav flex items-center justify-around px-2 py-2 flex-shrink-0" style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}>
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => (tab.id === "device" ? onSOS() : onTabChange(tab.id))}
            className="flex flex-col items-center gap-0.5 min-w-0 flex-1 py-1 relative"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {tab.id === "device" ? (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center -mt-5 shadow-lg"
                style={{ background: "linear-gradient(135deg, #E91E8C 0%, #FF4DB8 100%)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="white" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5.64 5.64l1.77 1.77M16.59 16.59l1.77 1.77M5.64 18.36l1.77-1.77M16.59 7.41l1.77-1.77" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            ) : tab.id === "home" ? (
              <HomeIcon active={active} />
            ) : tab.id === "map" ? (
              <MapIcon active={active} />
            ) : (
              <ProfileIcon active={active} />
            )}
            {tab.id !== "device" && (
              <span style={{ fontSize: 10, color: active ? "#E91E8C" : "#C0A0C0", fontWeight: active ? 600 : 400 }}>{tab.label}</span>
            )}
            {tab.id !== "device" && active && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: "#E91E8C" }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
