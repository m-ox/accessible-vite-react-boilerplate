import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";

export default function Layout({ children }) {
  const { theme } = useTheme();

  return (
    <div className={`layout ${theme}`}>
      <Navbar />
      <main className="layout-content">{children}</main>
      <footer className="layout-footer">
        <div>© {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
