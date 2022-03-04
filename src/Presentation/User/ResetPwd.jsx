import React, { useState } from 'react'
import Reuse from '../../Shared/Reuse';
import {FormAttribute} from '../../Container/FormAttribute'


export const attribute = [
    { ...FormAttribute[1], name: "oldPassword", label: "Old Password: ", placeholder: "Enter Old Password" },
    { ...FormAttribute[1], name: "Password", placeholder: "Enter New Password" },
    { ...FormAttribute[1], name: "ConfirmPassword", placeholder: "Enter Confirm Password", label: "Confirm Password: ", errorMsg: "password Not match" },
]
const ResetPwd = () => {
    const [values, setValues] = useState({
        oldPassword: "",
        Password: "",
        ConfirmPassword: ""
    });

    return (
        <div>
            <Reuse text="Reset Password" attribute={attribute} api="/users/ResetPassword" setValues={setValues} values={values} />
        </div>
    )
}

export default ResetPwd