import { MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const FormikDropdown = ({
  heading,
  value,
  name,
  handleChange,
  error,
  helperText,
  type,
  data
}) => {
  return (
    <div className="flex flex-col justify-start">
      <p className="text-sm mb-2">{heading}</p>
      <Select
        fullWidth
        placeholder={heading}
        name={name}
        type={type}
        size="small"
        onChange={handleChange}
        error={error}
        value={value}
        helperText={helperText}
      >
        {data && data.map((r) => {
          return <MenuItem key={r.value} value={r.value}>{r.value}</MenuItem>;
        })}
      </Select>
    </div>
  );
};

export default FormikDropdown;
