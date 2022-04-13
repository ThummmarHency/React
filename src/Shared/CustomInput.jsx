import React, { useState} from "react";
const CustomInput = (props) => {
  const [focused, setFocused] = useState(false);
  const {
    label,
    onChange,
    value,
    pattern,
    requireField,
    isChecked,
    errorMsg,
    ...inputProps
  } = props;

  return (
    <>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        value={value}
        checked={isChecked}
        autoComplete="on"
        onBlur={() => setFocused(true)}
        focused={focused.toString()}
      />
     
      {(value === "" )? (
        <span className="requireMsg"> {requireField}</span>
       ) : null} 
      {pattern && (pattern.test(value)===false && value!=="" && focused===true) && <span className="errorMsg">{errorMsg}</span>}
    </>
  );
};

export default CustomInput;
