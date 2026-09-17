import type { Screen, UserProfile, Contact } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  profile: UserProfile;
  contacts: Contact[];
}

export default function Profile({ navigate, profile, contacts }: Props) {
  const safetyScore = Math.min(100, 40 + contacts.length * 15);

  const menuItems = [
    { icon: "👥", label: "Emergency Contacts", sub: `${contacts.length} contact${contacts.length !== 1 ? "s" : ""} added`, screen: "contacts" as Screen },
    { icon: "📍", label: "Location Sharing", sub: "Tracking Active", screen: "map" as Screen },
    { icon: "📡", label: "My Device", sub: "Safe Her Ring · Connected", screen: "device-connected" as Screen },
    { icon: "💡", label: "Safety Tips", sub: "Stay safe, stay informed", screen: "safety-tips" as Screen },
    { icon: "⚠️", label: "Incident History", sub: "View past reports", screen: "report-incident" as Screen },
    { icon: "⚙️", label: "Settings", sub: "Notifications, privacy, account", screen: "settings" as Screen },
  ];

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="px-5 pt-5 pb-3 flex-shrink-0">
        <h1 className="text-lg font-bold" style={{ color: "#1C1B1F" }}>My Profile</h1>
      </div>

      <div className="flex-1 scroll-area px-5 pb-4">
        {/* Profile card */}
        <div className="card mb-5" style={{ background: "linear-gradient(135deg, #FFF0F8, #FFE0F0)" }}>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)" }}
            >
              {profile.avatar}
            </div>
            <div className="flex-1">
              <p className="text-base font-bold" style={{ color: "#1C1B1F" }}>{profile.name}</p>
              <p className="text-sm" style={{ color: "#9E9E9E" }}>{profile.email}</p>
              <p className="text-xs mt-1 font-semibold" style={{ color: "#E91E8C" }}>{profile.phone}</p>
            </div>
            <button
              onClick={() => navigate("edit-profile")}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#FFF0F8", border: "none", cursor: "pointer" }}
              aria-label="Edit profile"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" />
                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {/* Safety score */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold" style={{ color: "#9E9E9E" }}>Safety Score</p>
              <p className="text-xs font-bold" style={{ color: "#E91E8C" }}>{safetyScore}/100</p>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: "#FFE0F0" }}>
              <div
                className="h-2 rounded-full"
                style={{ width: `${safetyScore}%`, background: "linear-gradient(90deg, #E91E8C, #FF4DB8)", transition: "width 0.6s" }}
              />
            </div>
            {contacts.length < 3 && (
              <p className="text-xs mt-1" style={{ color: "#FF9800" }}>Add {3 - contacts.length} more contact{3 - contacts.length !== 1 ? "s" : ""} to improve your score</p>
            )}
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.screen)}
              className="card flex items-center gap-3 text-left w-full"
              style={{ border: "none", cursor: "pointer" }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#FFF0F8" }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{item.label}</p>
                <p className="text-xs" style={{ color: "#9E9E9E" }}>{item.sub}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#C0A0C0" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          className="w-full mt-5 py-3 rounded-2xl text-sm font-semibold"
          style={{ background: "#FFEBEE", border: "none", cursor: "pointer", color: "#F44336" }}
          onClick={() => navigate("login")}
        >
          Log Out
        </button>

        <p className="text-center text-xs mt-4" style={{ color: "#C0C0C0" }}>SafeHer v2.4.1 · Made with ❤️ for safety</p>
      </div>
    </div>
  );
}
