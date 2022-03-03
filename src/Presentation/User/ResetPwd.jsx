import React, { useState } from 'react'
import DataLogic from '../../Container/DataLogic';
import { formattribute } from '../User/LoginUi'

export const attribute = [
    { ...formattribute[1], name: "oldPassword", label: "Old Password: ", placeholder: "Enter Old Password" },
    { ...formattribute[1], name: "Password", placeholder: "Enter New Password" },
    { ...formattribute[1], name: "ConfirmPassword", placeholder: "Enter Confirm Password", label: "Confirm Password: ", errorMsg: "password Not match" },
]
const ResetPwd = () => {

    const [values, setValues] = useState({
        oldPassword: "",
        Password: "",
        ConfirmPassword: ""
    });

    return (
        <div>
            <DataLogic text="Reset Password" attribute={attribute} api="/users/ResetPassword" setValues={setValues} values={values} />
        </div>
    )
}

export default ResetPwd