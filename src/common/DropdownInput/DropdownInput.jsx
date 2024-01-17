import React, { useState, useEffect, useRef } from "react";
import "./DropdownInput.css";

export const DropdownInput = ({ value, onChange, options, isOpen, onToggle }) => {
  const [selectedOption, setSelectedOption] = useState(
    value || (options.length > 0 ? options[0].symbol : "")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const optionsListRef = useRef();

  const handleSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
    onChange(selectedValue);
    setSearchTerm("");
  };

  const handleSearchClick = (event) => {
    event.stopPropagation();
  };

  const handleClickOutside = (event) => {
    if (
      optionsListRef.current &&
      !optionsListRef.current.contains(event.target)
    ) {
      onToggle(false);
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
      <div className="selected-option" onClick={() => onToggle(!isOpen)}>
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
            onClick={handleSearchClick}
          />
          {filteredOptions.map((option) => (
            <div
              key={option.symbol}
              className={`option ${selectedOption === option.symbol ? "selected" : ""}`}
              onClick={() => {
                handleSelect(option.symbol);
                onToggle(false);
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={option.image}
                    alt={option.name}
                    style={{ width: "20px", marginRight: "5px" }}
                  />
                  <span>{option.name}</span>
                </div>
                {selectedOption === option.symbol && (
                  <img
                    src="../../src/img/tick.JPG" 
                    alt="Checkmark"
                    style={{ width: "16px", height: "16px", marginLeft: "auto"}}
                  />
                )}
                {selectedOption !== option.symbol && <span style={{ marginLeft: "auto" }}>&gt;</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
