import { useState } from "react";
import type { Screen, Contact, Toast } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  contacts: Contact[];
  onEdit: (c: Contact) => void;
  onRemove: (id: string) => void;
  showToast: (message: string, type?: Toast["type"]) => void;
}

const avatarColors = ["#E91E8C", "#9C27B0", "#3F51B5", "#00BCD4", "#4CAF50", "#FF9800"];

export default function EmergencyContacts({ navigate, contacts, onEdit, onRemove, showToast }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    onRemove(id);
    setDeletingId(null);
  };

  const safetyScore = Math.min(100, contacts.length * 25);

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Emergency Contacts</h1>
        <button
          onClick={() => navigate("add-contact")}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)", border: "none", cursor: "pointer" }}
          aria-label="Add contact"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div className="flex-1 scroll-area px-5 pb-4">
        {/* Coverage indicator */}
        <div className="card mb-4" style={{ background: "linear-gradient(135deg, #FFF0F8, #FFE0F0)", padding: "12px 16px" }}>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold" style={{ color: "#9E9E9E" }}>Coverage strength</p>
            <p className="text-xs font-bold" style={{ color: "#E91E8C" }}>{contacts.length}/4 contacts</p>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#FFE0F0" }}>
            <div
              className="h-2 rounded-full"
              style={{
                width: `${safetyScore}%`,
                background: "linear-gradient(90deg, #E91E8C, #FF4DB8)",
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: contacts.length >= 3 ? "#4CAF50" : "#FF9800" }}>
            {contacts.length >= 3 ? "✓ Good coverage" : `Add ${3 - contacts.length} more for full coverage`}
          </p>
        </div>

        <p className="text-xs mb-4" style={{ color: "#9E9E9E" }}>
          Your contacts are alerted instantly when you trigger SOS.
        </p>

        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span style={{ fontSize: 48 }}>👥</span>
            <p className="text-sm font-semibold" style={{ color: "#9E9E9E" }}>No contacts yet</p>
            <p className="text-xs text-center" style={{ color: "#9E9E9E", maxWidth: 220 }}>Add trusted people who will be notified in an emergency.</p>
            <button className="btn-primary" style={{ width: "auto", padding: "12px 28px" }} onClick={() => navigate("add-contact")}>
              Add Your First Contact
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {contacts.map((contact, idx) => (
              <div key={contact.id} className="card fade-in" style={{ overflow: "hidden" }}>
                {deletingId === contact.id ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#F44336" }}>Remove {contact.name}?</p>
                      <p className="text-xs" style={{ color: "#9E9E9E" }}>They won't be alerted in future SOS events.</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setDeletingId(null)}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{ background: "#F5F5F5", border: "none", cursor: "pointer", color: "#666" }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleRemove(contact.id)}
                        className="text-xs px-3 py-1.5 rounded-full text-white"
                        style={{ background: "#F44336", border: "none", cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0"
                      style={{ background: avatarColors[idx % avatarColors.length] }}
                    >
                      {contact.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>{contact.name}</p>
                      <p className="text-xs" style={{ color: "#9E9E9E" }}>{contact.relation} · {contact.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(contact)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "#FFF0F8", border: "none", cursor: "pointer" }}
                        aria-label="Edit"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" />
                          <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeletingId(contact.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "#FFEBEE", border: "none", cursor: "pointer" }}
                        aria-label="Delete"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {contacts.length < 5 && (
              <button
                onClick={() => navigate("add-contact")}
                className="card flex items-center gap-3 w-full text-left"
                style={{ border: "2px dashed #FFB8DC", background: "#FFF8FC", cursor: "pointer" }}
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ border: "2px dashed #E91E8C" }}>
                  <span style={{ color: "#E91E8C", fontSize: 22, lineHeight: 1 }}>+</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: "#E91E8C" }}>Add Another Contact</p>
              </button>
            )}
          </div>
        )}

        <div className="mt-6 p-4 rounded-2xl" style={{ background: "#FFF0F8", border: "1px dashed #FFB8DC" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "#E91E8C" }}>💡 Tip</p>
          <p className="text-xs leading-relaxed" style={{ color: "#9E9E9E" }}>
            Add at least 3 contacts for maximum safety coverage. Contacts receive your live location and a safety alert when SOS is triggered.
          </p>
        </div>
      </div>
    </div>
  );
}
