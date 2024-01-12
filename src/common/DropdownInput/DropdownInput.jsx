import React, { useState, useEffect, useRef } from "react";
import "./DropdownInput.css";

export const DropdownInput = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    value || (options.length > 0 ? options[0].symbol : "")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const optionsListRef = useRef();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
    onChange(selectedValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClickOutside = (event) => {
    if (optionsListRef.current && !optionsListRef.current.contains(event.target)) {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(value || (options.length > 0 ? options[0].symbol : ""));
  }, [value, options]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dropdown-input" ref={optionsListRef}>
      <div className="selected-option" onClick={handleToggle}>
        {selectedOption && (
          <img
            src={options.find((option) => option.symbol === selectedOption)?.image}
            alt={selectedOption}
            style={{ width: "20px", marginRight: "5px" }}
          />
        )}
        {selectedOption ? options.find((option) => option.symbol === selectedOption)?.name : "Seleccionar moneda"}
      </div>

      {isOpen && (
        <div className="options-list">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredOptions.map((option) => (
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
