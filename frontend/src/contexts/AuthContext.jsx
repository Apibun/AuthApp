import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:44360/api/account/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("User Not authenticated");
        return res.json();
      })
      .then((data) => {
        setUser({ username: data.user_name, roles: data.roles });
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (username, password) => {
    return fetch("https://localhost:44360/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
      })
      .then((data) => {
        console.log("Login response:", data);
        setUser({ username: data.user_name, roles: data.roles });
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ login, user, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
