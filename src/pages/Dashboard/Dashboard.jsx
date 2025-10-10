import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { useAuth } from "../../context/AuthContext";
import { ReloadIcon } from "@radix-ui/react-icons";
import "./Dashboard.scss";

export default function Dashboard() {
  const [username, setUsername] = useState(null);
  const { lastUpdated } = useStore();
  const { user, isAuthenticated } = useAuth();
  
  const doSomething = async () => {
    // Placeholder for actual refresh logic
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const handleRefresh = async () => {
    try {
      await doSomething();
    } catch (err) {
      console.error("Refresh failed:", err);
    }
  };

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, pair) => {
      const [k, v] = pair.split("=");
      acc[k] = decodeURIComponent(v || "");
      return acc;
    }, {});

    const storedUser =
      cookies.pref_userName || localStorage.getItem("userName");

    if (storedUser) {
      setUsername(storedUser);
    } else if (user?.name && isAuthenticated) {
      setUsername(user.name);
    }
  }, [user, isAuthenticated]);

  return (
    <div className="dashboard">
      <div className="dashboard__header-row">
        <div className="dashboard__header-left">
          <h1 className="dashboard__header">
            {username
              ? `Welcome back, ${username}.`
              : "Welcome to your Dashboard"}
          </h1>
        </div>

        <div className="dashboard__header-right">
          <div className="dashboard__refresh-container">
            <p className="dashboard__last-updated">
              {lastUpdated
                ? `Last updated: ${new Date(lastUpdated).toLocaleString()}`
                : "No data fetched yet"}
            </p>
            <button
              onClick={handleRefresh}
              className="dashboard__refresh-btn"
              title="Refresh data"
              aria-label="Refresh data"
            >
              <ReloadIcon className="dashboard__refresh-icon" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
