import React from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import {FormAttribute} from '../Container/FormAttribute'

const FormView = ({ handleSubmit, attribute, error,rdonly, values, onChange, text }) => {
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
              readOnly={rdonly}
              value={values[input.name]}
              onChange={onChange}
            />
            <br />
            </React.Fragment>
          );
        })}
        <br />
        {text && <CustomButton isDisabled={false} type="submit" value={text} />}
      </form>
    </div>
  );
};

export default FormView;
