import { createContext, useState, useEffect } from "react";
import * as authApi from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setUser({ username: "(zalogowany)" }); // tymczasowe dane, możesz później pobrać `me()`
    }
  }, [token]);

  const register = async (username, password) => {
    setLoading(true);
    try {
      const res = await authApi.register(username, password);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await authApi.login(username, password);
      if (res.access_token) {
        setToken(res.access_token);
        localStorage.setItem("auth_token", res.access_token);
        setUser({ username });
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
