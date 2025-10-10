import React from "react";

const InputField = ({ field, type }) => {
  const {
    fieldId,
    label,
    required = false,
    enabled = true,
    value = "",
    description,
    placeholder,
  } = field;

  // Provide fallback accessible name if label missing
  const accessibleLabel =
    label || placeholder || `Input field ${fieldId}`;

  return (
    <div className="form-field">
      {label ? (
        <label htmlFor={fieldId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      ) : null}

      <input
        id={fieldId}
        name={fieldId}
        type={type}
        placeholder={placeholder || ""}
        required={required}
        disabled={!enabled}
        defaultValue={value}
        aria-required={required}
        aria-disabled={!enabled}
        aria-describedby={description ? `${fieldId}-desc` : undefined}
        // Provide explicit accessible name if no visible label
        aria-label={!label ? accessibleLabel : undefined}
      />

      {description && (
        <p id={`${fieldId}-desc`} className="form-field__description">
          {description}
        </p>
      )}
    </div>
  );
};

export default InputField;
