import React from "react";
import Select, { components } from "react-select";
import { ReactComponent as CaretDown } from "../../Icons/caret-down.svg";

interface SelectProps {
  onChange: (option: string) => void;
  className: string;
}

const Categories = [
  "All",
  "Fundamentals",
  "Processing Times",
  "Politics & Policy",
  "Legal Drama",
  "Fraud",
  "Global Market",
  "Commentary",
];

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2d3a4f" : "#1e2735",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    boxShadow: "none",
  }),
};

const CustomSelect: React.FC<SelectProps> = ({ onChange, className }) => {
  const options = Categories.map((c) => {
    return { label: c, value: c };
  });

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDown />
      </components.DropdownIndicator>
    );
  };
  return (
    <Select
      onChange={(val) => {
        if (val) {
          onChange(val.value);
        }
      }}
      styles={customStyles}
      options={options}
      components={{ DropdownIndicator }}
      className={className}
      label="Category"
      defaultValue={{ value: "All", label: "All" }}
    />
  );
};

export default CustomSelect;
