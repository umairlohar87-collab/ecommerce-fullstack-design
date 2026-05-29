import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const EyeIcon    = () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;
const EyeOffIcon = () => <Icon d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />;
const MailIcon   = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />;
const LockIcon   = () => <Icon d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" />;

const GoogleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
const AppleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// ─── Input Field ──────────────────────────────────────────────────────────────
function InputField({ label, type = "text", placeholder, value, onChange, icon, rightEl, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            color: focused ? "#2563eb" : "#9ca3af", pointerEvents: "none", transition: "color .15s",
          }}>{icon}</span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", padding: "10px 14px",
            paddingLeft: icon ? 38 : 14,
            paddingRight: rightEl ? 40 : 14,
            border: error ? "1.5px solid #ef4444" : focused ? "1.5px solid #2563eb" : "1.5px solid #e5e7eb",
            borderRadius: 7, fontSize: 13, outline: "none",
            fontFamily: "inherit", background: "#fff", color: "#111",
            boxSizing: "border-box", transition: "border-color .15s",
          }}
        />
        {rightEl && (
          <span style={{
            position: "absolute", right: 12, top: "50%",
            transform: "translateY(-50%)", cursor: "pointer", color: "#9ca3af",
          }}>{rightEl}</span>
        )}
      </div>
      {error && <p style={{ fontSize: 11, color: "#ef4444", margin: "4px 0 0" }}>{error}</p>}
    </div>
  );
}

