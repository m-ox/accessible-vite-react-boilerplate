import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Login from "../../src/pages/Login/Login";

// --- Mock router ---
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// --- Mock framer-motion ---
// Strip out motion-only props (like whileTap) so React stops warning
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => {
      const { whileTap, initial, animate, transition, ...safeProps } = props;
      return <div {...safeProps}>{children}</div>;
    },
    button: ({ children, ...props }) => {
      const { whileTap, initial, animate, transition, ...safeProps } = props;
      return <button {...safeProps}>{children}</button>;
    },
  },
}));

// --- Mock Radix icons ---
vi.mock("@radix-ui/react-icons", () => ({
  LockClosedIcon: () => <svg data-testid="lock-icon" />,
}));

// --- Context mocks ---
const mockLogin = vi.fn();
const mockLoginWithRedirect = vi.fn();
let mockAuthContext = {
  user: null,
  login: mockLogin,
  isLoading: false,
  isAuthenticated: false,
};

// ✅ Must match the actual import paths used in Login.jsx
vi.mock("../../src/context/AuthContext", () => ({
  useAuth: () => mockAuthContext,
}));
vi.mock("../../src/context/OktaContext", () => ({
  useOkta: () => ({ loginWithRedirect: mockLoginWithRedirect }),
}));

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthContext = {
      user: null,
      login: mockLogin,
      isLoading: false,
      isAuthenticated: false,
    };
  });

  it("renders the login form correctly", () => {
    render(<Login />);

    expect(screen.getByTestId("lock-icon")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    // Narrow match: select the *submit* button only
    const signInButton = screen.getByRole("button", {
      name: /^sign in$/i,
    });
    expect(signInButton).toBeDisabled();
  });

  it("enables Sign In button when username and password are filled", () => {
    render(<Login />);
    const username = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);

    const signInButton = screen.getByRole("button", {
      name: /^sign in$/i,
    });

    fireEvent.change(username, { target: { value: "maud" } });
    fireEvent.change(password, { target: { value: "secret" } });

    expect(signInButton).not.toBeDisabled();
  });

  it("calls login and navigates to dashboard on submit", async () => {
    render(<Login />);
    const username = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    const signInButton = screen.getByRole("button", { name: /^sign in$/i });

    fireEvent.change(username, { target: { value: "Maud" } });
    fireEvent.change(password, { target: { value: "hunter2" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("Maud", "hunter2");
    });
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("calls loginWithRedirect when Okta button clicked", () => {
    render(<Login />);
    const oktaButton = screen.getByRole("button", { name: /sign in with okta/i });
    fireEvent.click(oktaButton);
    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });

  it("redirects to dashboard if already authenticated", async () => {
    mockAuthContext = {
      user: { name: "Maud" },
      login: mockLogin,
      isLoading: false,
      isAuthenticated: true,
    };

    render(<Login />);
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true })
    );
  });
});
