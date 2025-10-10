import React from "react";

const RadioButtonField = ({ field }) => {
  const {
    fieldId,
    label,
    enabled = true,
    value = "",
    description,
    name, // optional shared group name
    required = false,
  } = field;

  const groupName = name || fieldId;

  return (
    <div className="form-field radio">
      <div className="form-field__wrapper">
        <input
          type="radio"
          id={fieldId}
          name={groupName}
          value={value}
          disabled={!enabled}
          aria-disabled={!enabled}
          aria-required={required}
          aria-describedby={description ? `${fieldId}-desc` : undefined}
        />
        <label htmlFor={fieldId}>{label}</label>
      </div>
      {description && (
        <p id={`${fieldId}-desc`} className="form-field__description">
          {description}
        </p>
      )}
    </div>
  );
};

export default RadioButtonField;
