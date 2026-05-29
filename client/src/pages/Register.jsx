import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const EyeIcon     = () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" size={16} />;
const EyeOffIcon  = () => <Icon d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" size={16} />;
const UserIcon    = () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" size={16} />;
const MailIcon    = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" size={16} />;
const PhoneIcon   = () => <Icon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2.84l3-.16a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.42-1.42a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" size={16} />;
const LockIcon    = () => <Icon d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" size={16} />;
const CheckIcon   = () => <Icon d="M20 6L9 17l-5-5" size={12} />;
const GoogleIcon  = () => (
  <svg width={18} height={18} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
const AppleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// ─── Input Field ──────────────────────────────────────────────────────────────
function InputField({ label, type = "text", placeholder, value, onChange, icon, rightEl, error }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {/* Left icon */}
        {icon && (
          <span style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            color: "#9ca3af", pointerEvents: "none",
          }}>{icon}</span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "100%", padding: icon ? "10px 38px" : "10px 14px",
            paddingLeft: icon ? 38 : 14,
            paddingRight: rightEl ? 40 : 14,
            border: error ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
            borderRadius: 7, fontSize: 13, outline: "none",
            fontFamily: "inherit", background: "#fff", color: "#111",
            boxSizing: "border-box", transition: "border-color .15s",
          }}
          onFocus={e => !error && (e.target.style.borderColor = "#2563eb")}
          onBlur={e  => !error && (e.target.style.borderColor = "#e5e7eb")}
        />
        {/* Right element (eye toggle) */}
        {rightEl && (
          <span style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            cursor: "pointer", color: "#9ca3af",
          }}>{rightEl}</span>
        )}
      </div>
      {error && <p style={{ fontSize: 11, color: "#ef4444", margin: "4px 0 0" }}>{error}</p>}
    </div>
  );
}

// ─── Password Strength ────────────────────────────────────────────────────────
function PasswordStrength({ password }) {
  const getStrength = () => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8)          s++;
    if (/[A-Z]/.test(password))        s++;
    if (/[0-9]/.test(password))        s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const strength = getStrength();
  const labels   = ["", "Weak", "Fair", "Good", "Strong"];
  const colors   = ["#e5e7eb", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

  if (!password) return null;

  return (
    <div style={{ marginTop: -8, marginBottom: 14 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= strength ? colors[strength] : "#e5e7eb",
            transition: "background .2s",
          }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: colors[strength] }}>{labels[strength]}</span>
    </div>
  );
}

