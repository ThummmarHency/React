import React from 'react'
// import Button from '@material-ui/core'
import { Button } from '@material-ui/core'

const CustomButton = ({type,value,onClick}) => {
  return (
    <div>
        {/* <button type={type} onClick={onClick}>{value}</button> */}
        <Button variant="contained" type={type} onClick={onClick}>{value}</Button>
    </div>
  )
}
export default CustomButton;