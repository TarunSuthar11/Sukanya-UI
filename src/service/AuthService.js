
import { api } from "./axios.js";

export const loginService = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    return res.data;
};

export const registerService = async (userData) => {
    const res = await api.post("/auth/register", userData);
    return res.data;
};

export const logoutService = async () => {
    const res = await api.post("/auth/logout");
    return res.data;
};

export const getMeService = async () => {
    const res = await api.get("/auth/me");
    return res.data;
};

export const updateProfileService = async (userData) => {
    const res = await api.patch("/auth/update-account-details", userData);
    return res.data;
};

export const updateAvatarService = async (formData) => {
    const res = await api.patch("/auth/update-avatar", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};

export const googleLoginService = async (code) => {
    try {
        const res = await api.post("/auth/google-login", {
            code,
        });
        return res.data;
    } catch (error) {
        console.error(
            "Google login error:",
            error.response?.data || error.message
        );
        throw error;
    }
};
