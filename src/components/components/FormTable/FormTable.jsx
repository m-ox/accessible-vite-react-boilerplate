import { useNavigate } from "react-router-dom";
import "./FormTable.scss";

export default function FormTable({ title, headers, rows, onRowClick }) {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    // Log original form/batch data
    if (row?.originalData) {
      // console.log("Original form data:", row.originalData);
    } else {
      console.log("Clicked row:", row);
    }

    // Call optional handler (for logging or side effects)
    if (onRowClick) onRowClick(row);

    // Always navigate to form view afterward
    if (row?.id) navigate(`/forms/view/${row.id}`);
  };

  return (
    <div className="form-table">
      {title && <h2 className="form-table__title">{title}</h2>}

      <table className="form-table__table">
        <thead>
          <tr>
            {rows.some((r) => r.id) && <th>ID</th>}
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length + 1} className="form-table__empty">
                No data available
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={() => handleRowClick(row)}
                className={
                  row.id ? "form-table__row--clickable" : "form-table__row"
                }
                style={row.id ? { cursor: "pointer" } : undefined}
              >
                {row.id && <td className="form-table__id">{row.id}</td>}
                {(row.cells || []).map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
