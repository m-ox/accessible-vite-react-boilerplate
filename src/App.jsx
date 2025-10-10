import React, { useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { OktaProvider } from "./context/OktaContext";
import Layout from "./layout/Layout";
import AuthenticatedLayout from "./layout/AuthenticatedLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Theme as RadixTheme } from "@radix-ui/themes";
import NotificationProvider from "./NotificationProvider/NotificationProvider";

function AppContent() {
  const { theme } = useTheme();

  return (
    <RadixTheme appearance={theme} grayColor="sand" radius="medium">
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Layout><Login /></Layout>} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login/callback"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </RadixTheme>
  );
}

export default function App() {
  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== "undefined") {
      import("@axe-core/react").then(({ default: axe }) => {
        axe(React, ReactDOM, 1000);
      });
    }
  }, []);

  return (
    <Router>
      <OktaProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </AuthProvider>
      </OktaProvider>
    </Router>
  );
}
