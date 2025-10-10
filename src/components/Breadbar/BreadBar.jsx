import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./BreadBar.scss";

/**
 * Generic breadcrumb bar that converts the current pathname into navigable links.
 * Example: /dashboard/forms/view/123 → Dashboard / Forms / View / 123
 */
export default function BreadBar() {
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return [];

    return segments.map((segment, i) => {
      const href = "/" + segments.slice(0, i + 1).join("/");
      const isLast = i === segments.length - 1;

      const label = decodeURIComponent(segment)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return isLast ? (
        <span key={href} className="breadcrumb-current">
          {label}
        </span>
      ) : (
        <Link key={href} to={href} className="breadcrumb-link">
          {label}
        </Link>
      );
    });
  }, [pathname]);

  // Hide breadcrumbs on root
  if (pathname === "/" || pathname === "/dashboard") return null;

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      {/* Always include Dashboard as first link */}
      <Link to="/dashboard" className="breadcrumb-link">
        Dashboard
      </Link>
      {breadcrumbs.length > 0 && <span className="breadcrumb-separator">/</span>}
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
