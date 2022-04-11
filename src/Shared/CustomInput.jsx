import React, { useState,useEffect } from "react";
const CustomInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [isError,setIsError]=useState(false)
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
//  useEffect(() => {
//   setIsError((pattern.test(value)===false && value!=="" && focused===true)?true:false)
//  },[focused])
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
      {/* { isError } */}
    </>
  );
};

export default CustomInput;
