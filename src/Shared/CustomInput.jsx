import React, { useState } from "react";
const CustomInput = (props) => {
  const [focused, setFocused] = useState(false);
  const {
    label,
    onChange,
    value,
    requireField,
    isChecked,
    errorMsg,
    rdo,
    ...inputProps
  } = props;
  return (
    <>
      <label>{label}</label>
      <input
        onChange={onChange}
        value={value}
        checked={isChecked}
        {...inputProps}
        autoComplete="on"
        onBlur={() => {
          setFocused(true);
        }}
        focused={focused.toString()}
      />
      {value === ""? (
        <span className="requireMsg"> {requireField}</span>
      ) : null}
      <span className="errorMsg">{errorMsg}</span>
    </>
  );
};

export default CustomInput;
