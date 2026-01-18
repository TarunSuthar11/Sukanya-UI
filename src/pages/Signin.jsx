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
    <div className="min-h-screen w-full  flex items-start md:items-center justify-center px-4 py-8 md:py-10">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left promo */}
        <div className="hidden lg:flex bg-[url('https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center rounded-3xl text-white p-0 overflow-hidden shadow-xl relative">
          <div className="absolute inset-0 bg-linear-to-br from-amber-900/80 via-orange-700/80 to-amber-800/80" />
          <div className="relative z-10 p-10 flex flex-col justify-between">
          <div>
            <p className="uppercase text-sm tracking-[0.25em] opacity-80 mb-4">Welcome to</p>
            <h1 className="text-4xl font-semibold leading-tight mb-4">Sukanya</h1>
            <p className="text-lg opacity-90">
              Discover premium sarees crafted with heritage and elegance. Sign in to track your orders and
              unlock exclusive offers.
            </p>
          </div>
            <div className="space-y-2 text-sm opacity-90">
              <p>• Fast checkout and saved addresses</p>
              <p>• Order tracking with live updates</p>
              <p>• Early access to festive launches</p>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-white rounded-3xl shadow-xl border border-amber-100 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Sign in to your account</h2>
              <p className="text-sm text-gray-500 mt-1">Choose your preferred sign-in method</p>
            </div>
            <Link to="/shop" className="hidden sm:inline text-amber-700 text-sm font-semibold hover:text-amber-800">
              Continue shopping
            </Link>
          </div>

          <div className="flex gap-2 mb-6 bg-amber-50 p-1 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-white text-amber-900 shadow-md"
                    : "bg-transparent text-amber-800 hover:bg-amber-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "email" ? <EmailForm /> : <PhoneForm />}

          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-amber-100" />
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">or continue with</span>
            <span className="flex-1 h-px bg-amber-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 w-full py-3 border border-amber-100 rounded-xl bg-white hover:bg-amber-50 transition shadow-sm">
              <FcGoogle className="text-xl" />
              <span className="text-sm font-semibold text-gray-800">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-3 border border-amber-100 rounded-xl bg-[#1877f2] text-white hover:brightness-105 transition shadow-sm">
              <FaFacebookF className="text-lg" />
              <span className="text-sm font-semibold">Facebook</span>
            </button>
          </div>

          <div className="mt-6 space-y-2 text-center text-xs text-gray-500">
            <p>
              By continuing, you agree to our{" "}
              <span className="text-amber-700 font-semibold cursor-pointer">Terms</span> and{" "}
              <span className="text-amber-700 font-semibold cursor-pointer">Privacy Policy</span>.
            </p>
            <p className="text-[11px]">
              New to Sukanya?{" "}
              <span className="text-amber-700 font-semibold cursor-pointer">Create an account</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const EmailForm = () => (
  <form className="space-y-4">
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <FaEnvelope className="text-amber-600" />
        Email address
      </label>
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50 focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none transition"
        required
      />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">Password</label>
      <input
        type="password"
        placeholder="••••••••"
        className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50 focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none transition"
        required
      />
    </div>
    <div className="flex items-center justify-between text-sm">
      <label className="flex items-center gap-2 text-gray-600">
        <input type="checkbox" className="accent-amber-600" />
        Remember me
      </label>
      <Link to="#" className="text-amber-700 font-semibold hover:text-amber-800">
        Forgot password?
      </Link>
    </div>
    <button
      type="submit"
      className="w-full py-3 rounded-xl bg-linear-to-r from-amber-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
    >
      Sign in with email
    </button>
  </form>
);

const PhoneForm = () => (
  <form className="space-y-4">
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <FaPhoneAlt className="text-amber-600" />
        Phone number
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value="+91"
          readOnly
          className="w-20 px-3 py-3 rounded-xl border border-amber-100 bg-amber-50 text-gray-700"
        />
        <input
          type="tel"
          placeholder="98765 43210"
          className="flex-1 px-4 py-3 rounded-xl border border-amber-100 bg-amber-50 focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none transition"
          required
        />
      </div>
    </div>
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">OTP</label>
      <input
        type="text"
        placeholder="Enter 6-digit code"
        className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50 focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none transition"
      />
      <div className="text-xs text-gray-500">We’ll send an OTP to your phone number.</div>
    </div>
    <div className="flex gap-2">
      <button
        type="button"
        className="flex-1 py-3 rounded-xl bg-white border border-amber-200 text-amber-800 font-semibold hover:bg-amber-50 transition"
      >
        Send OTP
      </button>
      <button
        type="submit"
        className="flex-1 py-3 rounded-xl bg-linear-to-r from-amber-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
      >
        Verify & Continue
      </button>
    </div>
  </form>
);