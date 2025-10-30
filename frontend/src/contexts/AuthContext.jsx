import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = () => {
    return fetch("https://localhost:44360/api/account/profile", {
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
  };

  useEffect(() => {
    fetchProfile();
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
      .then(async () => {
        setIsAuthenticated(true);
        await fetchProfile();
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setUser(null);
        setIsAuthenticated(false);
      });
  };

  const logout = () => {
    return fetch("https://localhost:44360/api/account/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Logout failed");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((eror) => {
        console.error("Error during logout:", eror);
      });
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isAuthenticated, loading, fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
