import React from "react";
import "./FormStatusBadge.scss";

export default function FormStatusBadge({ status = "ready" }) {
  const normalized = status.toLowerCase();

  const validStatuses = ["ready", "incomplete", "submitted", "accepted"];
  const safeStatus = validStatuses.includes(normalized)
    ? normalized
    : "ready";

  return (
    <span
      className={`form-status-badge form-status-badge--${safeStatus}`}
      data-status={safeStatus}
    >
      {safeStatus}
    </span>
  );
}
