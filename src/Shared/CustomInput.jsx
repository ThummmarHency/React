
import React,{ useState} from 'react'
const CustomInput = (props) => {
  const[focused,setfocused]= useState(false)
  
  const {label,onChange,value,Requirefield,errorMsg,rdo,...inputprops}=props
  // console.log(value);
  return (
    <div>
        <label>{label}</label>
        <input onChange={onChange} value={value} {...inputprops} autoComplete='on' onBlur={()=>{setfocused(true)}} focused={focused.toString()} />
        {value === "" ? <span className='requireMsg'> {Requirefield}</span> : null}
       { rdo && <input type="radio"/>}
        <span className='errorMsg'>{errorMsg}</span>
    </div>
  )
}

export default CustomInput