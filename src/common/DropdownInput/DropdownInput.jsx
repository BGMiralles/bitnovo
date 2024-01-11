import React, { useState } from "react";

export const DropdownInput = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-input">
      <div className="selected-option" onClick={handleToggle}>
        {value && (
          <img
            src={options.find((option) => option.symbol === value)?.image}
            alt={value}
            style={{ width: "20px", marginRight: "5px" }}
          />
        )}
        {value || "Seleccionar moneda"}
      </div>

      {isOpen && (
        <div className="options-list">
          {options.map((option) => (
            <div
              key={option.symbol}
              className="option"
              onClick={() => handleSelect(option.symbol)}
            >
              <img
                src={option.image}
                alt={option.name}
                style={{ width: "20px", marginRight: "5px" }}
              />
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
