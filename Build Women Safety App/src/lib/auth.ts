export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  firstName: string;
  picture: string;
  isMainAuthor: boolean;
}

const MAIN_AUTHOR_EMAIL = "vrushtilakhupota@gmail.com";
const STORAGE_KEY = "safeher_google_user";

export const DEMO_ACCOUNTS: GoogleUser[] = [
  {
    id: "main-author",
    email: MAIN_AUTHOR_EMAIL,
    name: "Vrushti Lakhupota",
    firstName: "Vrushti",
    picture: "",
    isMainAuthor: true,
  },
];

export function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function getAvatarColor(email: string): string {
  const colors = ["#1a73e8", "#e91e8c", "#34a853", "#ea4335", "#9c27b0", "#ff9800"];
  let hash = 0;
  for (let i = 0; i < email.length; i++) hash = email.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function buildUserFromEmail(email: string): GoogleUser {
  const isMain = email.trim().toLowerCase() === MAIN_AUTHOR_EMAIL;
  const localPart = email.split("@")[0] ?? email;
  const name = isMain
    ? "Vrushti Lakhupota"
    : localPart
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    id: email,
    email: email.trim().toLowerCase(),
    name,
    firstName: name.split(" ")[0] ?? name,
    picture: "",
    isMainAuthor: isMain,
  };
}

export function saveUser(user: GoogleUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function loadUser(): GoogleUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GoogleUser) : null;
  } catch {
    return null;
  }
}

export function clearUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}
