import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import "./Spinner.scss";

function px(size) {
  if (typeof size === "number") return `${size}px`;
  switch (size) {
    case "sm": return "16px";
    case "lg": return "32px";
    default: return "20px";
  }
}

export default function Spinner({
  size = "md",
  label = "Loading...",
  overlay = false,
  className = "",
  ...rest
}) {
  const style = { "--spinner-size": px(size) };

  const circle = (
    <span
      role="status"
      aria-live="polite"
      className={`spinner ${className}`}
      style={style}
      {...rest}
    >
      <span className="spinner__circle" />
      <VisuallyHidden.Root>{label}</VisuallyHidden.Root>
    </span>
  );

  if (!overlay) return circle;

  return (
    <div className="spinner__overlay" aria-busy="true">
      {circle}
    </div>
  );
}
