import React from 'react'
import { Button } from '@material-ui/core'

const CustomButton = ({type,value,onClick,isDisabled}) => {
  return (
    <div>
        <Button variant="contained" type={type} disabled={isDisabled} onClick={onClick}>{value}</Button>
    </div>
  )
}
export default CustomButton;