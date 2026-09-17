import { useState, useCallback } from "react";
import type { Screen, Tab, Contact, GestureMapping, SafetyTip, Toast, UserProfile, AppSettings } from "./types";
import { sampleContacts, defaultGestures, defaultProfile, defaultSettings } from "./data";

import BottomNav from "./components/BottomNav";
import Toasts from "./components/Toast";

import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import SOSActive from "./screens/SOSActive";
import SOSSafe from "./screens/SOSSafe";
import EmergencyContacts from "./screens/EmergencyContacts";
import AddEditContact from "./screens/AddEditContact";
import MapScreen from "./screens/MapScreen";
import SafePlaces from "./screens/SafePlaces";
import ReportIncident from "./screens/ReportIncident";
import SafetyTips from "./screens/SafetyTips";
import SafetyTipDetail from "./screens/SafetyTipDetail";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Settings from "./screens/Settings";
import DeviceScanning from "./screens/DeviceScanning";
import DeviceConnected from "./screens/DeviceConnected";
import DeviceSuccess from "./screens/DeviceSuccess";
import Gestures from "./screens/Gestures";
import GestureAction from "./screens/GestureAction";
import GestureSynced from "./screens/GestureSynced";
import AlertsScreen from "./screens/AlertsScreen";

const SCREENS_WITH_NAV: Screen[] = [
  "home", "map", "profile", "safe-places", "contacts",
  "safety-tips", "device-connected", "device-scanning",
  "device-success", "gestures", "alerts",
];

const SCREEN_TO_TAB: Partial<Record<Screen, Tab>> = {
  home: "home",
  "sos-active": "home",
  "sos-safe": "home",
  contacts: "home",
  "add-contact": "home",
  "edit-contact": "home",
  alerts: "home",
  map: "map",
  "safe-places": "map",
  "report-incident": "map",
  profile: "profile",
  "edit-profile": "profile",
  settings: "profile",
  "safety-tips": "profile",
  "safety-tip-detail": "profile",
  "device-scanning": "device",
  "device-connected": "device",
  "device-success": "device",
  gestures: "device",
  "gesture-action": "device",
  "gesture-synced": "device",
};

