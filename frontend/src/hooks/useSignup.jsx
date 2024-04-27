import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";


const useSignup = () => {
    const { login } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const registerUser = async (values) => {
        if (values.password !== values.passwordConfirm) {
            return setError('Passwords are not the same')
        }

        try {
            setError(null)
            setLoading(true)
            const res = await fetch('http://localhost:3001/api/admins/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const data = await res.json()
            if (res.status === 201) {
                message.success(data.message)
                console.log(data.message, '201')
                login(data.token, data.user)
            } else if (res.status === 400) {
                setError(data.message)
                console.log(data.message, '400')
            } else {
                message.error('Registration failed')
                console.log('Registration failed (else)')
            }

        } catch (error) {
            message.error('Registration failed')
            console.log('Registration failed (catch)', error)
        } finally {
            setLoading(false)
        }
    }
    
    return { loading, error, registerUser }
}



export default useSignup