// ─── Main Register Page ───────────────────────────────────────────────────────
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", password: "", confirm: "",
  });
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed,      setAgreed]      = useState(false);
  const [errors,      setErrors]      = useState({});
  const [submitted,   setSubmitted]   = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim())  e.lastName  = "Last name is required";
    if (!form.email.includes("@")) e.email  = "Enter a valid email";
    if (form.phone.length < 7)  e.phone     = "Enter a valid phone number";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!agreed) e.agreed = "You must agree to the terms";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    setTimeout(() => navigate("/login"), 1800);
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh", background: "#f5f5f5",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}>
        <div style={{
          background: "#fff", borderRadius: 12, padding: "48px 40px",
          textAlign: "center", border: "1px solid #e8e8e8",
          boxShadow: "0 4px 24px rgba(0,0,0,.08)", maxWidth: 360,
        }}>
          <div style={{
            width: 60, height: 60, background: "#dcfce7", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none"
              stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>Account created!</h2>
          <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Redirecting you to login…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f5f5f5", minHeight: "100vh",
    }}>

      {/* ── MINIMAL HEADER ──────────────────────────────────── */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #e8e8e8",
        padding: "12px 20px", display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{
            background: "#2563eb", color: "#fff", borderRadius: 7,
            padding: "6px 14px", fontSize: 15, fontWeight: 700,
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>🛒 Brand</div>
        </Link>
        <span style={{ fontSize: 13, color: "#888" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </span>
      </header>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 1000, margin: "0 auto", padding: "40px 20px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start",
      }}>

        {/* ── LEFT: Illustration + benefits ───────────────── */}
        <div style={{ position: "sticky", top: 100 }}>
          {/* Hero card */}
          <div style={{
            background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#3b82f6 100%)",
            borderRadius: 16, padding: "40px 36px 0", overflow: "hidden",
            marginBottom: 24, position: "relative", minHeight: 300,
          }}>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.3 }}>
              Join millions of<br />buyers & sellers
            </h2>
            <p style={{ color: "#bfdbfe", fontSize: 13, lineHeight: 1.7, margin: "0 0 28px" }}>
              Create your free account and start shopping from thousands of verified suppliers worldwide.
            </p>
            {/* Floating product cards */}
            <div style={{ display: "flex", gap: 10, paddingBottom: 30 }}>
              {[
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=80",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&q=80",
              ].map((src, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,.15)", borderRadius: 10,
                  padding: 8, backdropFilter: "blur(6px)",
                }}>
                  <img src={src} alt="" style={{ width: 56, height: 56, borderRadius: 6, objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
            {/* Decorative circle */}
            <div style={{
              position: "absolute", bottom: -60, right: -60,
              width: 200, height: 200, borderRadius: "50%",
              background: "rgba(255,255,255,.07)",
            }} />
          </div>

          {/* Benefits list */}
          <div style={{
            background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8",
            padding: "20px 24px",
          }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px", color: "#1a1a2e" }}>
              Why join Brand?
            </h4>
            {[
              { icon: "🛒", text: "Access 10,000+ verified suppliers" },
              { icon: "🚚", text: "Free & fast worldwide delivery" },
              { icon: "🔒", text: "Secure payments & buyer protection" },
              { icon: "💬", text: "24/7 customer support" },
              { icon: "🎁", text: "Exclusive deals for members" },
            ].map((b, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "8px 0",
                borderBottom: i < 4 ? "1px solid #f5f5f5" : "none",
              }}>
                <span style={{ fontSize: 18 }}>{b.icon}</span>
                <span style={{ fontSize: 13, color: "#444" }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Form ──────────────────────────────────── */}
        <div style={{
          background: "#fff", borderRadius: 12,
          border: "1px solid #e8e8e8", padding: "32px 32px 28px",
          boxShadow: "0 2px 16px rgba(0,0,0,.05)",
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "#1a1a2e" }}>
            Create account
          </h2>
          <p style={{ fontSize: 13, color: "#888", margin: "0 0 24px" }}>
            Fill in the details below to get started
          </p>

          {/* Social sign-up buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { icon: <GoogleIcon />, label: "Continue with Google" },
              { icon: <AppleIcon />,  label: "Continue with Apple"  },
            ].map(btn => (
              <button key={btn.label} style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 8, padding: "10px 0", border: "1.5px solid #e5e7eb",
                borderRadius: 7, background: "#fff", cursor: "pointer",
                fontSize: 12, fontWeight: 500, color: "#333",
                fontFamily: "inherit", transition: "border-color .15s, background .15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.background = "#f8faff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#fff"; }}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            <span style={{ fontSize: 12, color: "#aaa", whiteSpace: "nowrap" }}>or register with email</span>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Name row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <InputField
                label="First name"
                placeholder="John"
                value={form.firstName}
                onChange={set("firstName")}
                icon={<UserIcon />}
                error={errors.firstName}
              />
              <InputField
                label="Last name"
                placeholder="Doe"
                value={form.lastName}
                onChange={set("lastName")}
                error={errors.lastName}
              />
            </div>

            <InputField
              label="Email address"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={set("email")}
              icon={<MailIcon />}
              error={errors.email}
            />

            <InputField
              label="Phone number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={set("phone")}
              icon={<PhoneIcon />}
              error={errors.phone}
            />

            <InputField
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="Create a strong password"
              value={form.password}
              onChange={set("password")}
              icon={<LockIcon />}
              rightEl={
                <span onClick={() => setShowPass(v => !v)}>
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </span>
              }
              error={errors.password}
            />
            <PasswordStrength password={form.password} />

            <InputField
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={set("confirm")}
              icon={<LockIcon />}
              rightEl={
                <span onClick={() => setShowConfirm(v => !v)}>
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </span>
              }
              error={errors.confirm}
            />

            {/* Terms */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                cursor: "pointer", fontSize: 13, color: "#555", lineHeight: 1.5,
              }}>
                <div
                  onClick={() => setAgreed(v => !v)}
                  style={{
                    width: 17, height: 17, borderRadius: 4, flexShrink: 0, marginTop: 1,
                    border: agreed ? "none" : "1.5px solid #ccc",
                    background: agreed ? "#2563eb" : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "background .15s",
                  }}
                >
                  {agreed && <CheckIcon />}
                </div>
                <span>
                  I agree to the{" "}
                  <a href="#" style={{ color: "#2563eb", textDecoration: "none" }}>Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" style={{ color: "#2563eb", textDecoration: "none" }}>Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && (
                <p style={{ fontSize: 11, color: "#ef4444", margin: "4px 0 0 27px" }}>{errors.agreed}</p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" style={{
              width: "100%", padding: "12px 0", background: "#2563eb", color: "#fff",
              border: "none", borderRadius: 7, fontSize: 14, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit", letterSpacing: ".3px",
              transition: "background .15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
            >
              Create account
            </button>

            {/* Sign in link */}
            <p style={{ textAlign: "center", fontSize: 13, color: "#888", margin: "16px 0 0" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ── MINIMAL FOOTER ──────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid #e8e8e8", background: "#fff",
        padding: "16px 20px", textAlign: "center",
        fontSize: 12, color: "#aaa", marginTop: 20,
      }}>
        © 2024 Brand. All rights reserved. &nbsp;·&nbsp;
        <a href="#" style={{ color: "#888", textDecoration: "none" }}>Privacy Policy</a>
        &nbsp;·&nbsp;
        <a href="#" style={{ color: "#888", textDecoration: "none" }}>Terms of Service</a>
      </div>
    </div>
  );
}