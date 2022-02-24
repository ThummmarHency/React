
import React,{ useState} from 'react'
const CustomInput = (props) => {
  const[focused,setfocused]= useState(false)
  
  const {label,onChange,errorMsg,id,...inputprops}=props
  return (
    <div>
        <label>{label}</label>
        <input onChange={onChange} {...inputprops} autoComplete='on' onBlur={()=>{setfocused(true)}} focused={focused.toString()} />
        <span className='errorMsg'>{errorMsg}</span>
    </div>
  )
}

export default CustomInput