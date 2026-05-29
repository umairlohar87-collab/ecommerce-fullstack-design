import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
    <div className="bg-gray-100 min-h-screen font-sans">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between">
        <Link to="/" className="no-underline">
          <div className="bg-blue-600 text-white rounded-lg px-3.5 py-1.5 text-base font-bold flex items-center gap-1.5 shadow-sm">
            🛒 Brand
          </div>
        </Link>
        <span className="text-[13px] text-gray-400 font-medium">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:underline transition-all">
            Sign up
          </Link>
        </span>
      </header>

      {/* ── BODY ────────────────────────────────────────────── */}
      <div className="max-w-[1000px] mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ── LEFT: Branding panel ────────────────────────── */}
        <div className="hidden md:block">
          {/* Blue card */}
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 rounded-2xl p-10 pb-12 mb-5 overflow-hidden shadow-2xl">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-[11px] text-blue-100 mb-4.5 font-semibold backdrop-blur-sm border border-white/10">
                ✦ Trusted by 2M+ users
              </div>
              <h2 className="text-white text-[28px] font-bold mb-3 leading-tight mt-4">
                Welcome back to<br />Brand
              </h2>
              <p className="text-blue-100 text-[13px] leading-relaxed mb-7 max-w-[320px]">
                Sign in to access your orders, saved items, and exclusive member deals.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "10K+", label: "Suppliers" },
                  { value: "2M+",  label: "Customers" },
                  { value: "50+",  label: "Countries" },
                ].map(s => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-md border border-white/5">
                    <div className="text-[17px] font-bold text-white leading-tight">{s.value}</div>
                    <div className="text-[10px] text-blue-200 mt-1 uppercase tracking-wider font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 items-start shadow-sm transition-transform hover:scale-[1.01]">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&q=80"
              alt="user"
              className="w-11 h-11 rounded-full object-cover flex-shrink-0 border border-gray-100"
            />
            <div>
              <div className="flex gap-0.5 mb-1.5 text-orange-400">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-[13px] text-gray-500 mb-2 leading-relaxed italic">
                "Brand made it incredibly easy to find quality suppliers. My business has grown 3x since joining!"
              </p>
              <div className="text-[12px] font-bold text-gray-800">Sarah Johnson</div>
              <div className="text-[11px] text-gray-400 font-medium">Small Business Owner</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Login form ────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-xl">
          <h2 className="text-[24px] font-bold mb-1 text-gray-900 tracking-tight">
            Sign in
          </h2>
          <p className="text-[13px] text-gray-500 mb-7">
            Enter your credentials to access your account
          </p>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: <GoogleIcon />, label: "Google" },
              { icon: <AppleIcon />,  label: "Apple"  },
            ].map(btn => (
              <button key={btn.label} className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg bg-white text-[13px] font-semibold text-gray-700 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm">
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[11px] text-gray-400 uppercase font-bold tracking-widest">or email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Global login error */}
          {loginError && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-3.5 mb-5 text-[13px] text-red-600 flex items-center gap-2 font-medium">
              <span className="text-base">⚠</span> {loginError}
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
              placeholder="••••••••"
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
            <div className="flex justify-between items-center mb-7">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div onClick={() => setRemember(v => !v)} className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${remember ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300 group-hover:border-blue-400"}`}>
                  {remember && (
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  )}
                </div>
                <span className="text-[13px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[13px] text-blue-600 font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg text-white text-[14px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 tracking-wide
              ${loading ? "bg-blue-400 cursor-not-allowed shadow-none" : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98]"}`}>
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in…
                </>
              ) : "Sign in"}
            </button>

            {/* Sign up link */}
            <p className="text-center text-[13px] text-gray-500 mt-6 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold hover:underline">
                Create one free
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white py-5 px-5 text-center text-[12px] text-gray-400 font-medium">
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
