"use client";

import { useState } from "react";
import styled from "styled-components";

const SelectBox = styled.select`
  background-color: transparent;
  width: 100%;
  border: 1px solid var(--color-light-gray);
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 4px var(--color-secondary);
  }
`;

const Option = styled.option`
  background-color: white;
  color: black;
`;

interface Item {
  label: string;
  value: string | number;
}

interface SelectProps {
  ariaLabel: string;
  items: Item[];
  onChange: (selectedValue: string | number) => void;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  disabled,
  onChange,
  items,
  ariaLabel,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedItem(newValue);
    onChange(newValue); // Emit the selected value
  };

  return (
    <SelectBox
      value={selectedItem}
      onChange={handleChange}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {items?.map((item) => (
        <Option value={item.value} key={item.label}>
          {item.label}
        </Option>
      ))}
    </SelectBox>
  );
};

export default Select;
