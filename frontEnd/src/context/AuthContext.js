import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import API_BASE_URL from "../config/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Token refresh function
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        return data.accessToken;
      }
      throw new Error("Token refresh failed");
    } catch (error) {
      logout();
      return null;
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setUser(data.user);
        localStorage.setItem("accessToken", data.accessToken);
        return { success: true };
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
        return {
          success: false,
          error: errorData.error || "Invalid credentials",
        };
      }
    } catch (error) {
      const errorMessage = "Network error. Please check your connection.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      setLoading(false);
    }
  };

  // Check token validity on app load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !user) {
      // Verify token is still valid by making an authenticated request
      fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Token invalid");
        })
        .then((data) => {
          setUser(data.user);
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          setAccessToken(null);
        });
    }
  }, [user]);

  const value = {
    user,
    accessToken,
    loading,
    error,
    login,
    logout,
    refreshAccessToken,
    isAuthenticated: !!accessToken && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
