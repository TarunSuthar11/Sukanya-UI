import { createContext, useState, useEffect } from "react";
import { api } from "../service/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mock user for development purposes
  const [user, setUser] = useState({
    id: "user-123",
    firstName: "Tarun",
    lastName: "Suthar",
    email: "tarun@example.com",
    phone: "+91 98765 43210",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tarun"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In production, we would fetch the user here
    // For now, we use the mock user
    setLoading(false);
  }, []);

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };