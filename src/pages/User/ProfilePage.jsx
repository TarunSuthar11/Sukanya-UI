import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useUpdateUser, useUpdateAvatar } from "../../hooks/useAuthHooks";
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHistory, FaSignOutAlt, FaTimes, FaSave, FaEdit } from "react-icons/fa";

export default function ProfilePage() {
    const { user, logout } = useContext(AuthContext);
    const updateMutation = useUpdateUser();
    const avatarMutation = useUpdateAvatar();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phone: user.phone || ""
            });
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
                <div className="text-center">
                    <h2 className="text-2xl font-serif text-neutral-800 mb-4">You are not logged in</h2>
                    <button className="btn-primary px-8">Sign In</button>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateMutation.mutateAsync({
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const uploadFormData = new FormData();
            uploadFormData.append("avatar", file);
            try {
                await avatarMutation.mutateAsync(uploadFormData);
            } catch (error) {
                console.error("Failed to upload avatar", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-12 px-4 sm:px-6 lg:px-16">
            <div className="max-w-4xl mx-auto">

                {/* Profile Header */}
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-neutral-100 flex flex-col md:flex-row items-center gap-10 mb-8">
                    <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary-50 shadow-xl transition-all duration-500 group-hover:scale-105">
                            <img
                                src={user.avatar || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                                alt={user.firstName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            className="absolute bottom-2 right-2 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all active:scale-95"
                            aria-label="Change Avatar"
                        >
                            <FaCamera size={14} />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                        {avatarMutation.isPending && (
                            <div className="absolute inset-0 bg-white/60 rounded-full flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em]">User Profile</span>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-neutral-500 font-light italic">{user.email}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                            <div className="px-4 py-2 bg-neutral-50 rounded-xl border border-neutral-100 text-[10px] font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                                <FaHistory className="text-primary-400" /> Member since 2024
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Navigation/Quick Links Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-primary-200 hover:bg-primary-50/10 transition-all group">
                            <span className="text-xs font-black text-neutral-800 uppercase tracking-widest flex items-center gap-3">
                                <FaUser className="text-primary-600" /> Account Info
                            </span>
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-primary-200 transition-all group opacity-60 grayscale hover:grayscale-0 hover:opacity-100">
                            <span className="text-xs font-black text-neutral-800 uppercase tracking-widest flex items-center gap-3">
                                <FaMapMarkerAlt className="text-primary-600" /> My Addresses
                            </span>
                        </button>
                        <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-primary-200 transition-all group opacity-60 grayscale hover:grayscale-0 hover:opacity-100">
                            <span className="text-xs font-black text-neutral-800 uppercase tracking-widest flex items-center gap-3">
                                <FaHistory className="text-primary-600" /> Order History
                            </span>
                        </button>
                        <div className="pt-4 border-t border-neutral-100">
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 p-4 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-50 rounded-2xl transition-all"
                            >
                                <FaSignOutAlt /> Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Form Content Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-neutral-100">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-serif font-bold text-neutral-800">Personal Details</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline underline-offset-4"
                                    >
                                        Edit Details
                                    </button>
                                ) : (
                                    <div className="flex gap-4">
                                        <button onClick={() => setIsEditing(false)} className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Cancel</button>
                                        <button onClick={handleSave} className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline underline-offset-4">Save Changes</button>
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                        <FaUser className="text-primary-300" /> First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-3 rounded-xl bg-neutral-50 border border-neutral-100 text-sm font-medium transition-all ${isEditing ? 'focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-300 outline-none' : 'opacity-60 cursor-not-allowed'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-3 rounded-xl bg-neutral-50 border border-neutral-100 text-sm font-medium transition-all ${isEditing ? 'focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-300 outline-none' : 'opacity-60 cursor-not-allowed'}`}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                        <FaEnvelope className="text-primary-300" /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled={true} // Email usually not editable without verification
                                        className="w-full px-5 py-3 rounded-xl bg-neutral-50 border border-neutral-100 text-sm font-medium opacity-60 cursor-not-allowed"
                                    />
                                    <p className="text-[8px] text-neutral-400 italic">Login email cannot be changed for security reasons.</p>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                        <FaPhone className="text-primary-300" /> Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-3 rounded-xl bg-neutral-50 border border-neutral-100 text-sm font-medium transition-all ${isEditing ? 'focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-300 outline-none' : 'opacity-60 cursor-not-allowed'}`}
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="mt-10">
                                    <button
                                        onClick={handleSave}
                                        className="w-full py-4 bg-primary-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-700 shadow-xl shadow-primary-100 transition-all active:scale-95"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
