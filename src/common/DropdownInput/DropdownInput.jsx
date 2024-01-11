import React from "react";

export const DropdownInput = ({ value, onChange, options }) => (
  <select value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option.symbol} value={option.symbol}>
        <img src={option.image} alt={option.name} style={{ width: "20px", marginRight: "5px" }} />
        {option.name}
      </option>
    ))}
  </select>
);
