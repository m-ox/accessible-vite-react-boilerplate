import React from "react";

const CheckboxField = ({ field }) => {
  const {
    fieldId,
    label,
    enabled = true,
    value = false,
    description,
  } = field;

  // Always ensure an accessible label exists
  const accessibleLabel =
    label || `Checkbox field ${fieldId}`;

  return (
    <div className="form-field checkbox">
      <div className="form-field__wrapper">
        <input
          type="checkbox"
          id={fieldId}
          name={fieldId}
          disabled={!enabled}
          defaultChecked={value}
          aria-checked={value}
          aria-describedby={description ? `${fieldId}-desc` : undefined}
          // Fallback accessible name if no visible label
          aria-label={!label ? accessibleLabel : undefined}
        />
        {label && <label htmlFor={fieldId}>{label}</label>}
      </div>

      {description && (
        <p id={`${fieldId}-desc`} className="form-field__description">
          {description}
        </p>
      )}
    </div>
  );
};

export default CheckboxField;
