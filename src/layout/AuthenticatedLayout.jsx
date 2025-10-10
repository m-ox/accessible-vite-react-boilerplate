import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { useAuth } from "../context/AuthContext";
import BreadBar from "../components/Breadbar/BreadBar"
import Layout from "./Layout";

export default function AuthenticatedLayout({ children }) {
  const { isAuthenticated } = useAuth();

  const doSomething = async () => {
    // Placeholder for actual refresh logic
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  useEffect(() => {
    if (isAuthenticated) {
      doSomething();
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <BreadBar />
      {children}
    </Layout>
  )
}
