// components/Button.js
import React from "react";
import { Button as RadixButton } from "@radix-ui/themes";

export default function Button({
  children,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) {
  return (
    <RadixButton disabled={disabled || loading} {...props}>
      {loading ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
          style={{ marginRight: 6 }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M22 12a10 10 0 0 1-10 10"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      ) : leftIcon ? (
        <span style={{ marginRight: 6 }}>{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {rightIcon ? <span style={{ marginLeft: 6 }}>{rightIcon}</span> : null}
    </RadixButton>
  );
}

// Usage:
// <Button variant="solid" color="indigo">Click Me</Button>
// <Button loading>Loading...</Button>
// <Button leftIcon={<Icon />}>Save</Button>
