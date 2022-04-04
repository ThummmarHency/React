import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'

const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
         navigate('../login') 
    }, [])

    return (
        <div>
            <Navbar />
            {localStorage.clear()}
        </div>
    )
}

export default Logout