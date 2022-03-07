
import React,{ useState} from 'react'
const CustomInput = (props) => {
  const[focused,setfocused]= useState(false)
  
  const {label,onChange,value,Requirefield,isChecked,errorMsg,rdo,...inputprops}=props
  return (
    <>
        <label>{label}</label>
        <input onChange={onChange} value={value} checked={isChecked} {...inputprops} autoComplete='on' onBlur={()=>{setfocused(true)}} focused={focused.toString()} />
        {value === "" || value==="Answer..." ? <span className='requireMsg'> {Requirefield}</span> : null}
        <span className='errorMsg'>{errorMsg}</span>
    </>
  )
}

export default CustomInput