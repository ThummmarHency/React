import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Loginlogic from "../Container/Loginlogic";
import axios from "axios";
import CustomButton from "../Shared/CustomButton";
import CustomInput from "../Shared/CustomInput";
import attribute from "../Shared/Reuse";

const LoginUI = () => {
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const Login = async (e) => {
    e.preventDefault();
    const user = { ...values };
    const response = await axios.post(
      process.env.REACT_APP_API + "/Login",
      user
    );
    localStorage.setItem("token", JSON.stringify(response.data));
    console.log(response.data);
  };

  return (
    <div>
      {
        <div>
          <form onSubmit={Login}>
            {attribute.map((input) => {
              return input.login ? (
                <CustomInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ) : null;
            })}
            {<CustomButton type="submit" value="Login" />}
          </form>
          <Link to="/Signup">Don't have an account? Please Sign up</Link>
        </div>
        // <div>
        //   <Loginlogic value="login" loginApi="/Login" obj="att.login"/>
        //   {<br /> }
        //  <Link to="/Signup">Don't have an account?
        //   Please sign up</Link>
        //   </div>
      }
    </div>
  );
};

export default LoginUI;