// ─── Main Login Page ──────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();

  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [remember,    setRemember]    = useState(false);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [loginError,  setLoginError]  = useState("");

  const validate = () => {
    const e = {};
    if (!email.includes("@"))    e.email    = "Enter a valid email address";
    if (password.length < 6)     e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f5f5f5", minHeight: "100vh",
    }}>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #e8e8e8",
        padding: "12px 20px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{
            background: "#2563eb", color: "#fff", borderRadius: 7,
            padding: "6px 14px", fontSize: 15, fontWeight: 700,
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>🛒 Brand</div>
        </Link>
        <span style={{ fontSize: 13, color: "#888" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
            Sign up
          </Link>
        </span>
      </header>

      {/* ── BODY ────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 1000, margin: "0 auto", padding: "48px 20px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 48, alignItems: "center",
      }}>

        {/* ── LEFT: Branding panel ────────────────────────── */}
        <div>
          {/* Blue card */}
          <div style={{
            background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#3b82f6 100%)",
            borderRadius: 16, padding: "40px 36px",
            marginBottom: 20, position: "relative", overflow: "hidden",
          }}>
            {/* Decorative circles */}
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 160, height: 160, borderRadius: "50%",
              background: "rgba(255,255,255,.08)",
            }} />
            <div style={{
              position: "absolute", bottom: -30, left: -30,
              width: 120, height: 120, borderRadius: "50%",
              background: "rgba(255,255,255,.06)",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,.15)", borderRadius: 20,
                padding: "4px 12px", fontSize: 12, color: "#bfdbfe",
                marginBottom: 18,
              }}>
                ✦ Trusted by 2M+ users
              </div>
              <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.3 }}>
                Welcome back to<br />Brand
              </h2>
              <p style={{ color: "#bfdbfe", fontSize: 13, lineHeight: 1.8, margin: "0 0 28px" }}>
                Sign in to access your orders, saved items, and exclusive member deals.
              </p>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                {[
                  { value: "10K+", label: "Suppliers" },
                  { value: "2M+",  label: "Customers" },
                  { value: "50+",  label: "Countries" },
                ].map(s => (
                  <div key={s.label} style={{
                    background: "rgba(255,255,255,.12)", borderRadius: 10,
                    padding: "12px 10px", textAlign: "center",
                    backdropFilter: "blur(4px)",
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: "#bfdbfe", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial card */}
          <div style={{
            background: "#fff", border: "1px solid #e8e8e8",
            borderRadius: 12, padding: "18px 20px",
            display: "flex", gap: 14, alignItems: "flex-start",
          }}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&q=80"
              alt="user"
              style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <div style={{ display: "flex", gap: 1, marginBottom: 6 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width={13} height={13} viewBox="0 0 24 24" fill="#f59e0b">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px", lineHeight: 1.6 }}>
                "Brand made it incredibly easy to find quality suppliers. My business has grown 3x since joining!"
              </p>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#222" }}>Sarah Johnson</div>
              <div style={{ fontSize: 11, color: "#888" }}>Small Business Owner</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Login form ────────────────────────────── */}
        <div style={{
          background: "#fff", borderRadius: 12,
          border: "1px solid #e8e8e8", padding: "36px 32px",
          boxShadow: "0 2px 16px rgba(0,0,0,.05)",
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "#1a1a2e" }}>
            Sign in
          </h2>
          <p style={{ fontSize: 13, color: "#888", margin: "0 0 24px" }}>
            Enter your credentials to access your account
          </p>

          {/* Social buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { icon: <GoogleIcon />, label: "Google" },
              { icon: <AppleIcon />,  label: "Apple"  },
            ].map(btn => (
              <button key={btn.label} style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 8, padding: "10px 0", border: "1.5px solid #e5e7eb",
                borderRadius: 7, background: "#fff", cursor: "pointer",
                fontSize: 13, fontWeight: 500, color: "#333",
                fontFamily: "inherit", transition: "border-color .15s, background .15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.background = "#f8faff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#fff"; }}
              >
                {btn.icon}
                <span>Continue with {btn.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            <span style={{ fontSize: 12, color: "#aaa" }}>or sign in with email</span>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>

          {/* Global login error */}
          {loginError && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca",
              borderRadius: 7, padding: "10px 14px", marginBottom: 16,
              fontSize: 13, color: "#dc2626", display: "flex", alignItems: "center", gap: 8,
            }}>
              ⚠ {loginError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<MailIcon />}
              error={errors.email}
            />

            <InputField
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<LockIcon />}
              rightEl={
                <span onClick={() => setShowPass(v => !v)}>
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </span>
              }
              error={errors.password}
            />

            {/* Remember me + Forgot */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 22,
            }}>
              <label style={{
                display: "flex", alignItems: "center", gap: 8,
                cursor: "pointer", fontSize: 13, color: "#555",
              }}>
                <div onClick={() => setRemember(v => !v)} style={{
                  width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                  border: remember ? "none" : "1.5px solid #ccc",
                  background: remember ? "#2563eb" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "background .15s",
                }}>
                  {remember && (
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none"
                      stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  )}
                </div>
                Remember me
              </label>
              <a href="#" style={{ fontSize: 13, color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "12px 0",
              background: loading ? "#93c5fd" : "#2563eb",
              color: "#fff", border: "none", borderRadius: 7,
              fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit", letterSpacing: ".3px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background .15s",
            }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = "#1d4ed8")}
              onMouseLeave={e => !loading && (e.currentTarget.style.background = "#2563eb")}
            >
              {loading ? (
                <>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                    stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                      <animateTransform attributeName="transform" type="rotate"
                        from="0 12 12" to="360 12 12" dur=".8s" repeatCount="indefinite"/>
                    </path>
                  </svg>
                  Signing in…
                </>
              ) : "Sign in"}
            </button>

            {/* Sign up link */}
            <p style={{ textAlign: "center", fontSize: 13, color: "#888", margin: "18px 0 0" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
                Create one free
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid #e8e8e8", background: "#fff",
        padding: "16px 20px", textAlign: "center",
        fontSize: 12, color: "#aaa",
      }}>
        © 2024 Brand. All rights reserved. &nbsp;·&nbsp;
        <a href="#" style={{ color: "#888", textDecoration: "none" }}>Privacy Policy</a>
        &nbsp;·&nbsp;
        <a href="#" style={{ color: "#888", textDecoration: "none" }}>Terms of Service</a>
      </div>
    </div>
  );
}