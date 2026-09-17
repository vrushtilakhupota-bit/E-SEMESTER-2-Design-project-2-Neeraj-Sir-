export type Screen =
  | "splash"
  | "login"
  | "register"
  | "home"
  | "sos-active"
  | "sos-safe"
  | "contacts"
  | "add-contact"
  | "edit-contact"
  | "map"
  | "safe-places"
  | "report-incident"
  | "safety-tips"
  | "safety-tip-detail"
  | "profile"
  | "edit-profile"
  | "settings"
  | "device-scanning"
  | "device-connected"
  | "device-success"
  | "gestures"
  | "gesture-action"
  | "gesture-synced"
  | "alerts";

export type Tab = "home" | "device" | "map" | "profile";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  avatar: string;
  isNotified?: boolean;
}

export interface Alert {
  id: string;
  type: "warning" | "info" | "danger";
  title: string;
  distance: string;
  time: string;
  description: string;
  reportedBy: string;
}

export interface SafePlace {
  id: string;
  name: string;
  type: "hospital" | "police" | "shelter" | "pharmacy";
  distance: string;
  address: string;
  isOpen: boolean;
  phone: string;
}

export interface SafetyTip {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  tips: string[];
}

export interface GestureMapping {
  gesture: "one-tap" | "two-taps" | "long-press";
  label: string;
  action: string;
  actionId: string;
  enabled: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface AppSettings {
  notifSos: boolean;
  notifLocation: boolean;
  notifCommunity: boolean;
  notifTips: boolean;
  privacyShareLocation: boolean;
  privacyAnonymous: boolean;
  privacyAnalytics: boolean;
  locationTracking: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}
