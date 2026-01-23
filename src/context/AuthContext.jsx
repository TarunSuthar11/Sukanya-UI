import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../service/axios.js";
import { useUser, useLogin, useLogout, useGoogleLoginMutation } from "../hooks/useAuthHooks";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading: loading, refetch } = useUser();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const googleLoginMutation = useGoogleLoginMutation();

  const login = async (payload) => {
    const res = await loginMutation.mutateAsync(payload);
    return res;
  };

  const googleLogin = async (code) => {
    const res = await googleLoginMutation.mutateAsync(code);
    return res;
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const updateUser = (updatedData) => {
    // This could also be a mutation in a real app
    // For now, let's just refetch to get the latest data from server
    refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        googleLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};