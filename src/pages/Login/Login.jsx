import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useOkta } from "../../context/OktaContext";
import { LockClosedIcon } from "@radix-ui/react-icons";
import "./Login.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, isLoading, isAuthenticated } = useAuth();
  const { loginWithRedirect } = useOkta();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (isAuthenticated || user)) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate("/dashboard");
  };

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="login__card">
        <LockClosedIcon className="login__icon" />
        <h1 className="login__title">Sign In</h1>
        <p className="login__subtitle">Access your forms and dashboard securely</p>

        <form onSubmit={handleSubmit} className="login__form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login__input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login__input"
          />
          <motion.button
            type="submit"
            className="login__btn login__btn--primary"
            whileTap={{ scale: 0.97 }}
            disabled={!username || !password}
          >
            Sign In
          </motion.button>
        </form>

        <div className="login__divider">
          <span>or</span>
        </div>

        <motion.button
          onClick={() => loginWithRedirect()}
          className="login__btn login__btn--okta"
          whileTap={{ scale: 0.97 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="login__okta-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
          Sign in with Okta
        </motion.button>
      </div>
    </motion.div>
  );
}
