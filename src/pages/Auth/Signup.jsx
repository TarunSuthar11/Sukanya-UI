import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function Signup() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-[#FAF9F6]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/silk.png')]"></div>

            <div className="w-full max-w-md relative">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif text-primary-900 mb-2">Sukanya</h1>
                    <p className="text-neutral-500 font-light tracking-widest uppercase text-[10px]">Pure Elegance • Timeless Heritage</p>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-neutral-100 p-8 md:p-10">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-serif text-neutral-800 mb-1">Create Account</h2>
                        <p className="text-sm text-neutral-400">Join our community of saree connoisseurs.</p>
                    </div>

                    <form className="space-y-5 animate-in fade-in duration-500">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Full Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Anjali Sharma"
                                className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Email</label>
                                <input
                                    type="email"
                                    placeholder="name@style.com"
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Phone</label>
                                <input
                                    type="tel"
                                    placeholder="+91 98765..."
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Confirm</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-0 py-2.5 border-b border-neutral-200 focus:border-primary-600 bg-transparent outline-none transition-colors text-neutral-800 placeholder:text-neutral-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-4 bg-primary-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition-all shadow-lg shadow-primary-900/10 active:scale-[0.98]"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="relative my-8 text-center">
                        <span className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-100"></span>
                        </span>
                        <span className="relative bg-white px-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium">Or Join with</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                            <FcGoogle className="text-lg" />
                            <span className="text-sm font-medium text-neutral-600">Google</span>
                        </button>
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
