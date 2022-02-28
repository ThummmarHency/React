import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'


const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        { navigate('../login') }
        
    }, [])

    return (
        <div>
            <Navbar />
            {localStorage.removeItem('token')}
            {localStorage.removeItem('isAuthenticated')}

        </div>
    )
}

export default Logout