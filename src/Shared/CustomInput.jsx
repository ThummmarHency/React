
import React,{ useState} from 'react'
import { TextField } from '@material-ui/core'
const CustomInput = (props) => {
  const[focused,setfocused]= useState(false)
  const {label,onChange,errorMsg,id,...inputprops}=props
  return (
    <div>
        <label>{label}</label>
        <input onChange={onChange} {...inputprops} autoComplete='on' onBlur={()=>{setfocused(true)}} focused={focused.toString()} />
        {/* <TextField  variant="standard" size="small" autoComplete='on' {...inputprops} onChange={onChange} required/> */}
        <span className='errorMsg'>{errorMsg}</span>
    </div>
  )
}

export default CustomInput