import "./StatusBadge.scss";

export default function StatusBadge({ status = "ready" }) {
  const normalized = status.toLowerCase();

  const validStatuses = ["ready", "incomplete", "submitted", "accepted"];
  const safeStatus = validStatuses.includes(normalized)
    ? normalized
    : "ready";

  return (
    <span
      className={`status-badge status-badge--${safeStatus}`}
      data-status={safeStatus}
    >
      {safeStatus}
    </span>
  );
}
