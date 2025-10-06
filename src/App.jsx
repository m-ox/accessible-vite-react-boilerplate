import React, { useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { useTheme } from "./context/ThemeContext";
import { Layout } from "./layout/Layout";
import Home from "./pages/Home/Home";
import { Theme as RadixTheme } from "@radix-ui/themes";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== "undefined") {
      import("@axe-core/react").then(({ default: axe }) => {
        axe(React, ReactDOM, 1000);
      });
    }
  }, []);

  return (
    <RadixTheme appearance={theme} accentColor="indigo" grayColor="sand" radius="medium">
      <Layout>
        <Home />
      </Layout>
    </RadixTheme>
  );
}

export default App;
