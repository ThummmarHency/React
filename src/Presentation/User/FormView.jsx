import React from "react";
import CustomInput from "../../Shared/CustomInput";
import CustomButton from "../../Shared/CustomButton";

const FormView = ({ handleSubmit, attribute, error, values, onChange, text }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {attribute && attribute.map((input, index) => {
          return (
            <React.Fragment key={index}>
            <CustomInput
              key={index}
              {...input}
              requireField={error}
              value={values[input.name]}
              onChange={onChange}
            />
            <br />
            </React.Fragment>
          );
        })}
        <br />
        {text && <CustomButton type="submit" value={text} />}
      </form>
    </div>
  );
};

export default FormView;
