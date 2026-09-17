import type { Contact, Alert, SafePlace, SafetyTip, GestureMapping, UserProfile, AppSettings } from "./types";

export const sampleContacts: Contact[] = [
  { id: "1", name: "Mom", phone: "+91 98765 43210", relation: "Mother", avatar: "M", isNotified: true },
  { id: "2", name: "Dad", phone: "+91 98765 43211", relation: "Father", avatar: "D", isNotified: true },
  { id: "3", name: "Sister", phone: "+91 98765 43212", relation: "Sister", avatar: "S", isNotified: false },
  { id: "4", name: "Priya", phone: "+91 98765 43213", relation: "Friend", avatar: "P", isNotified: false },
];

export const sampleAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Poor Lighting",
    distance: "200m away",
    time: "5m ago",
    description: "Street lights are out on 5th Ave near the park entrance.",
    reportedBy: "Maya",
  },
  {
    id: "2",
    type: "danger",
    title: "Suspicious Activity",
    distance: "500m away",
    time: "12m ago",
    description: "Suspicious individual reported near the bus stand on MG Road.",
    reportedBy: "Asha",
  },
  {
    id: "3",
    type: "info",
    title: "Safe Zone Active",
    distance: "100m away",
    time: "2h ago",
    description: "New safe zone added: City Police Outpost now active 24/7.",
    reportedBy: "SafeHer Team",
  },
  {
    id: "4",
    type: "warning",
    title: "Unlit Alley",
    distance: "350m away",
    time: "30m ago",
    description: "The alley behind Sunrise Mall is very dark at night — avoid after 8pm.",
    reportedBy: "Rekha",
  },
  {
    id: "5",
    type: "danger",
    title: "Chain Snatching",
    distance: "1.2km away",
    time: "1h ago",
    description: "Chain snatching incident reported near Vastrapur lake. Stay alert.",
    reportedBy: "Neha",
  },
];

export const sampleSafePlaces: SafePlace[] = [
  { id: "1", name: "City General Hospital", type: "hospital", distance: "0.3 km", address: "12, Hospital Rd, Sector 4", isOpen: true, phone: "1800-102-1234" },
  { id: "2", name: "Sector 4 Police Station", type: "police", distance: "0.6 km", address: "Near Civil Court, Sector 4", isOpen: true, phone: "100" },
  { id: "3", name: "Women's Shelter Ahmedabad", type: "shelter", distance: "1.1 km", address: "22, NGO Lane, Vastrapur", isOpen: true, phone: "+91 79-2630-1234" },
  { id: "4", name: "Apollo Pharmacy", type: "pharmacy", distance: "0.2 km", address: "Shop 3, Sunrise Mall", isOpen: true, phone: "+91 79-2620-5678" },
  { id: "5", name: "SBM Police Post", type: "police", distance: "1.4 km", address: "S.G. Highway, Bodakdev", isOpen: false, phone: "100" },
];

export const safetyTips: SafetyTip[] = [
  {
    id: "1",
    title: "Stay Aware of Your Surroundings",
    category: "Personal Safety",
    icon: "👁️",
    description: "Situational awareness is your first line of defense.",
    tips: [
      "Keep your head up and avoid looking at your phone while walking.",
      "Trust your gut — if something feels off, leave immediately.",
      "Avoid wearing earphones in unfamiliar areas.",
      "Note exit routes when entering any building.",
      "Make eye contact to signal confidence.",
    ],
  },
  {
    id: "2",
    title: "Safe Travel Tips",
    category: "Travel",
    icon: "🚗",
    description: "Stay safe while commuting alone.",
    tips: [
      "Share your live location with a trusted contact before traveling.",
      "Book verified cabs and share the trip details.",
      "Sit near other passengers on public transport.",
      "Keep emergency numbers saved and accessible.",
      "Charge your phone before long journeys.",
    ],
  },
  {
    id: "3",
    title: "Digital Safety",
    category: "Online Safety",
    icon: "🔐",
    description: "Protect yourself in the digital world.",
    tips: [
      "Use strong unique passwords and enable 2FA.",
      "Avoid sharing your real-time location on social media.",
      "Be cautious of strangers on dating apps — meet in public first.",
      "Keep your home address private online.",
      "Report harassment immediately to platforms and authorities.",
    ],
  },
  {
    id: "4",
    title: "Self-Defense Basics",
    category: "Self-Defense",
    icon: "🥋",
    description: "Basic techniques to protect yourself.",
    tips: [
      "Aim for vulnerable areas: eyes, nose, throat, groin.",
      "Use your elbows and knees as weapons at close range.",
      "Make noise — shout 'Fire!' to attract more attention than 'Help!'",
      "Keep your keys between your fingers if threatened.",
      "Take a self-defense class — practice builds muscle memory.",
    ],
  },
  {
    id: "5",
    title: "Home Security",
    category: "Home Safety",
    icon: "🏠",
    description: "Make your living space safer.",
    tips: [
      "Always lock doors and windows before sleeping.",
      "Don't open the door to strangers — use a peephole.",
      "Keep a charged phone near your bed at night.",
      "Install a doorbell camera if possible.",
      "Share your address only with trusted people.",
    ],
  },
  {
    id: "6",
    title: "Emergency Preparedness",
    category: "Emergency",
    icon: "🚨",
    description: "Be ready when emergencies happen.",
    tips: [
      "Memorize key emergency numbers: Police 100, Ambulance 108, Women helpline 1091.",
      "Keep a small emergency kit: torch, whistle, first aid.",
      "Practice your SOS trigger with SafeHer monthly.",
      "Inform a trusted contact of your daily schedule.",
      "Know the nearest police station and hospital.",
    ],
  },
];

export const defaultGestures: GestureMapping[] = [
  { gesture: "one-tap", label: "One Tap", action: "Silent Alert", actionId: "silent", enabled: true },
  { gesture: "two-taps", label: "Two Taps", action: "Trigger Siren & SOS", actionId: "sos", enabled: true },
  { gesture: "long-press", label: "Long Press", action: "Trigger Siren & SOS", actionId: "sos", enabled: true },
];

export const actionOptions = [
  {
    category: "EMERGENCY",
    items: [{ id: "sos", label: "Trigger SOS Alert", description: "Immediately alerts emergency services and contacts." }],
  },
  {
    category: "CHECK-IN",
    items: [
      { id: "checkin", label: "Send Quick Check-in", description: "Sends \"I'm safe\" text to your family group." },
      { id: "live", label: "Start Live Tracking", description: "Share real-time location for 30 minutes." },
    ],
  },
  {
    category: "ALERTS",
    items: [
      { id: "silent", label: "Silent Alert", description: "Ring vibrates discreetly to confirm activation." },
      { id: "audible", label: "Activate Audible Sound", description: "Plays a loud alarm sound from your phone." },
    ],
  },
];

export const defaultProfile: UserProfile = {
  name: "Ananya Sharma",
  email: "ananya@email.com",
  phone: "+91 98765 43210",
  avatar: "A",
};

export const defaultSettings: AppSettings = {
  notifSos: true,
  notifLocation: true,
  notifCommunity: true,
  notifTips: false,
  privacyShareLocation: true,
  privacyAnonymous: true,
  privacyAnalytics: false,
  locationTracking: true,
};
