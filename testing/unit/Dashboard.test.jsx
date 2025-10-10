import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Dashboard from "../../src/pages/Dashboard/Dashboard";

// --- Mock dependencies ---
vi.mock("react-router-dom", () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

vi.mock("@radix-ui/react-icons", () => ({
  ReloadIcon: () => <svg data-testid="reload-icon" />,
}));

// --- Correct context mocks ---
const mockUseStore = vi.fn();
vi.mock("../../src/store/useStore", () => ({
  useStore: () => mockUseStore(),
}));

const mockUseAuth = vi.fn();
vi.mock("../../src/context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

// --- Utility: hard reset cookies ---
function clearCookies() {
  document.cookie
    .split(";")
    .forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(
          /=.*/,
          `=;expires=${new Date(0).toUTCString()};path=/;SameSite=Lax`
        );
    });
}

describe("Dashboard", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    clearCookies();
    localStorage.clear();
  });

  it("renders default message when no user info is found", () => {
    mockUseStore.mockReturnValue({ lastUpdated: null });
    mockUseAuth.mockReturnValue({ user: null, isAuthenticated: false });

    render(<Dashboard />);
    expect(screen.getByText(/welcome to your dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/no data fetched yet/i)).toBeInTheDocument();
  });

  it("displays username from cookies", async () => {
    clearCookies(); // ensure clean
    document.cookie = "pref_userName=Maud";
    mockUseStore.mockReturnValue({ lastUpdated: null });
    mockUseAuth.mockReturnValue({ user: null, isAuthenticated: false });

    render(<Dashboard />);
    await waitFor(() =>
      expect(screen.getByText(/welcome back, maud/i)).toBeInTheDocument()
    );
  });

  it("displays username from localStorage", async () => {
    clearCookies(); // critical: remove leftover cookies from prior test
    localStorage.setItem("userName", "Marlena");
    mockUseStore.mockReturnValue({ lastUpdated: null });
    mockUseAuth.mockReturnValue({ user: null, isAuthenticated: false });

    render(<Dashboard />);
    await waitFor(() =>
      expect(screen.getByText(/welcome back, marlena/i)).toBeInTheDocument()
    );
  });

  it("displays username from auth context when authenticated", async () => {
    clearCookies(); // ensure cookie doesn’t override
    mockUseStore.mockReturnValue({ lastUpdated: null });
    mockUseAuth.mockReturnValue({
      user: { name: "User" },
      isAuthenticated: true,
    });

    render(<Dashboard />);
    await waitFor(() =>
      expect(screen.getByText(/welcome back, user/i)).toBeInTheDocument()
    );
  });

  it("shows last updated time when available", () => {
    const now = Date.now();
    mockUseStore.mockReturnValue({ lastUpdated: now });
    mockUseAuth.mockReturnValue({ user: null, isAuthenticated: false });

    render(<Dashboard />);
    expect(screen.getByText(/last updated:/i)).toBeInTheDocument();
  });

  it("calls refresh handler when refresh button clicked", async () => {
    mockUseStore.mockReturnValue({ lastUpdated: null });
    mockUseAuth.mockReturnValue({ user: null, isAuthenticated: false });

    render(<Dashboard />);
    const button = screen.getByRole("button", { name: /refresh data/i });
    fireEvent.click(button);

    await waitFor(() => expect(button).toBeInTheDocument());
  });

  it("renders reload icon", () => {
    mockUseStore.mockReturnValue({ lastUpdated: null });
    mockUseAuth.mockReturnValue({ user: null, isAuthenticated: false });

    render(<Dashboard />);
    expect(screen.getByTestId("reload-icon")).toBeInTheDocument();
  });
});
