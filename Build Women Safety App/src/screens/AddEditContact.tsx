import { useState, useEffect } from "react";
import type { Screen, Contact } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  editContact: Contact | null;
  mode: "add" | "edit";
  onSave: (c: Omit<Contact, "id" | "avatar">) => void;
  onUpdate: (c: Contact) => void;
}

const relations = ["Mother", "Father", "Sister", "Brother", "Friend", "Partner", "Colleague", "Other"];

function validatePhone(p: string) {
  return /^[\d\s\+\-\(\)]{7,15}$/.test(p.trim());
}

export default function AddEditContact({ navigate, editContact, mode, onSave, onUpdate }: Props) {
  const [form, setForm] = useState({ name: "", phone: "", relation: "Friend" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode === "edit" && editContact) {
      setForm({ name: editContact.name, phone: editContact.phone, relation: editContact.relation });
    }
  }, [editContact, mode]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!validatePhone(form.phone)) errs.phone = "Enter a valid phone number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      if (mode === "edit" && editContact) {
        onUpdate({
          ...editContact,
          name: form.name.trim(),
          phone: form.phone.trim(),
          relation: form.relation,
          avatar: form.name.trim()[0].toUpperCase(),
        });
      } else {
        onSave({ name: form.name.trim(), phone: form.phone.trim(), relation: form.relation });
      }
      setSaving(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("contacts")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>
          {mode === "add" ? "Add Contact" : "Edit Contact"}
        </h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 scroll-area px-5 pb-6">
        {/* Avatar preview */}
        <div className="flex justify-center my-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)" }}
          >
            {form.name ? form.name.trim()[0]?.toUpperCase() ?? "?" : "?"}
          </div>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5" noValidate>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Full Name *</label>
            <input
              className="input-neu"
              type="text"
              placeholder="e.g. Priya Sharma"
              value={form.name}
              onChange={set("name")}
              style={errors.name ? { boxShadow: "0 0 0 2px rgba(244,67,54,0.3)" } : {}}
            />
            {errors.name && <p className="text-xs mt-1 ml-4" style={{ color: "#F44336" }}>{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Phone Number *</label>
            <input
              className="input-neu"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={set("phone")}
              style={errors.phone ? { boxShadow: "0 0 0 2px rgba(244,67,54,0.3)" } : {}}
            />
            {errors.phone && <p className="text-xs mt-1 ml-4" style={{ color: "#F44336" }}>{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Relationship</label>
            <select
              value={form.relation}
              onChange={set("relation")}
              style={{
                background: "#F5EEF5",
                border: "none",
                borderRadius: 50,
                padding: "14px 20px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
                color: "#1C1B1F",
                width: "100%",
                outline: "none",
                boxShadow: "inset 2px 2px 6px rgba(200,160,200,0.3), inset -2px -2px 6px rgba(255,255,255,0.8)",
                appearance: "none",
              }}
            >
              {relations.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div className="p-4 rounded-2xl" style={{ background: "#FFF0F8", border: "1px solid #FFE0F0" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "#E91E8C" }}>📲 How alerts work</p>
            <p className="text-xs leading-relaxed" style={{ color: "#9E9E9E" }}>
              When you trigger SOS, this contact will receive an SMS with your live location and a notification via SafeHer.
            </p>
          </div>

          <button
            type="submit"
            className="btn-primary mt-2"
            disabled={saving}
            style={{ opacity: saving ? 0.7 : 1 }}
          >
            {saving ? "Saving…" : mode === "add" ? "Add Contact" : "Save Changes"}
          </button>
          <button type="button" onClick={() => navigate("contacts")} className="btn-outline">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
