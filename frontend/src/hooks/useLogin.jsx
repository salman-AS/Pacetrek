import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";


const useLogin = () => {
    const { login } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const loginUser = async (values) => {

        try {
            setError(null)
            setLoading(true)
            const res = await fetch('http://localhost:3001/api/admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const data = await res.json()
            if (res.status === 201) {
                message.success(data.message)
                console.log(data.message, '201', data)
                login(data.token, data.user)
            } else if (res.status === 404) {
                setError(data.message)
                console.log(data.message, '404')
            } else if (res.status === 401) {
                setError(data.message)
                console.log(data.message, '401')
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

    return { loading, error, loginUser }
}



export default useLogin