export default function App() {
  // Navigation
  const [screen, setScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState<Tab>("home");

  // Global app state
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);
  const [gestures, setGestures] = useState<GestureMapping[]>(defaultGestures);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Selected item state for sub-screens
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [selectedGesture, setSelectedGesture] = useState<GestureMapping | null>(null);
  const [selectedTip, setSelectedTip] = useState<SafetyTip | null>(null);
  const [devicePaired, setDevicePaired] = useState(true);

  // Toast helpers
  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Navigation
  const navigate = useCallback((s: Screen) => {
    setScreen(s);
    const tab = SCREEN_TO_TAB[s];
    if (tab) setActiveTab(tab);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "home") navigate("home");
    else if (tab === "map") navigate("map");
    else if (tab === "profile") navigate("profile");
    else if (tab === "device") navigate(devicePaired ? "device-connected" : "device-scanning");
  };

  // Contact CRUD
  const addContact = (c: Omit<Contact, "id" | "avatar">) => {
    const newContact: Contact = {
      ...c,
      id: Date.now().toString(),
      avatar: c.name[0]?.toUpperCase() ?? "?",
    };
    setContacts((prev) => [...prev, newContact]);
    showToast(`${c.name} added to emergency contacts`);
    navigate("contacts");
  };

  const updateContact = (updated: Contact) => {
    setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast("Contact updated successfully");
    navigate("contacts");
  };

  const removeContact = (id: string) => {
    const name = contacts.find((c) => c.id === id)?.name ?? "Contact";
    setContacts((prev) => prev.filter((c) => c.id !== id));
    showToast(`${name} removed`, "info");
  };

  // Gesture update
  const updateGestureAction = (gesture: GestureMapping["gesture"], actionId: string, actionLabel: string) => {
    setGestures((prev) =>
      prev.map((g) => (g.gesture === gesture ? { ...g, action: actionLabel, actionId } : g))
    );
  };

  const toggleGesture = (gesture: GestureMapping["gesture"]) => {
    setGestures((prev) => prev.map((g) => (g.gesture === gesture ? { ...g, enabled: !g.enabled } : g)));
  };

  const showNav = SCREENS_WITH_NAV.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <Splash navigate={navigate} />;
      case "login":
        return <Login navigate={navigate} />;
      case "register":
        return <Register navigate={navigate} />;
      case "home":
        return (
          <Home
            navigate={navigate}
            contacts={contacts}
            settings={settings}
            onToggleTracking={() => {
              setSettings((s) => ({ ...s, locationTracking: !s.locationTracking }));
              showToast(settings.locationTracking ? "Location tracking paused" : "Location tracking active", "info");
            }}
          />
        );
      case "alerts":
        return <AlertsScreen navigate={navigate} />;
      case "sos-active":
        return <SOSActive navigate={navigate} contacts={contacts} />;
      case "sos-safe":
        return <SOSSafe navigate={navigate} />;
      case "contacts":
        return (
          <EmergencyContacts
            navigate={navigate}
            contacts={contacts}
            onEdit={(c) => { setEditContact(c); navigate("edit-contact"); }}
            onRemove={removeContact}
            showToast={showToast}
          />
        );
      case "add-contact":
        return <AddEditContact navigate={navigate} editContact={null} mode="add" onSave={addContact} onUpdate={updateContact} />;
      case "edit-contact":
        return <AddEditContact navigate={navigate} editContact={editContact} mode="edit" onSave={addContact} onUpdate={updateContact} />;
      case "map":
        return <MapScreen navigate={navigate} settings={settings} onToggleTracking={() => {
          setSettings((s) => ({ ...s, locationTracking: !s.locationTracking }));
          showToast(settings.locationTracking ? "Location tracking paused" : "Live tracking started", "info");
        }} />;
      case "safe-places":
        return <SafePlaces navigate={navigate} />;
      case "report-incident":
        return <ReportIncident navigate={navigate} showToast={showToast} />;
      case "safety-tips":
        return <SafetyTips navigate={navigate} onSelectTip={(t) => { setSelectedTip(t); navigate("safety-tip-detail"); }} />;
      case "safety-tip-detail":
        return <SafetyTipDetail navigate={navigate} tip={selectedTip} />;
      case "profile":
        return <Profile navigate={navigate} profile={profile} contacts={contacts} />;
      case "edit-profile":
        return <EditProfile navigate={navigate} profile={profile} onSave={(p) => { setProfile(p); showToast("Profile updated"); navigate("profile"); }} />;
      case "settings":
        return <Settings navigate={navigate} settings={settings} onUpdate={(s) => setSettings(s)} showToast={showToast} />;
      case "device-scanning":
        return <DeviceScanning navigate={navigate} onPaired={() => { setDevicePaired(true); navigate("device-success"); }} />;
      case "device-connected":
        return <DeviceConnected navigate={navigate} showToast={showToast} />;
      case "device-success":
        return <DeviceSuccess navigate={navigate} />;
      case "gestures":
        return (
          <Gestures
            navigate={navigate}
            gestures={gestures}
            onToggle={toggleGesture}
            onSelectGesture={(g) => { setSelectedGesture(g); navigate("gesture-action"); }}
            showToast={showToast}
          />
        );
      case "gesture-action":
        return (
          <GestureAction
            navigate={navigate}
            selectedGesture={selectedGesture}
            onConfirm={(actionId, actionLabel) => {
              if (selectedGesture) {
                updateGestureAction(selectedGesture.gesture, actionId, actionLabel);
              }
              navigate("gesture-synced");
            }}
          />
        );
      case "gesture-synced":
        return <GestureSynced navigate={navigate} />;
      default:
        return <Home navigate={navigate} contacts={contacts} settings={settings} onToggleTracking={() => {}} />;
    }
  };

  return (
    <div className="app-shell">
      <Toasts toasts={toasts} onDismiss={dismissToast} />
      <div className="flex-1 scroll-area relative">
        {renderScreen()}
      </div>
      {showNav && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onSOS={() => navigate("sos-active")}
        />
      )}
    </div>
  );
}
