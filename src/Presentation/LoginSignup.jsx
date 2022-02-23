import React from "react";
import CustomButton from "../Shared/CustomButton";
import CustomInput from "../Shared/CustomInput";
import attribute from "../Shared/Reuse";

const LoginSignup = ({ Login, onChange, obj,value1}) => {
  return (
    <div>
      <div>
        {    
          <div>
            {console.log(typeof obj,obj)}
            <form onSubmit={Login}>
              {Object.values(attribute).map((att, index) => {
                return  obj? (
                  <CustomInput
                    key={index}
                    label={att.label}
                    name={att.name}
                    type={att.type}
                    placeholder={att.placeholder}
                    onChange={onChange}
                  />
                ) : null;
              })}
              {<br /> }
              {<CustomButton type="submit" value={value1} obj={obj}/>}
            </form>
          </div>
        }
      </div>
    </div>
  );
};

export default LoginSignup;
