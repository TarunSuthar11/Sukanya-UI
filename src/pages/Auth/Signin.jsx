import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleLogin from "../../components/Auth/GoogleLogin";
import { SigninWrapper } from "../../utils/googleAuthProvider";
import { useAuth } from "../../context/AuthContext";

const tabs = [
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" }
];

export default function Signin() {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-[#FAF9F6]">
      {/* Subtle Background Pattern/Texture could go here */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/silk.png')]"></div>

      <div className="w-full max-w-md relative">
        {/* Logo/Brand Header */}
        <div className="text-center mb-6">
          {/* <h1 className="text-4xl font-serif text-primary-900 mb-2">Sukanya</h1> */}
           <h2 className="text-4xl tracking-wider font-bold text-primary-700 mb-2">
              Sukanya
            </h2>
          <p className="text-neutral-500 font-light tracking-widest uppercase text-[10px]">Pure Elegance • Timeless Heritage</p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-neutral-100 p-8 md:p-10">
          <div className="mb-8">
            <p className="text-md  text-center text-neutral-500 mb-1">WELCOME BACK</p>
            <p className="text-sm text-center text-neutral-400">Please enter your credentials to access your account.</p>
          </div>

          {/* Refined Tabs */}
          <div className="flex border-b border-neutral-100 mb-8 gap-10 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 px-6 text-sm font-medium transition-all relative ${activeTab === tab.key
                  ? "text-primary-700"
                  : "text-neutral-400 hover:text-neutral-600"
                  }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 animate-in fade-in slide-in-from-left-2" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "email" ? <EmailForm /> : <PhoneForm />}

          <div className="relative my-8 text-center">
            <span className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-100"></span>
            </span>
            <span className="relative bg-white px-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium">Or Sign In with</span>
          </div>

          <div className="grid grid-cols-1 gap-4">

            <SigninWrapper>
              <GoogleLogin />
            </SigninWrapper>

            <button className="flex items-center justify-center gap-2 py-3 bg-[#1877f2] text-white rounded-lg hover:bg-[#1864f2] transition-colors shadow-sm">
              <FaFacebookF className="text-base" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-neutral-500">
              New to Sukanya?{" "}
              <Link to="/signup" className="text-primary-700 font-semibold hover:underline decoration-primary-200 underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/shop" className="text-xs text-neutral-400 hover:text-primary-600 transition-colors">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}


const EmailForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(formData);
      navigate("/shop");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
      {error && <p className="text-red-500 text-xs text-center">{error}</p>}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Email Address <span className="text-red-500">*</span></label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="example@gmail.com"
          className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
          required
        />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Password <span className="text-red-500">*</span></label>
          <Link to="#" className="text-[10px] uppercase tracking-widest text-primary-600 font-bold hover:text-primary-800">Forgot?</Link>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-primary-600 transition-colors"
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 py-1">
        <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-700" />
        <label htmlFor="remember" className="text-xs text-neutral-500 cursor-pointer">Stay signed in</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/10 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

const PhoneForm = () => (
  <form className="space-y-6 animate-in fade-in duration-500">
    <div className="space-y-1">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Phone Number</label>
      <div className="flex gap-4">
        <span className="py-2.5 text-neutral-400 border-b border-neutral-200">+91</span>
        <input
          type="tel"
          placeholder="98765 43210"
          className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
          required
        />
      </div>
    </div>

    <div className="space-y-1">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Verification Code</label>
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300 tracking-widest"
      />
      <p className="text-[10px] text-neutral-400 pt-1">We'll send a code to your mobile number.</p>
    </div>

    <div className="flex gap-3 pt-2">
      <button
        type="button"
        className="flex-1 py-3 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-600 hover:border-primary-500 hover:text-primary-600 transition-colors"
      >
        Send OTP
      </button>
      <button
        type="submit"
        className="flex-1 py-3 bg-primary-600 text-white rounded-lg text-xs font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-900/10"
      >
        Verify Code
      </button>
    </div>
  </form>
);