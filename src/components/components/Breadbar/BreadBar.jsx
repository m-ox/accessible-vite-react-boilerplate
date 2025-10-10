import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./BreadBar.scss";

export default function BreadBar() {
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return [];

    const items = [
      <Link key="dashboard" to="/dashboard" className="breadcrumb-link">
        Dashboard
      </Link>,
    ];

    segments.forEach((segment, i) => {
      const isLast = i === segments.length - 1;
      const href = "/" + segments.slice(0, i + 1).join("/");

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
            {label}
          </Link>
        );
      }
    });

    return items;
  }, [pathname]);

  // Hide breadcrumbs on dashboard or root
  if (pathname === "/" || pathname === "/dashboard") return null;

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
