import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const tabs = [
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" }
];

export default function Signin() {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="min-h-screen w-full flex items-start md:items-center justify-center px-4 py-8 md:py-10 bg-gradient-soft">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left promo */}
        <div className="hidden lg:flex bg-[url('https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center rounded-3xl text-white p-0 overflow-hidden shadow-2xl relative min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-magenta-900/80 to-primary-800/80 mix-blend-multiply" />
          <div className="relative z-10 p-10 flex flex-col justify-between h-full">
            <div>
              <p className="uppercase text-sm tracking-[0.25em] opacity-80 mb-4 font-medium">Welcome to</p>
              <h1 className="text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Sukanya</h1>
              <p className="text-lg opacity-90 leading-relaxed text-balance">
                Discover premium sarees crafted with heritage and elegance. Sign in to track your orders and
                unlock exclusive offers.
              </p>
            </div>
            <div className="space-y-4 text-sm opacity-90">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✨</span>
                <p>Fast checkout and saved addresses</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">📦</span>
                <p>Order tracking with live updates</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">🎉</span>
                <p>Early access to festive launches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex items-center justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>Sign in</h2>
              <p className="text-sm text-neutral-500 mt-1">Welcome back! Please enter your details.</p>
            </div>
            <Link to="/shop" className="hidden sm:inline text-primary-600 text-sm font-semibold hover:text-magenta-600 transition-colors">
              Continue shopping
            </Link>
          </div>

          <div className="flex gap-2 mb-8 bg-neutral-100 p-1.5 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab.key
                    ? "bg-white text-primary-700 shadow-md"
                    : "bg-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "email" ? <EmailForm /> : <PhoneForm />}

          <div className="flex items-center gap-3 my-8">
            <span className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">or continue with</span>
            <span className="flex-1 h-px bg-neutral-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-neutral-100 rounded-xl bg-white hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-300">
              <FcGoogle className="text-xl" />
              <span className="text-sm font-semibold text-neutral-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-transparent rounded-xl bg-[#1877f2] text-white hover:bg-[#1864f2] hover:shadow-lg transition-all duration-300">
              <FaFacebookF className="text-lg" />
              <span className="text-sm font-semibold">Facebook</span>
            </button>
          </div>

          <div className="mt-8 space-y-3 text-center text-xs text-neutral-500">
            <p>
              By continuing, you agree to our{" "}
              <Link to="#" className="text-primary-600 font-semibold hover:text-magenta-600 transition-colors">Terms of Service</Link> and{" "}
              <Link to="#" className="text-primary-600 font-semibold hover:text-magenta-600 transition-colors">Privacy Policy</Link>.
            </p>
            <p className="text-sm">
              New to Sukanya?{" "}
              <Link to="#" className="text-primary-600 font-bold hover:text-magenta-600 transition-colors">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const EmailForm = () => (
  <form className="space-y-5 animate-fade-in">
    <div className="space-y-2">
      <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
        <FaEnvelope className="text-primary-500" />
        Email address
      </label>
      <input
        type="email"
        placeholder="you@example.com"
        className="input-elegant"
        required
      />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-semibold text-neutral-700">Password</label>
      <input
        type="password"
        placeholder="••••••••"
        className="input-elegant"
        required
      />
    </div>
    <div className="flex items-center justify-between text-sm">
      <label className="flex items-center gap-2 text-neutral-600 cursor-pointer group">
        <input type="checkbox" className="accent-primary-600 w-4 h-4 rounded border-neutral-300 focus:ring-primary-500" />
        <span className="group-hover:text-primary-600 transition-colors">Remember me</span>
      </label>
      <Link to="#" className="text-primary-600 font-semibold hover:text-magenta-600 transition-colors">
        Forgot password?
      </Link>
    </div>
    <button
      type="submit"
      className="w-full btn-primary py-3.5 text-base shadow-elegant hover:shadow-elegant-hover"
    >
      Sign in securely
    </button>
  </form>
);

const PhoneForm = () => (
  <form className="space-y-5 animate-fade-in">
    <div className="space-y-2">
      <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
        <FaPhoneAlt className="text-primary-500" />
        Phone number
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          value="+91"
          readOnly
          className="w-20 px-3 py-3 rounded-xl border-2 border-neutral-200 bg-neutral-50 text-neutral-600 font-medium text-center"
        />
        <input
          type="tel"
          placeholder="98765 43210"
          className="input-elegant"
          required
        />
      </div>
    </div>
    <div className="space-y-2">
      <label className="text-sm font-semibold text-neutral-700">OTP Code</label>
      <input
        type="text"
        placeholder="Enter 6-digit code"
        className="input-elegant tracking-widest text-center text-lg"
      />
      <div className="text-xs text-neutral-500">We’ll send a verification code to your phone.</div>
    </div>
    <div className="flex gap-3 pt-2">
      <button
        type="button"
        className="flex-1 py-3.5 rounded-full border-2 border-neutral-200 text-neutral-600 font-semibold hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
      >
        Send OTP
      </button>
      <button
        type="submit"
        className="flex-1 btn-primary py-3.5 text-base shadow-elegant hover:shadow-elegant-hover"
      >
        Verify
      </button>
    </div>
  </form>
);