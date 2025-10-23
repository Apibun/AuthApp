import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    return fetch("https://localhost:44360/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login response:", data);
        setUser({ username: data.username, roles: data.roles });
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ login, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
