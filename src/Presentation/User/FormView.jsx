import React from "react";
import CustomInput from "../../Shared/CustomInput";
import CustomButton from "../../Shared/CustomButton";

const FormView = ({ handleSubmit, attribute, values, onChange, text }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {attribute.map((input, index) => {
          return (
            <CustomInput
              key={index}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          );
        })}
        {<CustomButton type="submit" value={text} />}
      </form>
    </div>
  );
};

export default FormView;
