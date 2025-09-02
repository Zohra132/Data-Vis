import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");     //If page reloads- check localStorage for token
    if (token) {
      setUser({ token }); // You could decode the token here to get username, etc.
    }
  }, []);

  const saveLogin = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
