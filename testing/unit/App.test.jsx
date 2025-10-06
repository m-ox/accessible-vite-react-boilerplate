import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../../src/App";

// Mock ThemeContext
vi.mock("../../src/context/ThemeContext", () => ({
  useTheme: () => ({
    theme: "light",
    toggleTheme: vi.fn(),
  }),
}));

// Mock Radix Theme components used in the app
vi.mock("@radix-ui/themes", () => ({
  Theme: ({ children }) => <div data-mock="radix-theme">{children}</div>,
  Switch: ({ checked, onCheckedChange, ...props }) => (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      mock-switch
    </button>
  ),
  Button: ({ children, ...props }) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));

// Mock axe-core/react
vi.mock("@axe-core/react", () => ({
  default: vi.fn(),
}));

describe("App", () => {
  it("renders layout and home content", () => {
    render(<App />);
    expect(screen.getByText("Is this a form?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument();
  });
});
