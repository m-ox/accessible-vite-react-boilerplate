import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import Button from "../Button/Button";
import "./Navbar.scss";

export default function Navbar() {
  const { user, authLogout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <h1 className="navbar__title">Web App</h1>
      </div>

      <div className="navbar__controls">
        {user && (
          <>
            <ThemeToggle />
            <Button
              onClick={authLogout}
              className="navbar__logout dashboard__link"
              aria-label="Logout"
              size="2"
              color="white"
              variant="ghost"
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
