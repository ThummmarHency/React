import React from "react";
import CustomInput from "../../Shared/CustomInput";
import CustomButton from "../../Shared/CustomButton";

const FormView = ({ handleSubmit, attribute, error,rdo, values, onChange, text }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {attribute && attribute.map((input, index) => {
          return (
            <CustomInput
              key={index}
              {...input}
              Requirefield={error}
              value={values[input.name]}
              onChange={onChange}
              rdo={rdo}
            />
          );
        })}
        <br />
        {text && <CustomButton type="submit" value={text} />}
      </form>
    </div>
  );
};

export default FormView;
