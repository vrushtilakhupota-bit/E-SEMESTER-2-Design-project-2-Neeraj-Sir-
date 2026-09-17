import { useState } from "react";
import type { GoogleUser } from "../lib/auth";
import { DEMO_ACCOUNTS, buildUserFromEmail, getInitials, getAvatarColor } from "../lib/auth";

interface Props {
  onSignIn: (user: GoogleUser) => void;
  onClose: () => void;
}

function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Avatar({ user, size = 36 }: { user: GoogleUser; size?: number }) {
  const color = getAvatarColor(user.email);
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
      style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}
    >
      {getInitials(user.name)}
    </div>
  );
}

type Step = "pick" | "add" | "signing-in";

export default function GoogleAuthModal({ onSignIn, onClose }: Props) {
  const [step, setStep] = useState<Step>("pick");
  const [customEmail, setCustomEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [signingInUser, setSigningInUser] = useState<GoogleUser | null>(null);

  const doSignIn = (user: GoogleUser) => {
    setSigningInUser(user);
    setStep("signing-in");
    setTimeout(() => onSignIn(user), 1600);
  };

  const handleCustomEmail = () => {
    const email = customEmail.trim().toLowerCase();
    if (!email) { setEmailError("Enter an email address"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setEmailError("Enter a valid Google account email"); return; }
    if (!email.endsWith("@gmail.com") && !email.includes("@google")) {
      setEmailError("Please use a Gmail or Google Workspace email");
      return;
    }
    doSignIn(buildUserFromEmail(email));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        className="w-full fade-in"
        style={{ maxWidth: 360, background: "white", borderRadius: 28, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Signing in loader */}
        {step === "signing-in" && signingInUser && (
          <div className="flex flex-col items-center px-8 py-10 gap-4">
            <GoogleLogo size={32} />
            <Avatar user={signingInUser} size={56} />
            <div className="text-center">
              <p className="text-base font-semibold" style={{ color: "#202124" }}>Signing in</p>
              <p className="text-sm" style={{ color: "#5f6368" }}>{signingInUser.email}</p>
            </div>
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#1a73e8", animation: `bt-pulse 0.8s ${i * 0.15}s ease-in-out infinite` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Account picker */}
        {step === "pick" && (
          <>
            <div className="px-8 pt-8 pb-4 text-center border-b" style={{ borderColor: "#e8eaed" }}>
              <GoogleLogo size={28} />
              <h2 className="text-xl font-semibold mt-3 mb-1" style={{ color: "#202124", fontFamily: "'Google Sans', Roboto, sans-serif" }}>
                Sign in to SafeHer
              </h2>
              <p className="text-sm" style={{ color: "#5f6368" }}>Choose an account to continue</p>
            </div>

            <div className="py-2">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.id}
                  onClick={() => doSignIn(account)}
                  className="flex items-center gap-3 w-full px-6 py-3 text-left"
                  style={{ background: "none", border: "none", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <Avatar user={account} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate" style={{ color: "#202124" }}>{account.name}</p>
                      {account.isMainAuthor && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0" style={{ background: "#e8f0fe", color: "#1a73e8" }}>Author</span>
                      )}
                    </div>
                    <p className="text-xs truncate" style={{ color: "#5f6368" }}>{account.email}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
              ))}

              <button
                onClick={() => setStep("add")}
                className="flex items-center gap-3 w-full px-6 py-3 text-left"
                style={{ background: "none", border: "none", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fa")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#f1f3f4" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
                <p className="text-sm font-medium" style={{ color: "#202124" }}>Use another account</p>
              </button>
            </div>

            <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: "#e8eaed" }}>
              <div className="flex gap-4">
                <a href="#" onClick={(e) => e.preventDefault()} className="text-xs" style={{ color: "#1a73e8", textDecoration: "none" }}>Privacy Policy</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-xs" style={{ color: "#1a73e8", textDecoration: "none" }}>Terms of Service</a>
              </div>
              <button onClick={onClose} className="text-xs font-medium" style={{ background: "none", border: "none", cursor: "pointer", color: "#5f6368" }}>Cancel</button>
            </div>
          </>
        )}

        {/* Add account */}
        {step === "add" && (
          <>
            <div className="px-8 pt-8 pb-4 text-center border-b" style={{ borderColor: "#e8eaed" }}>
              <GoogleLogo size={28} />
              <h2 className="text-xl font-semibold mt-3 mb-1" style={{ color: "#202124", fontFamily: "'Google Sans', Roboto, sans-serif" }}>
                Sign in with Google
              </h2>
              <p className="text-sm" style={{ color: "#5f6368" }}>Enter your Gmail or Google Workspace address</p>
            </div>

            <div className="px-6 py-5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email or phone"
                  value={customEmail}
                  onChange={(e) => { setCustomEmail(e.target.value); setEmailError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleCustomEmail()}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: emailError ? "2px solid #ea4335" : "1px solid #dadce0",
                    borderRadius: 4,
                    fontSize: 14,
                    fontFamily: "Roboto, sans-serif",
                    color: "#202124",
                    outline: "none",
                    transition: "border 0.2s",
                  }}
                  onFocus={(e) => { if (!emailError) e.target.style.border = "2px solid #1a73e8"; }}
                  onBlur={(e) => { if (!emailError) e.target.style.border = "1px solid #dadce0"; }}
                />
              </div>
              {emailError && <p className="text-xs mt-1" style={{ color: "#ea4335" }}>{emailError}</p>}

              <p className="text-xs mt-3" style={{ color: "#5f6368" }}>
                Not your computer? Use a private browsing window to sign in.{" "}
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#1a73e8", textDecoration: "none" }}>Learn more</a>
              </p>
            </div>

            <div className="px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => { setStep("pick"); setCustomEmail(""); setEmailError(""); }}
                className="text-sm font-medium px-4 py-2 rounded"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#1a73e8" }}
              >
                Back
              </button>
              <button
                onClick={handleCustomEmail}
                className="text-sm font-medium px-6 py-2 rounded text-white"
                style={{ background: "#1a73e8", border: "none", cursor: "pointer", borderRadius: 4 }}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
