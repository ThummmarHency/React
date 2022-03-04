import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'


const ProtectedRoute = (props) => {
    let Com = props.Com
    let naviGate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('isAuthenticated')) {
            naviGate("../login")
        }else{
            naviGate(window.location.pathname)
        }
    }, [])

    return (
        <div>
            { <Com/>} 
        </div>
    )
}

export default ProtectedRoute