import React from 'react'
import { Button } from '@material-ui/core'

const CustomButton = ({type,value,onClick}) => {
  return (
    <div>
        <Button variant="contained" type={type} onClick={onClick}>{value}</Button>
    </div>
  )
}
export default CustomButton;