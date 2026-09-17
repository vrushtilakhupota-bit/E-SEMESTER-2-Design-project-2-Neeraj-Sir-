import { useState } from "react";
import type { Screen, AppSettings, Toast } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  settings: AppSettings;
  onUpdate: (s: AppSettings) => void;
  showToast: (message: string, type?: Toast["type"]) => void;
}

type ModalType = "change-password" | "phone" | "2fa" | "delete" | "help" | "privacy" | "terms" | null;

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-t-3xl p-6 fade-in"
        style={{ background: "white", maxHeight: "80vh", overflow: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold" style={{ color: "#1C1B1F" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, lineHeight: 1, color: "#9E9E9E" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Settings({ navigate, settings, onUpdate, showToast }: Props) {
  const [modal, setModal] = useState<ModalType>(null);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState<Partial<typeof pwForm>>({});

  const toggle = (key: keyof AppSettings) => {
    const next = { ...settings, [key]: !settings[key] };
    onUpdate(next);
    if (key === "locationTracking") {
      showToast(next.locationTracking ? "Location tracking enabled" : "Location tracking paused", "info");
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<typeof pwForm> = {};
    if (!pwForm.current) errs.current = "Required";
    if (pwForm.next.length < 8) errs.next = "Minimum 8 characters";
    if (pwForm.next !== pwForm.confirm) errs.confirm = "Passwords don't match";
    setPwErrors(errs);
    if (Object.keys(errs).length) return;
    setModal(null);
    setPwForm({ current: "", next: "", confirm: "" });
    showToast("Password changed successfully");
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-5">
      <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#9E9E9E" }}>{title}</p>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );

  const ToggleRow = ({ label, sub, settingKey }: { label: string; sub?: string; settingKey: keyof AppSettings }) => (
    <div className="flex items-center justify-between px-4 py-3 border-b last:border-b-0" style={{ borderColor: "#F5EEF5" }}>
      <div>
        <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{label}</p>
        {sub && <p className="text-xs" style={{ color: "#9E9E9E" }}>{sub}</p>}
      </div>
      <div className={`toggle ${settings[settingKey] ? "active" : ""}`} onClick={() => toggle(settingKey)} />
    </div>
  );

  const TapRow = ({ label, sub, onClick, danger }: { label: string; sub?: string; onClick: () => void; danger?: boolean }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 w-full text-left"
      style={{ background: "none", border: "none", borderBottom: "1px solid #F5EEF5", cursor: "pointer" }}
    >
      <div>
        <p className="text-sm font-semibold" style={{ color: danger ? "#F44336" : "#1C1B1F" }}>{label}</p>
        {sub && <p className="text-xs" style={{ color: "#9E9E9E" }}>{sub}</p>}
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 18l6-6-6-6" stroke="#C0A0C0" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("profile")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Settings</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 scroll-area px-5 pb-6">
        <Section title="NOTIFICATIONS">
          <ToggleRow label="SOS Alerts" sub="Critical alerts always on" settingKey="notifSos" />
          <ToggleRow label="Location Sharing" sub="Notify when someone views your location" settingKey="notifLocation" />
          <ToggleRow label="Community Alerts" sub="Nearby safety reports" settingKey="notifCommunity" />
          <ToggleRow label="Daily Safety Tips" sub="One tip per day" settingKey="notifTips" />
        </Section>

        <Section title="PRIVACY">
          <ToggleRow label="Share Live Location" sub="With emergency contacts" settingKey="privacyShareLocation" />
          <ToggleRow label="Anonymous Reports" sub="Hide your identity in reports" settingKey="privacyAnonymous" />
          <ToggleRow label="Usage Analytics" sub="Help improve SafeHer" settingKey="privacyAnalytics" />
        </Section>

        <Section title="ACCOUNT">
          <TapRow label="Change Password" onClick={() => setModal("change-password")} />
          <TapRow label="Linked Phone Number" sub="+91 98765 43210" onClick={() => setModal("phone")} />
          <TapRow label="Two-Factor Authentication" sub="Not set up" onClick={() => setModal("2fa")} />
          <TapRow label="Delete Account" danger onClick={() => setModal("delete")} />
        </Section>

        <Section title="ABOUT">
          <TapRow label="Help & Support" onClick={() => setModal("help")} />
          <TapRow label="Privacy Policy" onClick={() => setModal("privacy")} />
          <TapRow label="Terms of Service" onClick={() => setModal("terms")} />
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>App Version</p>
              <p className="text-xs" style={{ color: "#9E9E9E" }}>SafeHer v2.4.1</p>
            </div>
          </div>
        </Section>
      </div>

      {/* Change Password Modal */}
      {modal === "change-password" && (
        <Modal title="Change Password" onClose={() => setModal(null)}>
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
            {(["current", "next", "confirm"] as const).map((k) => (
              <div key={k}>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#9E9E9E" }}>
                  {k === "current" ? "Current Password" : k === "next" ? "New Password" : "Confirm New Password"}
                </label>
                <input
                  className="input-neu"
                  type="password"
                  placeholder="••••••••"
                  value={pwForm[k]}
                  onChange={(e) => { setPwForm((f) => ({ ...f, [k]: e.target.value })); setPwErrors((p) => ({ ...p, [k]: undefined })); }}
                  style={pwErrors[k] ? { boxShadow: "0 0 0 2px rgba(244,67,54,0.3)" } : {}}
                />
                {pwErrors[k] && <p className="text-xs mt-1" style={{ color: "#F44336" }}>{pwErrors[k]}</p>}
              </div>
            ))}
            <button type="submit" className="btn-primary">Update Password</button>
          </form>
        </Modal>
      )}

      {modal === "phone" && (
        <Modal title="Linked Phone Number" onClose={() => setModal(null)}>
          <p className="text-sm mb-4" style={{ color: "#9E9E9E" }}>Your current number: <strong style={{ color: "#1C1B1F" }}>+91 98765 43210</strong></p>
          <input className="input-neu mb-4" type="tel" placeholder="Enter new number" />
          <button className="btn-primary" onClick={() => { setModal(null); showToast("Phone number updated"); }}>Update Number</button>
        </Modal>
      )}

      {modal === "2fa" && (
        <Modal title="Two-Factor Authentication" onClose={() => setModal(null)}>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: "#9E9E9E" }}>Enable 2FA to add an extra layer of security to your account.</p>
          <button className="btn-primary" onClick={() => { setModal(null); showToast("2FA enabled successfully"); }}>Enable 2FA via SMS</button>
        </Modal>
      )}

      {modal === "delete" && (
        <Modal title="Delete Account" onClose={() => setModal(null)}>
          <div className="p-3 rounded-2xl mb-4" style={{ background: "#FFEBEE" }}>
            <p className="text-sm font-semibold" style={{ color: "#F44336" }}>⚠️ This action is irreversible</p>
            <p className="text-xs mt-1" style={{ color: "#9E9E9E" }}>All your data, contacts and history will be permanently deleted.</p>
          </div>
          <button className="btn-outline mb-3" onClick={() => setModal(null)}>Keep My Account</button>
          <button
            className="w-full py-3 rounded-full text-sm font-semibold"
            style={{ background: "#F44336", color: "white", border: "none", cursor: "pointer" }}
            onClick={() => { setModal(null); navigate("login"); }}
          >
            Delete Account
          </button>
        </Modal>
      )}

      {modal === "help" && (
        <Modal title="Help & Support" onClose={() => setModal(null)}>
          <div className="flex flex-col gap-3">
            {[
              { icon: "💬", label: "Live Chat", sub: "Chat with our support team" },
              { icon: "📧", label: "Email Support", sub: "support@safeher.app" },
              { icon: "📞", label: "Helpline", sub: "1800-XXX-XXXX (24/7 Free)" },
              { icon: "📖", label: "FAQs", sub: "Browse common questions" },
            ].map((item) => (
              <div key={item.label} className="card flex items-center gap-3 cursor-pointer" onClick={() => { setModal(null); showToast(`Opening ${item.label}…`, "info"); }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{item.label}</p>
                  <p className="text-xs" style={{ color: "#9E9E9E" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {(modal === "privacy" || modal === "terms") && (
        <Modal title={modal === "privacy" ? "Privacy Policy" : "Terms of Service"} onClose={() => setModal(null)}>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#9E9E9E" }}>
            SafeHer is committed to protecting your privacy. We collect only the data necessary to provide safety features, and never sell your personal information to third parties. Your location data is shared only with your chosen emergency contacts and only when you activate SOS.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#9E9E9E" }}>
            All data is encrypted in transit and at rest. You can request deletion of your data at any time from Settings.
          </p>
          <button className="btn-primary mt-4" onClick={() => setModal(null)}>Got it</button>
        </Modal>
      )}
    </div>
  );
}
