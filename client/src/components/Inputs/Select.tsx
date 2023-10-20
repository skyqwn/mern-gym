import React from "react";
import { Control, FieldErrors, useController } from "react-hook-form";
import ReactSelect from "react-select";

interface SelectTypes {
  options: {
    value: string;
    label: string;
  }[];
  control: Control;
  errors: FieldErrors;
  name: string;
}

const Select = ({ options, control, name }: SelectTypes) => {
  const { field } = useController({ name, control });
  return (
    <ReactSelect
      options={options}
      name={field.name}
      onChange={(item: any) => {
        field.onChange(item.value);
      }}
    />
  );
};

export default Select;
