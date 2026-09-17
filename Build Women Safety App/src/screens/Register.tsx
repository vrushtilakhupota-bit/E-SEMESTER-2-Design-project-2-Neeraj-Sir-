import { useState } from "react";
import type { Screen } from "../types";
import Logo from "../components/Logo";

export default function Register({ navigate }: { navigate: (s: Screen) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    navigate("home");
  };

  return (
    <div className="flex flex-col items-center px-8 py-10 bg-pink-grad scroll-area" style={{ minHeight: "100dvh" }}>
      <div className="w-full max-w-sm fade-in">
        <div className="flex justify-center mb-4">
          <Logo size={80} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-1" style={{ color: "#1C1B1F" }}>Create Account</h2>
        <p className="text-center text-sm mb-8" style={{ color: "#9E9E9E" }}>Join our Community and Stay Safe everywhere you go</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Full Name</label>
            <input className="input-neu" type="text" placeholder="Ananya Sharma" value={form.name} onChange={set("name")} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Email</label>
            <input className="input-neu" type="email" placeholder="ananya@email.com" value={form.email} onChange={set("email")} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Phone number</label>
            <input className="input-neu" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Create Password</label>
            <div className="relative">
              <input
                className="input-neu"
                type={showPass ? "text" : "password"}
                placeholder="Min 8 characters"
                value={form.password}
                onChange={set("password")}
                minLength={8}
                style={{ paddingRight: 48 }}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ background: "none", border: "none", cursor: "pointer", color: "#C0A0C0" }}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer" onClick={() => setAgreed(!agreed)}>
            <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2" style={{ background: agreed ? "#E91E8C" : "transparent", borderColor: agreed ? "#E91E8C" : "#C0A0C0" }}>
              {agreed && <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span className="text-xs" style={{ color: "#9E9E9E" }}>
              I agree to the <span style={{ color: "#E91E8C", fontWeight: 600 }}>Terms & Conditions</span> and{" "}
              <span style={{ color: "#E91E8C", fontWeight: 600 }}>Privacy Policy</span>
            </span>
          </label>

          <button type="submit" className="btn-primary mt-2" style={{ opacity: agreed ? 1 : 0.6 }}>Sign Up</button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#9E9E9E" }}>
          Already have an account?{" "}
          <button onClick={() => navigate("login")} style={{ background: "none", border: "none", color: "#E91E8C", fontWeight: 600, cursor: "pointer" }}>Log In</button>
        </p>
      </div>
    </div>
  );
}
