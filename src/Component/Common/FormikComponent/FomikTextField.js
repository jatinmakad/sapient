import { TextField } from "@mui/material";
import React from "react";

const FomikTextField = ({ heading, value, name, handleChange,error,helperText,type }) => {
  return (
    <div className="flex flex-col justify-start">
      <p className="text-sm mb-2">{heading}</p>
      <TextField
        fullWidth
        placeholder={heading}
        name={name}
        type={type}
        value={value}
        size="small"
        // value={formik.values.email}
        onChange={handleChange}
        error={error}
        helperText={helperText}
      />
    </div>
  );
};

export default FomikTextField;
