import React from "react";

const TextAreaField = ({ field }) => {
  const {
    fieldId,
    label,
    enabled = true,
    value = "",
    description,
    required = false,
    placeholder,
  } = field;

  return (
    <div className="form-field textarea">
      {label && (
        <label htmlFor={fieldId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <textarea
        id={fieldId}
        name={fieldId}
        placeholder={placeholder || ""}
        required={required}
        disabled={!enabled}
        defaultValue={value}
        aria-required={required}
        aria-disabled={!enabled}
        aria-describedby={description ? `${fieldId}-desc` : undefined}
        rows={field.rows || 4}
      />
      {description && (
        <p id={`${fieldId}-desc`} className="form-field__description">
          {description}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;
