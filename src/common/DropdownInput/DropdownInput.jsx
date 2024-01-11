import React from "react";

export const DropdownInput = ({ value, onChange, options }) => (
  <select value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
