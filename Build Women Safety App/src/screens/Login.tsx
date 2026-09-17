import { useState } from "react";
import type { Screen } from "../types";
import type { GoogleUser } from "../lib/auth";
import Logo from "../components/Logo";
import GoogleAuthModal from "../components/GoogleAuthModal";

interface Props {
  navigate: (s: Screen) => void;
  onGoogleSignIn: (user: GoogleUser) => void;
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function Login({ navigate, onGoogleSignIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("home");
    }, 1000);
  };

  const handleGoogleSignIn = (user: GoogleUser) => {
    setShowGoogleModal(false);
    onGoogleSignIn(user);
  };

  return (
    <div className="flex flex-col items-center px-8 py-10 bg-pink-grad" style={{ minHeight: "100dvh" }}>
      {showGoogleModal && (
        <GoogleAuthModal onSignIn={handleGoogleSignIn} onClose={() => setShowGoogleModal(false)} />
      )}

      <div className="w-full max-w-sm fade-in">
        <div className="flex justify-center mb-6">
          <Logo size={80} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-1" style={{ color: "#1C1B1F" }}>Welcome Back</h2>
        <p className="text-center text-sm mb-8" style={{ color: "#9E9E9E" }}>Log in to stay safe</p>

        {/* Google Sign-In Button */}
        <button
          onClick={() => setShowGoogleModal(true)}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-full mb-5"
          style={{
            background: "white",
            border: "1.5px solid #dadce0",
            cursor: "pointer",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#3c4043",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            transition: "box-shadow 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)")}
        >
          <GoogleLogo />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: "#E0D0E0" }} />
          <span className="text-xs font-semibold" style={{ color: "#C0A0C0" }}>or sign in with email</span>
          <div className="flex-1 h-px" style={{ background: "#E0D0E0" }} />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Email</label>
            <input
              className="input-neu"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>Password</label>
            <div className="relative">
              <input
                className="input-neu"
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                style={{ paddingRight: 48 }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#C0A0C0", fontSize: 16 }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl" style={{ background: "#FFEBEE" }}>
              <span style={{ fontSize: 14 }}>⚠️</span>
              <p className="text-xs font-semibold" style={{ color: "#F44336" }}>{error}</p>
            </div>
          )}

          <div className="text-right -mt-2">
            <button type="button" className="text-sm font-semibold" style={{ background: "none", border: "none", color: "#E91E8C", cursor: "pointer" }}>
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="btn-primary mt-1"
            disabled={loading}
            style={{ opacity: loading ? 0.75 : 1 }}
          >
            {loading ? "Signing in…" : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#9E9E9E" }}>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("register")}
            style={{ background: "none", border: "none", color: "#E91E8C", fontWeight: 600, cursor: "pointer" }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
