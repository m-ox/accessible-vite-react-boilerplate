import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../store/useStore";
import "./BreadBar.scss";

export default function BreadBar() {
  const location = useLocation();
  const { pathname } = location;
  const { formBatches } = useStore();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const items = [];

    // Always include Dashboard first
    items.push(
      <Link key="dashboard" to="/dashboard" className="breadcrumb-link">
        Dashboard
      </Link>
    );

    if (segments.length === 0) return items;

    // Detect context when viewing a specific form
    const isViewingForm = segments.includes("view");
    let formContext = "pending"; // default fallback

    if (isViewingForm) {
      const currentId = segments[segments.length - 1];
      const foundForm = formBatches.find((b) => b.id === currentId);
      if (foundForm?.status === "completed") formContext = "completed";
      else if (foundForm?.status === "pending") formContext = "pending";
    } else {
      // Fallback to URL check if not viewing a form
      formContext = pathname.includes("/forms/completed")
        ? "completed"
        : "pending";
    }

    // Build breadcrumbs
    segments.forEach((segment, i) => {
      const isLast = i === segments.length - 1;

      // Skip base "forms" segment
      if (segment.toLowerCase() === "forms") return;

      let href = "/" + segments.slice(0, i + 1).join("/");

      // Special handling for "view"
      if (segment === "view") href = `/forms/${formContext}`;

      // Display labels cleanly
      const label = decodeURIComponent(segment)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      if (isLast) {
        items.push(
          <span key={`crumb-${href}`} className="breadcrumb-current">
            {label}
          </span>
        );
      } else {
        items.push(
          <Link key={`crumb-${href}`} to={href} className="breadcrumb-link">
            {label === "View" ? "Forms" : label}
          </Link>
        );
      }
    });

    return items;
  }, [pathname, formBatches]);

  // Hide breadcrumbs on dashboard or root
  if (pathname === "/dashboard" || pathname === "/") return null;

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      {breadcrumbs.map((item, i) => (
        <React.Fragment key={i}>
          {item}
          {i < breadcrumbs.length - 1 && (
            <span className="breadcrumb-separator">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
