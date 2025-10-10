
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { LockClosedIcon } from "@radix-ui/react-icons";
import "./SignInWithOkta.scss";

export default function SignInWithOkta() {
  const { login } = useAuth();

  return (
    <motion.div
      className="okta-signin"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="okta-signin__card">
        <div className="okta-signin__icon">
          <LockClosedIcon width={32} height={32} />
        </div>
        <h1 className="okta-signin__title">Sign in to your account</h1>
        <p className="okta-signin__subtitle">
          Access your forms, batches, and dashboards securely.
        </p>

        <button
          className="okta-signin__button"
          onClick={() => login("Okta User")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="okta-signin__okta-logo"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
          Sign in with Okta
        </button>
      </div>
    </motion.div>
  );
}
