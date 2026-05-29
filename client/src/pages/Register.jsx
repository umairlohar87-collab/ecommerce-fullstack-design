import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150 ${focused ? "text-blue-600" : "text-gray-400"}`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full py-2.5 text-[13px] outline-none transition-all border rounded-lg bg-white text-gray-800 font-sans
            ${icon ? "pl-[38px]" : "pl-3.5"}
            ${rightEl ? "pr-10" : "pr-3.5"}
            ${error ? "border-red-500" : focused ? "border-blue-600 shadow-[0_0_0_1px_#2563eb]" : "border-gray-200"}`}
        />
        {rightEl && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
            {rightEl}
          </span>
        )}
      </div>
      {error && <p className="text-[11px] text-red-500 mt-1 font-medium">{error}</p>}
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
  const colors   = ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-blue-500", "bg-green-500"];
  const textColors = ["text-gray-400", "text-red-500", "text-orange-500", "text-blue-500", "text-green-500"];

  if (!password) return null;

  return (
    <div className="mt-[-8px] mb-3.5">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4].map(i => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= strength ? colors[strength] : "bg-gray-100"}`} />
        ))}
      </div>
      <span className={`text-[11px] font-bold uppercase tracking-wider ${textColors[strength]}`}>{labels[strength]}</span>
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans p-5">
        <div className="bg-white rounded-2xl p-10 py-12 text-center border border-gray-200 shadow-2xl max-w-[400px] w-full animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-[22px] font-bold text-gray-900 mb-2 tracking-tight">Account created!</h2>
          <p className="text-[14px] text-gray-500 font-medium">Redirecting you to login…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">

      {/* ── MINIMAL HEADER ──────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between">
        <Link to="/" className="no-underline">
          <div className="bg-blue-600 text-white rounded-lg px-3.5 py-1.5 text-base font-bold flex items-center gap-1.5 shadow-sm">
            🛒 Brand
          </div>
        </Link>
        <span className="text-[13px] text-gray-400 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Sign in
          </Link>
        </span>
      </header>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <div className="max-w-[1000px] mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* ── LEFT: Illustration + benefits ───────────────── */}
        <div className="hidden md:block sticky top-24">
          {/* Hero card */}
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 rounded-2xl p-10 pb-0 overflow-hidden mb-6 shadow-2xl min-h-[300px]">
            <h2 className="text-white text-[28px] font-bold mb-3 leading-tight">
              Join millions of<br />buyers & sellers
            </h2>
            <p className="text-blue-100 text-[13px] leading-relaxed mb-7 max-w-[320px]">
              Create your free account and start shopping from thousands of verified suppliers worldwide.
            </p>
            {/* Floating product cards */}
            <div className="flex gap-2.5 pb-8 relative z-10">
              {[
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=80",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&q=80",
              ].map((src, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-2 backdrop-blur-md border border-white/10 hover:scale-110 transition-transform cursor-pointer">
                  <img src={src} alt="" className="w-14 h-14 rounded-lg object-cover block" />
                </div>
              ))}
            </div>
            {/* Decorative circle */}
            <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-white/5" />
          </div>

          {/* Benefits list */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-[14px] font-bold mb-4 text-gray-900 uppercase tracking-wider">
              Why join Brand?
            </h4>
            <div className="space-y-1">
              {[
                { icon: "🛒", text: "Access 10,000+ verified suppliers" },
                { icon: "🚚", text: "Free & fast worldwide delivery" },
                { icon: "🔒", text: "Secure payments & buyer protection" },
                { icon: "💬", text: "24/7 customer support" },
                { icon: "🎁", text: "Exclusive deals for members" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3.5 py-2.5 border-b border-gray-50 last:border-0 group cursor-default">
                  <span className="text-xl group-hover:scale-125 transition-transform">{b.icon}</span>
                  <span className="text-[13px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-xl">
          <h2 className="text-[24px] font-bold mb-1 text-gray-900 tracking-tight">
            Create account
          </h2>
          <p className="text-[13px] text-gray-500 mb-7 font-medium">
            Fill in the details below to get started
          </p>

          {/* Social sign-up buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: <GoogleIcon />, label: "Google" },
              { icon: <AppleIcon />,  label: "Apple"  },
            ].map(btn => (
              <button key={btn.label} className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg bg-white text-[12px] font-semibold text-gray-700 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm">
                {btn.icon} <span>{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[11px] text-gray-400 uppercase font-bold tracking-widest">or register</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3.5">
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
              placeholder="••••••••"
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
              placeholder="••••••••"
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
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => setAgreed(v => !v)}
                  className={`w-4.5 h-4.5 rounded border mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${agreed ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300 group-hover:border-blue-400"}`}
                >
                  {agreed && <CheckIcon />}
                </div>
                <span className="text-[13px] text-gray-500 leading-relaxed font-medium">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 font-bold hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-blue-600 font-bold hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && (
                <p className="text-[11px] text-red-500 mt-1.5 ml-7 font-bold italic">{errors.agreed}</p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg text-[14px] font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-[0.98] tracking-wide">
              Create account
            </button>

            {/* Sign in link */}
            <p className="text-center text-[13px] text-gray-500 mt-6 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ── MINIMAL FOOTER ──────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white py-6 px-5 text-center text-[12px] text-gray-400 font-medium mt-10">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-center items-center gap-4">
          <span>© 2024 Brand. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
