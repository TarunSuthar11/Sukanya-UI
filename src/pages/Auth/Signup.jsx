import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFacebookF } from "react-icons/fa";
import GoogleLogin from "../../components/Auth/GoogleLogin";
import { SigninWrapper } from "../../utils/googleAuthProvider";
import { useRegister } from "../../hooks/useAuthHooks";

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const registerMutation = useRegister();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await registerMutation.mutateAsync({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });
            navigate("/shop");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-[#FAF9F6]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/silk.png')]"></div>

            <div className="w-full max-w-md relative">
                <div className="text-center mb-6">
                    <h2 className="text-4xl tracking-wider font-bold text-primary-700 mb-2">
                        Sukanya
                    </h2>
                    <p className="text-neutral-500 font-light tracking-widest uppercase text-[10px]">Pure Elegance • Timeless Heritage</p>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-neutral-100 p-8 md:p-10">
                    <div className="mb-8 text-center">
                        <p className="text-xl text-neutral-500 mb-1">CREATE ACCOUNT</p>
                        <p className="text-sm text-neutral-400">Join our community of saree connoisseurs.</p>
                    </div>

                    {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Priya"
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Sharma"
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="9876543210"
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1  gap-5">
                            <div className="space-y-1 relative">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
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
                            <div className="space-y-1 relative">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Confirm</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
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

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/10 active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    <div className="relative my-8 text-center">
                        <span className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-100"></span>
                        </span>
                        <span className="relative bg-white px-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium">Or Join with</span>
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
                            Already have an account?{" "}
                            <Link to="/signin" className="text-primary-700 font-semibold hover:underline decoration-primary-200 underline-offset-4">
                                Sign In
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

