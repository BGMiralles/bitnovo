import React from "react";
import "./CustomInput.css";

export const CustomInput = ({ design, type, name, placeholder, value, functionProp, functionBlur, errorMessage }) => {
  return (
    <div className={design}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={functionProp}
        onBlur={functionBlur}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};
