import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/Spinner/Spinner";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isDev = import.meta.env.MODE === "development";
  const { isAuthenticated, user: auth0User, isLoading, logout } = useAuth0() ?? {};

  // Accessibility audit (run once, dev only)
  useEffect(() => {
    if (!isDev || typeof window === "undefined") return;
    if (window.__axeRunning) return;
    window.__axeRunning = true;

    (async () => {
      try {
        const axe = (await import("axe-core")).default;
        const results = await axe.run(document);
        if (results.violations.length > 0) {
          console.warn("Accessibility violations:", results.violations);
        }
      } catch (err) {
        console.error("axe-core error:", err);
      } finally {
        window.__axeRunning = false;
      }
    })();
  }, [isDev]);

  // Cookie helpers (still useful if you cache session metadata)
  const setCookie = (name, value) => {
    if (!value) return;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
  };

  const getCookie = (name) => {
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return value ? decodeURIComponent(value.split("=")[1]) : null;
  };

  // Sync Auth0 state
  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && auth0User) {
      setUser({
        id: auth0User.sub,
        name: auth0User.name || auth0User.email || "Auth0 User",
        source: "auth0",
      });
      return;
    }

    // fallback: try cookies/local for already-signed sessions
    const cookieUserId = getCookie("pref_userId");
    const cookieUserName = getCookie("pref_userName");
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    if (cookieUserId && cookieUserName) {
      setUser({
        id: cookieUserId,
        name: cookieUserName,
        source: "cookie",
      });
    } else if (storedUserId && storedUserName) {
      setUser({
        id: storedUserId,
        name: storedUserName,
        source: "local",
      });
    }
  }, [isAuthenticated, auth0User, isLoading]);

  // Logout
  const authLogout = () => {
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    document.cookie =
      "pref_userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "pref_userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (logout) logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isLoading) return <Spinner />;

  return (
    <AuthContext.Provider
      value={{
        user,
        authLogout,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
