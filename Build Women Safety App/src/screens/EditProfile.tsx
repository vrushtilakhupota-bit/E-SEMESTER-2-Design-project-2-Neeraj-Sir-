import { useState } from "react";
import type { Screen, UserProfile } from "../types";

interface Props {
  navigate: (s: Screen) => void;
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
}

export default function EditProfile({ navigate, profile, onSave }: Props) {
  const [form, setForm] = useState({ name: profile.name, email: profile.email, phone: profile.phone });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [saving, setSaving] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      onSave({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), avatar: form.name.trim()[0]?.toUpperCase() ?? "?" });
      setSaving(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-pink-grad">
      <div className="flex items-center px-5 pt-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate("profile")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1" style={{ color: "#1C1B1F" }}>Edit Profile</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 scroll-area px-5 pb-6">
        <div className="flex justify-center my-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: "linear-gradient(135deg, #E91E8C, #FF4DB8)" }}>
            {form.name ? form.name[0]?.toUpperCase() : "?"}
          </div>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5" noValidate>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Full Name *</label>
            <input className="input-neu" type="text" value={form.name} onChange={set("name")} placeholder="Your full name" style={errors.name ? { boxShadow: "0 0 0 2px rgba(244,67,54,0.3)" } : {}} />
            {errors.name && <p className="text-xs mt-1 ml-4" style={{ color: "#F44336" }}>{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Email *</label>
            <input className="input-neu" type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" style={errors.email ? { boxShadow: "0 0 0 2px rgba(244,67,54,0.3)" } : {}} />
            {errors.email && <p className="text-xs mt-1 ml-4" style={{ color: "#F44336" }}>{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Phone Number *</label>
            <input className="input-neu" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" style={errors.phone ? { boxShadow: "0 0 0 2px rgba(244,67,54,0.3)" } : {}} />
            {errors.phone && <p className="text-xs mt-1 ml-4" style={{ color: "#F44336" }}>{errors.phone}</p>}
          </div>

          <button type="submit" className="btn-primary mt-2" disabled={saving} style={{ opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button type="button" onClick={() => navigate("profile")} className="btn-outline">Cancel</button>
        </form>
      </div>
    </div>
  );
}
